## 🛡️ CSAI - Static Security Scan Dashboard (Frontend Only)

CSAI is a universal, static frontend dashboard for visualizing security scan results from any tool not limited to CMS scanners. It is designed as a clean, responsive interface for presenting scan data without requiring a backend or live scan engine.

# ⚠️ This project is frontend-only. No backend, API, or scanning logic is included. It is meant for static display or integration into external pipelines.

🧩 Use Cases

Display results from tools like:

wpscan, joomscan, droopescan, vbscan

nikto, nmap, openvas, clamav, or any other scanner

Embed in reporting systems or dashboards

Offline or air-gapped environments

Static reporting from CI/CD pipelines

✨ Features

📊 Static dashboard built with Next.js and shadcn/ui

🗂️ Organized view of scan results

🕒 Scheduled scan and reporting UIs (non-functional UI only)


🛠️ Tech Stack

Next.js

shadcn/ui

Tailwind CSS

Radix UI

Lucide Icons

🚀 Getting Started
```bash
git clone https://github.com/your-org/csai.git
cd csai
npm install
npm run dev
```

Visit http://localhost:3000
 to view the dashboard.

```bash
📂 Structure
/app        - Pages and routes (Next.js)
/components - Custom UI components
/ui         - Shared shadcn/ui components
/public     - Static assets or sample scan data
```

⚠️ Disclaimer

This project is for static visualization only

No dynamic data loading, real-time scans, or backend logic

Integrate with your own backend, scanner, or pipeline if needed
