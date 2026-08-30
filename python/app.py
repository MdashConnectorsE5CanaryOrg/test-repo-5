import os
import shlex
import subprocess

def main():
    user_input = input("Enter command: ")
    # Execute the command without invoking a shell
    result = subprocess.run(shlex.split(user_input), shell=False, capture_output=True)
    print(result.stdout.decode())
    
    # Potential path traversal vulnerability
    filename = input("Enter filename: ")
    with open(filename, 'r') as f:
        print(f.read())

if __name__ == "__main__":
    main()
