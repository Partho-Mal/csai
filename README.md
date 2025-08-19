### CyberShield - Static Security Scan Dashboard (Frontend Only)

CyberShield is a universal, static frontend dashboard for visualizing security scan results from any tool not limited to CMS scanners. It is designed as a clean, responsive interface for presenting scan data without requiring a backend or live scan engine with **login/signup functionality** using **MongoDB** integration.

CSAI - CyberShiend AI

## ⚠️ By Default This Project Is Frontend-Only
No backend, API, or scanning logic is included. It is meant for static display or integration into external pipelines.

🧩 Use Cases

Display results from tools like:

 - `wpscan`, `joomscan`, `droopescan`, `vbscan`

 - `nikto`, `nmap`, `openvas`, `clamav`

 - Embed in reporting systems or dashboards

 - Offline or air-gapped environments

 - Static reporting from CI/CD pipelines

✨ Features

 - 📊 Static dashboard built with **Next.js** and **shadcn/ui**

 - 🔐 login/signup with **MongoDB** for controlled access

 - 🗂️ Organized view of scan results

 - 🕒 Scheduled scan and reporting UIs (non-functional UI only)

---

🛠️ Tech Stack

 - Next.js

 - shadcn/ui

 - Tailwind CSS

 - Radix UI

 - Lucide Icons

 - MongoDB (for authentication)

---

🚀 Getting Started
```bash
git clone https://github.com/your-org/csai.git
cd csai
npm install
npm run dev
```
Visit http://localhost:3000 to view the dashboard.

---

### 🔐 Optional MongoDB Auth Setup

To enable login/signup functionality using MongoDB:

1. Set up MongoDB

Create a MongoDB database (e.g. using MongoDB Atlas )
Copy your **MongoDB URI** - it looks like this:
```php-template
mongodb+srv://<username>:<password>@cluster0.mongodb.net/<your-db>?retryWrites=true&w=majority
```
2. Create a `.env.local` file in the project root
```env
MONGODB_URI="your-mongodb-uri-here"
JWT_SECRET="your-strong-jwt-secret"
```

3. Add API routes (in /app/api/)

You'll need basic API endpoints for:

 - /api/auth/signup — Create new user

 - /api/auth/login — Validate user and issue JWT

 - Middleware to protect dashboard route using JWT

> 📦 This is not included in the static version — but you can integrate NextAuth.js
 or build your own API routes in /pages/api/.

4. Redirect on successful login

Modify your login logic to route users to the dashboard:
```js
router.push('/dashboard');
```
---

📂 Project Structure
```bash
📂 Structure
/app        - Pages and routes (Next.js)
/components - Custom UI components
/ui         - Shared shadcn/ui components
/public     - Static assets or sample scan data
```

---

⚠️ Disclaimer

 - This project is for **static visualization** only by default

 - No dynamic scan logic or live integration is included

 - For login/auth and protected access, you must integrate your own MongoDB backend or API logic

---

📸 Screenshots

![Screenshot (28)](https://github.com/user-attachments/assets/04891cfd-98a2-49d3-9e40-6e564708bcd4)

![Screenshot (30)](https://github.com/user-attachments/assets/67fe172b-2bc2-4044-a2be-a72ff0a54107)

![Screenshot (31)](https://github.com/user-attachments/assets/d4eca8d6-3e20-452b-9073-a2767c917b8a)
