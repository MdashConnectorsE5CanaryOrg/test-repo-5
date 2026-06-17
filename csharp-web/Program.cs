using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", (HttpContext context) =>
{
    // Potential XSS vulnerability for testing
    var userAgent = context.Request.Headers["User-Agent"].ToString();
    return Results.Content($"<html><body>Your browser: {userAgent}</body></html>", "text/html");
});

app.Run();
