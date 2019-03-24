//= =---------------------------------------------------= =//
//= =--- LICENSE
//= =---------------------------------------------------= =//
// Copyright 2019 Omar Sherif Fathy
//
// Permission is hereby granted, free of charge,
// to any person obtaining a copy of this software and
// associated documentation files (the "Software"),
// to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify,
// merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom
// the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice
// shall be included in all copies or substantial portions
// of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY
// OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
// EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
// FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
// AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
//= =--- DESCRIPTION
//= =---------------------------------------------------= =//
// This file (test.js)
// only sets the proper configurations for testing purposes
//
// it also defines the actions made before and after
// all the tests finish
//= =---------------------------------------------------= =//

// require('dotenv').config()
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
