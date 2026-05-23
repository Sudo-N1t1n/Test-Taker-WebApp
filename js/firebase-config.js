// ══════════════════════════════════════════════════════════════
//  🔥 FIREBASE CONFIGURATION — test-plateform-20ef1
// ══════════════════════════════════════════════════════════════

const firebaseConfig = {
  apiKey: "AIzaSyCXRuTLPVoaEQUCFNEYwA273F1u7rti7Ng",
  authDomain: "test-plateform-20ef1.firebaseapp.com",
  projectId: "test-plateform-20ef1",
  storageBucket: "test-plateform-20ef1.firebasestorage.app",
  messagingSenderId: "913234110780",
  appId: "1:913234110780:web:f0579478c4c6d407f55639"
  // measurementId not needed — Analytics not used
};

// ── Detect unconfigured state ──────────────────────────────────
if (firebaseConfig.apiKey === "PASTE_YOUR_API_KEY_HERE") {
  document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = `
      <div style="font-family:Inter,sans-serif;background:#0f172a;color:#f1f5f9;min-height:100vh;
                  display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;">
        <div>
          <div style="font-size:3rem;margin-bottom:16px;">🔥</div>
          <h2 style="margin-bottom:12px;font-size:1.4rem;">Firebase Not Configured</h2>
          <p style="color:#94a3b8;max-width:440px;margin:0 auto 24px;">
            Open <code style="background:#1e293b;padding:2px 8px;border-radius:4px;">firebase-config.js</code>
            and paste your Firebase project credentials. See <strong>SETUP_GUIDE.md</strong> for instructions.
          </p>
          <a href="SETUP_GUIDE.md" style="color:#818cf8;text-decoration:underline;">View Setup Guide →</a>
        </div>
      </div>
    `;
  });
} else {
  // ── Initialize Firebase ──────────────────────────────────────
  firebase.initializeApp(firebaseConfig);
  window.db = firebase.firestore();
  console.log('✅ Firebase connected to project:', firebaseConfig.projectId);
}
