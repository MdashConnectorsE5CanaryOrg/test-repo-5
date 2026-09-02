#include <cstdlib>
#include <iostream>
#include <string>

int main() {
    std::string buffer;
    std::string command;
    
    std::cout << "Enter your name: ";
    std::cin >> buffer;
    
    std::cout << "Enter a command: ";
    std::cin >> command;
    system(command.c_str());
    
    std::cout << "Hello, " << buffer << "!" << std::endl;
    
    return 0;
}
