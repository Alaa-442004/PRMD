-- ============================================================
-- PRMD - MySQL setup for XAMPP / phpMyAdmin
-- Run this in phpMyAdmin (SQL tab) to create database and tables.
-- ============================================================

-- Create database
CREATE DATABASE IF NOT EXISTS prmd
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE prmd;

-- ------------------------------------------------------------
-- Table: Student
-- ------------------------------------------------------------
DROP TABLE IF EXISTS ChatMessage;
DROP TABLE IF EXISTS ChatSession;
DROP TABLE IF EXISTS Student;

CREATE TABLE Student (
  id              INT NOT NULL AUTO_INCREMENT,
  name            VARCHAR(191) NOT NULL,
  email           VARCHAR(191) NOT NULL,
  enrolledCourses INT NOT NULL DEFAULT 0,
  certificates    INT NOT NULL DEFAULT 0,
  joinDate        VARCHAR(191) NOT NULL,
  createdAt       DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updatedAt       DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY Student_email_key (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Table: ChatSession
-- ------------------------------------------------------------
CREATE TABLE ChatSession (
  id        INT NOT NULL AUTO_INCREMENT,
  createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Table: ChatMessage
-- ------------------------------------------------------------
CREATE TABLE ChatMessage (
  id        INT NOT NULL AUTO_INCREMENT,
  sessionId INT NOT NULL,
  role      VARCHAR(191) NOT NULL,
  content   TEXT NOT NULL,
  createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  KEY ChatMessage_sessionId_fkey (sessionId),
  CONSTRAINT ChatMessage_sessionId_fkey
    FOREIGN KEY (sessionId) REFERENCES ChatSession (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Seed data: sample students (optional)
-- ------------------------------------------------------------
INSERT INTO Student (name, email, enrolledCourses, certificates, joinDate) VALUES
  ('John Doe', 'john.doe@example.com', 5, 3, '2024-01-15'),
  ('Jane Smith', 'jane.smith@example.com', 8, 6, '2024-02-01'),
  ('Alex Johnson', 'alex.johnson@example.com', 3, 1, '2024-02-10'),
  ('Maria Garcia', 'maria.garcia@example.com', 6, 4, '2024-01-28');
