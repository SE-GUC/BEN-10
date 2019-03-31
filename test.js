
const mongoose = require('mongoose')

// Import testfiles

const ERTest = require('./routes/test/eventrequestsTEST')
const ADTest = require('./routes/test/adminsTEST')
const PTest = require('./routes/test/partnersTEST')

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
const aTests = new ADTest(3000, '/admins')
const pTests = new PTest(3000, '/projects')

// Calling tests
// describe('Event Requests Tests', () => {
//   Promise.all([
//     erTests.run(),
//   ]).then(result => {})
// })


describe('admin Tests', () => {
  Promise.all([
    aTests.run(),
  ]).then(result => {})
})


describe('partner Tests', () => {
  Promise.all([
    pTests.run(),
  ]).then(result => {})
})
afterAll(async () => {
  await mongoose.disconnect();
})
