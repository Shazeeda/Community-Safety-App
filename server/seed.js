const pool = require("./db");
const bcrypt = require("bcryptjs");

const users = [
  { email: "sara@example.com", password: "Sara123" },
  { email: "john@example.com", password: "John123" },
  { email: "jane@example.com", password: "Jane123" },
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
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id",
        [user.email, user.password]
      );
    }

    for (const incident of incidents) {
      await pool.query(
        "INSERT INTO incidents (user_id, description, location) VALUES ($1, $2, $3)",
        [incident.user_id, incident.description, incident.location]
      );
    }

    await pool.query(`
      INSERT INTO users (email, password) VALUES
      ('test@example.com', '$2b$10$abc123hashedpassword');
    `);

    console.log("Seeding complete!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    pool.end();
  }
}

seedDatabase();
