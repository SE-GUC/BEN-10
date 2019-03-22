const dev = process.env.NODE_ENV !== 'production';

const server = dev ? 'http://localhost:14000' : 'https://lirtenhub.herokuapp.com/';
module.exports = server