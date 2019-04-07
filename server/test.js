const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;

// Import testfiles
const EventTest=require('./routes/test/eventsTEST');



beforeAll(async () => {
  jest.setTimeout(30000);
  mongoose.Promise = Promise;
  await mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));
});

const NTest = require("./routes/test/notificationsTEST");
const ERTest = require('./routes/test/eventrequestsTEST')
const OITest = require('./routes/test/orientationinvitationsTEST')
const ApTest = require('./routes/test/applicationsTEST')
const PRTest = require('./routes/test/projectsTEST')
const CATest = require('./routes/test/consultancyagencysTEST')
const ATest = require('./routes/test/adminsTEST')
const MTest = require('./routes/test/membersTEST')
const PaTest = require('./routes/test/partnersTEST')


// Calling the test files
const nTests = new NTest(5000, "/notifications");
const eTests = new EventTest(5000,'/events')
const erTests = new ERTest(5000, '/eventrequests')
const oiTests = new OITest(5000, '/orientationinvitations')
const apTests = new ApTest(5000, '/applications')
const prTests = new PRTest(5000, '/projects')
const caTests = new CATest(5000, '/consultancyagency')
const aTests = new ATest(5000, '/admins')
const mTests = new MTest(5000, '/member')
const paTests = new PaTest(5000, '/partners')

// Calling tests
describe("Event Requests Tests", () => {
  Promise.all([erTests.run()]).then(result => {});
});

describe("Notifications Tests", () => {
  Promise.all([nTests.run()]).then(result => {});
});  
  
describe("Admins Tests", () => {
  Promise.all([aTests.run()]).then(result => {});
});


describe('Event Tests', () => {
  Promise.all([
    eTests.run(),
    ]).then(result => {})
})

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
    prTests.run(),
  ]).then(result => {})
})

describe('Member Tests', () => {
  Promise.all([
    mTests.run(),
  ]).then(result => {})
})
describe('orientation invitation Tests', () => {
  Promise.all([
    oiTests.run(),
  ]).then(result => {})
})



afterAll(async () => {
  mongoose.disconnect();
});
