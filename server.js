// Define main constants
const express = require("express");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const { googleConfig, twitterConfig } = require("./config/passport");

// Routes
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");

// Load .env configs
dotenv.config({ path: path.join(__dirname, "./config/dev.env") });

// Initialize DB connections
connectDB();

// Intialize Express App
const app = express();

// Cookie parser
app.use(cookieParser());

// Sessions
/**
 * Important notes when working with cookie sessions
 * proxy: is important when deploying to Heroku
 * cookie: {secure, sameSite} are important to work with Chrome Browser
 */
// const cookieConfig = { secure: true, sameSite: 'none', domain: process.env.COOKIE_DOMAIN }
app.use(
  session({
    proxy: true,
    // cookie: process.env.APP_STATE !== "development" ? cookieConfig : {},
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((token, done) => {
  done(null, token);
});

passport.deserializeUser((token, done) => {
  const payload = jwt.verify(token, process.env.SECRET);
  User.findOne({ id: payload.id }, (err, user) => {
    done(err, token);
  });
});

// Passport config
googleConfig(passport);
twitterConfig(passport);

// Use cors library to prevent "cross origin resource sharing" problems
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// Read body of requests "previously you needed body-parser liberary"
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

// Use routes
app.use("/auth", authRoutes);
// app.use("/", indexRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.use("/static", express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Initialize server
const PORT = process.env.PORT || 8080;

app.listen(
  PORT,
  console.log(`===> Server initialized successfuly on Port ${PORT}`)
);
