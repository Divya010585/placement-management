# Placement Management System

A full-stack **Placement Management System** developed using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. The application streamlines the campus recruitment process by providing role-based access for Students, Recruiters, and Placement Officers, enabling efficient management of job postings, applications, interviews, and placement activities.

---

## Features

- Secure JWT-based Authentication and Authorization
- Role-Based Access Control (Student, Recruiter, Placement Officer)
- Company and Job Posting Management
- Student Profile and Resume Management
- Job Application Tracking
- Interview Scheduling with **Jitsi Meet** Integration
- Automated Email Notifications
- PDF Report Generation
- Responsive and User-Friendly Interface

---

## Tech Stack

**Frontend**
- React.js
- Vite
- React Router DOM
- Axios

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

**Authentication & Tools**
- JWT (JSON Web Token)
- bcryptjs
- Multer
- Nodemailer
- Jitsi Meet API


### Backend Setup

```bash
cd server
npm install
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL=your_email
EMAIL_PASSWORD=your_email_password
```

---

## User Roles

### Student
- Register and Login
- Manage Profile
- Upload Resume
- Apply for Jobs
- Track Applications
- Join Scheduled Interviews

### Recruiter
- Manage Company Profile
- Post Job Openings
- Review Applications
- Shortlist Candidates
- Schedule Interviews

### Placement Officer
- Manage Students and Recruiters
- Manage Companies
- Schedule Interviews
- Generate Placement Reports
- Monitor Placement Activities

---

## Future Enhancements

- AI-Based Resume Screening
- Placement Analytics Dashboard
- Calendar Integration
- Mobile Application
- Cloud Storage Integration

