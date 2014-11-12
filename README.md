# endevr

> A recruiting platform designed to simplify the hiring process for developers, recruiters, and technology companies.

## Team
  - __Development Team Members__: Adam Back, Josh Lankford, Justin Pinili, Jeff Gladchun
  
## Table of Contents

## Requirements

- Node 0.10.x
- Postgresql
- Express
- Ionic


## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

From within the /app directory:

```sh
npm install
bower install
cordova plugin add org.apache.cordova.inappbrowser
cordova plugin add org.apache.cordova.splashscreen
ionic platform rm ios
ionic platform rm android
ionic platform add ios
ionic platform add android
```
### Getting Started
- This is an angular webapp powered by the Ionic / PhoneGap / Cordova.

###Testing
To run Karma unit tests you might need to instal karma globally on your computer
```
npm install karma-jasmine -g
```
Then, from the app/www directory, run the tests:
```
karma start
```
To see reports open specRunner.html (pass/fail) in test/reports and index.html (coverage) in test/reports/coverage

If you add tests to a directory other than tests/ be sure to add that directory to the karma.conf.js file in app/www/.

### Known Bugs
