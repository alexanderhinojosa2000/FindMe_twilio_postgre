DROP TABLE IF EXISTS cat_forms CASCADE;

CREATE TABLE cat_forms (

    id SERIAL PRIMARY KEY NOT NULL,
  
    cat_name VARCHAR(255),
    gender VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    last_seen_date DATE NOT NULL,
    last_seen_address VARCHAR(255) NOT NULL,
    last_seen_city VARCHAR(255) NOT NULL,
    last_seen_postal_code VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL,
    date_created TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    image TEXT,
    description VARCHAR(500) NOT NULL
); 