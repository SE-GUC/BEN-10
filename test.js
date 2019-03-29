const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;


// Import testfiles

const ERTest = require("./routes/test/eventrequestsTEST");
const AdminTest = require("./routes/test/adminsTEST");
const CATest = require("./routes/test/consultancyagencysTEST");
const PaTest = require("./routes/test/partnersTEST");


beforeAll(async()=>{
  mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));
})



// Calling the test files
const erTests = new ERTest(3000, "/eventrequests");
const adTests = new AdminTest(3000, "/admins");
const caTests = new CATest(3000, "/consultancyagency");
const paTests = new PaTest(3000, "/partners");

// Calling tests
describe("Event Requests Tests", () => {
  Promise.all([erTests.run()]).then(result => {});
});

describe("Admins Tests", () => {
  Promise.all([adTests.run()]).then(result => {});
});

describe("CA Tests", () => {
  Promise.all([caTests.run()]).then(result => {});
});

describe("Partner Tests", () => {
  Promise.all([paTests.run()]).then(result => {});
});

afterAll(async () => {
  mongoose.disconnect();
});
