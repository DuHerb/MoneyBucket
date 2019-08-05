# <p align="center">Money Bucket</p>
An envelope style savings web app.  Visualize how much of your funds are allocated towards monthly expenses, budgets, or savings goals.

#### Author: Dustin Herboldshimer
#### Version: 0.0.1 July 29, 2019

#### Live Demo @ <a href="https://duherb.github.io/MoneyBucket">MoneyBucket on gh-pages</a> (best viewed in mobile/tablet sized window)

##### Bug Alert: currently, after launching demo, signin page only shows up after <em>clicking the the '$' avatar in the top left.</em>. You will be redirected to the landing page where you can sign up/log in.


#### Premise:
Money buckets keeps track of desposits via 'buckets', seperate units that represent a savings goal... a bill, multiple bills, a pair of shoes, vacation fund...any dollar amount labeled for a desired use.

Imagine that these buckets are stacked, one on top of the next.  A deposit is 'poured' into the top bucket and once it's filled (or when specific conditions have been met) left over funds 'flow' into the bucket below it, and so on.

Any number of buckets can be created, re-ordered, emptied out or poured into other buckets.  Once a bucket is filled up, it no longer accepts funds and passes everything down to the next bucket until it has been emptied or removed from the stack.

#### Stack:
- React/Redux
- Google Firestore
- Material UI

### Design Documents
<div align='center'>
  <img src="/dev/mbWire2.png" height="250" style="border: 1px solid grey; margin: 0 auto">
  <img src="/dev/mbWire1.png" height="250" style="border: 1px solid grey; margin: 0 auto">
  <img src="/dev/mbTree.png" height="250" style="border: 1px solid grey; margin: 0 auto">
</div>

Using a mobile first design approach, I've sketched out a wire frame and component tree to outline to help me visualize the major components I will need and how they might interact with state.  The wireframe also provides a user story for me to follow --- drawing each component, view, button, and menu, helps develop a roadmap of the users experience.  My goal is to confront and consider as many design issues before as possible before any code is written.

### App Tour
The MoneyBucket Demo build features full user authentication via email/password.  All paths are route guarded add the menu is inaccessable until user has registered or signed in.

<div align='center'>
  <img src="/dev/mb-landing.png" width='90%' style="border: 1px solid grey; margin: 0 auto">
  <img src="/dev/mb-signup.png" width='90%' style="border: 1px solid grey; margin: 0 auto">
</div><hr>

After logging in, user initials are now displayed in the avatar, and user has access to the actions that are toggled by the menu.  The actions will change depending on the view.
<div align='center'>
  <img src="/dev/mb-userhome.png" width='90%' style="border: 1px solid grey; margin: 0 auto">
</div><hr>
Buckets are created through the New Bucket action. The form contains field for all options that will control how the bucket handles input and passes output to the next bucket.  The form is also dynamic as fields change according to the radio buttons selected.

<div align='center'>
  <img src="/dev/mb-newBucket.png" width='90%' style="border: 1px solid grey; margin: 0 auto">
</div><hr>

After a bucket is created, it is added to the users BucketList, a virtual stack.  newest buckets are automatically sorted to the bottom of the list.  However, one of the main features is a drag and drop ui that allows the user to re-order buckets according to their priority in the sort. These changes persist as thier indexes are re-written after every sort.

<div align='center'>
  <img src="/dev/mb-bucketlist.png" width='90%' style="border: 1px solid grey; margin: 0 auto">
    <img src="/dev/mb-bucketlist2.png" width='90%' style="border: 1px solid grey; margin: 0 auto">
</div><hr>

Buckets can also be toggled locked/unlocked.  Locked buckets are not affected, or affect any deposists made while locked.

For demo purposes, the properties of each bucket are visible to help test and track the state of each bucket after deposits are made.

### Known Bugs
- demo landing page not viewable until the avatar is clicked (see top of page)
- if action button drawer is open when user logs out, drawer becomes locked open until another user is signed in.
- Money Bucket does not display it's value -- the value is the sum of each deposit that did not get captured by a bucket.  In the future, user will be able to redistribute this value through the filter, or deposit it directly into another, specfic, bucket.

#### Strech Goals
- PWA status and offline capabilites
- Bank account links and read-access for automated moneybuck 'deposits'
- Full page layout and responsivness.

#### Contact
For questions, bug-reporting, or high-fives, contact me at dustnpdx@gmail.com or www.linkedin.com/in/dustin-herboldshimer

#### License
Mozilla Public License 2.0

#### CopyRight&copy; Dustin Herboldshimer @ Shimer.Dev 2019
