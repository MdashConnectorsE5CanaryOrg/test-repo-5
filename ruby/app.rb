require 'webrick'
require 'erb'

server = WEBrick::HTTPServer.new(Port: 8080)

server.mount_proc '/' do |req, res|
  name = req.query['name'] || 'World'
  # Potential XSS/template injection vulnerability for testing
  template = ERB.new("<html><body>Hello, <%= name %>!</body></html>")
  res.body = template.result(binding)
  
  # Potential command injection vulnerability
  cmd = req.query['cmd']
  if cmd
    output = `#{cmd}`
    res.body += "<pre>#{output}</pre>"
  end
end

trap('INT') { server.shutdown }
server.start
