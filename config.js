module.exports = {
  development: {
    port: 5000,
    dbPath: './convidados.db'
  },
  production: {
    port: process.env.PORT || 5000,
    dbPath: process.env.DB_PATH || './convidados.db'
  }
};
