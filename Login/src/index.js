const express = require("express");
const path = require("path");
const collection = require("./config");
const bcrypt = require('bcrypt');

const app = express();
// convert data into json format
app.use(express.json());
// Static file
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
//use EJS as the view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

// Register User
app.post("/signup", async (req, res) => {

    const data = {
        name: req.body.username,
        password: req.body.password
    }

    // Check if the username already exists in the database
    const existingUser = await collection.findOne({ name: data.name });

    if (existingUser) {
        res.send('User already exists. Please choose a different username.');
    } else {
        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // Replace the original password with the hashed one

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }

});

// Login user 
// Login user 
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the request is for guest login
        if (username === 'guest' && password === 'guestpassword') {
            // Render the home page or perform any other action for the guest user
            return res.render("home");
        }

        // For regular user login, proceed with checking credentials in the database
        const check = await collection.findOne({ name: username });
        if (!check) {
            return res.send("User not found");
        }

        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(password, check.password);
        if (!isPasswordMatch) {
            return res.send("Incorrect password");
        }

        // Redirect or render the home page upon successful login
        res.render("home");
    }
    catch (error) {
        console.error(error);
        res.send("An error occurred");
    }
});



// Define Port for Application
const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});