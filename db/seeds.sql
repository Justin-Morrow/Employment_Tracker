INSERT INTO department (department_name)
VALUES ("Sales"), ("Marketing"), ("Manager"), ("Operations"), ("Engineering");


INSERT INTO role (title, salary, department_id)
VALUES  
("Manager", (300000), 1),
("Salesperson", (200000), 2),
("Digital Marketer ", (135000), 3),
("Business Operations", (115000), 4),
("Frontend Engineering", (300000), 5),
("Backend Engineering", (400000), 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  
("Justin","Morrow", 1, NULL),
("Bob","Smith", 2, NULL),
("Jane","Doe", 3, NULL),
("Frank","Carr", 4, NULL),
("Rich","Orr", 5, NULL),
("Carl","Peace", 1, NULL),
("Jeff","Bezo", 2, NULL),
("Wendy","Hernandez", 3, NULL),
("Shawna","James", 4, NULL),
("Randy","Johnson", 5, NULL);
