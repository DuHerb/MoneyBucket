# <p align="center">Money Bucket</p>
An envelope style savings PWA.  Visualize how much of your funds are allocated towards monthly expenses, budgets, or savings goals.

#### Author: Dustin Herboldshimer
#### Version: 0.0.1 July 29, 2019

#### Live Demo @ <a href="https://duherb.github.io/MoneyBucket">MoneyBucket on gh-pages</a>

##### Bug Alert: currently, after launching demo, signin page only shows up after <em>clicking the the '$' avatar in the top left.</em>. You will be redirected to the landing page where you can sign up/log in.


#### Premise:
Money buckets keeps track of desposits via 'buckets', seperate units that represent a savings goal... a bill, multiple bills, a pair of shoes, vacation fund...any dollar amount labeled for a desired use.

Imagine that these buckets are stacked, one on top of the next.  A deposit is 'poured' into the top bucket and once it's filled (or when specific conditions have been met) left over funds 'flow' into the bucket below it, and so on.

Any number of buckets can be created, re-ordered, emptied out or poured into other buckets.  Once a bucket is filled up, it no longer accepts funds and passes everything down to the next bucket until it has been emptied or removed from the stack.

#### Stack:
- React/Redux
- Google Firestore
- Material UI

#### Design Documents
<div align='center'>
  <img src="/dev/mbWire2.png" height="250" style="border: 1px solid grey; margin: 0 auto">
  <img src="/dev/mbWire1.png" height="250" style="border: 1px solid grey; margin: 0 auto">
  <img src="/dev/mbTree.png" height="250" style="border: 1px solid grey; margin: 0 auto">
</div>

Using a mobile first design approach, I've sketched out a wire frame and component tree to outline to help me visualize the major components I will need and how they might interact with state.  The wireframe also provides a user story for me to follow --- drawing each component, view, button, and menu, helps develop a roadmap of the users experience.  My goal is to confront and consider as many design issues before as possible before any code is written.

## Create-React-App

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.



### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app


### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

#### License
Mozilla Public License 2.0

#### CopyRight&copy; Dustin Herboldshimer @ Shimer.Dev 2019
