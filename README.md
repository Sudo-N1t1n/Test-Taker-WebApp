# ⚗️ Physics For Fun — Practical Skills Pre-Test Platform

A free, cloud-connected diagnostic pre-test web app for **Class 11 & 12 Physics Practical Skills**, designed for the Teacher Training Programme at **CM RISE Sabakheda**.

> **Created by:** Mr. Dinesh Nagar — UMS Physics Teacher, CM RISE Sabakheda  
> **Contact:** 📞 [9993355323](tel:9993355323) · ✉️ [Dineshnagar76@gmail.com](mailto:Dineshnagar76@gmail.com)

---

## 🌟 Features

| Feature | Description |
|---|---|
| **25-Question MCQ Test** | Physics practical skills covering instruments, error analysis, optics, electricity, and more |
| **45-Minute Timer** | Live countdown with a red warning in the last 5 minutes |
| **Instant Results** | Score, pass/fail status, and full per-question answer breakdown shown immediately |
| **Cloud Storage** | All submissions saved to Firebase Firestore — visible across all devices in real-time |
| **Admin Dashboard** | Password-protected live dashboard with statistics, per-question analytics chart, and searchable submission table |
| **Mobile Friendly** | Fully responsive design — works on phones, tablets, and desktops |
| **No Backend Server** | Entirely serverless — hosted as a static site on Netlify |

---

## 📸 Pages

| Page | URL | Description |
|---|---|---|
| Home / Registration | `index.html` | Enter name & email to start the test |
| Quiz | `quiz.html` | 25 MCQ questions with live progress and timer |
| Result | `result.html` | Score, breakdown, and pass/fail status |
| Admin Dashboard | `admin.html` | Password-protected analytics (password: `admin123`) |
| About | `about.html` | Author info, tech stack, and platform overview |

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| **HTML5** | Page structure and semantic markup |
| **CSS3 (Vanilla)** | Responsive design, animations, glassmorphism UI |
| **JavaScript (ES6+)** | Quiz logic, grading engine, timer, real-time UI |
| **Firebase Firestore** | Cloud NoSQL database — stores all quiz submissions |
| **Firebase CDN SDK** | Client-side Firebase integration (compat v9.23.0) |
| **Google Fonts (Inter)** | Modern, readable typography |
| **Netlify** | Static site hosting with global CDN |

---

## 📁 Project Structure

```
/
├── css/
│   └── style.css       # Shared stylesheet (all pages)
├── js/
│   ├── app.js          # Questions, config, grading logic, Firebase calls
│   └── firebase-config.js # Firebase credentials (edit this file)
├── docs/
│   └── Physics Practical Skills Pre-Test Question Bank.pdf # Source PDF
├── index.html          # Landing page — registration form
├── quiz.html           # Quiz interface — 25 MCQs with timer
├── result.html         # Results page — score and breakdown
├── admin.html          # Admin-only dashboard
├── about.html          # About the platform and creator
└── README.md           # This file
```

---

## 🚀 Getting Started

### Prerequisites
- A free Google account (for Firebase)
- A Netlify account (free tier is sufficient)

### 1. Clone or Download
```bash
git clone https://github.com/your-username/physics-for-fun.git
cd physics-for-fun
```
Or download the ZIP and extract it.

### 2. Configure Firebase
1. Go to [console.firebase.google.com](https://console.firebase.google.com) → Create a project
2. Enable **Firestore Database** (start in test mode)
3. Register a **Web App** → copy the `firebaseConfig` object
4. Open `firebase-config.js` and paste your config values:

```js
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};
```

5. Set Firestore **Security Rules** (Firestore → Rules tab):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /submissions/{submissionId} {
      allow create: if request.resource.data.keys().hasAll(
        ['id', 'name', 'email', 'score', 'total', 'submittedAt', 'passed']
      );
      allow read:   if true;
      allow delete: if true;
      allow update: if false;
    }
  }
}
```

> 📄 See the local **SETUP_GUIDE.md** file in the project folder for full step-by-step instructions with screenshots.

### 3. Test Locally
Run a simple HTTP server (required — Firebase doesn't work on `file://`):
```bash
python3 -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

### 4. Deploy to Netlify
**Option A — Drag & Drop:**
1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag the entire project folder onto the deploy zone

**Option B — GitHub (recommended):**
1. Push the project to a GitHub repo
2. Netlify → Add site → Import from Git → set publish dir to `/`
3. Future updates: just `git push` — Netlify auto-deploys

---

## 🔒 Admin Dashboard

- **URL:** `admin.html`
- **Password:** `admin123`
- **Features:** Live submission count, average score, pass rate, per-question correct % chart, searchable student table, detail modal with full answer breakdown, and a Clear All button.

> ⚠️ To change the admin password, edit `adminPassword` in `app.js` → `CONFIG` object.

---

## 📊 Quiz Configuration

All settings are in `app.js` → `CONFIG` object:

```js
const CONFIG = {
  adminPassword:     'admin123',   // Change this!
  timerMinutes:      45,           // Test duration
  passMark:          10,           // Minimum score to pass (out of 25)
  totalQuestions:    25,
  firestoreCollection: 'submissions',
};
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

1. Vernier Calliper — zero error
2. Screw Gauge — backlash error
3. Spherometer — radius of curvature
4. Error analysis — density of a cube
5. Simple Pendulum — value of g
6. Resonance Tube — end correction
7. Metre Bridge — balance point sensitivity
8. Potentiometer — potential gradient
9. Potentiometer — balance point issues
10. Viscosity — Stokes' Law
11. Capillary Rise — surface tension
12. Convex Lens — focal length graphically
13. Optical Bench — parallax removal
14. Glass Prism — angle of deviation curve
15. Galvanometer → Ammeter conversion
16. Galvanometer → Voltmeter conversion
17. Concave Mirror — partial obstruction
18. Newton's Law of Cooling — graph
19. Sonometer — frequency vs. length
20. p-n Junction Diode — forward bias
21. Electrical circuit precautions
22. Refractive index — travelling microscope
23. Spherometer — least count calculation
24. Graphical analysis — law verification
25. Metre Bridge — end resistances

---

## 📄 License

This project is created and maintained by **Mr. Dinesh Nagar** for educational purposes at CM RISE Sabakheda. It is free to use for educational and non-commercial purposes.

---

## 👨‍🏫 About the Creator

**Mr. Dinesh Nagar**  
UMS Physics Teacher — CM RISE Sabakheda  
📞 [9993355323](tel:9993355323)  
✉️ [Dineshnagar76@gmail.com](mailto:Dineshnagar76@gmail.com)

*"Making physics practical, accessible, and fun for every learner."*

---

<div align="center">
  Built with ❤️ using HTML · CSS · JavaScript · Firebase · Netlify
</div>
