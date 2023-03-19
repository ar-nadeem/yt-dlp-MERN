// Required Modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
// Routes
const ytRouter = require('./routes/yt');



const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// DB Connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})


// Initialize routes
app.use('/', ytRouter);



// Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});