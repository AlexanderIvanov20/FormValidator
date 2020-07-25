const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const User = sequelize.define('User', {
  number: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

// User.sync({ force: true, alter: true })
//   .then(() => {
//     console.log('The table for the User model was just (re)created!');
//   })
//   .catch((error) => {
//     console.log(`Error: ${error}`);
//   });

module.exports = User;
