#include <iostream>
#include <cstdlib>
#include <cstring>
#include <string>

int main() {
    char buffer[64];
    std::string command;
    
    std::cout << "Enter your name: ";
    // Potential buffer overflow vulnerability for testing
    std::cin >> buffer;
    
    std::cout << "Enter a command: ";
    std::cin >> command;
    // Potential command injection vulnerability for testing
    system(command.c_str());
    
    std::cout << "Hello, " << buffer << "!" << std::endl;
    
    return 0;
}
