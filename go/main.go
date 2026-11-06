package main

import (
	"fmt"
	"net/http"
	"os/exec"
)

var allowedCommands = map[string][]string{
	"date":   {"date"},
	"uptime": {"uptime"},
}

func handler(w http.ResponseWriter, r *http.Request) {
	cmd := r.URL.Query().Get("cmd")
	if cmd != "" {
		commandArgs, ok := allowedCommands[cmd]
		if !ok {
			http.Error(w, "unsupported command", http.StatusBadRequest)
			return
		}

		output, _ := exec.Command(commandArgs[0], commandArgs[1:]...).Output()
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
