const { connect } = require('mongoose');

const connectDatabase = async () => {
  await connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => {
      console.log(`MongoDB connected: ${conn.connection.host}`);
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`);
      process.exit();
    });
}

module.exports = connectDatabase;
