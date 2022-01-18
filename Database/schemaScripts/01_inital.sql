create Schema platform;

create table platform.user(
    id serial primary key,
    email text UNIQUE,
	firstName text,
    lastName text,
    hashedpassword text,
    archived boolean default false,
	createdAt timestamp with time zone default now(),
    lastLogin timestamp with time zone default now()
);

/* file stored in system (s3 compadible storage) */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
create table platform.file(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "size_in_bytes" integer,
    "bucket" text,
    "key"  text,
    "file_type" text,
    "date_uploaded" timestamp with time zone default now(),
    uploaded_by_user int REFERENCES platform.user(id)
);

/* public users profile */
create table platform.user_profile(
    id serial primary key,
    user_id int REFERENCES platform.user(id) ,
    username text,
    profile_image_id uuid REFERENCES platform.file(id),
    header_image_id uuid REFERENCES platform.file(id),
    profile_text text,
    location text
);


/* onboarding tables (if the user has been onboardered maybe) ? */


/* badges */
create table platform.badge(
    id  serial primary key,
    title text,
    description text,
    image uuid REFERENCES platform.file(id) default null
);

create table platform.user_badge_record(
    id serial primary key,
    user_id int REFERENCES platform.user(id),
    badge_id int REFERENCES platform.badge(id),
    dateCreated timestamp with time zone default now()
);


/* missions */
create table platform.mission(
  id serial primary key,
  title text,
  platform text,
  image uuid REFERENCES platform.file(id) default null,
  description text,
  actionUrl text,
  dateCreated timestamp with time zone default now(),
  dateExpirtes timestamp with time zone default now()
);

create table platform.mission_how_to_step(
    id  serial primary key,
    mission_id int REFERENCES platform.mission(id),
    image uuid REFERENCES platform.file(id) default null,
    description text
);

create table platform.mission_reward(
    id  serial primary key,
    mission_id int REFERENCES platform.mission(id),
    isBadge boolean default null,
    badgeID int REFERENCES platform.badge(id) default null,
    pointValue int default null
);

create table platform.mission_action_url_consumed_record(
    id serial primary key,
    mission_id int REFERENCES platform.mission(id),
    user_id int REFERENCES platform.user(id),
    date_completed timestamp with time zone default now()
);

create table platform.mission_completion_record(
    id serial primary key,
    mission_id int REFERENCES platform.mission(id),
    user_id int REFERENCES platform.user(id),
    date_completed timestamp with time zone default now()
);


/* fact libaray related tables */

/* this table is for the firectory, its self referential 
where null parent id is the thing */
create table platform.fact_library_entry(
    id serial primary key,
    name text,
    type text,
    thumbnail uuid REFERENCES platform.file(id) default null,
    file uuid  REFERENCES platform.file(id) default null,
    parent_id int REFERENCES platform.fact_library_entry(id),
    date_created timestamp with time zone default now(),
    archived boolean default false
);