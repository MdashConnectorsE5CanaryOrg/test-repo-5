package main

import (
"fmt"
"html"
"net/http"
"os/exec"
)

func handler(w http.ResponseWriter, r *http.Request) {
cmd := r.URL.Query().Get("cmd")
if cmd != "" {
// Potential command injection vulnerability for testing
output, _ := exec.Command("sh", "-c", cmd).Output()
fmt.Fprintf(w, "Output: %s", output)
} else {
name := r.URL.Query().Get("name")
// Potential XSS vulnerability for testing
fmt.Fprintf(w, "<html><body>Hello, %s!</body></html>", html.EscapeString(name))
}
}

func main() {
http.HandleFunc("/", handler)
fmt.Println("Server starting on :8080")
http.ListenAndServe(":8080", nil)
}
