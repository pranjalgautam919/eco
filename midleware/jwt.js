
// const jwt = require('jsonwebtoken');
// const config = require('../config/config');

// const generateToken = (user) => {
//   const payload = {
//     _id: user._id,
//     name: user.name,
//     email: user.email
//   };
//   return jwt.sign(payload, config.jwt.secretKey, {
//     expiresIn: config.jwt.expiresIn
//   });
// };

// const verifyToken = (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) {
//     return res.status(401).send({ message: 'Access denied. No token provided.' });
//   }
//   try {
//     const decoded = jwt.verify(token, config.jwt.secretKey);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(400).send({ message: 'Invalid token.' });
//   }
// };

// const authenticate = (req, res, next) => {
//   verifyToken(req, res, next);
// };

// module.exports = {
//   generateToken,
//   verifyToken,
//   authenticate
// };

// const jwt = require('jsonwebtoken');
// const config = require('../config/config');

// const extractToken = (req) => {
//   const authHeader = req.header('Authorization');
//   if (!authHeader) {
//     return null;
//   }
//   const token = authHeader.split(' ')[1];
//   return token;
// };

// const verifyToken = (req, res, next) => {
//   const token = extractToken(req);
//   if (!token) {
//     return res.status(401).send({ message: 'Access denied. No token provided.' });
//   }
//   try {
//     const decoded = jwt.verify(token, config.jwt.secretKey);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     if (err.name === 'TokenExpiredError') {
//       return res.status(401).send({ message: 'Token has expired.' });
//     }
//     return res.status(400).send({ message: 'Invalid token.' });
//   }
// };

// const authenticate = (req, res, next) => {
//   verifyToken(req, res, next);
// };

// module.exports = {
//   generateToken: (user) => {
//     const payload = {
//       _id: user._id,
//       name: user.name,
//       email: user.email
//     };
//     return jwt.sign(payload, config.jwt.secretKey, {
//       expiresIn: config.jwt.expiresIn
//     });
//   },
//   verifyToken,
//   authenticate
// };

const jwt = require('jsonwebtoken');
const config = require('../config/config');

const extractToken = (req) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  return token;
};

const verifyToken = (req, res, next) => {
  const token = extractToken(req);
  if (!token) {
    return res.status(401).send({ message: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, config.jwt.secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).send({ message: 'Token has expired.' });
    }
    return res.status(400).send({ message: 'Invalid token.' });
  }
};

const authenticate = (req, res, next) => {
  verifyToken(req, res, next);
};

const authorize = (roles = []) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      return res.status(403).send({ message: 'Forbidden. Insufficient permissions.' });
    }
    next();
  };
};

module.exports = {
  generateToken: (user) => {
    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email
    };
    return jwt.sign(payload, config.jwt.secretKey, {
      expiresIn: config.jwt.expiresIn
    });
  },
  verifyToken,
  authenticate,
  authorize
};