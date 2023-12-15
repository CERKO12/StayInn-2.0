## StayInn-2.0 - Web Booking Application

### Project Objective
This is a full-stack web-based hotel booking platform designed to offer a seamless and interactive experience for users looking to book accommodations. Leveraging the power of AJAX for smooth, asynchronous web page updates, React for a responsive UI, and MongoDB for efficient data handling, we aim to deliver a hassle-free booking experience.

### Authors
* Congkai Sun
* Yue Huang

### Functionalities
* User Authentication: Secure user authentication system. Users can sign up, and log in.
* Real-Time Search and Reserve: Real-time search results and filtering options based on location, price, and max people. Users can reserve a hotel from the results.
* Detailed Hotel Information: Each listing will provide detailed information, including images, and room availability.
* Admin Dashboard: For hotel owners and admins to manage user information and hotel information including CRUD.

### Updates
Here are updates to our full-stack web-based hotel booking platform, enhancing the user experience and overall functionality:

* User Authentication Update: We've integrated Passport for user authentication, streamlining the sign-in, sign-up, and logout processes for enhanced security and user convenience.

* Advanced Search Functionality: Users can now effortlessly search for rooms using a specific number of adults and kids, making it easier to find the perfect accommodation options.

* Keyboard Command Feature: To enhance user experience, we've implemented keyboard command functionality for easy navigation and interaction with the platform.

* Enhanced Sign-Up Visibility: The sign-up page has been redesigned for higher visibility, aiding new users in easily creating an account.

* Admin Page Layout Redesign: The admin page layout has been completely redesigned for improved usability and management efficiency.

* Overall Page Layout Redesign: We've revamped the page layout and font to ensure better alignment, consistency, and aesthetic appeal across the platform.

* Image Cards Update: We've updated the location photos on the home page to make the card view more attractive.

* Unified Typography: The platform now features unified typography to ensure clear contrast between different font styles, enhancing readability and visual harmony.

* Cohesive Color Palette: A comprehensive redesign introduces a cohesive color palette, elevating the website's visual appeal and user experience.

* Accessibility and Compliance: Our website is now fully accessible to screen readers and achieves a 100% Lighthouse score, ensuring comprehensive accessibility for all users.

### Instruction to build
* Download this project as a zip file or clone it to your gits
```
cd client => yarn install or npm install => yarn start or npm start
cd api => yarn install or npm install => yarn start or npm start
```
* Place the .env file in the api folder

### Color Palette and Fonts
![color_palette](screenshots/Color__Palette.png)
* #02390E: For the header, footer, and background color of the login page.
* #015314: For the navigation bar of the home page.
* #03A303: The color of the buttons on each page.
* #FFFFFF: The background color of the list of properties on each page.
* #FEBB02: the edge color of the search bar
  
Font of logo and text: Open Sans, sans-serif

### Document
* Design Doc: https://docs.google.com/document/d/1rOI8qmPksmEVGCwvLxYXTWejFcND6Cns1rZ3m8Lvcnk/edit?usp=sharing
* Slides: https://docs.google.com/presentation/d/1x2OU08ppwFTR2RxvXgG4n58KtHw2f8T6PQ1r1Q6rL9U/edit?usp=sharing
* Video Demonstration: https://youtu.be/eSNz1Z_aR2w
* Usability Study Report:
  * [Congkai - Usability Study Report](https://docs.google.com/document/d/1c3XVuUu7tzAWZStEh-BBd_Btm4tghZAmcC3rSQf8fF8/edit?usp=sharing)
  * [Yue - Usability Study Report](https://youtu.be/PEBNJMsRspI)
* Class Link: https://johnguerra.co/classes/webDevelopment_fall_2023/
* Lighthouse Usability Testing:
  ![lighthouse](screenshots/Lighthouse.png)

### Demo Link
[StayInn_2.0](https://booking-frontend-inys.onrender.com/)

### Screenshots
StayInn homepage
![home](screenshots/1.png)
![home](screenshots/2.png)

Login / Registration
![login/Register](screenshots/3.png)

Search lists
![filter](screenshots/4.png)

Reserve page
![reserve](screenshots/5.png)

Admin page
![admin](screenshots/6.png)
![admin](screenshots/7.png)
