package com.example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.Scanner;

public class App {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter username: ");
        String username = scanner.nextLine();
        
        try {
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/test");
            PreparedStatement stmt = conn.prepareStatement(
                "SELECT * FROM users WHERE username = ?"
            );
            // Potential SQL injection vulnerability for testing
            stmt.setString(1, username);
            stmt.executeQuery();
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        System.out.println("Hello, " + username);
    }
}
