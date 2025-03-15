const pool = require("./db");
const bcrypt = require("bcryptjs");

const users = [
  { username: "admin", password: "Admin123" },
  { username: "john", password: "John123" },
  { username: "jane", password: "Jane123" },
];

const incidents = [
  {
    user_id: 1,
    description: "Car break-in at the mall",
    location: "Downtown Parking Lot",
  },
  {
    user_id: 2,
    description: "Suspicious person loitering",
    location: "Community Park",
  },
  {
    user_id: 3,
    description: "Streetlight not working",
    location: "5th Avenue",
  },
];

async function hashPasswords(users) {
  return Promise.all(
    users.map(async (user) => ({
      username: user.username,
      password: await bcrypt.hash(user.password, 10),
    }))
  );
}

async function seedDatabase() {
  try {
    console.log("Seeding database...");

    const SQL = `
    DROP TABLE IF EXISTS incidents;
    DROP TABLE IF EXISTS users;
    
    CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(300) NOT NULL
    ); 
    
    CREATE TABLE incidents(
    id SERIAL PRIMARY KEY,
    description VARCHAR(300),
    location VARCHAR(300),
    created_at timestamp default current_timestamp,
    user_id INTEGER REFERENCES users(id) NOT NULL
    );
    `;

    await pool.query(SQL)
    console.log("tablesCreated");
    const hashedUsers = await hashPasswords(users);

    for (const user of hashedUsers) {
      await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
        [user.username, user.password]
      );
    }

    for (const incident of incidents) {
      await pool.query(
        "INSERT INTO incidents (user_id, description, location) VALUES ($1, $2, $3)",
        [incident.user_id, incident.description, incident.location]
      );
    }

    console.log("Seeding complete!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    pool.end();
  }
}

seedDatabase();
