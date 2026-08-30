import os
import subprocess


def main():
    user_input = input("Enter command: ")
    # Potential command injection vulnerability for testing
    result = subprocess.run(user_input, shell=True, capture_output=True)
    print(result.stdout.decode())

    # Potential path traversal vulnerability
    filename = input("Enter filename: ")
    base_dir = os.path.realpath(os.getcwd())
    requested_path = os.path.realpath(os.path.join(base_dir, filename))

    if os.path.commonpath([base_dir, requested_path]) != base_dir:
        raise ValueError("Invalid filename")

    with open(requested_path, 'r') as f:
        print(f.read())


if __name__ == "__main__":
    main()
