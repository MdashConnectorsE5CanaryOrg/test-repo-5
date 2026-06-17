using System;

namespace ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            string userInput = Console.ReadLine();
            // Potential SQL injection vulnerability for testing
            string query = "SELECT * FROM users WHERE name = '" + userInput + "'";
            Console.WriteLine("Hello, World!");
            Console.WriteLine(query);
        }
    }
}
