Application Structure Overview
1. App Component
•	File: App.jsx
•	Purpose: Main application component that sets up routing and user authentication.
•	Key Features: 
o	Uses HashRouter for routing.
o	Contains routes for all major components (Home, Services, Support, About, Contact, Job Post, Jobs, Login, Register, Profile, Submit Form, Profile Edit).
o	Manages user authentication state with Firebase.
2. Home Component
•	File: Home.jsx
•	Purpose: Landing page for users.
•	Key Features: 
o	Displays a navigation bar (NavbarHome).
o	Contains helper prompts for logging in and posting jobs.
o	Renders a list of users (UserList).
3. NavbarHome Component
•	File: NavbarHome.js
•	Purpose: Navigation bar for the application.
•	Key Features: 
o	Links to Home, Jobs, Services, Support, About, and Contact Us pages.
o	Displays the company logo.

4. Login Component
•	File: Login.jsx
•	Purpose: User login interface.
•	Key Features: 
o	Form for email and password input.
o	Handles login with Firebase authentication.
o	Displays success or error messages using toast notifications.
5. Register Component (Sign Up)
•	File: SignUp.jsx
•	Purpose: User registration interface.
•	Key Features: 
o	Form for user details (name, email, password).
o	Validates input and handles registration with Firebase.
6. Sign In with Google Component
•	File: signInWIthGoogle.jsx
•	Purpose: Allows users to log in using their Google account.
•	Key Features: 
o	Utilizes Firebase authentication for Google sign-in.
o	Handles user data retrieval and storage in Firestore.
o	Redirects to the profile page upon successful login.
•	Components: 
o	Button styled for Google sign-in.
o	Error handling for login failures.

7. Profile Component
•	File: Profile.jsx
•	Purpose: Displays user profile information.
•	Key Features: 
o	Fetches and displays user data from Firestore.
o	Provides navigation to edit the profile.
8. Profile Edit Component
•	File: ProfileEdit.jsx
•	Purpose: Allows users to edit their profile information.
•	Key Features: 
o	Form for updating user details.
o	Validates input and updates Firestore.
9. Jobs Component
•	File: Jobs.jsx
•	Purpose: Displays job listings.
•	Key Features: 
o	Fetches job data from Firestore.
o	Implements pagination for job listings.
10. Job Post Component
•	File: JobPost.jsx
•	Purpose: Interface for posting new job listings.
•	Key Features: 
o	Form for entering job details (title, description, requirements).
o	Validates input and saves job data to Firestore.
11. Contact Component
•	File: Contacts.jsx
•	Purpose: Displays contact information for team members.
•	Key Features: 
o	Lists team members with their roles and contact details.
12. Support Component
•	File: Support.jsx
•	Purpose: Provides FAQs and a contact form for assistance.
•	Key Features: 
o	Displays frequently asked questions categorized by topics.
o	Allows users to submit inquiries through a contact form.
13. About Component
•	File: About.jsx
•	Purpose: Provides information about the company.
•	Key Features: 
o	Sections detailing the company's vision, values, and history.
o	Engages users with the company's story and mission.
14. Services Component
•	File: Services.jsx
•	Purpose: To showcase the different moving services available to users.
•	Key Features: 
o	Navigation: Includes the NavbarHome component for consistent navigation across the application.
o	Service List: Displays a list of services with descriptions and details.
o	Expandable Details: Users can click on a service to expand and view more details about it.
o	Dynamic Rendering: Uses state to manage which service details are expanded.

Additional Notes
•	State Management: The application uses React's useState and useEffect hooks for managing component state and side effects.
•	Routing: The application utilizes react-router-dom for navigation between different pages.
•	Styling: Each component has associated CSS for styling, ensuring a consistent look and feel across the application.
•	Authentication: Firebase authentication is used for user login and registration.

Conclusion
This overview should now comprehensively cover all components and their functionalities as described in your provided content. If there are specific pages or features that you believe are still missing or require further elaboration, please let me know, and I will address them promptly!



# React + Vite

This provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
