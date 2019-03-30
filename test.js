
const mongoose = require('mongoose')

// Import testfiles

const ERTest = require('./routes/test/eventrequestsTEST')

const CATest = require('./routes/test/consultancyagencysTEST')
const PARTNERTest = require('./routes/test/partnersTEST')
const ADMINTest = require('./routes/test/adminsTEST')
const MEMTest = require('./routes/test/membersTEST')

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
const caTests = new CATest(3000, '/consultancyagency')
const partnerTests = new PARTNERTest(3000, '/partners')
const adminTests = new ADMINTest(3000, '/admins')
const memTests = new MEMTest(3000, '/member')


// Calling tests
// describe('Event Requests Tests', () => {
//   Promise.all([
//     erTests.run(),
//   ]).then(result => {})
// })
describe('Consultancy Agency Tests', () => {
  Promise.all([
    caTests.run(),
  ]).then(result => {})
})
describe('Partner Tests', () => {
  Promise.all([
    partnerTests.run(),
  ]).then(result => {})
})
describe('Admin Tests', () => {
  Promise.all([
    adminTests.run(),
  ]).then(result => {})
})
describe('member Tests', () => {
  Promise.all([
    memTests.run(),
  ]).then(result => {})
})

afterAll(async () => {
  await mongoose.disconnect();
})
