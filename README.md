Inventory Management App - Flex Business Solutions Tech Test
This is a web application for managing inventory across different job sites, built as a technical test for Flex Business Solutions. The app allows users to view, create, and search for job sites, and manage the inventory specific to each site.

The project follows the design specifications provided in the Figma file.

## 📸 Screenshots

### Job Sites List

![Job Sites List](./screenshots/Screenshot0.png)

### Search Functionality in Job Sites List

![Search Functionality in Job Sites List](./screenshots/Screenshot1.png)

### Create Job Site Modal

![Create Job Site Modal](./screenshots/Screenshot2.png)

### Options in Modal

![Options in Modal](./screenshots/Screenshot3.png)

### Inventory Dashboard

![Inventory Dashboard](./screenshots/Screenshot4.png)

### Inventory Dashboard with Table

![Inventory Dashboard with Table](./screenshots/Screenshot5.png)

### Inventory Dashboard Search Functionality

![Inventory Dashboard Search Functionality](./screenshots/Screenshot6.png)

### Edit Modal in Inventory Dashboard

![Edit Modal in Inventory Dashboard](./screenshots/Screenshot7.png)

Export to Sheets
✨ Features
Job Site Management: View a list of all job sites with their current status.

Search Functionality: Instantly search for job sites by name.

Create Job Sites: Add new job sites to the list through an intuitive modal.

Inventory Dashboard: View a detailed inventory table for each specific job site.

Inventory Search: Quickly find items within the inventory dashboard.

In-line Editing: Double-click any inventory item to open a modal and update its details.

🛠️ Tech Stack
React: For building the user interface.

Jest & React Testing Library: For unit and component testing.

(Feel free to add any other libraries you used, e.g., Axios, Material-UI, etc.)

⚙️ Getting Started
Follow these instructions to get the project running on your local machine.

Prerequisites
Node.js (v16 or later)

npm

Installation & Running
Clone the repository:

Bash

git clone https://github.com/<your-username>/<repo-name>.git
Navigate to the project directory:

Bash

cd <repo-name>/react-test
Install the dependencies:

Bash

npm install
Start the development server:

Bash

npm start
The application will be available at http://localhost:3000.

🧪 Running Tests
To run the automated tests for this project, use the following command:

Bash

npm test
🤔 Further Considerations
Here are some thoughts on how this application could be improved and scaled in a real-world production environment.

How might you make this app more secure?
There are several layers of security that could be applied to this application:

Authentication & Authorization: Implement a secure login system (e.g., JWT-based auth or OAuth2). Users should only be able to view or modify job sites and inventory if their role permits it. Role-based access control (RBAC) would ensure that, for example, only managers can edit or delete inventory items.

Input Validation & Sanitization: All user inputs (search queries, form data) should be validated on both the frontend and backend. This prevents malicious inputs that could lead to XSS, SQL injection, or other injection-based attacks.

Secure Communication (HTTPS): Enforce HTTPS for all communication between the client and server. This ensures that sensitive data, like user credentials and inventory updates, is encrypted while in transit.

API Security: Protect APIs with measures like rate limiting, request validation, and API keys. This prevents abuse, brute-force attempts, and unauthorized access.

Audit Trails & Logging: Keep a log of who made which changes to inventory items and job sites. This ensures accountability and makes it easier to trace suspicious activity.

How would you make this solution scale to millions of records?
To handle very large datasets efficiently, both the frontend and backend would need optimization:

Pagination & Infinite Scrolling: Instead of loading all records at once, data should be fetched in chunks (server-side pagination). On the frontend, an infinite scroll or a "Load More" button would provide a smooth user experience without overwhelming the browser.

Server-Side Search & Filtering: All search and filtering logic should be handled by the database, not the client. This ensures only relevant data is sent over the network. Creating database indexes on frequently queried fields (e.g., item name, category, status) would drastically improve query speed.

Caching: Use an in-memory cache like Redis for frequently accessed data (e.g., the main job sites list). Caching reduces database load and provides near-instant responses for common queries.

Frontend Performance Optimization: For rendering very long lists, use virtualization (e.g., react-window). This technique only renders the items currently visible on the screen, keeping the UI fast and responsive even with thousands of rows.

Database & Infrastructure Scaling: At a very large scale, you would need to optimize the database schema and potentially use strategies like sharding or read replicas. The backend services should be deployed with a load balancer to distribute traffic across multiple instances (horizontal scaling), ensuring high availability and performance.
