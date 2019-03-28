
const mongoose = require('mongoose')

// Import testfiles

const ERTest = require('./routes/test/eventrequestsTEST')
const OITest = require('./routes/test/orientationinvitationsTEST')
const adminTest = require('./routes/test/adminsTEST')
const memberTest = require('./routes/test/membersTEST')
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
const oiTests = new OITest(3000, '/orientationinvitations')
const adminTests = new adminTest(3000, '/admins')
const memberTests = new memberTest(3000, '/member')

// Calling tests
//describe('Event Requests Tests', () => {
  //Promise.all([
    //erTests.run(),
  //]).then(result => {})
//})
//describe('orientation invitation Tests', () => {
  //Promise.all([
    //oiTests.run(),
  //]).then(result => {})
//})
describe('admin Tests', () => {
  Promise.all([
    adminTests.run(),
  ]).then(result => {})
})
// describe('member Tests', () => {
//   Promise.all([
//     memberTests.run(),
//   ]).then(result => {})
// })

afterAll(async () => {
  await mongoose.disconnect();
})
