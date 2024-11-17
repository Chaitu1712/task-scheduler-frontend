# **Task Scheduler Frontend**

This is the frontend implementation of the Task Scheduler Application, built using React and integrated with a Spring Boot backend. The frontend provides an intuitive interface for managing tasks, including a dashboard, task details view, and notifications.
* * *
## **Features**
-	**Dashboard**: Displays an overview of all tasks with filtering and sorting options.
-	**Task** Details: View and edit details of individual tasks.
-	**Notifications**: View notifications for rescheduled or completed tasks.
-	**Create and Update Tasks**: Add new tasks and modify existing ones.
-	**Mark Notifications as Read**: Manage your notifications.
* * *
## **Tech Stack**
-	Frontend Framework: React
-	Routing: React Router v6
-	Styling: CSS (or any styling library/framework you've used)
-	Backend API Integration: Axios
-	State Management: React Hooks (State and Context API, if applicable)
* * *
## **Project Structure**

    src/
    ├── api/                 # API service functions for backend integration
    ├── components/          # Reusable React components (e.g., Button, InputField, Modal)
    ├── pages/               # Page components for Dashboard, Task Details, Notifications
    ├── App.css              # Styling for main app component
    ├── App.js               # Main app component with routing setup
    ├── index.css            # Custom Fonts for all styling pages
    ├── index.js             # Entry point for the React application
    ├── NotificationProvider # Global Notifications Updater and provider
    └── README.md            # Project documentation
* * *
## **Prerequisites**
Before running the project, ensure you have the following installed:
-	Node.js (v16 or later)
-	npm or yarn
* * *
## **Setup and Installation**
### **1.	Clone the repository:**
    git clone <repository-url>
    cd task-scheduler-frontend
### **2.	Install dependencies:**
    npm install
#### or
    yarn install
### **3.	Configure the API base URL:**
- In src/api/axiosInstance.js (or wherever your Axios configuration resides), set the base URL to match your backend server's endpoint.

      import axios from 'axios';
      const api = axios.create({baseURL: 'http://localhost:8080/api', // Update with your backend API base URL});
      export default api;
### **4.	Start the development server:**
    npm start
#### or
    yarn start
The app will be available at http://localhost:3000.
* * *
## **Scripts**
-	Start Development Server:
```javascript        
  npm start
```      
-	Build for Production:

        npm run build
-	Linting (if set up):

        npm run lint
* * *
### **API Integration**
The frontend interacts with the backend via REST APIs. The following endpoints are used:

| Endpoint |	Method |	Description |
| --- | --- | --- |
| /tasks |	GET	| Fetch all tasks|
| /tasks/{id} |	GET |	Fetch task by ID|
| /tasks |	POST	| Create a new task|
| /tasks/{id} |	PUT	| Update a task|
| /tasks/{id}/status |	PATCH	| Update task status|
| /notifications |	GET	| Fetch all notifications|
| /notifications/{id}/read |	PUT	| Mark notification as read|
* * *
### **Contributing**
1.	Fork the repository.
2.	Create a new branch for your feature:

        git checkout -b feature-name  
3.	Commit your changes:

        git commit -m "Description of changes"
4.	Push to your branch:

        git push origin feature-name
5.	Submit a pull request.
* * *
### **License**
This project is licensed under the MIT License.

