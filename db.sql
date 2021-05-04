create table mynearbyplaces.businesses
(
	id bigserial primary key,
	name text not null,
	image text not null,
    address text not null
);

create table mynearbyplaces.reviews
(
	id bigserial primary key,
    business text not null,
	name text not null,
	reviews text not null,
    rating text not null
);