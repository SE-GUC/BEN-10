const dev = process.env.NODE_ENV !== 'production';

const port = dev ? '8000' : process.env.PORT;
module.exports = port