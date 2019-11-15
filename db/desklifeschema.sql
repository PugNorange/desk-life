-- USERS
CREATE TABLE USERS(
   user_id serial PRIMARY KEY,
   user_name VARCHAR(60) UNIQUE NOT NULL,
   passwd VARCHAR(60) NOT NULL,
   email VARCHAR(100) UNIQUE NOT NULL,
   created_on TIMESTAMP NOT NULL,
   last_login TIMESTAMP
);

-- USERS HEALTH DATA
CREATE TABLE HEALTHINFO(
   health_info_user_id INT NOT NULL,
   eye_blink_count int NOT NULL,
   face_distance int NOT NULL,
   start_time timestamp NOT NULL,
   end_time timestamp   NOT NULL,
   -- Define the primary key / foreign key
   PRIMARY KEY (health_info_user_id), -- Set this id as a prm key
   CONSTRAINT health_info_id_fkey FOREIGN KEY (health_info_user_id) -- connect with USERS table
      REFERENCES USERS (user_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);


-- INSERT FAKE DATA --
