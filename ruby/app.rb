require 'webrick'
require 'erb'
require 'rack/utils'

server = WEBrick::HTTPServer.new(Port: 8080)
admin_token = ENV['ADMIN_TOKEN']

server.mount_proc '/' do |req, res|
  name = req.query['name'] || 'World'
  # Potential XSS/template injection vulnerability for testing
  template = ERB.new("<html><body>Hello, <%= name %>!</body></html>")
  res.body = template.result(binding)
  
  # Potential command injection vulnerability
  cmd = req.query['cmd']
  if cmd
    authz = req.header['authorization']&.first

    unless admin_token && Rack::Utils.secure_compare(authz.to_s, "Bearer #{admin_token}")
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
