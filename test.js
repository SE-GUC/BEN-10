const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;

// Import testfiles

const ERTest = require('./routes/test/eventrequestsTEST')
const ApTest = require('./routes/test/applicationsTEST')
const PRTest = require('./routes/test/projectsTEST')
const CATest = require('./routes/test/consultancyagencysTEST')
const ATest = require('./routes/test/adminsTEST')
const MTest = require('./routes/test/membersTEST')
const PaTest = require('./routes/test/partnersTEST')


beforeAll(async()=>{
  mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));
})



// Calling the test files
const erTests = new ERTest(3000, '/eventrequests')
const apTests = new ApTest(3000, '/applications')
const prTests = new PRTest(3000, '/projects')
const caTests = new CATest(3000, '/consultancyagency')
const aTests = new ATest(3000, '/admins')
const mTests = new MTest(3000, '/member')
const paTests = new PaTest(3000, '/partners')

// Calling tests
describe("Event Requests Tests", () => {
  Promise.all([erTests.run()]).then(result => {});
});

describe("Admins Tests", () => {
  Promise.all([aTests.run()]).then(result => {});
});



describe("Partner Tests", () => {
  Promise.all([paTests.run()]).then(result => {});
});

describe('Applications Tests', () => {
  Promise.all([
    apTests.run(),
  ]).then(result => {})
})

describe('Consultancy Agencys Tests', () => {
  Promise.all([
    caTests.run(),
  ]).then(result => {})
})



describe('Projects Tests', () => {
  Promise.all([
    mTests.run(),
    prTests.run(),
  ]).then(result => {})
})

afterAll(async () => {
  mongoose.disconnect();
});
