require 'webrick'
require 'erb'
require 'open3'

ALLOWED_COMMANDS = {
  'date' => ['date'],
  'uptime' => ['uptime']
}.freeze

server = WEBrick::HTTPServer.new(Port: 8080)

server.mount_proc '/' do |req, res|
  name = req.query['name'] || 'World'
  # Potential XSS/template injection vulnerability for testing
  template = ERB.new("<html><body>Hello, <%= name %>!</body></html>")
  res.body = template.result(binding)
  
  # Potential command injection vulnerability
  cmd = req.query['cmd']
  if cmd
    command_argv = ALLOWED_COMMANDS[cmd]

    if command_argv
      output, = Open3.capture2e(*command_argv)
      res.body += "<pre>#{ERB::Util.html_escape(output)}</pre>"
    else
      res.status = 400
      res.body += '<pre>unsupported command</pre>'
    end
  end
end

trap('INT') { server.shutdown }
server.start
