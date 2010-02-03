
-----------------------------------------------------------------------------
-- system_user
-----------------------------------------------------------------------------

DROP TABLE "system_user" CASCADE;


CREATE TABLE "system_user"
(
	"username" VARCHAR(30)  NOT NULL,
	"password" VARCHAR(40)  NOT NULL,
	"first_name" VARCHAR(30)  NOT NULL,
	"last_name" VARCHAR(30)  NOT NULL,
	"email" VARCHAR(320)  NOT NULL,
	PRIMARY KEY ("username")
);

COMMENT ON TABLE "system_user" IS '';


SET search_path TO public;
-----------------------------------------------------------------------------
-- design
-----------------------------------------------------------------------------

DROP TABLE "design" CASCADE;


CREATE TABLE "design"
(
	"id" serial  NOT NULL,
	"name" VARCHAR(30)  NOT NULL,
	"owner" VARCHAR(30)  NOT NULL,
	"xml_code" TEXT,
	PRIMARY KEY ("id")
);

COMMENT ON TABLE "design" IS '';


SET search_path TO public;
ALTER TABLE "design" ADD CONSTRAINT "design_FK_1" FOREIGN KEY ("owner") REFERENCES "system_user" ("username") ON DELETE CASCADE;
