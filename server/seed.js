const pool = require("./db");
const bcrypt = require("bcryptjs");

const users = [
  { username: "admin", email: "admin@example.com", password: "Admin123" },
  { username: "john", email: "john@example.com", password: "John123" },
  { username: "jane", email: "jane@example.com", password: "Jane123" },
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
      email: user.email,
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

    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(300) NOT NULL
    );

    CREATE TABLE incidents (
      id SERIAL PRIMARY KEY,
      description VARCHAR(300),
      location VARCHAR(300),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      user_id INTEGER REFERENCES users(id) NOT NULL
    );
    `;

    await pool.query(SQL);
    console.log("Tables created");

    const hashedUsers = await hashPasswords(users);

  
    for (const user of hashedUsers) {
      await pool.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id",
        [user.username, user.email, user.password]
      );
    }

    await pool.query(`
      INSERT INTO users (username, email, password) VALUES
      ('testuser', 'test@example.com', '$2b$10$abc123hashedpassword');
    `);

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
