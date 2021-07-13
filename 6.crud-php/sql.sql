-- orders table
CREATE TABLE orders (
order_id bigint NOT NULL PRIMARY KEY AUTO_INCREMENT,
client_id bigint NOT NULL, 
user_id bigint NOT NULL,  
bakery_id bigint NOT NULL,
total varchar(100), 
invoice varchar(100),
status varchar(100) DEFAULT "pending",
created timestamp default current_timestamp not null
);

-- items table
CREATE TABLE items (
item_id bigint NOT NULL PRIMARY KEY AUTO_INCREMENT,
bakery_id bigint NOT NULL,
item varchar(100), 
description varchar(100), 
price bigint NOT NULL,
cost bigint NOT NULL,
category varchar(100), 
image varchar(100),
created timestamp default current_timestamp not null
);

-- clients table
CREATE TABLE clients (
client_id bigint NOT NULL PRIMARY KEY AUTO_INCREMENT,
bakery_id bigint NOT NULL,
client_name varchar(100) NOT NULL DEFAULT "", 
client_email varchar(100) NOT NULL DEFAULT "", 
client_phone varchar(100) NOT NULL DEFAULT "",
city varchar(100) DEFAULT "",
street varchar(100) DEFAULT "",
house_number varchar(100) DEFAULT "",
apartment_number varchar(100) DEFAULT "",
-- client_address varchar(255) DEFAULT "",
created timestamp default current_timestamp not null
);

-- order items table
CREATE TABLE order_items (
order_item_id bigint NOT NULL PRIMARY KEY AUTO_INCREMENT,
bakery_id bigint NOT NULL,
order_id bigint NOT NULL,
qty bigint NOT NULL,
created timestamp default current_timestamp not null
);
