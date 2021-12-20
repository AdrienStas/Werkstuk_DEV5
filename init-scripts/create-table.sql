use challenges;
create table type(
	id int not null auto_increment,
    name varchar(100) not null,
    primary key (id)
);

create table challenge(
	id int not null auto_increment,
    naam varchar(100) not null,
    email varchar(100) not null,
    opdracht varchar(100) not null,
    link varchar(250) not null,
	type_id int not null,
    foreign key (type_id) references type(id),
    primary key (id)
);
