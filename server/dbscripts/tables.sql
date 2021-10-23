--roles table
create table roles
(
	id int identity(1,1) primary key,
	role_name nvarchar(30) not null
);

--users table
create table users
(
	id int identity(1,1) primary key,
	id_role int not null,
	user_email nvarchar(max) not null,
	user_number nvarchar(max) not null,
	user_password nvarchar(max) not null
);

use RomaProject;
select * from users;

alter table users add us_name nvarchar(max);
alter table users add reviews int;
alter table users add user_photo_link nvarchar(max);
alter table users add gender nvarchar(20);

--cars table (if car exists)
create table cars
(
	id int identity(1,1) primary key,
	car_brand nvarchar(max) not null,
	car_model nvarchar(max) not null,
	fuel_type nvarchar(30) not null,
	car_photo_link nvarchar(max),
	id_user int not null
);

alter table cars add car_number nvarchar(30) not null;
alter table cars add color nvarchar(max) not null; 
alter table cars add fuel_consumption int not null;
alter table cars add foreign key (id_user) references users(id);
alter table users add foreign key (id_role) references roles(id);

--countries table
create table countries
(
	id int identity(1,1) primary key,
	coutnry_name nvarchar(max)
);

--cities table
create table cities
(
	id int identity(1,1) primary key,
	id_country int not null,
	city_name nvarchar(max) not null
);

alter table cities add foreign key (id_country) references countries(id);

--ads table
create table ads	
(
	id int identity(1,1) primary key,
	id_user int not null,
	id_city int not null,
	dep_address nvarchar(max) not null,
	arr_address nvarchar(max) not null,
	dep_date date not null,	
	dep_time time not null,	
	arr_time time not null,	
	seats_number int not null, 
	price int not null,
);
use RomaProject
alter table ads add distance int not null; --расстояние поездки
alter table ads add foreign key (id_user) references users(id);
alter table ads add radius int; --радиус сбора пассажиров в метрах
alter table ads add foreign key (id_city) references cities(id);

--таблица объявлений для пассажиров ======= ОНА НЕ НУЖНА
--create table ads_passengers
--(
--	id int identity(1,1) primary key,
--	id_user int not null,
--	id_city int not null,
--	dep_adress nvarchar(max) not null,
--	arr_adress nvarchar(max) not null,
--	radius int
--);

--alter table ads_passengers add foreign key (id_user) references users(id);
--alter table ads_passengers add foreign key (id_city) references cities(id);

use RomaProject;
create table travel_history
(
	id int identity(1,1) primary key,
	id_driver int not null,
	travel_date date
);

alter table travel_history add id_passenger int not null;
alter table travel_history add foreign key (id_driver) references users(id);
alter table travel_history add foreign key (id_passenger) references users(id);
alter table travel_history add id_city int not null;
alter table travel_history add foreign key (id_city) references cities(id);

alter table travel_history add dep_address nvarchar(max) not null;
alter table travel_history add arr_address nvarchar(max) not null;

alter table travel_history add price int;
alter table travel_history add distance int not null;

create table comments 
(
	id int identity(1,1) primary key,
	id_driver int not null,
	id_passenger int not null,
	comment nvarchar(max) not null,
	icon_link nvarchar(max),
);
alter table comments add foreign key (id_driver) references users(id);
alter table comments add foreign key (id_passenger) references users(id);
