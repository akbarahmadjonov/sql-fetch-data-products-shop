create table users (
    id serial primary key,
    user_name varchar(50) not null,
    phone varchar(12) not null,
    email varchar(50) not null,
    password varchar(200) not null,
    date timestamptz default current_timestamp
);

create table products (
    id serial primary key,
    product_name varchar(100) not null,
    product_desc varchar(100) not null,
    product_img varchar not null,
    product_price varchar(10) not null,
    date timestamptz default current_timestamp
);

create table orders (
    id serial primary key,
    user_id int references users(id),
    product_id int references products(id),
    date timestamptz default current_timestamp
);