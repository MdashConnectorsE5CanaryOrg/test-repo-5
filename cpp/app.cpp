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
    // Execute only an approved command name
    if (command == "date") {
        system("date");
    } else if (command == "whoami") {
        system("whoami");
    } else {
        std::cerr << "Unsupported command" << std::endl;
        return 1;
    }
    
    std::cout << "Hello, " << buffer << "!" << std::endl;
    
    return 0;
}
