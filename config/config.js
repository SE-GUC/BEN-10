const dev = process.env.NODE_ENV !== 'production';

const server = dev ? 'http://localhost:31000' : 'https://lirtenhub.herokuapp.com/';
module.exports = server