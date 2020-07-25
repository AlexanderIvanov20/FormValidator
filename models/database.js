const mongoose = require('mongoose')

/**
 * ? Connect to database.
 */
const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/FormValidator', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
  } catch (e) { throw new Error(e) }
}

module.exports = { connectToDatabase }
