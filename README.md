# Unified Auth

## Description / Short story

A full stack web application for authenticating users through (Google, Twitter, and Username & Password). I used Passport middleware for getting third party’s data (Google, Twitter, etc.) with the assistance of Jsonwebtoken to not rely on sessions, but on token-based authentication when the user refreshes the page. So, my approach was that once the user is authenticated, he receives a refresh token that lasts for 24 hours that is saved in a cookie and on the front-end there is an Async request every refresh that asks for an access token and it is only allowed to have it if the client has the valid refresh token then the client receives an access token that lasts for 15 minutes.

## Preview

## How To Install

### 1. Clone the project

```bash
git clone https://github.com/alimr70/unified-auth.git

cd unified-auth

npm install

cd client & npm install

cd ../
```

### 2. Obtain OAuth 2.0 credentials from the Google API Console and Twitter Developer Portal.

Visit the [Google API Console](https://console.developers.google.com/) to obtain OAuth 2.0 credentials such as a client ID and client secret that are known to both Google and your application.

### Don't forget to put the callback link in Google cloud platform:

- From the sidemenu click on Credentials
- Under "OAuth 2.0 Client IDs" click on your project name
- Under "Authorized redirect URIs" > "URIs" write this uri "http://localhost:8080/auth/google/callback" then click on "ADD URI".

Visit the [Twitter Developer Portal](https://developer.twitter.com/) and do the same.

### Don't forget to put the callback link in Twitter Developer Portal:

- From the sidemenu click on your project name under "Projects and Apps" menu
- Scroll to "Authentication settings" and click on "Edit"
- Under "Authentication settings" > click on "Add another" write this uri "http://localhost:8080/auth/twitter/callback" then scroll to bottom and click "Save".

Don't store your client secret in your React app. You should store client secret in node app.

### 3. Client Side Setup

1. In the root of the client folder create a new file and name it ".env.local"

2. open `.env.local` file add

```bash
REACT_APP_API_URL = http://localhost:8080
```

### 4. Server Side Environment Variables Setup

In the config folder of the server create a new file and name it "dev.env"

Now open the dev.env file and add the following:

```bash
PORT=8080
MONGO_URI=Your mongo db uri
GOOGLE_CLIENT_ID=value from google apis
GOOGLE_CLIENT_SECRET=value from google apis
CLIENT_URL = http://localhost:3000/
TWITTER_CONSUMER_KEY = value from twitter developer portal
TWITTER_CONSUMER_SECRET = value from twitter developer portal
SECRET = Write your jsonwebtoken secret
```

### 5. Run 'dev' script

```bash
npm run dev
```

<hr>

## If you want to try it live, [here](https://unified-auth.herokuapp.com/).

<hr>

## Contributing

Please help me with the documentation and code improvment. I appreciate that.
