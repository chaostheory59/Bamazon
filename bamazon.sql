DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
 id INT NOT NULL AUTO_INCREMENT,
 product_name VARCHAR(100) NULL,
 department_name VARCHAR(100) NULL,
 price INT NULL,
 stock_quantity INT NULL,
 PRIMARY KEY (id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Red Lipstick","makeup",15,400),("Raybans","accesssory",60,600);