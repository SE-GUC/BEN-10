const dev = process.env.NODE_ENV !== 'production';

const server = dev ? 'http://localhost:5000' : 'https://lirtenben.herokuapp.com';
module.exports = server