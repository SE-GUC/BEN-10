const express = require("express");
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const server = require("./config/config");
const jwt = require("jsonwebtoken");
const Member = require("./models/Member");
const nodemailer = require("nodemailer");
// Require Router Handlers
const eventrequests = require("./routes/api/eventrequests");
const projects = require("./routes/api/projects");
const orientationinvitations = require("./routes/api/orientationinvitations");
const partners = require("./routes/api/partners");
const admins = require("./routes/api/admins");

const applications = require("./routes/api/applications");
const consultancyagencys = require("./routes/api/consultancyagency");
const member = require("./routes/api/members");
const notification = require("./routes/api/notifications");
var blackList = []; //to be not deleted
const cors = require("cors");
const app = express();

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'))
  
    app.use('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
  }
  // DB Config
const db = require("./config/keys").mongoURI;

// Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// Init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());

// Entry point
app.get("/", (req, res) => res.send(`<h1>Lirten Hub </h1>`));

// Direct to Route Handlers
app.use("/api/eventrequests", eventrequests);
app.use("/api/projects", projects);
app.use("/api/admins", admins);
app.use("/api/events", require("./routes/api/events"));
app.use("/api/partners", partners);
app.use("/api/members",member);

app.use("/api/projects", projects);
app.use("/api/admins", admins);
app.use("/api/orientationinvitations", orientationinvitations);
app.use("/api/partners", partners);

app.use("/api/applications", applications);
app.use("/api/consultancyagency", consultancyagencys);
// app.use(
//   "/api/members",
//   verifyToken,
//   (req, res, next) => {
//     jwt.verify(req.token, "nada", (err, authData) => {
//       if (err || blackList.includes(req.token)) {
//         return res.status(403).send({
//           blackList: blackList.includes(req.token),
//           error: err.toString()
//         });
//       } else {
//         // res.json({authData})
//         next();
//       }
//     });
//   },
//   member
// );
app.use("/api/notifications", notification);
// as a user i want to login
app.put("/login", async (req, res) => {
  var flag = true;
  var allUsers = await Member.find();
  var user = allUsers.filter(u => u.email.toString() === req.body.email);
  if (user.length != 0) {
    user = user[0];
    if (user.password.toString() === req.body.password.toString()) {
      flag = false;
      const data = {
        id: user._id,
        type: "members"
      };
      jwt.sign({ data }, "nada", { expiresIn: "1200s" }, (err, token) => {
        res.json({ token });
      });
    } else {
      return res.status(400).send({ error: "password not correct" });
    }
  }
  //------- admin
  if (flag) {
    allUsers = await Admin.find();
    user = allUsers.filter(u => u.email.toString() === req.body.email);
    if (user.length != 0) {
      user = user[0];
      if (user.password.toString() === req.body.password.toString()) {
        flag = false;
        const data = {
          id: user._id,
          type: "admins"
        };
        jwt.sign({ data }, "nada", { expiresIn: "1200s" }, (err, token) => {
          res.json({ token });
        });
      } else {
        return res.status(400).send({ error: "password not correct" });
      }
    }
  }
  //-----
  //------ partner
  if (flag) {
    allUsers = await Partner.find();
    user = allUsers.filter(u => u.email.toString() === req.body.email);
    if (user.length != 0) {
      user = user[0];
      if (user.password.toString() === req.body.password.toString()) {
        flag = false;
        const data = {
          id: user._id,
          type: "admins"
        };
        jwt.sign({ data }, "nada", { expiresIn: "1200s" }, (err, token) => {
          res.json({ token });
          next();
        });
      } else {
        return res.status(400).send({ error: "password not correct" });
      }
    }
  }
  //-------
  //------- consultancy agency
  if (flag) {
    allUsers = await ConsultancyAgency.find();
    user = allUsers.filter(u => u.email.toString() === req.body.email);
    if (user.length == 0) {
      return res.status(404).send({ error: "email not correct" });
    } else {
      user = user[0];
      if (user.password.toString() === req.body.password.toString()) {
        flag = false;
        const data = {
          id: user._id,
          type: "admins"
        };
        jwt.sign({ data }, "nada", { expiresIn: "1200s" }, (err, token) => {
          res.json({ token });
        });
      } else {
        return res.status(400).send({ error: "password not correct" });
      }
    }
  }
  //-------------------
});
// as a user i want to logout
app.put("/logout", verifyToken, (req, res, next) => {
  jwt.verify(req.token, "nada", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      blackList.push(req.token);
      res.json("Out");
      next();
    }
  });
});
// i want to sign up
app.post("/signUp", async (req, res) => {
  var body = req.body;
  const name = body.type.substring(0,body.type.length-1)
  const token = jwt.sign({ id: -1 }, "nada", { expiresIn: "20s" });
  console.log(token);
  if (req.body.type.toString() === "members") {
    delete body.type;
    await fetch(`${server}/api/members`, {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token.toString()
      }
    })
      .then(res => res.json())
      .then(json => res.json(json))
      .catch(err => console.log("Error", err));
  } else if (req.body.type.toString() === "admins") {
    delete body.type;
    await fetch(`${server}/api/admins`, {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token.toString()
      }
    })
      .then(res => res.json())
      .then(json => res.json(json))
      .catch(err => console.log("Error", err));
  } else if (req.body.type.toString() === "consultancyagency") {
    delete body.type;
    await fetch(`${server}/api/consultancyagency`, {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token.toString()
      }
    })
      .then(res => res.json())
      .then(json => res.json(json))
      .catch(err => console.log("Error", err));
  } else if (req.body.type.toString() === "partners") {
    delete body.type;
    await fetch(`${server}/api/partners`, {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token.toString()
      }
    })
      .then(res => res.json())
      .then(json => res.json(json))
      .catch(err => console.log("Error", err));
  }
  const outPut = `<p>Congratulations you have subscribed to be a LirtenHub${name}</p>`

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: 'ahmedalaamanutd@gmail.com', // generated ethereal user
      pass: 'rememberme1115' // generated ethereal password
    }
  });
let mailOptions = {
    from: '"LirtenHub"', // sender address
    to: req.body.email.toString(), // list of receivers
    subject: "Registration Notification", // Subject line
    text: "", // plain text body
    html: outPut 
};
  // send mail with defined transport object
  transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
      console.log(error);
    }else{
      console.log("Message Sent!")
      console.log(info)
    }
  });
});

//-------------------- search ----------------------
app.get("/searchAdmins", async (req, res) => {
  return res.send({ data: await searchInAdmins(req.body.text.toLowerCase()) });
});
app.get("/searchMembers", async (req, res) => {
  return res.send({ data: await searchInMembers(req.body.text.toLowerCase()) });
});
app.get("/searchCAs", async (req, res) => {
  return res.send({ data: await searchInConsultancyAgency(req.body.text.toLowerCase()) });
});
app.get("/searchProjects", async (req, res) => {
  return res.send({ data: await searchInProjects(req.body.text.toLowerCase()) });
});
app.get("/searchEvents", async (req, res) => {
  return res.send({ data: await searchInEvents(req.body.text.toLowerCase()) });
});
app.get("/searchPartners", async (req, res) => {
  return res.send({ data: await searchInPartners  (req.body.text.toLowerCase()) });
});

async function searchInProjects(t) {
  var projects = await Project.find();
  projects = projects.filter(
    p =>
      p.description.toLowerCase().includes(t) ||
      p.category.toLowerCase().includes(t) ||
      p.lifeCycle.toLowerCase().includes(t) ||
      (p.estimatedEffort !== null &&
        p.estimatedEffort.toLowerCase().includes(t)) ||
      (p.estimatedTime !== null && p.estimatedTime.toLowerCase().includes(t)) ||
      (p.experienceLevelNeeded !== null &&
        p.experienceLevelNeeded.toLowerCase().includes(t)) ||
      (p.requiredSkillsSet !== null &&
        p.requiredSkillsSet
          .toString()
          .toLowerCase()
          .includes(t)) ||
      (p.finalDraft !== null && p.finalDraft.toLowerCase().includes(t)) ||
      (p.submittedProjectLink !== null &&
        p.submittedProjectLink.toLowerCase().includes(t))
  );
  return projects;
}
async function searchInPartners(t) {
  var partners = await Partner.find();
  partners = partners.filter(
    p =>
      p.firstName.toLowerCase().includes(t) ||
      p.lastName.toLowerCase().includes(t) ||
      p.SSN.toLowerCase().includes(t) ||
      p.birthDate
        .toString()
        .toLowerCase()
        .includes(t) ||
      p.nationality.toLowerCase().includes(t) ||
      p.country.toLowerCase().includes(t) ||
      p.city.toLowerCase().includes(t) ||
      p.area.toLowerCase().includes(t) ||
      p.email.toLowerCase().includes(t)
  );
  partners.map(p=> (delete p._doc.password));
  return partners;
}
async function searchInMembers(t) {
  var members = await Member.find();
  members = members.filter(
    p =>
      p.firstName.toLowerCase().includes(t) ||
      p.lastName.toLowerCase().includes(t) ||
      p.SSN.toLowerCase().includes(t) ||
      p.birthDate
        .toString()
        .toLowerCase()
        .includes(t) ||
      p.nationality.toLowerCase().includes(t) ||
      p.country.toLowerCase().includes(t) ||
      p.city.toLowerCase().includes(t) ||
      p.area.toLowerCase().includes(t) ||
      p.email.toLowerCase().includes(t) ||
      p.skillSet
        .toString()
        .toLowerCase()
        .includes(t)
  );
  members.map(p=> (delete p._doc.password));
  return members;
}
async function searchInConsultancyAgency(t) {
  var CAs = await ConsultancyAgency.find();
  CAs = CAs.filter(
    p =>
      p.name.toLowerCase().includes(t) ||
      p.about.toLowerCase().includes(t) ||
      p.email.toLowerCase().includes(t) ||
      p.location.toLowerCase().includes(t) ||
      p.reports
        .toString()
        .toLowerCase()
        .includes(t)
  );
  CAs.map(p=> (delete p._doc.password));
  return CAs;
}
async function searchInAdmins(t) {
  var admins = await Admin.find();
  admins = admins.filter(
    p =>
      p.firstName.toLowerCase().includes(t) ||
      p.lastName.toLowerCase().includes(t) ||
      p.SSN.toLowerCase().includes(t) ||
      p.birthDate
        .toString()
        .toLowerCase()
        .includes(t) ||
      p.nationality.toLowerCase().includes(t) ||
      p.country.toLowerCase().includes(t) ||
      p.city.toLowerCase().includes(t) ||
      p.area.toLowerCase().includes(t) ||
      p.email.toLowerCase().includes(t)
  ); 
  admins.map(p=> (delete p._doc.password));

  return admins;
}
async function searchInEvents(t) {
  var events = await Event.find();
  events = events.filter(
    p =>
      p.type.toLowerCase().includes(t) ||
      p.location.toLowerCase().includes(t) ||
      p.description.toLowerCase().includes(t) ||
      p.topics
        .toString()
        .toLowerCase()
        .includes(t) ||
      p.speaker.toLowerCase().includes(t) ||
      p.eventDate
        .toString()
        .toLowerCase()
        .includes(t)
  );
  return events;
}

//--------------------------------------------------

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.json({ error: "Not Logged In" });
  }
}
//---------------------------------- Mail

app.post("/send",(req,res)=>{ 
})
































//-----------------------------------------

app.use((req, res) =>
  res.status(404).send(`<h1>Can not find what you're looking for</h1>`)
);
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.use('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server on ${port}`));

async function createDB() {
  var body = {
    firstName: "karim",
    lastName: "el Gendy",
    SSN: "29808161200322",
    birthDate: "1996-11-23",
    gender: false,
    nationality: "Egyptian",
    maritalStatus: "single",
    drivingLicense: true,
    country: "Egypt",
    city: "cairo",
    area: "tagmoa'5",
    postalCode: "200",
    email: "karimelgendy96@gmail.com",
    password: "ahmadaaadt@200",
    mobileNumber: "01015161711",
    alternativeMobileNumber: "01069302421"
  };
  await fetch(`${server}/api/admins`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));

  body = {
    firstName: "omar",
    lastName: "khaled",
    SSN: "29808161200322",
    birthDate: "1998-08-25",
    gender: false,
    nationality: "Egyptian",
    maritalStatus: "Married",
    drivingLicense: true,
    country: "Egypt",
    city: "cairo",
    area: "Madinet Nasr",
    postalCode: "200",
    email: "omarkhaled98@hotmail.com",
    password: "ahmadaaadt@200",
    mobileNumber: "01004146158",
    alternativeMobileNumber: "01069302421"
  };
  await fetch(`${server}/api/admins`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  body = {
    firstName: "Nour",
    lastName: "Tamer",
    SSN: "29808161200322",
    birthDate: "1998-10-21",
    gender: true,
    nationality: "Egyptian",
    maritalStatus: "single",
    drivingLicense: false,
    country: "Egypt",
    city: "cairo",
    area: "Madinet Nasr",
    postalCode: "200",
    email: "nourtamerr98@gmail.com",
    password: "ahmadaaadt@200",
    mobileNumber: "01012090811",
    alternativeMobileNumber: "01069302421"
  };
  await fetch(`${server}/api/admins`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));

  // -----------------------------  Partners   -----------------

  body = {
    firstName: "Yasmine",
    lastName: "Walid",
    SSN: "29808161200322",
    birthDate: "1998-7-27",
    gender: true,
    nationality: "Egyptian",
    maritalStatus: "single",
    drivingLicense: true,
    country: "Egypt",
    city: "cairo",
    area: "tgmoa'5",
    postalCode: "200",
    email: "yassminewalid98@gmail.com",
    password: "ahmadaaadt@200",
    mobileNumber: "01065135311",
    alternativeMobileNumber: "01069302421"
  };
  await fetch(`${server}/api/partners`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  body = {
    firstName: "Ahmed",
    lastName: "Alaa",
    SSN: "29808161200322",
    birthDate: "1998-11-15",
    gender: false,
    nationality: "Egyptian",
    maritalStatus: "single",
    drivingLicense: true,
    country: "Egypt",
    city: "cairo",
    area: "Madinet Nasr",
    postalCode: "200",
    email: "ahmedalaamanutd@gmail.com",
    password: "ahmadaaadt@200",
    mobileNumber: "01066735368",
    alternativeMobileNumber: "01069302421"
  };
  await fetch(`${server}/api/partners`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  body = {
    firstName: "Nada",
    lastName: "EL Araby",
    SSN: "29808161200322",
    birthDate: "1997-12-27",
    gender: true,
    nationality: "Egyptian",
    maritalStatus: "single",
    drivingLicense: true,
    country: "Egypt",
    city: "cairo",
    area: "rehab",
    postalCode: "200",
    email: "nadaelarabyy@yahoo.com",
    password: "ahmadaaadt@200",
    mobileNumber: "01066118715	",
    alternativeMobileNumber: "01069302421"
  };
  await fetch(`${server}/api/partners`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));

  body = {
    name: "mariooma agency",
    about: "our company gives consultancy for startups of android consultancy",
    telephoneNumber: "01065538464",
    email: "mariam.bakhaty@hotmail.com",
    password: "mariooma@12345",
    location: "Egypt cairo tagmoa5",
    yearsOfExperience: 5,
    reports: [
      "Become a professional android app developer with Android 7 Nougat by building real apps! Submit your apps to Google Play and generate revenue with Google Pay and Google Ads.",
      "Learn Android development, Java programming, and Android studio from scratch! Create fun, engaging and real world Android apps using Java that you can show to the world. Learn how to work with APIs, web services and advanced databases and a lot more from your own desk.",
      "In this tutorial, we’ll show you how to implement this common use case in an Android application. The sample app we will build first asks the user if they are the driver or the passenger. If a user is a driver, their current location will be published to a channel, updated every 5 seconds (in this sample), or however many times your app requires."
    ]
  };

  //--------------------------------------- Members ----------------------
  body = {
    firstName: "ahmed",
    lastName: "abd-elaal",
    SSN: "29807311200322",
    birthDate: "1998-07-31",
    gender: false,
    nationality: "egyptian",
    maritalStatus: "single",
    drivingLicense: true,
    country: "Egypt",
    city: "cairo",
    area: "saida zeinb",
    postalCode: "200",
    email: "a7med_201196@yahoo.com",
    password: "pepsicola123@",
    mobileNumber: "01010101011",
    alternativeMobileNumber: "0102005145",
    skillSet: ["mernstack", "java", "python", "prolog"]
  };
  await fetch(`${server}/api/members`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  body = {
    firstName: "ahmed",
    lastName: "hisham",
    SSN: "29808161200322",
    birthDate: "1998-08-16",
    gender: false,
    nationality: "egyptian",
    maritalStatus: "single",
    drivingLicense: true,
    country: "Egypt",
    city: "cairo",
    area: "tagmoa'3",
    postalCode: "200",
    email: "ahmedhisham16898@gmail.com",
    password: "ahmadaaadt@200",
    mobileNumber: "01015161711",
    alternativeMobileNumber: "0102006146",
    skillSet: ["mernstack", "java", "python"]
  };
  await fetch(`${server}/api/members`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  body = {
    firstName: "nour",
    lastName: "tamer",
    SSN: "29804121200322",
    birthDate: "1998-04-12",
    gender: true,
    nationality: "egyptian",
    maritalStatus: "single",
    drivingLicense: true,
    country: "Egypt",
    city: "cairo",
    area: "nasr city",
    postalCode: "200",
    email: "nadaelaraby01@gmail.com",
    password: "nourzz@200",
    mobileNumber: "01012090811",
    alternativeMobileNumber: "01066171812",
    skillSet: ["MATLAB", "java", "python"]
  };
  await fetch(`${server}/api/members`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  body = {
    firstName: "ahmed",
    lastName: "samhar",
    SSN: "29810091200322",
    birthDate: "1998-10-09",
    gender: false,
    nationality: "egyptian",
    maritalStatus: "single",
    drivingLicense: true,
    country: "Egypt",
    city: "giza",
    area: "",
    postalCode: "200",
    email: "ahmedsamhar@gmail.com",
    password: "liverpool@200",
    mobileNumber: "01012090811",
    alternativeMobileNumber: "01066171812",
    skillSet: ["mernstack", "java", "python", "haskell", "prolog", "c#"]
  };
  await fetch(`${server}/api/members`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  //------------------------------------ Consultancy agency ----------------------------------
  body = {
    name: "abdo agency",
    about: "our company gives consultancy for startups of software development",
    telephoneNumber: "01125245265",
    email: "abdomo@live.com",
    password: "Abdo@2005",
    location: "Egypt cairo nasrcity pepsiCo company",
    yearsOfExperience: 2,
    reports: [
      "As a software engineer, I spend a lot of time reading and writing design documents. After having gone through hundreds of these docs, I’ve seen first hand a strong correlation between good design docs and the ultimate success of the project. This article is my attempt at describing what makes a design document great."
    ]
  };
  await fetch(`${server}/api/consultancyagency`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  body = {
    name: "radwaaat agency",
    about: "our company gives consultancy for startups of design and graphics",
    telephoneNumber: "01016643699",
    email: "radrag2009@gmail.com",
    password: "radwa@2005",
    location: "Egypt giza alharam",
    yearsOfExperience: 1,
    reports: [
      "This week, FastCoDesign asks designers to predict the major branding trends of 2017, Creative Boom pulls together 16 TedTalks for designers, Chris Do delivers a 30 minute tutorial on pricing design services, and Design Survival offers some advice on going freelance.",
      "This week, Allison Meier takes a look at Gerald Holtom’s original sketches for the peace symbol, Ilya Ruderman interviews Swiss Typefaces’ Ian Party and Emmanuel Rey, FastCoDesign looks at Pentagram’s brand identity work for Syracuse University, and Design Survival pulls together some advice for those looking to purchase design services."
    ]
  };
  await fetch(`${server}/api/consultancyagency`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  body = {
    name: "nihal agency",
    about: "our company gives consultancy for startups of artistic consultancy",
    telephoneNumber: "01090967609",
    email: "nonarashed98@gmail.com",
    password: "nihal@2005",
    location: "Egypt cairo tagmoa3",
    yearsOfExperience: 3,
    reports: [
      "Color plays a major part in the correct reflection of your brand. This visually obvious yet subtle application has a significant impact on the way a brand is perceived by the public. No matter if you’re designing a brand for yourself, a small company, or a corporation the effects of color will not discriminate based on how much cash you have to start. When looking at color options for your brand it’s always best to take a look at other brands to get a clear idea on how color schemes play a part on the perception of brand perception. A company with strong brand recognition, altering the color scheme where it is expected to be maintained can have dangerous results."
    ]
  };
  await fetch(`${server}/api/consultancyagency`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
}

async function submitAllProjects() {
  var body = {
    description:
      "We want a website to introduce the idea of free lancing to Egypt programmers and we intend to be international LirtenHub",
    category: "soft ware development",
    wantConsultancy: false
  };
  await fetch(`${server}/api/partners/5cae3044a972db1e007da3e7/addProject`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));

  body = {
    description:
      "We want a website to facilitate all the governmental paperwork through online transactions Summerge",
    category: "web development",
    wantConsultancy: true
  };
  await fetch(`${server}/api/partners/5cae3044a972db1e007da3e6/addProject`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  body = {
    description:
      "We want a website to help our children have a better educational life NebnyGuc:) ",
    category: "web app development",
    wantConsultancy: true
  };
  await fetch(`${server}/api/partners/5cae3044a972db1e007da3e5/addProject`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  body = {
    description: "We want a website to represent our nations MUN",
    category: "soft ware development",
    wantConsultancy: true
  };
  await fetch(`${server}/api/partners/5cae3044a972db1e007da3e7/addProject`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  body = {
    description: "We want a website to provide better debating experience TIQ",
    category: "soft ware development",
    wantConsultancy: false
  };
  await fetch(`${server}/api/partners/5cae3044a972db1e007da3e6/addProject`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  body = {
    description:
      "We want a website to provide a better gaming community Vector",
    category: "soft ware development",
    wantConsultancy: false
  };
  await fetch(`${server}/api/partners/5cae3044a972db1e007da3e5/addProject`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
}

async function adminDefineWithSetOfAttributes() {
  var body = {
    estimatedEffort: "Extreme",
    estimatedTime: "6 months",
    experienceLevelNeeded: "Advanced",
    requiredSkillsSet: ["mern stack"]
  };
  await fetch(
    `${server}/api/admins/5cae3042a972db1e007da3e2/assignAttributes/5cae5dbe9ef1de2600e06890`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  body = {
    estimatedEffort: "Hard",
    estimatedTime: "3 months",
    experienceLevelNeeded: "Novice",
    requiredSkillsSet: ["mern stack", "java"]
  };
  await fetch(
    `${server}/api/admins/5cae3042a972db1e007da3e2/assignAttributes/5cae5dbe9ef1de2600e06891`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  body = {
    estimatedEffort: "Easy",
    estimatedTime: "1 month",
    experienceLevelNeeded: "Novice",
    requiredSkillsSet: ["python"]
  };
  await fetch(
    `${server}/api/admins/5cae3042a972db1e007da3e2/assignAttributes/5cae5dbf9ef1de2600e06892`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  body = {
    estimatedEffort: "Easy",
    estimatedTime: "2 months",
    experienceLevelNeeded: "Fundamental Awareness",
    requiredSkillsSet: ["java", "swift"]
  };
  await fetch(
    `${server}/api/admins/5cae3042a972db1e007da3e2/assignAttributes/5cae5dbf9ef1de2600e06893`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  body = {
    estimatedEffort: "Normal",
    estimatedTime: "4 months",
    experienceLevelNeeded: "Intermediate",
    requiredSkillsSet: ["mern stack", "python"]
  };
  await fetch(
    `${server}/api/admins/5cae3042a972db1e007da3e2/assignAttributes/5cae5dbf9ef1de2600e06894`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  body = {
    estimatedEffort: "Extreme",
    estimatedTime: "6 months",
    experienceLevelNeeded: "Expert",
    requiredSkillsSet: ["mern stack", "prolog"]
  };
  await fetch(
    `${server}/api/admins/5cae3042a972db1e007da3e2/assignAttributes/5cae5dbf9ef1de2600e06895`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
}
async function adminsubmitsfinaldrafts() {
  body = {
    finalDraft: "This is the final draft for Vector"
  };
  await fetch(
    `${server}/api/admins/5cae3042a972db1e007da3e2/myProjects/5cae5dbf9ef1de2600e06895/sendDraft`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));

  body = {
    finalDraft: "This is the final draft for TIQ"
  };
  await fetch(
    `${server}/api/admins/5cae3042a972db1e007da3e2/myProjects/5cae5dbf9ef1de2600e06894/sendDraft`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  body = {
    finalDraft: "This is the final draft for LirtenHub"
  };
  await fetch(
    `${server}/api/admins/5cae3042a972db1e007da3e2/myProjects/5cae5dbe9ef1de2600e06890/sendDraft`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
}
async function approve2projects() {
  // approve lirten by nada
  var body = {};
  await fetch(
    `${server}/api/partners/5cae3044a972db1e007da3e7/myProjects/5cae5dbe9ef1de2600e06890/finaldraft/approve`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  //approve vector by yasmine
  await fetch(
    `${server}/api/partners/5cae3044a972db1e007da3e5/myProjects/5cae5dbf9ef1de2600e06895/finaldraft/approve`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  // disapprove TIQ by alaa
  await fetch(
    `${server}/api/partners/5cae3044a972db1e007da3e6/myProjects/5cae5dbf9ef1de2600e06894/finaldraft/disapprove`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
}
async function adminPost2projects() {
  // post lirten by nada
  var body = {};
  await fetch(
    `${server}/api/admins/5cae3042a972db1e007da3e2/postProject/5cae5dbe9ef1de2600e06890`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  //post vector by yasmine
  await fetch(
    `${server}/api/admins/5cae3042a972db1e007da3e2/postProject/5cae5dbf9ef1de2600e06895`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
}
async function consultancyAgencysApplyOnProjects() {
  var body = {};
  //radwa apply for summerge
  await fetch(
    `${server}/api/consultancyagency/5cae3045a972db1e007da3ec/caApplyProject/5cae5dbe9ef1de2600e06891`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  //nehal apply summerge
  await fetch(
    `${server}/api/consultancyagency/5cae3045a972db1e007da3ed/caApplyProject/5cae5dbe9ef1de2600e06891`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  //nehal apply MUN
  await fetch(
    `${server}/api/consultancyagency/5cae3045a972db1e007da3ed/caApplyProject/5cae5dbf9ef1de2600e06893`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  //radwa apply for Nebny GUC
  await fetch(
    `${server}/api/consultancyagency/5cae3045a972db1e007da3ec/caApplyProject/5cae5dbf9ef1de2600e06892`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  //abdo apply for Nebny GUC
  await fetch(
    `${server}/api/consultancyagency/5cae3044a972db1e007da3eb/caApplyProject/5cae5dbf9ef1de2600e06892`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
}
async function adminAssign2CasTo2Projects() {
  var body = {};
  //assign nehal to summerge
  await fetch(
    `${server}/api/admins/5cae3042a972db1e007da3e2/assignCA/5cae5dbe9ef1de2600e06891/to/5cae3045a972db1e007da3ed`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));

  //assign radwa to nebny Guc
  await fetch(
    `${server}/api/admins/5cae3042a972db1e007da3e2/assignCA/5cae5dbf9ef1de2600e06892/to/5cae3045a972db1e007da3ec`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
}
async function adminsubmitsfinaldraftsWithCa() {
  body = {
    finalDraft: "This is the final draft for Summerge"
  };
  await fetch(
    `${server}/api/admins/5cae3042a972db1e007da3e2/myProjects/5cae5dbe9ef1de2600e06891/sendDraft`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));

  body = {
    finalDraft: "This is the final draft for NebnyGuc"
  };
  await fetch(
    `${server}/api/admins/5cae3042a972db1e007da3e2/myProjects/5cae5dbf9ef1de2600e06892/sendDraft`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
}
async function approve2projectsWithCa() {
  // approve Summerge by alaa - nehal
  var body = {};
  await fetch(
    `${server}/api/consultancyagency/5cae3045a972db1e007da3ed/myProjects/5cae5dbe9ef1de2600e06891/finaldraft/approve`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  //approve nebnyGuc by yasmine - radwa
  await fetch(
    `${server}/api/consultancyagency/5cae3045a972db1e007da3ec/myProjects/5cae5dbf9ef1de2600e06892/finaldraft/approve`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
}

async function adminPostProjectWithCa() {
  // post summerge by alaa with CA Nehal
  var body = {};
  await fetch(
    `${server}/api/admins/5cae3042a972db1e007da3e2/postProject/5cae5dbe9ef1de2600e06891`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
}
async function membersApplyProjects() {
  var body = {};
  // ahmed apply for LirtenHub
  await fetch(
    `${server}/api/members/5cae4a1066fd564620992695/projects/5cae5dbe9ef1de2600e06890/apply`,
    {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));

  // Nour apply for LirtenHub
  await fetch(
    `${server}/api/members/5cae3044a972db1e007da3ea/projects/5cae5dbe9ef1de2600e06890/apply`,
    {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  // H apply for LirtenHub
  await fetch(
    `${server}/api/members/5cae3044a972db1e007da3e9/projects/5cae5dbe9ef1de2600e06890/apply`,
    {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));

  // H apply for summerge
  await fetch(
    `${server}/api/members/5cae3044a972db1e007da3e9/projects/5cae5dbe9ef1de2600e06891/apply`,
    {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  // Nour apply for summerge
  await fetch(
    `${server}/api/members/5cae3044a972db1e007da3ea/projects/5cae5dbe9ef1de2600e06891/apply`,
    {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));

  // Nour apply for Vector
  await fetch(
    `${server}/api/members/5cae3044a972db1e007da3ea/projects/5cae5dbf9ef1de2600e06895/apply`,
    {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));

  // ahmed apply for Vector
  await fetch(
    `${server}/api/members/5cae4a1066fd564620992695/projects/5cae5dbf9ef1de2600e06895/apply`,
    {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
}
async function assignMembers() {
  var body = {};
  // nehal assign H  to summerge
  await fetch(
    `${server}/api/consultancyagency/5cae3045a972db1e007da3ed/myProjects/5cae5dbe9ef1de2600e06891/applyingMembers/5cae3044a972db1e007da3e9/assign`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));

  // nada assign ahmed to summerge
  await fetch(
    `${server}/api/partners/5cae3044a972db1e007da3e7/myProjects/5cae5dbe9ef1de2600e06890/applyingMembers/5cae4a1066fd564620992695/assign`,
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
}
async function notifyAcceptedCandidates() {
  var body = {
    description: "Congratulations Monda you are accepted to Work with lirtenHub"
  };
  //admin notifiy ahmed
  await fetch(
    `${server}/api/admins/5cae3042a972db1e007da3e2/notifications/5cae4a1066fd564620992695`,
    {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  var body = {
    description: "Congratulations H you are accepted to Work with summerge"
  };
  //admin notifiy H
  await fetch(
    `${server}/api/admins/5cae3042a972db1e007da3e2/notifications/5cae3044a972db1e007da3e9`,
    {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  var body = {
    description:
      "We are very Sorry H you wont be able to work with us in LirtenHub if you want feedback we can provide you with it"
  };
  //admin notifiy rejected
  await fetch(
    `${server}/api/admins/5cae3042a972db1e007da3e2/projects/5cae5dbe9ef1de2600e06890/sendRejection`,
    {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log("Error", err));
}

// createDB();
// submitAllProjects();
// adminDefineWithSetOfAttributes();
// adminsubmitsfinaldrafts();
// approve2projects();
// adminPost2projects();
// consultancyAgencysApplyOnProjects();
// adminAssign2CasTo2Projects();
// adminsubmitsfinaldraftsWithCa();
// approve2projectsWithCa();
// adminPostProjectWithCa();
// membersApplyProjects();
// assignMembers();
// notifyAcceptedCandidates();
