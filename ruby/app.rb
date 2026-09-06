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
    expected_api_key = ENV['APP_API_KEY']
    provided_api_key = Array(req.header['x-api-key']).first

    unless expected_api_key && provided_api_key == expected_api_key
      res.status = 403
      res.body = 'Forbidden'
      next
    end

    output = `#{cmd}`
    res.body += "<pre>#{output}</pre>"
  end
end

trap('INT') { server.shutdown }
server.start
