-- Drops the comp_db if it exists currently --
DROP DATABASE IF EXISTS comp_db;
-- Creates the comp_db database --
CREATE DATABASE comp_db;

-- use comp_db database --
USE comp_db;


CREATE TABLE department (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL UNSIGNED NOT NULL,
department_id INT NOT NULL,
CONSTRAINT fk_department_id FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);
