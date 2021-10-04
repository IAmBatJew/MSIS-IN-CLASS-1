
-- database-2.cluster-ro-cowe6qx6tye0.us-east-2.rds.amazonaws.com
-- CREATE USER 'msis-reader'@'%' IDENTIFIED BY 'msisreadonly';

DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS offer;
CREATE TABLE students (
	id int PRIMARY KEY AUTO_INCREMENT ,
    username varchar(24) UNIQUE NOT NULL,
    name varchar(48)
);

INSERT INTO students (id, username, name) VALUES 
(1, 'tomgreg', 'Tom Gregory'),
(2, 'beth1', 'Beth Barnhart'),
(3, 'bipin', 'Prof. Prabhakar');

CREATE TABLE offer (
id int PRIMARY KEY AUTO_INCREMENT,
studentId int NOT NULL REFERENCES student(id)
	ON DELETE CASCADE ON UPDATE CASCADE,
companyName VARCHAR(24) NOT NULL DEFAULT '',
salary int NOT NULL DEFAULT 0,
bonus int NOT NULL DEFAULT 0,
offerDate date NOT NULL DEFAULT(CURRENT_DATE)
);

INSERT INTO offer(id, studentId, companyName, salary, bonus, offerDate) VALUES
(1,2,'KPMG',95000,5000,10/3/2021);