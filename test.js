
const mongoose = require('mongoose')

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
const erTests = new ERTest(3000, '/eventrequests')
const prTests = new PRTest(3000, '/projects')
const caTests = new CATest(3000, '/consultancyagency')
const aTests = new ATest(3000, '/admins')
const mTests = new MTest(3000, '/member')
const paTests = new PATest(3000, '/partners')

// Calling tests
describe('Projects Tests', () => {
  Promise.all([
    caTests.run(),
  ]).then(result => {})
})

afterAll(async () => {
  await mongoose.disconnect();
})
