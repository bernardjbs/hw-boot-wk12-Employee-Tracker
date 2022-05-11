INSERT INTO departments (dept_name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales");

INSERT INTO roles (department_id, title, salary)
VALUES  (4, "Sales Lead", 120000),
        (4, "Sales Person", 65000),
        (1, "Lead Engineer", 150000),
        (2, "Account Manager", 90000),
        (2, "Accountant", 75000),
        (3, "Legal Team Lead", 125000),
        (3, "Lawyer", 115000),
        (4, "Customer Service", 55000);

INSERT INTO employees (first_name, last_name, role_id)
VALUES  ("Sebastian", "Hudson", 1), 
	    ("Theresa", "Scott", 3),
	    ("Virginia", "Glover", 5),
	    ("Ryan", "Turner", 2),
	    ("Sarah", "Short", 4),
	    ("Sebastian", "Hudson", 4),
	    ("Theresa", "Hunter", 2),
	    ("Jacob", "Taylor", 4),
	    ("Jane", "Hill", 6),
	    ("Sally", "Parr", 4),
	    ("Julian", "Terry", 8),
	    ("Caroline", "Payne", 2),
	    ("Vanessa", "Slater", 4),
	    ("Michael", "Manning", 6),
	    ("Austin", "Howard", 8),
	    ("Carolyn", "Russell", 6),
	    ("Trevor", "Rutherford", 8),
	    ("Isaac", "Glover", 2),
	    ("Victoria", "Cornish", 2),
	    ("Nicholas", "Short", 4),
	    ("Andrea", "Payne", 6),
	    ("Simon", "Mathis", 3),
	    ("Sebastian", "Martin", 8);

UPDATE employees SET manager_id = 1 WHERE role_id = 2;
UPDATE employees SET manager_id = 1 WHERE role_id = 8;
UPDATE employees SET manager_id = 3 WHERE role_id = 4;
UPDATE employees SET manager_id = 5 WHERE role_id = 6;
UPDATE employees SET manager_id = 5 WHERE role_id = 6;