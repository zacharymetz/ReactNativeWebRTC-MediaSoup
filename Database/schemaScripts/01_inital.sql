create Schema platform;

create table platform.user(
    id serial primary key,
    email text UNIQUE,
	username text UNIQUE,
    hashedpassword text,
    archived boolean default false,
	createdAt timestamp with time zone default now(),
    lastLogin timestamp with time zone
)
create table platform.user_profile(
    id serial primary key,
    user_id int references ,
    profile_image_id int,
    header_image_id int,
    profile_text int,
    location text,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES platform.user(id)

    CONSTRAINT fk_profile_image
        FOREIGN KEY(profile_image_id) 
        REFERENCES platform.file(id)
)

/* this is where all the files are stored and urls to them  */

create table platform.social_media_platform(
    id serial primary key,
    name text,
    icon_name text,
    image_id int,
    CONSTRAINT fk_image
        FOREIGN KEY(image_id) 
        REFERENCES platform.file(id)
)

create table platform.file(
    id serial primary key,

    file_url text,
    mime_type text,
    size_in_bytes int,
    name text,
    created_at timestamp with time zone,
    /* fact libary dir id is optional */
    fact_library_directory_id int
    CONSTRAINT fk_user
        FOREIGN KEY(parent_id) 
        REFERENCES platform.fact_library_directory(id)
)

create table platform.badge(
    id serial primary key,
    name text,
    description text,
    image_id int,
    conditons jsonb,
    CONSTRAINT fk_image
        FOREIGN KEY(image_id) 
        REFERENCES platform.file(id)

)

create table platform.user_badge_ownership(
    id serial primary key,
    user_id int,
    badge_id int,
)



/* mission related tables  */
create table platform.mission_tag(
    id serial primary key,
    label text,
)

create table platform.mission(
    id serial primary key,
    title text,
    social_media_platform int,
    description text ,
    image_id int,
    expires timestamp with time zone,
    point_value int
    action_url text,
    created_at timestamp with time zone,

    CONSTRAINT fk_image
        FOREIGN KEY(image_id) 
        REFERENCES platform.file(id)

)
create table platform.mission_tag_mapping(
    id serial primary key,
    mission_id int,
    mission_tag_id int,

    CONSTRAINT fk_mission
        FOREIGN KEY(mission_id) 
        REFERENCES platform.mission(id)

    CONSTRAINT fk_mission_tag
        FOREIGN KEY(mission_tag_id) 
        REFERENCES platform.mission_tag(id)
)

create table platform.mission_step(
    id serial primary key,
    mission_id int,
    title text,
    description text,
    image_id int
    CONSTRAINT fk_mission
        FOREIGN KEY(mission_id) 
        REFERENCES platform.mission(id)
    CONSTRAINT fk_image
        FOREIGN KEY(image_id) 
        REFERENCES platform.file(id)
)


create table platform.mission_completion_log(
    id serial primary key,
    user_id int,
    mission_id int,
    completed_at timestamp with time zone,
    completed_at_ip text,
    CONSTRAINT fk_mission
        FOREIGN KEY(mission_id) 
        REFERENCES platform.mission(id)
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES platform.user(id)
        
)

create table platform.challenges(
    id serial primary key,
    title text,
    description text,
    image_id int,
    expires timestamp with time zone,
    reward_is_badge boolean,
    badge_id int,
    points_value int,
    conditons jsonb, /* basically what you need to achive to get it  */
)
create table platform.challenge_completion(
    id serial primary key,
    user_id int,
    challenges_id int,
    completed_at timestamp with time zone,
    completed_at_ip text,
    CONSTRAINT fk_mission
        FOREIGN KEY(challenges_id) 
        REFERENCES platform.challenges(id)
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES platform.user(id)
)

/* fact library tables */


create table platform.fact_library_directory(
    id serial primary key,
    name text,
    parent_id int
    CONSTRAINT fk_user
        FOREIGN KEY(parent_id) 
        REFERENCES platform.fact_library_directory(id)
)


/* community twitter clone down here still decieding if should do lol  */
create table platform.micro_blog_post(
    id serial primary key,
    blog_content text,
    user_id int,
    posted_from_device text,
    posted_from_location text,
    posted_at timestamp with time zone
)

create table platform.micro_blog_post_attachments(
    id serial primary key,
    micro_blog_post_id int,
    media_id int,
    created_at timestamp with time zone
)

create table platform.micro_blog_post_user_likes(
    id serial primary key,
    micro_blog_post_id int,
    user_id int,
    liked_at timestamp with time zone
)

create table platform.micro_blog_post_hash_tag(
    id serial primary key,
    micro_blog_post_id int,
    hashtag_name text
)