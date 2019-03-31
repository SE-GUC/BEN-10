const mongoose = require("mongoose");

// Import testfiles

const ERTest = require("./routes/test/eventrequestsTEST");
const NTest = require("./routes/test/notificationsTEST");
const ATest = require("./routes/test/adminsTEST");
const MTest = require("./routes/test/membersTEST");
// Connect to mongo atlas
const db = require("./config/keys").mongoURI;

// Connect to mongo
mongoose.connect(db, { useNewUrlParser: true });

beforeAll(async () => {
  jest.setTimeout(30000);
  mongoose.Promise = Promise;
  await mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));
});

// Calling the test files
const erTests = new ERTest(3000, "/eventrequests");
const nTests = new NTest(3000, "/notifications");
const aTests = new ATest(3000, "/admins");
const mTests = new MTest(3000, "/member");

// Calling tests
describe("Event Request Tests", () => {
  Promise.all([erTests.run()]).then(result => {});
});
describe("Notifications Tests", () => {
  Promise.all([nTests.run()]).then(result => {});
});
describe("Admins Tests", () => {
  Promise.all([aTests.run()]).then(result => {});
});
describe("Member Tests", () => {
  Promise.all([mTests.run()]).then(result => {});
});

afterAll(async () => {
  await mongoose.disconnect();
});
