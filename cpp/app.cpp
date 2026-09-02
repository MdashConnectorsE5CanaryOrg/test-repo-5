#include <array>
#include <cstdlib>
#include <cstring>
#include <iostream>

namespace {

struct AllowedCommand {
    const char* input;
    const char* executable;
};

constexpr std::array<AllowedCommand, 2> kAllowedCommands{{
    {"date", "date"},
    {"whoami", "whoami"},
}};

const char* resolveAllowedCommand(const char* input) {
    for (const AllowedCommand& command : kAllowedCommands) {
        if (std::strcmp(input, command.input) == 0) {
            return command.executable;
        }
    }

    return nullptr;
}

}  // namespace

int main() {
    char buffer[64];
    char command[256];
    
    std::cout << "Enter your name: ";
    // Potential buffer overflow vulnerability for testing
    std::cin >> buffer;
    
    std::cout << "Enter a command: ";
    std::cin >> command;

    const char* allowedCommand = resolveAllowedCommand(command);
    if (allowedCommand == nullptr) {
        std::cerr << "Unsupported command" << std::endl;
    } else {
        std::system(allowedCommand);
    }
    
    std::cout << "Hello, " << buffer << "!" << std::endl;
    
    return 0;
}
