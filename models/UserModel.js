// // // user.model.js
// // const mongoose = require('mongoose');
// // const bcrypt = require('bcrypt');

// // const userSchema = new mongoose.Schema({
// //   name: {
// //     type: String,
// //     required: true
// //   },
// //   email: {
// //     type: String,
// //     required: true,
// //     unique: true
// //   },
// //   password: {
// //     type: String,
// //     required: true
// //   },
// //   role: {
// //     type: String,
// //     enum: ['admin', 'user'],
// //     default: 'user'
// //   }
// // });

// // userSchema.pre('save', async function(next) {
// //   if (this.isNew || this.isModified('password')) {
// //     const salt = await bcrypt.genSalt();
// //     this.password = await bcrypt.hash(this.password, salt);
// //   }
// //   next();
// // });

// // userSchema.methods.comparePassword = async function(password) {
// //   return await bcrypt.compare(password, this.password);
// // };

// // const User = mongoose.model('User', userSchema);

// // module.exports = User;

// // user.model.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     validate: {
//       validator: (name) => {
//         const nameRegex = /^[a-zA-Z ]{2,}$/;
//         return nameRegex.test(name);
//       },
//       message: 'Invalid name format',
//     },
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     validate: {
//       validator: (email) => {
//         const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//         return emailRegex.test(email);
//       },
//       message: 'Invalid email format',
//     },
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     enum: ['admin', 'user'],
//     default: 'user'
//   }
// }, {
//   timestamps: true
// });

// userSchema.pre('save', async function(next) {
//   if (this.isNew || this.isModified('password')) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//   }
//   next();
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (name) => {
        const nameRegex = /^[a-zA-Z ]{2,}$/;
        return nameRegex.test(name);
      },
      message: 'Invalid name format',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
      },
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;