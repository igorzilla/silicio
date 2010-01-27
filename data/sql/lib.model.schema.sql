
-----------------------------------------------------------------------------
-- user
-----------------------------------------------------------------------------

DROP TABLE "user" CASCADE;


CREATE TABLE "user"
(
	"username" VARCHAR(30)  NOT NULL,
	"first_name" VARCHAR(30)  NOT NULL,
	"last_name" VARCHAR(30)  NOT NULL,
	"email" VARCHAR(320)  NOT NULL,
	PRIMARY KEY ("username")
);

COMMENT ON TABLE "user" IS '';


SET search_path TO public;
-----------------------------------------------------------------------------
-- design
-----------------------------------------------------------------------------

DROP TABLE "design" CASCADE;


CREATE TABLE "design"
(
	"id" serial  NOT NULL,
	"owner" VARCHAR(30)  NOT NULL,
	"xml_code" TEXT,
	PRIMARY KEY ("id")
);

COMMENT ON TABLE "design" IS '';


SET search_path TO public;
ALTER TABLE "design" ADD CONSTRAINT "design_FK_1" FOREIGN KEY ("owner") REFERENCES "user" ("username") ON DELETE CASCADE;
