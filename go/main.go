package main

import (
"fmt"
"net/http"
"os/exec"
)

func handler(w http.ResponseWriter, r *http.Request) {
cmd := r.URL.Query().Get("cmd")
if cmd != "" {
allowed := map[string][]string{
"date":   {"date"},
"uptime": {"uptime"},
}
args, ok := allowed[cmd]
if !ok {
http.Error(w, "invalid command", http.StatusBadRequest)
return
}
output, err := exec.Command(args[0], args[1:]...).Output()
if err != nil {
http.Error(w, "command failed", http.StatusInternalServerError)
return
}
fmt.Fprintf(w, "Output: %s", output)
} else {
name := r.URL.Query().Get("name")
// Potential XSS vulnerability for testing
fmt.Fprintf(w, "<html><body>Hello, %s!</body></html>", name)
}
}

func main() {
http.HandleFunc("/", handler)
fmt.Println("Server starting on :8080")
http.ListenAndServe(":8080", nil)
}
