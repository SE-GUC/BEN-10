
const mongoose = require('mongoose')

// Import testfiles

const ERTest = require('./routes/test/eventrequestsTEST')
const PTest = require('./routes/test/projectsTEST')

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
const pTests = new PTest(3000, '/Projects')

// Calling tests
describe('Projects Tests', () => {
  Promise.all([
    pTests.run(),
  ]).then(result => {})
})

afterAll(async () => {
  await mongoose.disconnect();
})
