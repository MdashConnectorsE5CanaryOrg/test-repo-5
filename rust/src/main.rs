use std::io::{self, BufRead};
use std::process::Command;

fn main() {
    println!("Enter a command:");
    let stdin = io::stdin();
    let line = stdin.lock().lines().next().unwrap().unwrap();
    
    // Potential command injection vulnerability for testing
    let output = Command::new("sh")
        .arg("-c")
        .arg(&line)
        .output()
        .expect("Failed to execute command");
    
    println!("Output: {}", String::from_utf8_lossy(&output.stdout));
}
