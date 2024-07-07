# FORMO

FORMO is a survey form platform where admins can create an account, manage surveys, and allow users to fill out surveys securely. The platform uses JWT for authentication to protect routes specific to individual admins, bcrypt for password encryption, and Firebase for user authentication.

## Features

- **Admin Account Creation**: Admins can create an account to manage their surveys.
- **Survey Management**: Admins can create new surveys that users can fill out.
- **JWT Authentication**: Protects admin-specific routes to ensure secure access.
- **Password Encryption**: Uses bcrypt to securely store admin passwords.
- **Survey Deletion Safety**: Admins must enter their password to delete a survey, adding an extra layer of security.
- **Copy Link Feature**: Admins can copy survey links directly to share with users.
- **Firebase Authentication**: Users can fill out surveys only after logging in with their Gmail ID, eliminating anonymous submissions.
  
## Technologies Used

- **MERN Stack**: MongoDB, Express.js, React.js, Node.js
- **JWT**: For securing API routes
- **bcrypt**: For password encryption
- **Firebase**: For user authentication with Gmail
- **Tailwind CSS**: For styling the application

## Screenshots
<img src="./frontend/images Github/Home.png" alt="Screenshot 1" width="800" height="450">
<img src="./frontend/images Github/AdminDashboard.png" alt="Screenshot 2" width="800" height="450">
<div style="display: flex;">
    <img src="./frontend/images Github/Signup.png" alt="Screenshot 3" width="400" height="400">
    <img src="./frontend/images Github/Signin.png" alt="Screenshot 4" width="400" height="400">
</div>
<img src="./frontend/images Github/CreateForm.png" alt="Screenshot 5" width="800" height="500">
<img src="./frontend/images Github/Analysis.png" alt="Screenshot 6" width="800" height="500">
