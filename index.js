const express = require('express');
const path=require('path');
const mongoose = require('mongoose');

// Require Router Handlers
const eventrequests = require('./routes/api/eventrequests')
const projects = require('./routes/api/projects')
const orientationinvitations = require('./routes/api/orientationinvitations')
const partners = require('./routes/api/partners')
const admins = require('./routes/api/admins')

const applications = require('./routes/api/applications')
const consultancyagencys = require('./routes/api/consultancyagency')
const member = require('./routes/api/member')
const notification = require('./routes/api/notifications')




const app = express();

// DB Config
const db = require('./config/keys').mongoURI

// Connect to mongo
mongoose
.connect(db,{ useNewUrlParser: true })
.then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))


// Init middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Entry point
app.get('/', (req,res) => res.send(`<h1>Lirten Hub </h1>`))

// Direct to Route Handlers
app.use('/api/eventrequests', eventrequests)
app.use('/api/projects', projects);
app.use('/api/admins', admins);
app.use('/api/events',require('./routes/api/events'));
app.use('/api/partners', partners);

app.use('/api/projects', projects)
app.use('/api/admins', admins)
app.use('/api/orientationinvitations', orientationinvitations)
app.use('/api/partners', partners)

app.use('/api/applications', applications)
 
app.use('/api/consultancyagency',consultancyagencys)
app.use('/api/member',member)
app.use('/api/notifications',notification)




app.use((req,res) => res.status(404).send(`<h1>Can not find what you're looking for</h1>`))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server on ${port}`))