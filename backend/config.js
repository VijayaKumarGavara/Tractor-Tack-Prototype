// Example correct config structure
export default {
  db: {
    host: "localhost", // NOT hostname
    port: 3306,
    user: "root",
    password: "vijay@2004", // Enter your actual password here
    database: "tractor_track_prototype",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 60000, // NOT connectionTimeout
  },
};
