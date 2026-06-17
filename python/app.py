import os
import subprocess

def main():
    user_input = input("Enter command: ")
    # Potential command injection vulnerability for testing
    result = subprocess.run(user_input, shell=True, capture_output=True)
    print(result.stdout.decode())
    
    # Potential path traversal vulnerability
    filename = input("Enter filename: ")
    with open(filename, 'r') as f:
        print(f.read())

if __name__ == "__main__":
    main()
