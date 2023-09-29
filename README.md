# Archery Fullstack Project
This project began life as my final project for the Boolean UK Fullstack Software Development bootcamp that I undertook from February to September 2023. Initially tackled over two weeks, but with the intention to continue working on it going forwards and using it as a platform to implement new methods, libraries and tools as I continue my independent learning.
This app is very much a work in progress, with the foundations of a sound back-end API and database in place, with robust user authentication, with a front end that is intended to be functional if not pretty! Many features are not yet implemented on the front end, however the back end routes and database are in place.
In the coming weeks and months this project will continue to evolve, as new features are implemented, different layouts are tested, and an overarching design will be implemented.
# Project Background
Archery is a sport I've been heavily involved with since the late 1990s, and I have used and fought with just about every app and website there is. More than two decades after I started the sport I am yet to find a single app that I have liked, or that delivers all of the features I've looked for.
There are three main issues which I have seen consistently throughout the years.
 - Complexity - Apps are either too shallow for competitive archers or too complex for casual archers.
 - Features - Most apps contain a small number of features, resulting in archers often needing to use multiple apps or settle for one that doesn't offer everything they ideally would like.
 - Usability - Interfaces that are unintuitive, require the user to dig through multiple menus, or read lengthy instructions explaining how to use certain features.

My aim with this project is to end up with an app that addresses these issues.
# Features Overview
Based on my own experience, and having spoken to a wide range of archers of all standards, the intended feature set of the project is as follows:

**Round Scoring**
Users will be able to record their scores as they shoot a round, selecting from a large number of standard rounds, a custom round of their own creation, or a freeform practice session.
They will have the ability to score by simply entering their arrow values, or by placing arrows on a virtual target. The latter method will provide instant feedback on their group size and location, allowing them to respond accordingly.

**Data Tracking**
Users can view data on their scoring history, enabling them to view their progression over time and identify trends within their shooting and how different factors effect their scores.

**Archers Handicap**
Every user will have a Handicap generated based on the official Archery GB Handicap tables. Their handicap is effectively a rating that reflects their ability level. Every score they shoot is given a handicap value, and these values are then used to calculate the users overall handicap. This will be used behind the scenes within a few other features.

**Social**
Curating a list of friends within the app will enable users to share scores, compare results and compete against other archers with ease.

**Simulated Competitions**
Any round may be shot as a simulated competition. In this mode a competitors score will be revealed as a user progresses through their own round, enabling users to compare themselves to others and practice the mental side of competing.
Users will be able to shoot against scores shared with them by their friends, or a random score chosen from a user with a similar handicap. If no such score is available the system will randomly generate a suitble score for them to compete against

**Leagues**
A robust league system will be in place, that will enable any user to create a league with their own custom rules and open it up to the community or privately invite their friends. They will be able to customise the number of rounds, permitted bow types, round types, number of scores required, and whether it is an open competition or if users handicaps will be used to enable archers of varying standards to compete on a level playing field.
# Tech Stack
**Front End**
 - React
 - React-Router
 - Vite
 - Auth0
 - Chakra-UI
 - Formik
 
 **Back End**
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - CORS
  - Auth0
  - Helmet
 
 **Documentation**
  - Swagger
  - YAML
