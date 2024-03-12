INSERT INTO departments (name)
VALUES ("Sales"), 
       ("Marketing"),
       ("Analyst");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Manager", 100000, 1),
       ("Agent", 60000, 1),
       ("Marketing Manager", 120000, 2),
       ("Brand Strategist", 90000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Shawn", "Carter", 1, null),
       ("Dwayne", "Carter", 2, 1),
       ("Kanye", "West", 2, 1),
       ("Aubrey", "Graham", 3, null),
       ("Jermaine", "Cole", 4, 3);