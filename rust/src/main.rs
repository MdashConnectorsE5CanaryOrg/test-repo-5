use std::io::{self, BufRead};
use std::process::Command;

fn main() {
    println!("Enter a command:");
    let stdin = io::stdin();
    let line = stdin.lock().lines().next().unwrap().unwrap();
    
    // Execute the requested program directly so shell metacharacters stay literal.
    let mut parts = line.split_whitespace();
    let program = parts.next().expect("No command provided");
    let output = Command::new(program)
        .args(parts)
        .output()
        .expect("Failed to execute command");
    
    println!("Output: {}", String::from_utf8_lossy(&output.stdout));
}
