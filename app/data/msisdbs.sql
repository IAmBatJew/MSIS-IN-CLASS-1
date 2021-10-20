
-- database-2.cluster-ro-cowe6qx6tye0.us-east-2.rds.amazonaws.com
-- CREATE USER 'msis-reader'@'%' IDENTIFIED BY 'msisreadonly';

DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS offer;
DROP TABLE IF EXISTS offers;
DROP TABLE IF EXISTS bookList;

CREATE TABLE students (
	id int PRIMARY KEY AUTO_INCREMENT ,
    username varchar(24) UNIQUE NOT NULL,
    name varchar(48)
);

INSERT INTO students (id, username, name) VALUES 
(1, 'tomgreg', 'Tom Gregory'),
(2, 'beth1', 'Beth Barnhart'),
(3, 'bipin', 'Prof. Prabhakar');

CREATE TABLE offers (
id int PRIMARY KEY AUTO_INCREMENT,
studentId int NOT NULL REFERENCES student(id)
	ON DELETE CASCADE ON UPDATE CASCADE,
companyName VARCHAR(24) NOT NULL DEFAULT '',
salary int NOT NULL DEFAULT 0,
bonus int NOT NULL DEFAULT 0,
offerDate date NOT NULL DEFAULT (CURRENT_DATE)
);

INSERT INTO offers(id, studentId, companyName, salary, bonus, offerDate) VALUES
(1,2,'KPMG',95000,5000, '2021-10-01'),
(2,3,'EY',100000,2500, '2021-10-03'),
(3,2,'PWC',89000,10000, '2021-09-05');

CREATE TABLE bookList (
	id int PRIMARY KEY AUTO_INCREMENT ,
    title varchar(72) UNIQUE NOT NULL,
	author varchar(50) NOT NULL,
    yearPublished year NOT NULL,
    publisher varchar(50) NOT NULL,
    pageCount integer NOT NULL,
    msrp float NOT NULL
);

INSERT INTO bookList (id, title, author, yearPublished, publisher, pageCount, msrp) VALUES 
(1, 'Lord of the Rings', 'J.R.R. Tolkien', 1954, 'Allen & Unwin', 1178, 14.99),
(2, 'I Don''t have Enough Faith to be an Athiest', 'Frank Turek and Norman Geisler', 2004, 'Crossway', 448, 19.95),
(3, 'Speaker for the Dead', 'Orson Scott Card', 1986, 'Orson Scott Card', 1986, 8.99),
(4, 'The Happiness Advantage', 'Shawn Achor', 2010, 'Currency', 256, 14.99);

SELECT * FROM bookList;
