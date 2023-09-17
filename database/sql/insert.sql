
DROP SCHEMA IF EXISTS "order";
CREATE SCHEMA "order";

CREATE TABLE "order".category (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	discount int4 NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	modified_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT "pk_category_id" PRIMARY KEY (id)
);

CREATE TABLE "order".customer (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	email varchar NULL,
	phone_number varchar(15) NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	modified_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT "pk_customer_id" PRIMARY KEY (id)
);

CREATE TABLE "order"."order" (
	id serial4 NOT NULL,
	order_items jsonb NOT NULL,
	"orderTotal" float8 NOT NULL,
	customer_id int4 NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	modified_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT "pk_order_id" PRIMARY KEY (id),
	CONSTRAINT "fk_order_customer_id" FOREIGN KEY (customer_id) REFERENCES "order".customer(id)
);

CREATE TABLE "order".item (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	description varchar NOT NULL,
	price int4 NOT NULL,
	"itemNumber" varchar(10) NULL,
	weight float8 NULL,
	color varchar(20) NULL,
	flavor varchar(30) NULL,
	category_id int4 NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	modified_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT "pk_item_id" PRIMARY KEY (id),
	CONSTRAINT "fk_category_id" FOREIGN KEY (category_id) REFERENCES "order".category(id)
);

CREATE TABLE "order".customer_x_category (
	id serial4 NOT NULL,
	customer_id int4 NULL,
	category_id int4 NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	modified_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT "pk_customer_x_category_id" PRIMARY KEY (id),
	CONSTRAINT "fk_customer_x_id" FOREIGN KEY (customer_id) REFERENCES "order".customer(id),
	CONSTRAINT "fk_category_x_id" FOREIGN KEY (category_id) REFERENCES "order".category(id)
);

INSERT INTO "order".category (id, name, discount,created_at,modified_at) VALUES(1, 'FURNITURE', 20,NOW(),NOW()), (2, 'TEXTILE', 10,NOW(),NOW()), (3, 'HOTDOG', 5,NOW(),NOW());

INSERT INTO "order".customer (id,name) VALUES (1, 'Pundarika Shakya'),(2,'Peter Pan');

INSERT INTO "order".item ("name", description, price, "itemNumber", weight, category_id)
VALUES ('Coffee Table', 'Size medium', 1550, 'f001', 3.5, 1),
		('Book Shelf', 'book shelf in color white', 1400, 'f002',7, 1);

INSERT INTO "order".item ("name", description, price, "itemNumber", color, category_id)
	VALUES	('Rug', 'Size 200*120', 4899, 't001', 'grey', 2),
	('Sofa cover', '', 3499, 't002', 'blue', 2);


INSERT INTO "order".customer_x_category ( customer_id, category_id)
VALUES ( 1, 1),( 1, 3);



