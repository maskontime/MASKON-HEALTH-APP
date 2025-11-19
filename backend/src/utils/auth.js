const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// Hash Password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Compare Password
const comparePassword = async (enteredPassword, hashedPassword) => {
    return await bcrypt.compare(enteredPassword, hashedPassword);
};

// Generate Random Token
const generateRandomToken = () => {
    return crypto.randomBytes(20).toString('hex');
};

// Format Response
const formatResponse = (success, data = null, error = null) => {
    return {
        success,
        ...(data && { data }),
        ...(error && { error })
    };
};

module.exports = {
    generateToken,
    hashPassword,
    comparePassword,
    generateRandomToken,
    formatResponse
};