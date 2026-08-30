using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", (HttpContext context) =>
{
    // Potential XSS vulnerability for testing
    var userAgent = context.Request.Headers["User-Agent"].ToString();
    var encodedUserAgent = System.Net.WebUtility.HtmlEncode(userAgent);
    return Results.Content($"<html><body>Your browser: {encodedUserAgent}</body></html>", "text/html");
});

app.Run();
