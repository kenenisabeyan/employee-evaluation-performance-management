🧭 Employee Performance Evaluation System
Next.jsMongoDBTailwind CSSNextAuth

A comprehensive, full-stack performance management system built with Next.js 15+ App Router. It enables organizations to streamline performance reviews through secure, role-based dashboards tailored for Administrators, Team Leaders, and Employees, complete with task tracking and automated PDF report generation.

🔴 Live Demo (Add your link here)
 | 
📄 Report a Bug

✨ Features by Role
The system follows a strict Role-Based Access Control (RBAC) architecture:

👑 Administrator
User Management: Add, edit, deactivate users, and assign roles/permissions.
Organization Structure: Create and manage Departments and Teams.
Evaluation Oversight: Monitor organization-wide metrics and approve/reject final evaluation results.
System Access: Full administrative access to all platform features and reports.
👥 Team Leader
Task Management: Create and assign tasks to team members (70% self-eval, 10% peer eval, 20% other tasks).
Team Oversight: Monitor team performance, track due dates, and view comprehensive dashboards (calendar & board views).
Evaluations: Conduct peer evaluations and complete self-evaluations.
👤 Employee
Performance Reviews: Complete self-evaluation forms based on assigned tasks.
Peer Evaluations: Provide constructive feedback for colleagues.
Results & Reporting: View finalized evaluation scores and download official PDF performance reports.
Profile: Manage personal information and credentials.
🚀 Technologies Used
Category	Technology	Purpose
Frontend	Next.js 15 (App Router), React 19	Core framework and UI rendering
Styling	Tailwind CSS v4, ShadCN UI, Radix UI	Component library and responsive design
Backend	Node.js, Next.js API Routes	Server-side logic and API endpoints
Database	MongoDB, Mongoose	NoSQL database and Object Data Modeling
Authentication	NextAuth.js v4, bcryptjs	Secure JWT session management & password hashing
Utilities	jspdf, html2canvas	PDF report generation
📸 Screenshots
(Tip: Add screenshots of your application here to make your README stand out)

Click to view screenshots
🛠 Installation & Setup
1. Prerequisites
Node.js (v18 or higher)
MongoDB (v6 or higher running locally or MongoDB Atlas)
Git
2. Clone the Repository
bash
git clone https://github.com/yourusername/performance-evaluation-system.git
cd performance-evaluation-system
3. Install Dependencies
bash
npm install
4. Configure Environment Variables
Create a .env.local file in the root directory based on .env.example:

bash
cp .env .env.local
Add the following variables to .env.local:

env
# Database
MONGODB_URI=mongodb://localhost:27017/performance_evaluation
# Authentication
NEXTAUTH_SECRET=your_super_secret_jwt_key_here
NEXTAUTH_URL=http://localhost:3000
# Optional: Email Setup (if using Nodemailer for notifications)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
5. Initialize the Database (Seeding)
To populate the database with initial admin accounts, departments, and roles:

bash
node lib/seed.js
6. Run the Development Server
bash
npm run dev
Open http://localhost:3000 with your browser to see the result.

🗄️ Database Models Overview
User: Stores authentication details, profiles, roles (Admin, Leader, Employee), and team/department references.
Department: Manages organizational structure and manager assignments.
Team: Manages sub-groups within departments, linking leaders to members.
Task: Tracks assignments, priorities, deadlines, and scoring criteria.
Evaluation: Manages the workflow (Draft → Submitted → Reviewed → Approved) for self, peer, and supervisor reviews.
🔐 Security Features
Route Protection: Next.js Middleware automatically intercepts unauthorized requests.
Data Protection: Passwords securely hashed using bcryptjs with salt rounds.
Granular Permissions: 9-tier permission system (e.g., create_task, approve_results, evaluate_peer).
Input Security: XSS protection, sanitization, and Mongoose schema validation.
📡 Core API Routes
POST /api/auth/[...nextauth] - Session management and authentication
GET/POST/PUT /api/users - User CRUD operations (Admin protected)
GET/POST /api/departments - Department management
GET/POST /api/tasks - Task assignment and fetching
GET/POST /api/evaluations - Evaluation submission and retrieval
POST /api/evaluations/[id]/approve - Result approval endpoint
🤝 Contributing
Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
📄 License
Distributed under the MIT License. See LICENSE for more information.

✉️ Contact
Your Name - In/kenenisa 
kenenisab05@gmail.com

Project Link: https://github.com/kenenisabeyan/Performance-Evaluator
