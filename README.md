# ⚗️ Physics For Fun — Practical Skills Assessment Platform

A free, cloud-connected diagnostic assessment web app for **Class 11 & 12 Physics Practical Skills**, designed for the Teacher Training Programme at **Sandipani Vidyalaya Sabakheda**.

> **Created by:** Dinesh Nagar — UMS Physics Teacher, Sandipani Vidyalaya Sabakheda  
> **Contact:** 📞 [9993355323](tel:9993355323) · ✉️ [Dineshnagar76@gmail.com](mailto:Dineshnagar76@gmail.com)

---

## 🌟 Features

| Feature | Description |
|---|---|
| **25-Question MCQ Test** | Physics practical skills covering instruments, error analysis, optics, electricity, and more |
| **Pre-Test & Post-Test** | Separate data collections for before and after the training programme |
| **Auto-Fill from Pre-Test** | Enter your phone or email to auto-fill registration details from a previous pre-test submission |
| **Pre vs Post Comparison** | Students see a side-by-side score comparison on their result page after the post-test |
| **Bilingual Support** | Questions available in both **Hindi** and **English** — selected at registration |
| **45-Minute Timer** | Live countdown with a red warning in the last 5 minutes; auto-submits when time runs out |
| **Instant Results** | Score, pass/fail status, and full per-question answer breakdown shown immediately |
| **Cloud Storage** | All submissions saved to Firebase Firestore — visible across all devices in real-time |
| **Admin Dashboard** | Password-protected live dashboard with **tabbed UI** (Pre-Test, Post-Test, Comparison) |
| **Interactive Comparison Charts** | Side-by-side per-question bar charts comparing pre-test and post-test performance |
| **Mobile Friendly** | Fully responsive design — works on phones, tablets, and desktops |
| **No Backend Server** | Entirely serverless — hosted as a static site |

---

## 📸 Pages

| Page | URL | Description |
|---|---|---|
| Home / Registration | `index.html` | Enter details to start the post-test; auto-fill from pre-test via phone/email |
| Quiz | `quiz.html` | 25 MCQ questions with live progress bar and countdown timer |
| Result | `result.html` | Score, breakdown, pass/fail, and pre-test vs post-test comparison |
| Admin Dashboard | `admin.html` | Tabbed analytics — Pre-Test · Post-Test · Comparison (password: `admin123`) |
| About | `about.html` | Author info, tech stack, and platform overview |

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| **HTML5** | Page structure and semantic markup |
| **CSS3 (Vanilla)** | Responsive design, animations, glassmorphism UI, emerald/violet theme |
| **JavaScript (ES6+)** | Quiz logic, grading engine, timer, real-time UI |
| **Firebase Firestore** | Cloud NoSQL database — dual collections (`submissions`, `submissions_post`) |
| **Firebase CDN SDK** | Client-side Firebase integration (compat v9.23.0) |
| **Google Fonts (Inter)** | Modern, readable typography |

---

## 📁 Project Structure

```
/
├── css/
│   └── style.css              # Shared stylesheet — emerald/violet theme
├── js/
│   ├── app.js                 # Questions (Hindi + English), config, grading, Firebase CRUD
│   └── firebase-config.js     # Firebase credentials (edit this file)
├── docs/
│   └── Physics Practical Skills Pre-Test Question Bank.pdf
├── index.html                 # Landing page — registration with auto-fill
├── quiz.html                  # Quiz interface — 25 MCQs with timer
├── result.html                # Results — score, breakdown, pre/post comparison
├── admin.html                 # Admin dashboard — tabbed UI with comparison charts
├── about.html                 # About the platform and creator
├── .gitignore
└── README.md                  # This file
```

---

## 🚀 Getting Started

### Prerequisites
- A free Google account (for Firebase)
- A hosting platform (Netlify, GitHub Pages, or similar)

### 1. Clone
```bash
git clone https://github.com/Sudo-N1t1n/Test-Taker-WebApp.git
cd Test-Taker-WebApp
```

### 2. Configure Firebase
1. Go to [console.firebase.google.com](https://console.firebase.google.com) → Create a project
2. Enable **Firestore Database** (start in test mode)
3. Register a **Web App** → copy the `firebaseConfig` object
4. Open `js/firebase-config.js` and paste your config values

5. Set Firestore **Security Rules** (Firestore → Rules tab):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /submissions/{submissionId} {
      allow create: if true;
      allow read:   if true;
      allow delete: if true;
      allow update: if false;
    }
    match /submissions_post/{submissionId} {
      allow create: if true;
      allow read:   if true;
      allow delete: if true;
      allow update: if false;
    }
  }
}
```

### 3. Test Locally
Run a simple HTTP server (required — Firebase doesn't work on `file://`):
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

### 4. Deploy
Push to GitHub and connect to Netlify, or use any static hosting platform.

---

## 🔒 Admin Dashboard

- **URL:** `admin.html`
- **Password:** `admin123`
- **Tabs:**
  - **📋 Pre-Test** — Stats, per-question chart, searchable table for pre-test submissions
  - **📝 Post-Test** — Stats, per-question chart, searchable table for post-test submissions
  - **📊 Comparison** — Side-by-side per-question bar chart, average score change, pass rate change

> ⚠️ To change the admin password, edit `adminPassword` in `js/app.js` → `CONFIG` object.

---

## 📊 Quiz Configuration

All settings are in `js/app.js` → `CONFIG` object:

```js
const CONFIG = {
  adminPassword:        'admin123',       // Change this!
  timerMinutes:         45,               // Test duration
  passMark:             10,               // Minimum score to pass (out of 25)
  totalQuestions:       25,
  firestoreCollection:     'submissions',      // Pre-test collection
  firestoreCollectionPost: 'submissions_post', // Post-test collection
};
```

---

## 🔄 Data Flow

```
Registration (index.html)
    │
    ├── Auto-fill lookup: phone/email → Firestore 'submissions' collection
    │
    ▼
Quiz (quiz.html)
    │
    ├── Saves to Firestore 'submissions_post' collection
    ├── Caches result in sessionStorage
    │
    ▼
Result (result.html)
    │
    ├── Displays post-test score
    ├── Fetches pre-test record by linked ID
    └── Shows pre-test vs post-test comparison
```

---

## 📱 Browser & Device Support

| Browser | Support |
|---|---|
| Chrome (desktop & Android) | ✅ Full |
| Safari (iOS & macOS) | ✅ Full |
| Firefox | ✅ Full |
| Edge | ✅ Full |
| Samsung Internet | ✅ Full |

Responsive breakpoints: **400px · 640px · 768px**

---

## 🗂️ Topics Covered in the Test

1. Vernier Calliper — least count formula
2. Vernier Calliper — internal diameter measurement
3. Screw Gauge — backlash error prevention
4. Spherometer — radius of curvature formula
5. Parallelogram Law — Gravesand's apparatus
6. Simple Pendulum — L vs T² graph
7. Simple Pendulum — mass independence
8. Newton's Law of Cooling — ln(θ−θ₀) vs t graph
9. Specific Heat — method of mixtures
10. Sonometer — frequency vs. length
11. Resonance Tube — end correction
12. Limiting Friction — Fs vs R graph
13. Inclined Plane — force vs sin θ
14. Concave Mirror — 1/u vs 1/v graph
15. Convex Lens — u-v graph shape
16. Prism — minimum deviation condition
17. Refractive Index — liquid lens type
18. Metre Bridge — copper strip purpose
19. Metre Bridge — optimal null point
20. Ohm's Law — voltmeter connection
21. Galvanometer → Voltmeter conversion
22. Galvanometer → Ammeter conversion (shunt)
23. P-N Junction Diode — knee voltage
24. Sonometer — AC mains frequency
25. Concave Lens — focal length method

---

## 📄 License

This project is created and maintained by **Dinesh Nagar** for educational purposes at Sandipani Vidyalaya Sabakheda. It is free to use for educational and non-commercial purposes.

---

## 👨‍🏫 About the Creator

**Dinesh Nagar**  
UMS Physics Teacher — Sandipani Vidyalaya Sabakheda  
📞 [9993355323](tel:9993355323)  
✉️ [Dineshnagar76@gmail.com](mailto:Dineshnagar76@gmail.com)

*"Making physics practical, accessible, and fun for every learner."*

---

<div align="center">
  Built with ❤️ using HTML · CSS · JavaScript · Firebase
</div>
