/* Creating the database  */
CREATE DATABASE bultwttoppdkfltxkqhf;

USE bultwttoppdkfltxkqhf; 

CREATE TABLE users (
    uid varchar(45) NOT NULL,
    name varchar(45) NOT NULL,
    balance int NOT NULL,
    PRIMARY KEY (uid)
) ;

CREATE TABLE inventory (
    product_id varchar(45) NOT NULL,
    product_name varchar(45) NOT NULL,
    product_baseprice int NOT NULL,
    PRIMARY KEY (product_id)
) ;

CREATE TABLE bidding_table (
    item_id varchar(45) NOT NULL,
    current_highest_buyer varchar(45),
    time varchar(45) NOT NULL,
    current_price int,
    base_price int NOT NULL,
    PRIMARY KEY (item_id)
) ;

/* Here we are inserting dummy data in the .sql file but on our main code we insert the data dynamically */ 

INSERT INTO bultwttoppdkfltxkqhf.users
VALUES ('GjCD5vQsZof7bK2m9wBtXdlHPM72','Bhanupratap Rathore',20000);

INSERT INTO bultwttoppdkfltxkqhf.inventory
VALUES ('bs_auction_1','T-Shirt',10000);

INSERT INTO bultwttoppdkfltxkqhf.bidding_table
VALUES ('bs_auction_1','Sarang Sridhar','Wednesday April 13 2022 3:16 PM',200,100);

/* updating the values in the tables with dummy data in main code we have done this dynamically */

UPDATE bultwttoppdkfltxkqhf.users SET balance=21000 WHERE uid='GjCD5vQsZof7bK2m9wBtXdlHPM72';

UPDATE bultwttoppdkfltxkqhf.bidding_table SET current_highest_buyer='Bhanupratap Rathore',current_price=250 where item_id='bs_auction_1';

/* sql query for returning the inventory data for the api */
SELECT * FROM bultwttoppdkfltxkqhf.inventory; 











