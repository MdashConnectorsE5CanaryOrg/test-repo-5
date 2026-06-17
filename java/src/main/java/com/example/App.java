package com.example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.Scanner;

public class App {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter username: ");
        String username = scanner.nextLine();
        
        try {
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/test");
            Statement stmt = conn.createStatement();
            // Potential SQL injection vulnerability for testing
            String query = "SELECT * FROM users WHERE username = '" + username + "'";
            stmt.executeQuery(query);
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        System.out.println("Hello, " + username);
    }
}
