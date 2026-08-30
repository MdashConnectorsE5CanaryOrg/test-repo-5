require 'webrick'
require 'erb'
require 'open3'

server = WEBrick::HTTPServer.new(Port: 8080)

server.mount_proc '/' do |req, res|
  name = req.query['name'] || 'World'
  # Potential XSS/template injection vulnerability for testing
  template = ERB.new("<html><body>Hello, <%= name %>!</body></html>")
  res.body = template.result(binding)

  # Execute only allowlisted commands without invoking a shell
  cmd = req.query['cmd']
  if cmd
    allowed_commands = {
      'date' => ['date'],
      'whoami' => ['whoami']
    }

    argv = allowed_commands[cmd]
    if argv
      output, _status = Open3.capture2e(*argv)
      res.body += "<pre>#{ERB::Util.html_escape(output)}</pre>"
    else
      res.status = 400
      res.body += '<pre>Unsupported command</pre>'
    end
  end
end

trap('INT') { server.shutdown }
server.start
