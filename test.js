
const mongoose = require('mongoose')

// Import testfiles
const EventTest=require('./routes/test/eventsTEST');

const ERTest = require('./routes/test/eventrequestsTEST')

// Connect to mongo atlas
const db = require('./config/keys').mongoURI

// Connect to mongo
mongoose
.connect(db,{ useNewUrlParser: true })

beforeAll(async () => {
  mongoose.Promise = Promise;
  await mongoose.connect(db,{ useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))
})


// Calling the test files
const erTests = new ERTest(3000, '/eventrequests')
const eTests = new EventTest(3000,'/events')

// Calling tests
describe('Event Requests Tests', () => {
  Promise.all([
    erTests.run(),
  ]).then(result => {})
})


describe('Event Tests', () => {
  Promise.all([
    eTests.run(),
  ]).then(result => {})
})

afterAll(async () => {
  await mongoose.disconnect();
})
