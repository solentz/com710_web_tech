const path = require("path");
var sqlite = require("sqlite3").verbose();

const database_location = path.resolve(
  process.cwd(),
  "src",
  "store/database.db"
);

const db = new sqlite.Database(database_location, (err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log("Database connected successfully");
  //   ======= user table ========
  db.run(
    `CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username text,
      email text UNIQUE,
      password text,
      created_at text DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT email_unique UNIQUE (email)
  )`,
    (err) => {
      if (err) {
        console.log("User Table Has been created successfully");
      }
    }
  );

  //   ================ Location Table ================
  db.run(
    `CREATE TABLE IF NOT EXISTS  locations(
    id INTEGER primary key AUTOINCREMENT,
    location text UNIQUE,
    CONSTRAINT location_unique UNIQUE (location)
)`,
    (err) => {
      if (err) {
        console.log("Location table created successfully");
      }
    }
  );

  //   ====== Animals Table =====================

  db.run(
    `CREATE TABLE IF NOT EXISTS animals(
    id INTEGER primary key AUTOINCREMENT,
    name text,
    description text,
    endangered boolean,
    image text,
    location_id,
    FOREIGN KEY(location_id) REFERENCES locations(id)
    ON DELETE CASCADE
)`,
    (err) => {
      if (err) {
        console.log(err)
        console.log("Animals Table Created Successful");
      }
    }
  );
});

module.exports = db;
