
const mongoose = require('mongoose')

// Import testfiles

const ERTest = require('./routes/test/eventrequestsTEST')
const MTest = require('./routes/test/membersTEST')

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
const memberTests = new MTest(3000, '/member')

// Calling tests
//describe('Event Requests Tests', () => {
 // Promise.all([
  //  erTests.run(),
  //]).then(result => {})
//})

//afterAll(async () => {
 // await mongoose.disconnect();
//})
// Calling member tests
describe('member Tests', () => {
  Promise.all([
    memberTests.run(),
  ]).then(result => {})
})

afterAll(async () => {
  await mongoose.disconnect();
})
