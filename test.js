
const mongoose = require('mongoose')

// import testfiles

const ERTest = require('./routes/test/eventrequestsTEST')

// ---== CONNECT TO MONGO ATLAS
//= =---------------------------------------------------= =//
const db = require('./config/keys').mongoURI

// Connect to mongo
mongoose
.connect(db,{ useNewUrlParser: true })

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
