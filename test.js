
const mongoose = require('mongoose')
jest.setTimeout(30000);

// Import testfiles

const ERTest = require('./routes/test/eventrequestsTEST')
const PRTest = require('./routes/test/projectsTEST')
const CATest = require('./routes/test/consultancyagencysTEST')
const ATest = require('./routes/test/adminsTEST')
const MTest = require('./routes/test/membersTEST')
const PATest = require('./routes/test/partnersTEST')

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
const prTests = new PRTest(3000, '/projects')
const caTests = new CATest(3000, '/consultancyagency')
const aTests = new ATest(3000, '/admins')
const mTests = new MTest(3000, '/member')
const paTests = new PaTest(3000, '/partners')

 describe('Partner Requests Tests', () => {
   Promise.all([
     parTests.run(),
   ]).then(result => {})
 })

describe('Admin Requests Tests', () => {
  Promise.all([
    adminTests.run(),
  ]).then(result => {})
})

describe('Projects Tests', () => {
  Promise.all([
    prTests.run(),
    caTests.run(),
    aTests.run(),
    mTests.run(),
    paTests.run()
  ]).then(result => {})
})

afterAll(async () => {
  await mongoose.disconnect();
})
