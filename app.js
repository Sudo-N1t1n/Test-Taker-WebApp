// ──────────────────────────────────────────────
//  CONFIGURATION
// ──────────────────────────────────────────────
const CONFIG = {
  adminPassword: 'campione',
  timerMinutes: 45,
  passMark: 10,          // out of 25
  totalQuestions: 25,
  storageKey: 'quiz_submissions',   // kept for reference
  firestoreCollection: 'submissions',
};

// ──────────────────────────────────────────────
//  QU─ESTION BANK  (25 MCQs from PDF)
// ─────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 1,
    text: "While using a Vernier calliper, a trainee teacher observes that the zero of the Vernier scale lies to the right of the zero of the main scale when the jaws are in contact. What type of error is this and how must it be handled?",
    options: {
      A: "Positive zero error; it should be added to the final observed reading.",
      B: "Positive zero error; it should be subtracted from the final observed reading.",
      C: "Negative zero error; it should be subtracted from the final observed reading.",
      D: "Negative zero error; it should be added to the final observed reading."
    },
    correct: "B"
  },
  {
    id: 2,
    text: "What is the primary cause of backlash error in a screw gauge or spherometer, and how can students be taught to minimize its impact during an experiment?",
    options: {
      A: "Incorrect alignment of the main scale reference line; avoid it by recalculating the index error.",
      B: "Non-uniformity of the measured wire; avoid it by taking readings at multiple perpendicular positions along the wire.",
      C: "Wear and tear of the screw threads; avoid it by turning the thimble in one direction only while taking a particular reading.",
      D: "Thermal expansion of the metal frame; avoid it by minimizing direct hand contact with the gauge."
    },
    correct: "C"
  },
  {
    id: 3,
    text: "In a spherometer experiment to determine the radius of curvature R of a spherical surface, the formula used is R = (l² / 6h) + (h / 2). What does the variable l represent?",
    options: {
      A: "The total diameter of the lens or curved surface under measurement.",
      B: "The vertical distance moved by the central screw from the flat plane.",
      C: "The pitch of the micrometer screw thread on the central pillar.",
      D: "The mean distance between any two fixed outer legs of the spherometer."
    },
    correct: "D"
  },
  {
    id: 4,
    text: "The mass and side length of a uniform copper cube are measured with maximum percentage errors of 1.5% and 1.0% respectively. What is the maximum percentage error in the calculated density of the cube?",
    options: {
      A: "4.5%",
      B: "2.5%",
      C: "3.5%",
      D: "5.5%"
    },
    correct: "A"
  },
  {
    id: 5,
    text: "Why is a small, high-density spherical brass bob preferred over a large wooden bob in a simple pendulum experiment to determine the acceleration due to gravity (g)?",
    options: {
      A: "To increase the period of oscillation so it can be timed manually with higher precision.",
      B: "To minimize air resistance effects and maintain a consistent, compact center of gravity.",
      C: "To reduce the physical tension on the supporting string thread.",
      D: "To allow the pendulum to oscillate with large angular amplitudes safely."
    },
    correct: "B"
  },
  {
    id: 6,
    text: "In a resonance tube experiment, the first resonance length is l₁ and the second resonance length is l₂. What is the standard expression for the end correction e?",
    options: {
      A: "e = l₂ − 2l₁",
      B: "e = (3l₁ − l₂) / 2",
      C: "e = (l₂ − 3l₁) / 2",
      D: "e = (l₂ − l₁) / 2"
    },
    correct: "C"
  },
  {
    id: 7,
    text: "Why are students strongly advised to configure experiment variables to obtain the null balance point near the middle of a metre bridge wire (around 40–60 cm)?",
    options: {
      A: "To ensure that both galvanometer terminals experience equal and symmetrical deflections.",
      B: "To prevent excessive current from flowing through the standard resistance arm.",
      C: "To reduce the effect of contact resistance introduced by the jockey on the bridge wire.",
      D: "To minimize the fractional percentage error in the balance length reading and achieve greater sensitivity."
    },
    correct: "D"
  },
  {
    id: 8,
    text: "In a potentiometer experiment, increasing the resistance in the primary (main) circuit using the rheostat has what effect on the potential gradient across the potentiometer wire?",
    options: {
      A: "The potential gradient decreases, requiring a longer wire length to balance the test EMF.",
      B: "The potential gradient increases, requiring a shorter wire length to balance the test EMF.",
      C: "The potential gradient remains unchanged, but the null point shifts toward the higher resistance end.",
      D: "The potential gradient doubles, effectively halving the sensitivity of the instrument."
    },
    correct: "A"
  },
  {
    id: 9,
    text: "In a potentiometer experiment to compare EMFs, if no balance point is found anywhere along the full length of the potentiometer wire, what is the most likely reason?",
    options: {
      A: "The jockey is making intermittent or poor electrical contact with the bridge wire.",
      B: "The EMF of the cell being tested exceeds the total potential drop across the entire potentiometer wire.",
      C: "The resistance of the galvanometer is too high, preventing current from flowing through the secondary loop.",
      D: "The driver cell has become fully discharged and cannot sustain any potential difference."
    },
    correct: "B"
  },
  {
    id: 10,
    text: "When measuring the coefficient of viscosity of a liquid using Stokes' Law (by observing the terminal velocity of a falling sphere), why must the radius of the measuring cylinder be very large compared to the radius of the falling ball?",
    options: {
      A: "To allow easier visual observation of the ball's motion through the viscous liquid.",
      B: "To prevent convection currents from forming in the liquid due to the ball's movement.",
      C: "To avoid wall effects that would artificially increase the viscous drag on the falling ball.",
      D: "To ensure the ball reaches terminal velocity before entering the marked measurement zone."
    },
    correct: "C"
  },
  {
    id: 11,
    text: "In a capillary rise experiment, what is the effect on the height of liquid rise if the outer surface of the capillary tube is greased before being dipped into the liquid?",
    options: {
      A: "The height of liquid rise increases because the grease reduces friction between the tube and liquid.",
      B: "The height of liquid rise remains unchanged because only the internal surface properties matter.",
      C: "The height of liquid rise decreases slightly due to increased tube weight from the grease coating.",
      D: "The height of liquid rise decreases significantly because grease reduces the adhesive force, increasing the contact angle."
    },
    correct: "D"
  },
  {
    id: 12,
    text: "In a convex lens experiment to find the focal length, which of the following graph coordinates produces a straight line that can be easily used to read the focal length from its intercepts?",
    options: {
      A: "A plot of 1/v on the Y-axis versus 1/u on the X-axis (using Cartesian sign conventions).",
      B: "A plot of direct image distance v versus direct object distance u.",
      C: "A plot of u² versus v².",
      D: "A plot of u on the Y-axis versus 1/v on the X-axis."
    },
    correct: "A"
  },
  {
    id: 13,
    text: "How can a trainee verify that parallax has been completely removed between an object pin and the real image pin on an optical bench?",
    options: {
      A: "By confirming that both pins are adjusted to the exact same vertical height from the base.",
      B: "By shifting the eye sideways; both pins must appear to move together without any relative displacement between their tips.",
      C: "By bringing the pins close enough together that their physical tips touch.",
      D: "By closing one eye and verifying that the image pin appears upright and sharp."
    },
    correct: "B"
  },
  {
    id: 14,
    text: "When plotting the relationship between the angle of incidence (i) and the angle of deviation (δ) for a glass prism, what is the characteristic shape of the resulting curve?",
    options: {
      A: "It remains entirely constant across all changes to the angle of incidence.",
      B: "It increases linearly as the angle of incidence increases.",
      C: "It decreases initially to a minimum value and then increases as the angle of incidence continues to rise.",
      D: "It forms a continuously decreasing curve that approaches zero asymptotically."
    },
    correct: "C"
  },
  {
    id: 15,
    text: "To convert a galvanometer of coil resistance G into an ammeter of a desired range 0 to I, a shunt resistance S is connected in parallel. If the full-scale deflection current is Ig, what is the correct formula for S?",
    options: {
      A: "S = (I − Ig) × G",
      B: "S = ((I − Ig) × G) / Ig",
      C: "S = (Ig × G) / I",
      D: "S = (Ig × G) / (I − Ig)"
    },
    correct: "D"
  },
  {
    id: 16,
    text: "When converting a galvanometer into a voltmeter, a high resistance R is connected in series. If the desired voltage range is V and the galvanometer resistance is G, what is the mathematically sound choice for R?",
    options: {
      A: "R = (V / Ig) − G",
      B: "R = (Ig / V) − G",
      C: "R = (V − G) / Ig",
      D: "R = V × Ig − G"
    },
    correct: "A"
  },
  {
    id: 17,
    text: "In a concave mirror experiment to find the focal length, what happens to the image if the lower half of the mirror's reflecting surface is covered with an opaque black paper?",
    options: {
      A: "Only the upper half of the object's image is visible on the screen.",
      B: "A full, complete image continues to form, but its total brightness/intensity is reduced.",
      C: "Only the lower half of the object's image is visible on the screen.",
      D: "The image disappears entirely because the principal axis is blocked."
    },
    correct: "B"
  },
  {
    id: 18,
    text: "When validating Newton's Law of Cooling, a graph of ln(θ − θ₀) versus time (t) is plotted (where θ is the container temperature and θ₀ is room temperature). What should the shape of this graph be?",
    options: {
      A: "A perfect parabola that opens upward.",
      B: "A straight line passing through the origin with a positive slope.",
      C: "A straight line with a negative slope.",
      D: "An exponential curve that approaches the horizontal time axis asymptotically."
    },
    correct: "C"
  },
  {
    id: 19,
    text: "In a sonometer experiment, if the wire tension T and linear mass density m are held constant, what relationship should be plotted to yield a straight line passing through the origin?",
    options: {
      A: "The square of frequency (f²) directly versus the length (l).",
      B: "Frequency (f) directly versus the vibrating length (l).",
      C: "Frequency (f) versus the square root of length.",
      D: "Frequency (f) on the Y-axis versus the reciprocal of length (1/l) on the X-axis."
    },
    correct: "D"
  },
  {
    id: 20,
    text: "In the forward bias characteristics of a p-n junction diode, what is the region before the current begins to rise sharply called, and what electrical barrier must be overcome?",
    options: {
      A: "Knee voltage region; the external forward voltage must overcome the internal potential barrier of the depletion layer.",
      B: "Breakdown voltage region; it corresponds to the thermal ionization of covalent bonds.",
      C: "Ohmic linear conduction region; it satisfies a fixed resistance ratio.",
      D: "Saturation current plateau; it is limited by minority carrier diffusion."
    },
    correct: "A"
  },
  {
    id: 21,
    text: "Why is it standard laboratory practice to disconnect the plug key in an electrical circuit between taking consecutive sets of readings?",
    options: {
      A: "Continuous current causes the battery's zero calibration to drift over time.",
      B: "Continuous current flow heats up the wires and resistors, which changes their resistance and introduces systematic errors.",
      C: "The internal coils of the ammeters and voltmeters may become permanently magnetized.",
      D: "To allow accumulated static charge on the insulation surfaces to dissipate."
    },
    correct: "B"
  },
  {
    id: 22,
    text: "A student uses a travelling microscope to measure the refractive index of a glass slab. They record three vertical positions: the real bottom mark (R₁), the apparent bottom mark viewed through the slab (R₂), and a powder mark on the top surface (R₃). What is the correct expression for the refractive index μ?",
    options: {
      A: "μ = (R₂ − R₁) / (R₃ − R₁)",
      B: "μ = (R₃ − R₂) / (R₃ − R₁)",
      C: "μ = (R₃ − R₁) / (R₃ − R₂)",
      D: "μ = (R₃ − R₁) / (R₂ − R₁)"
    },
    correct: "C"
  },
  {
    id: 23,
    text: "A spherometer screw advances by 2 mm over 4 complete rotations. If the circular scale contains 100 equal divisions, what is the calculated least count of this instrument?",
    options: {
      A: "0.05 mm",
      B: "0.01 mm",
      C: "0.002 mm",
      D: "0.005 mm"
    },
    correct: "D"
  },
  {
    id: 24,
    text: "When analyzing an experiment governed by the physical law y = kx², what variables should be plotted on the axes to determine the constant value k directly from the slope of a linear graph?",
    options: {
      A: "Plot y on the Y-axis versus x² on the X-axis.",
      B: "Plot y directly versus x.",
      C: "Plot √y versus x².",
      D: "Plot y versus 1/x."
    },
    correct: "A"
  },
  {
    id: 25,
    text: "What are 'end resistances' or 'end errors' in a metre bridge experiment, and how can they be minimized during calculations?",
    options: {
      A: "Resistances from the internal components of the driver cell; they are minimized by using a battery with a higher voltage output.",
      B: "Resistances due to the terminating copper strips and wire soldering contacts; they are minimized by repeating measurements after interchanging the positions of the unknown and standard resistors.",
      C: "Inaccuracies from variations in the bridge wire's cross-section; they are minimized by sliding the jockey firmly along the wire.",
      D: "Parallax errors at the extreme ends of the scale; they are minimized by using a magnifying glass to read the marks."
    },
    correct: "B"
  }
];

// ──────────────────────────────────────────────
//  FIRESTORE STORAGE FUNCTIONS  (async)
// ──────────────────────────────────────────────

/**
 * Save a submission to Firestore.
 * Also caches it in sessionStorage so result.html can read instantly.
 */
async function saveSubmission(submission) {
  await window.db.collection(CONFIG.firestoreCollection).doc(submission.id).set(submission);
}

/**
 * Fetch all submissions from Firestore, newest first.
 */
async function getSubmissions() {
  const snap = await window.db
    .collection(CONFIG.firestoreCollection)
    .orderBy('submittedAt', 'desc')
    .get();
  return snap.docs.map(d => d.data());
}

/**
 * Delete all submissions from Firestore using a batch.
 */
async function clearSubmissions() {
  const snap = await window.db.collection(CONFIG.firestoreCollection).get();
  if (snap.empty) return;
  const batch = window.db.batch();
  snap.docs.forEach(doc => batch.delete(doc.ref));
  await batch.commit();
}

/**
 * Real-time listener — calls callback(submissions[]) whenever data changes.
 * Returns the unsubscribe function.
 */
function subscribeToSubmissions(callback) {
  return window.db
    .collection(CONFIG.firestoreCollection)
    .orderBy('submittedAt', 'desc')
    .onSnapshot(snapshot => {
      const submissions = snapshot.docs.map(d => d.data());
      callback(submissions);
    }, err => {
      console.error('Firestore snapshot error:', err);
    });
}

// ──────────────────────────────────────────────
//  GRADING
// ──────────────────────────────────────────────

function gradeAnswers(answers) {
  let score = 0;
  const details = QUESTIONS.map((q, i) => {
    const given = answers[i] || null;
    const correct = q.correct;
    const isCorrect = given === correct;
    if (isCorrect) score++;
    return { questionId: q.id, given, correct, isCorrect };
  });
  return { score, total: QUESTIONS.length, passed: score >= CONFIG.passMark, details };
}

// ──────────────────────────────────────────────
//  UTILITIES
// ──────────────────────────────────────────────

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function formatDate(isoString) {
  return new Date(isoString).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

// ── Session helpers ────────────────────────────

function savePendingUser(name, email) {
  sessionStorage.setItem('quiz_pending_name', name);
  sessionStorage.setItem('quiz_pending_email', email);
}

function getPendingUser() {
  return {
    name: sessionStorage.getItem('quiz_pending_name') || '',
    email: sessionStorage.getItem('quiz_pending_email') || '',
  };
}

/** Store the full graded submission in sessionStorage for result.html */
function cacheSubmissionLocally(submission) {
  sessionStorage.setItem('quiz_last_submission', JSON.stringify(submission));
}

/** Read cached submission (set during quiz submit) */
function getCachedSubmission() {
  try {
    const raw = sessionStorage.getItem('quiz_last_submission');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
