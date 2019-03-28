
const mongoose = require('mongoose')
jest.setTimeout(30000);

// Import testfiles

const ERTest = require('./routes/test/eventrequestsTEST')
const PARTests = require('./routes/test/partnersTEST')

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
const parTests = new PARTests(3000, '/partners')


// Calling tests
// describe('Event Requests Tests', () => {
//   Promise.all([
//     erTests.run(),
//   ]).then(result => {})
// })

describe('Partner Requests Tests', () => {
  Promise.all([
    parTests.run(),
  ]).then(result => {})
})

afterAll(async () => {
  await mongoose.disconnect();
})
