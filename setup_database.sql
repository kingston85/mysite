-- Create database (if it doesn't exist already)
-- Uncomment the line below if you need to create a new database
-- CREATE DATABASE IF NOT EXISTS your_database_name;

-- Create contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(30),
    subject VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    newsletter TINYINT(1) DEFAULT 0,
    ip_address VARCHAR(45) NOT NULL,
    submission_date DATETIME NOT NULL,
    is_read TINYINT(1) DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create index for faster searching
CREATE INDEX idx_email ON contact_submissions(email);
CREATE INDEX idx_submission_date ON contact_submissions(submission_date);
CREATE INDEX idx_is_read ON contact_submissions(is_read);

-- Create admin user for managing submissions (optional)
-- Note: Replace 'your_admin_username' and 'your_secure_password' with actual values
-- Uncomment these lines if you want to create an admin user
/*
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create default admin user (password should be hashed in production)
-- This is just a placeholder example
INSERT INTO admin_users (username, password_hash, name, email) 
VALUES ('your_admin_username', SHA2('your_secure_password', 256), 'Sahr Emmanuel', 'esahr37@gmail.com');
*/
