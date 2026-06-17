#include <iostream>
#include <cstdlib>
#include <cstring>

int main() {
    char buffer[64];
    char command[256];
    
    std::cout << "Enter your name: ";
    // Potential buffer overflow vulnerability for testing
    std::cin >> buffer;
    
    std::cout << "Enter a command: ";
    std::cin >> command;
    // Potential command injection vulnerability for testing
    system(command);
    
    std::cout << "Hello, " << buffer << "!" << std::endl;
    
    return 0;
}
