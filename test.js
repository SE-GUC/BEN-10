
const mongoose = require('mongoose')

// const UsersTest = require('./api/v1/tests/users')
const ERTest = require('./routes/test/eventrequestsTEST')

//= =---------------------------------------------------= =//
//= =--- CAPTURE ENVIRONMENT VARIABLES
//= =---------------------------------------------------= =//
// const {
//   PORT = 7000,
//   MONGO_DNS_SRV,
//   MONGO_AUTH,
//   MONGO_CLUSTER,
//   MONGO_DB_NAME,
//   MONGO_OPTIONS
// } = process.env
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
// ---== CONNECT TO MONGO ATLAS
//= =---------------------------------------------------= =//
const db = require('./config/keys').mongoURI

// Connect to mongo
mongoose
.connect(db,{ useNewUrlParser: true })
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
// ---== Setup before & after all tests run
//= =---------------------------------------------------= =//
// beforeAll(async () => {
//   await mongoose.connection.dropDatabase()
// })

// afterAll(async () => {
//   await mongoose.connection.dropDatabase()
// })
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
// ---== Core tests
//= =---------------------------------------------------= =//
const erTests = new ERTest(3000, '/eventrequests')
// const booksTests = new BooksTest(PORT, '/books')

describe('Let me first run the independent tests', () => {
  Promise.all([
    erTests.runIndependently(),
    // booksTests.runIndependently()
  ]).then(result => {
    describe('Now running the dependent tests', () => {
      Promise.all([
        erTests.runDependently().then(_ => {}),
        // booksTests.runDependently().then(_ => {})
      ]).then(result => {})
    })
  })
})
//= =---------------------------------------------------= =//
