INSERT INTO departments (dept_name)
VALUES  ("Executive Department"),
        ("Finance Department"),
        ("Sales Department"),
        ("HR Department"),
        ("Purchase Department"),
        ("Operations Department"),
        ("Marketing Department"),
        ("IT Department");

INSERT INTO roles (department_id, title, salary)
VALUES  (1, "CEO", 120000),
        (1, "Director", 150000),
        (2, "Manager", 90000),
        (2, "Accountant", 80000),
        (2, "Assistant Manager", 75000),
        (2, "Clerk", 45000),
        (3, "Manager", 90000),
        (4, "Secretary", 50000),
        (3, "Assistant Manager", 70000),
        (4, "Manager", 90000),
        (5, "Assistant Manager", 68000),
        (5, "Salesman Senior", 55000),
        (6, "Salesman Junior", 45000),
        (8, "Developer", 100000),
        (7, "Manager", 150000),
        (7, "Assistant Manager", 125000),
        (8, "Project Manager", 150000),
        (8, "Tester", 850000);

INSERT INTO employees (first_name, last_name, role_id)
VALUES  ("Sebastian", "Hudson", 1), 
	    ("Theresa", "Scott", 3),
	    ("Virginia", "Glover", 5),
	    ("Ryan", "Turner", 2),
	    ("Sarah", "Short", 4),
	    ("Sebastian", "Hudson", 4),
	    ("Theresa", "Hunter", 2),
	    ("Jacob", "Taylor", 4),
	    ("Jane", "Hill", 16),
	    ("Sally", "Parr", 4),
	    ("Julian", "Terry", 8),
	    ("Caroline", "Payne", 2),
	    ("Vanessa", "Slater", 4),
	    ("Michael", "Manning", 6),
	    ("Austin", "Howard", 8),
	    ("Carolyn", "Russell", 16),
	    ("Trevor", "Rutherford", 8),
	    ("Isaac", "Glover", 2),
	    ("Victoria", "Cornish", 2),
	    ("Nicholas", "Short", 4),
	    ("Andrea", "Payne", 16),
	    ("Simon", "Mathis", 13),
	    ("Sebastian", "Martin", 9);

UPDATE employees SET manager_id = 1 WHERE role_id = 2;
UPDATE employees SET manager_id = 1 WHERE role_id = 8;
UPDATE employees SET manager_id = 3 WHERE role_id = 4;
UPDATE employees SET manager_id = 5 WHERE role_id = 6;
UPDATE employees SET manager_id = 5 WHERE role_id = 16;