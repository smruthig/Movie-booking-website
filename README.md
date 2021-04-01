# Movie-booking-website
Web application to book movie tickets.

This is a project built from scratch using MERN stack.

The first page is the login/signup page. It ensures basic authentication and allows user to create an account or login from an existing account.
Then we get the home page. There is an "about us" section which is a separate page giving info about the webpage.
In the home page, we get the list of all the movies of the week with their timings.
Once we click on a movie, we get all the information of the movie, like the trailer, description, rating etc.
There is also an option to book a seat, if available, else an unavailability message is displayed.
On clicking "book now", we can enter the number of seats in VIP and Regular section. The cost is calculated and automatically displayed.
Further, after confirming payment, we get the booking code. The number of available seats is reduced in the database.

The front end is built using HTML, CSS, JS, jQuery, ReactJS.
The front end files are as follows:

HTML - about_us.html, booking.html, home.html, login.html, login_wrong.html, movies.html,sign_wrong1.html, sign_wrong2.html

CSS - booking.css, home.css, login.css, movies.css


The back end is built using NodeJS and ExpressJS.
The back end files are as follows:

NodeJS - server.js

ExpressJS - router.js, bookingrouter.js, homerouter.js, loginrouter.js, movierouter.js


The database has been implemented using MongoDB.

The files are: movies.json, user.json

NOTE: The above files need to be imported to MongoDB under a database named "newdb".

NOTE: Your chrome extension needs to be added in the file "movies.json" as mentioned in the file.

The file manifest.json is used by the chrome extension "file exposer" to expose all the images and videos.
