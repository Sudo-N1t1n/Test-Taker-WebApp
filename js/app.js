// ═══════════════════════════════════════════════
//  app.js — Physics For Fun Quiz Engine
//  Shared across: index.html, quiz.html, result.html, admin.html
// ═══════════════════════════════════════════════

// ──────────────────────────────────────────────
//  §1  CONFIGURATION
// ──────────────────────────────────────────────
const CONFIG = {
  adminPassword: 'admin123',
  timerMinutes: 45,
  passMark: 10,
  totalQuestions: 25,
  firestoreCollection: 'submissions',
  firestoreCollectionPost: 'submissions_post',
};

// ──────────────────────────────────────────────
//  §2  QUESTION BANKS
// ──────────────────────────────────────────────

// ── Hindi ─────────────────────────────────────
const QUESTIONS_HI = [
  {
    id: 1,
    text: "वर्नियर कैलीपर्स का अल्पतमांक (Least Count) ज्ञात करने का सही मानक सूत्र क्या है?",
    options: {
      A: "वर्नियर पैमाने के एक भाग का मान / मुख्य पैमाने पर कुल भागों की संख्या",
      B: "मुख्य पैमाने के एक सबसे छोटे भाग का मान / वर्नियर पैमाने पर कुल भागों की संख्या",
      C: "मुख्य पैमाने के एक भाग का मान × वर्नियर पैमाने पर कुल भागों की संख्या",
      D: "मुख्य पैमाने का पाठ्यांक + वर्नियर का पाठ्यांक"
    },
    correct: "B"
  },
  {
    id: 2,
    text: "बीकर या कैलोरीमापी का आंतरिक व्यास (Internal diameter) मापने के लिए वर्नियर कैलीपर्स के किस भाग का उपयोग किया जाता है?",
    options: {
      A: "निचले जबड़ों (Lower jaws) का",
      B: "गहराई मापने वाली छड़ (Depth measuring prong) का",
      C: "मुख्य पैमाने (Main scale) के पिछले हिस्से का",
      D: "ऊपरी जबड़ों (Upper jaws) का"
    },
    correct: "D"
  },
  {
    id: 3,
    text: "स्क्रूगेज (Screw gauge) का उपयोग करते समय 'पिच त्रुटि' या 'बैकलैश त्रुटि' (Backlash error) से बचने के लिए छात्रों को क्या महत्वपूर्ण निर्देश देना चाहिए?",
    options: {
      A: "पेंच को बहुत तेजी से घुमाएं ताकि चूड़ियों के बीच घर्षण कम हो जाएं।",
      B: "पाठ्यांक लेने से पहले स्क्रूगेज को तेल या ग्रीस से पूरी तरह डुबो दें।",
      C: "पेंच को हमेशा एक ही दिशा में घुमाएं; यदि पेंच आगे निकल जाए, तो उसे वापस घुमाने के बजाय पूरी तरह खोलकर दोबारा कसें।",
      D: "हमेशा केवल मुख्य पैमाने का पाठ्यांक लें और वृत्तीय पैमाने को नजरअंदाज कर दें।"
    },
    correct: "C"
  },
  {
    id: 4,
    text: "स्फेरोमीटर द्वारा किसी गोलीय पृष्ठ की वक्रता त्रिज्या (R) ज्ञात करने के सूत्र R = (l² / 6h) + (h / 2) में 'l' क्या दर्शाता है?",
    options: {
      A: "स्फेरोमीटर के किन्हीं दो बाहरी स्थिर पैरों के बीच की औसत दूरी।",
      B: "मध्य पेंच (Central screw) द्वारा तय की गई ऊर्ध्वाधर दूरी।",
      C: "गोलीय पृष्ठ का कुल व्यास।",
      D: "स्फेरोमीटर के वृत्तीय पैमाने की परिधि।"
    },
    correct: "A"
  },
  {
    id: 5,
    text: "सदिशों के समांतर चतुर्भुज नियम के प्रयोग (ग्रेवसांडे उपकरण) में, धागों के जंक्शन (गांठ) की सही संतुलन स्थिति कब मानी जाती है?",
    options: {
      A: "जब गांठ बोर्ड के निचले हिस्से को छूने लगे।",
      B: "जब गांठ ठीक ऊर्ध्वाधर बोर्ड के मध्य में लगे दर्पण के सामने बिना किसी सहारे के स्थिर हो जाए और घिरनियों पर कोई घर्षण न हो।",
      C: "जब दोनों घिरनियों पर रखे गए बाटों का द्रव्यमान शून्य हो।",
      D: "जब धागे आपस में 90 डिग्री का कोण बनाएं।"
    },
    correct: "B"
  },
  {
    id: 6,
    text: "सरल लोलक के प्रयोग में, प्रभावी लम्बाई (L) और आवर्तकाल के वर्ग (T²) के बीच खींचा गया ग्राफ कैसा होता है?",
    options: {
      A: "एक परवलय (Parabola) जो L अक्ष की ओर झुका हो।",
      B: "एक अतिपरवलय (Hyperbola)।",
      C: "मूल बिंदु (Origin) से गुजरने वाली एक सरल रेखा।",
      D: "L अक्ष के समानांतर एक क्षैतिज रेखा।"
    },
    correct: "C"
  },
  {
    id: 7,
    text: "यदि सरल लोलक के प्रयोग में समान आकार परंतु भिन्न द्रव्यमान (Mass) के गोलकों का उपयोग किया जाए, तो समान लम्बाई के लिए आवर्तकाल (T) पर क्या प्रभाव पड़ेगा (वायु प्रतिरोध को नगण्य मानते हुए)?",
    options: {
      A: "भारी गोलक का आवर्तकाल अधिक होगा।",
      B: "आवर्तकाल अपरिवर्तित रहेगा क्योंकि यह लोलक के द्रव्यमान पर निर्भर नहीं करता।",
      C: "हल्के गोलक का आवर्तकाल अधिक होगा।",
      D: "आवर्तकाल पहले घटेगा और फिर बढ़ेगा।"
    },
    correct: "B"
  },
  {
    id: 8,
    text: "शीतलन वक्र (Cooling curve) के प्रयोग में, न्यूटन के शीतलन नियम का सत्यापन करने के लिए ln(θ − θ₀) और समय (t) के बीच ग्राफ खींचा जाता है। यह ग्राफ कैसा प्राप्त होता है?",
    options: {
      A: "धनात्मक प्रवणता (Positive slope) वाली एक सरल रेखा।",
      B: "एक वक्र (Curve) जो समय अक्ष को कभी नहीं छूता।",
      C: "ऋणात्मक प्रवणता (Negative slope) वाली एक सरल रेखा।",
      D: "समय अक्ष के समानांतर एक सीधी रेखा।"
    },
    correct: "C"
  },
  {
    id: 9,
    text: "मिश्रण विधि द्वारा ठोस की विशिष्ट ऊष्मा धारिता ज्ञात करने का प्रयोग किस मूल सिद्धांत पर आधारित है?",
    options: {
      A: "न्यूटन का शीतलन नियम।",
      B: "ऊष्मागतिकी का प्रथम नियम (ली गई ऊष्मा = दी गई ऊष्मा)।",
      C: "स्टीफन-बोल्ट्जमान का विकिरण नियम।",
      D: "पास्कल का नियम।"
    },
    correct: "B"
  },
  {
    id: 10,
    text: "स्वरमापी (Sonometer) के प्रयोग में, यदि तार का तनाव (T) नियत रखा जाए, तो तार की अनुनादी लम्बाई (l) और उसकी मूल आवृत्ति (n) के बीच क्या संबंध होता है?",
    options: {
      A: "n ∝ l (आवृत्ति, लम्बाई के अनुक्रमानुपाती होती है)",
      B: "n ∝ l² (आवृत्ति, लम्बाई के वर्ग के अनुक्रमानुपाती होती है)",
      C: "n ∝ √l (आवृत्ति, लम्बाई के वर्गमूल के अनुक्रमानुपाती होती है)",
      D: "n ∝ 1/l (आवृत्ति, लम्बाई के व्युत्क्रमानुपाती होती है)"
    },
    correct: "D"
  },
  {
    id: 11,
    text: "अनुनाद नली (Resonance tube) के प्रयोग में, यदि प्रथम अनुनाद स्थिति l₁ पर और द्वितीय अनुनाद स्थिति l₂ पर प्राप्त होती है, तो अंत्य संशोधन (End correction) 'e' का मान क्या होता है?",
    options: {
      A: "e = (l₂ − l₁) / 2",
      B: "e = 3l₂ − l₁",
      C: "e = (l₂ − 3l₁) / 2",
      D: "e = l₁ + l₂"
    },
    correct: "C"
  },
  {
    id: 12,
    text: "सीमान्त घर्षण बल (Fs) तथा अभिलम्ब प्रतिक्रिया बल (R) के बीच खींचा गया ग्राफ कैसा होता है और इसकी प्रवणता (Slope) क्या दर्शाती है?",
    options: {
      A: "यह मूल बिंदु से गुजरने वाली एक सरल रेखा होती है और इसकी प्रवणता स्थैतिक घर्षण गुणांक (μs) को दर्शाती है।",
      B: "यह एक वक्र (Curve) होता है और इसकी प्रवणता गुरुत्वीय त्वरण (g) को दर्शाती है।",
      C: "यह क्षैतिज अक्ष के समानांतर एक रेखा है जो दर्शाती है कि घर्षण प्रतिक्रिया बल पर निर्भर नहीं करता।",
      D: "यह एक सरल रेखा है जिसकी प्रवणता वस्तु के द्रव्यमान (m) को दर्शाती है।"
    },
    correct: "A"
  },
  {
    id: 13,
    text: "नत समतल (Inclined plane) पर गुरुत्व के अधीन एक रोलर को स्थिर रखने के लिए आवश्यक बल (F) और नत समतल के झुकाव कोण के ज्या (sin θ) के बीच खींचे गए ग्राफ की प्रकृति कैसी होती है?",
    options: {
      A: "मूल बिंदु से आरंभ होने वाली एक सीधी रेखा (Straight line)।",
      B: "एक परवलयाकार वक्र (Parabolic curve)।",
      C: "एक चरघातांकी वक्र (Exponential curve)।",
      D: "एक वृत्त (Circle) का चतुर्थांश।"
    },
    correct: "A"
  },
  {
    id: 14,
    text: "अवतल दर्पण की फोकस दूरी ज्ञात करने के लिए 1/u (X-अक्ष) और 1/v (Y-अक्ष) के बीच ग्राफ खींचने पर, अक्षों पर काटे गए अन्तःखण्ड (Intercepts) का मान किसके बराबर होता है?",
    options: {
      A: "f (फोकस दूरी) के सीधे बराबर।",
      B: "1/f के बराबर।",
      C: "2/f के बराबर।",
      D: "वक्रता त्रिज्या (R) के बराबर।"
    },
    correct: "B"
  },
  {
    id: 15,
    text: "उत्तल लेंस की फोकस दूरी ज्ञात करने के लिए वस्तु की दूरी (u) और प्रतिबिंब की दूरी (v) के बीच खींचा गया u-v ग्राफ किस ज्यामितीय आकार का होता है?",
    options: {
      A: "एक समकोणीय अतिपरवलय (Rectangular Hyperbola)।",
      B: "एक सरल रेखा (Straight line)।",
      C: "एक पूर्ण वृत्त (Perfect circle)।",
      D: "एक परवलय (Parabola)।"
    },
    correct: "A"
  },
  {
    id: 16,
    text: "प्रिज्म के प्रयोग में आपतन कोण (i) और विचलन कोण (δ) के बीच खींचे गए ग्राफ (i-δ वक्र) में 'न्यूनतम विचलन की स्थिति' (Angle of minimum deviation) में प्रिज्म के अंदर प्रकाश किरण का व्यवहार कैसा होता है?",
    options: {
      A: "प्रकाश किरण पूर्ण आंतरिक परावर्तन का अनुभव करती है।",
      B: "आपतन कोण और निर्गत कोण का योग शून्य हो जाता है।",
      C: "किरण बिना किसी अपवर्तन के सीधे निकल जाती है।",
      D: "प्रिज्म के अंदर अपवर्तित किरण प्रिज्म के आधार के समानांतर हो जाती है।"
    },
    correct: "D"
  },
  {
    id: 17,
    text: "उत्तल लेंस और समतल दर्पण की सहायता से किसी द्रव का अपवर्तनांक ज्ञात करने के प्रयोग में, जब लेंस और दर्पण के बीच द्रव डाला जाता है, तो वहाँ किस प्रकार का 'द्रव लेंस' (Liquid lens) बनता है?",
    options: {
      A: "समतल-उत्तल लेंस (Plano-convex lens)।",
      B: "समतल-अवतल लेंस (Plano-concave lens)।",
      C: "उभयोत्तल लेंस (Biconvex lens)।",
      D: "अवतलोत्तल लेंस (Concavo-convex lens)।"
    },
    correct: "B"
  },
  {
    id: 18,
    text: "मीटर सेतु (Meter bridge) में परिपथ के विभिन्न भागों को जोड़ने के लिए तांबे की मोटी पत्तियों (Thick copper strips) का उपयोग क्यों किया जाता है?",
    options: {
      A: "ताकि पत्तियों का अपना प्रतिरोध नगण्य (negligible) रहे और वे सेतु के संतुलन को प्रभावित न करें।",
      B: "ताकि प्रयोग के दौरान उच्च धारा बहने पर उपकरण गर्म न हो।",
      C: "ताकि जॉकी को सरकाने के लिए एक मजबूत यांत्रिक आधार मिल सके।",
      D: "ताकि तांबे की पट्टियां बाहरी चुंबकीय क्षेत्रों से परिपथ को 'शील्ड' (shield) कर सकें।"
    },
    correct: "A"
  },
  {
    id: 19,
    text: "मीटर सेतु के प्रयोग में, सबसे सटीक परिणाम प्राप्त करने और प्रतिशत त्रुटि को न्यूनतम करने के लिए शून्य विक्षेप स्थिति (Null point) तार के किस भाग पर प्राप्त करने का प्रयास करना चाहिए?",
    options: {
      A: "0 cm के सिरे के बहुत करीब।",
      B: "100 cm के सिरे के बहुत करीब।",
      C: "तार के बिल्कुल मध्य भाग के करीब (लगभग 40 cm से 60 cm के बीच)।",
      D: "कहीं भी, स्थिति से सटीकता पर कोई प्रभाव नहीं पड़ता।"
    },
    correct: "C"
  },
  {
    id: 20,
    text: "ओम के नियम के सत्यापन प्रयोग में, चालक तार के सिरों के बीच विभवान्तर मापने के लिए वोल्टमीटर को परिपथ में कैसे जोड़ा जाता है और क्यों?",
    options: {
      A: "श्रेणी क्रम (Series) में, ताकि यह परिपथ की कुल धारा को रोककर विभव को माप सके।",
      B: "समानांतर क्रम में, क्योंकि इसका प्रतिरोध बहुत कम होता है और यह परिपथ को शॉर्ट-सर्किट होने से बचाता है।",
      C: "श्रेणी क्रम में, ताकि बैटरी से निकलने वाली धारा वोल्टमीटर से होकर ही गुजरे।",
      D: "समानांतर क्रम (Parallel) में, क्योंकि समानांतर क्रम में विभवान्तर समान रहता है और इसका उच्च प्रतिरोध मुख्य धारा को प्रभावित नहीं करता।"
    },
    correct: "D"
  },
  {
    id: 21,
    text: "एक दिए गए धारामापी (Galvanometer) को एक निश्चित परास (Range) के वोल्टमीटर में बदलने के लिए क्या सैद्धांतिक समायोजन किया जाता है?",
    options: {
      A: "धारामापी के साथ श्रेणी क्रम (Series) में एक उच्च मान का प्रतिरोध (High resistance) जोड़ा जाता है।",
      B: "धारामापी के साथ समानांतर क्रम (Parallel) में एक कम मान का शंट प्रतिरोध (Shunt) जोड़ा जाता है।",
      C: "धारामापी के साथ श्रेणी क्रम में एक बहुत कम मान का प्रतिरोध जोड़ा जाता है।",
      D: "धारामापी के साथ समानांतर क्रम में एक उच्च मान का प्रतिरोध जोड़ा जाता है।"
    },
    correct: "A"
  },
  {
    id: 22,
    text: "धारामापी (Galvanometer) को अमीटर (Ammeter) में बदलने के लिए लगाए जाने वाले 'शंट' (Shunt) प्रतिरोध की क्या विशेषता होती है?",
    options: {
      A: "यह श्रेणी क्रम में लगा हुआ एक उच्च मान (High value) का प्रतिरोध होता है।",
      B: "यह श्रेणी क्रम में लगा हुआ एक बहुत कम मान का प्रतिरोध होता है।",
      C: "यह समानांतर क्रम में लगा हुआ एक बहुत कम मान (Low value) का प्रतिरोध होता है।",
      D: "यह समानांतर क्रम में लगा हुआ एक उच्च मान का प्रतिरोध होता है।"
    },
    correct: "C"
  },
  {
    id: 23,
    text: "P-N संधि डायोड (P-N junction diode) के अग्र अभिनति (Forward bias) अभिलाक्षणिक वक्र में, वह न्यूनतम विभव जिस पर धारा का मान चरघातांकी (exponentially) रूप से तेजी से बढ़ने लगता है, क्या कहलाता है?",
    options: {
      A: "नी वोल्टेज (Knee voltage) या cut-in वोल्टेज।",
      B: "भंजन वोल्टेज (Breakdown voltage)।",
      C: "निरोधी विभव (Stopping potential)।",
      D: "शिखर प्रतिलोम वोल्टेज (Peak Inverse Voltage)।"
    },
    correct: "A"
  },
  {
    id: 24,
    text: "प्रत्यावर्ती धारा (AC) मेन्स की आवृत्ति ज्ञात करने के लिए स्वरमापी (Sonometer) के प्रयोग में, यदि तार के बीच में एक नाल-चुंबक (Horseshoe magnet) रखा जाए, तो तार के कंपन की आवृत्ति (n) और AC मेन्स की आवृत्ति (f) में क्या संबंध होता है?",
    options: {
      A: "तार की आवृत्ति, AC मेन्स की आवृत्ति की दोगुनी होती है (n = 2f)।",
      B: "तार की आवृत्ति, AC मेन्स की आवृत्ति के बिल्कुल बराबर होती है (n = f)।",
      C: "तार की आवृत्ति, AC मेन्स की आवृत्ति की आधी होती है (n = f/2)।",
      D: "चुंबक की उपस्थिति से तार के कंपन की आवृत्ति पर कोई प्रभाव नहीं पड़ता।"
    },
    correct: "B"
  },
  {
    id: 25,
    text: "अवतल लेंस (Concave lens) की फोकस दूरी ज्ञात करने के प्रयोग में, अवतल लेंस को एक ज्ञात उत्तल लेंस (Convex lens) के संपर्क में क्यों रखा जाता है?",
    options: {
      A: "क्योंकि अवतल लेंस अकेले केवल आभासी (Virtual) प्रतिबिंब बनाता है जिसे पर्दे पर प्राप्त नहीं किया जा सकता।",
      B: "ताकि दोनों लेंसों के वर्ण विक्षेपण (Chromatic aberration) को खत्म किया जा सके।",
      C: "ताकि अवतल लेंस की सतह को खरोंच लगने से बचाया जा सके।",
      D: "क्योंकि प्रकाश केवल दो लेंसों के संयोजन से ही गुजर सकता है, अकेले अवतल लेंस से नहीं।"
    },
    correct: "A"
  }
];

// ── English ───────────────────────────────────
const QUESTIONS_EN = [
  { id: 1,  text: "What is the correct standard formula to find the least count of a Vernier calliper?", options: { A: "Value of one Vernier scale division / Total number of divisions on the main scale", B: "Value of one smallest main scale division / Total number of divisions on the Vernier scale", C: "Value of one main scale division × Total number of divisions on the Vernier scale", D: "Main scale reading + Vernier scale reading" }, correct: "B" },
  { id: 2,  text: "Which part of a Vernier calliper is used to measure the internal diameter of a beaker or calorimeter?", options: { A: "Lower jaws", B: "Depth measuring prong", C: "Back of the main scale", D: "Upper jaws" }, correct: "D" },
  { id: 3,  text: "What important instruction should be given to students to avoid backlash error when using a screw gauge or spherometer?", options: { A: "Rotate the screw very quickly to minimize friction between the threads.", B: "Fully immerse the screw gauge in oil or grease before taking readings.", C: "Always rotate the screw in one direction only; if it overshoots, open it fully and tighten again.", D: "Always take only the main scale reading and ignore the circular scale." }, correct: "C" },
  { id: 4,  text: "In the formula R = (l² / 6h) + (h / 2) used to determine the radius of curvature (R) of a spherical surface using a spherometer, what does the variable 'l' represent?", options: { A: "The mean distance between any two fixed outer legs of the spherometer.", B: "The vertical distance moved by the central screw.", C: "The total diameter of the spherical surface.", D: "The circumference of the circular scale of the spherometer." }, correct: "A" },
  { id: 5,  text: "In the experiment for the parallelogram law of vectors (Gravesand's apparatus), when is the equilibrium position of the junction (knot) of the threads considered correct?", options: { A: "When the knot touches the lower part of the board.", B: "When the knot becomes stable without any support right in front of the mirror fixed in the middle of the vertical board, and there is no friction on the pulleys.", C: "When the mass of the weights placed on both pulleys is zero.", D: "When the threads make an angle of 90 degrees with each other." }, correct: "B" },
  { id: 6,  text: "In a simple pendulum experiment, what is the nature of the graph plotted between the effective length (L) and the square of the time period (T²)?", options: { A: "A parabola inclined towards the L-axis.", B: "A rectangular hyperbola.", C: "A straight line passing through the origin.", D: "A horizontal line parallel to the L-axis." }, correct: "C" },
  { id: 7,  text: "If bobs of the same size but different masses are used in a simple pendulum experiment, what will be the effect on the time period (T) for the same length (neglecting air resistance)?", options: { A: "The time period of the heavier bob will be greater.", B: "The time period will remain unchanged because it does not depend on the mass of the pendulum.", C: "The time period of the lighter bob will be greater.", D: "The time period will first decrease and then increase." }, correct: "B" },
  { id: 8,  text: "In the cooling curve experiment, a graph is plotted between ln(θ − θ₀) and time (t) to verify Newton's law of cooling. What is the nature of this graph?", options: { A: "A straight line with a positive slope.", B: "A curve that never touches the time axis.", C: "A straight line with a negative slope.", D: "A straight line parallel to the time axis." }, correct: "C" },
  { id: 9,  text: "On which fundamental principle is the experiment to find the specific heat capacity of a solid by the method of mixtures based?", options: { A: "Newton's law of cooling.", B: "The first law of thermodynamics (Heat gained = Heat lost).", C: "Stefan-Boltzmann's law of radiation.", D: "Pascal's law." }, correct: "B" },
  { id: 10, text: "In a sonometer experiment, if the tension (T) in the wire is kept constant, what is the relationship between the resonant length (l) of the wire and its fundamental frequency (n)?", options: { A: "n ∝ l (Frequency is directly proportional to length)", B: "n ∝ l² (Frequency is directly proportional to the square of length)", C: "n ∝ √l (Frequency is directly proportional to the square root of length)", D: "n ∝ 1/l (Frequency is inversely proportional to length)" }, correct: "D" },
  { id: 11, text: "In a resonance tube experiment, if the first resonance position is obtained at l₁ and the second resonance position at l₂, what is the standard expression for the end correction 'e'?", options: { A: "e = (l₂ − l₁) / 2", B: "e = 3l₂ − l₁", C: "e = (l₂ − 3l₁) / 2", D: "e = l₁ + l₂" }, correct: "C" },
  { id: 12, text: "What is the nature of the graph drawn between the limiting friction force (Fs) and the normal reaction force (R), and what does its slope represent?", options: { A: "It is a straight line passing through the origin and its slope represents the coefficient of static friction (μs).", B: "It is a curve and its slope represents the acceleration due to gravity (g).", C: "It is a line parallel to the horizontal axis showing that friction does not depend on the reaction force.", D: "It is a straight line whose slope represents the mass (m) of the object." }, correct: "A" },
  { id: 13, text: "What is the nature of the graph drawn between the force (F) required to keep a roller stable under gravity on an inclined plane and the sine of the angle of inclination (sin θ)?", options: { A: "A straight line starting from the origin.", B: "A parabolic curve.", C: "An exponential curve.", D: "A quadrant of a circle." }, correct: "A" },
  { id: 14, text: "When plotting a graph between 1/u (X-axis) and 1/v (Y-axis) to find the focal length of a concave mirror, what is the value of the intercepts cut off on the axes equal to?", options: { A: "Directly equal to f (focal length).", B: "Equal to 1/f.", C: "Equal to 2/f.", D: "Equal to the radius of curvature (R)." }, correct: "B" },
  { id: 15, text: "What is the geometric shape of the u-v graph drawn between the object distance (u) and image distance (v) to find the focal length of a convex lens?", options: { A: "A rectangular hyperbola.", B: "A straight line.", C: "A perfect circle.", D: "A parabola." }, correct: "A" },
  { id: 16, text: "In the prism experiment, what is the behavior of the light ray inside the prism at the 'position of minimum deviation' in the graph drawn between the angle of incidence (i) and the angle of deviation (δ)?", options: { A: "The light ray experiences total internal reflection.", B: "The sum of the angle of incidence and angle of emergence becomes zero.", C: "The ray passes straight through without any refraction.", D: "The refracted ray inside the prism becomes parallel to the base of the prism." }, correct: "D" },
  { id: 17, text: "In the experiment to find the refractive index of a liquid using a convex lens and a plane mirror, what type of 'liquid lens' is formed when the liquid is placed between the lens and the mirror?", options: { A: "Plano-convex lens.", B: "Plano-concave lens.", C: "Biconvex lens.", D: "Concavo-convex lens." }, correct: "B" },
  { id: 18, text: "Why are thick copper strips used to connect different parts of the circuit in a meter bridge?", options: { A: "So that the resistance of the strips remains negligible and does not affect the balance of the bridge.", B: "To prevent the apparatus from heating up when high current flows during the experiment.", C: "To provide a strong mechanical base for sliding the jockey.", D: "So that the copper strips can shield the circuit from external magnetic fields." }, correct: "A" },
  { id: 19, text: "In a meter bridge experiment, to obtain the most accurate result and minimize fractional percentage error, on which part of the wire should one try to obtain the null point?", options: { A: "Very close to the 0 cm end.", B: "Very close to the 100 cm end.", C: "Close to the exact middle part of the wire (around 40 cm to 60 cm).", D: "Anywhere, the position does not affect accuracy." }, correct: "C" },
  { id: 20, text: "In the experiment to verify Ohm's law, how is the voltmeter connected in the circuit to measure the potential difference across the conducting wire, and why?", options: { A: "In series, so that it can measure the potential difference by stopping the total current of the circuit.", B: "In parallel, because its resistance is very low and it protects the circuit from short-circuiting.", C: "In series, so that the current coming from the battery passes only through the voltmeter.", D: "In parallel, because the potential difference remains the same in parallel combination and its high resistance does not affect the main current." }, correct: "D" },
  { id: 21, text: "What theoretical adjustment is made to convert a given galvanometer into a voltmeter of a specific range?", options: { A: "A high resistance is connected in series with the galvanometer.", B: "A low value shunt resistance is connected in parallel with the galvanometer.", C: "A very low value resistance is connected in series with the galvanometer.", D: "A high value resistance is connected in parallel with the galvanometer." }, correct: "A" },
  { id: 22, text: "What is the characteristic of the 'shunt' resistance used to convert a galvanometer into an ammeter?", options: { A: "It is a high value resistance connected in series.", B: "It is a very low value resistance connected in series.", C: "It is a very low value resistance (low value) connected in parallel.", D: "It is a high value resistance connected in parallel." }, correct: "C" },
  { id: 23, text: "In the forward bias characteristic curve of a P-N junction diode, what is the minimum potential at which the current begins to increase rapidly (exponentially) called?", options: { A: "Knee voltage or cut-in voltage.", B: "Breakdown voltage.", C: "Stopping potential.", D: "Peak Inverse Voltage." }, correct: "A" },
  { id: 24, text: "In the sonometer experiment to find the frequency of AC mains, if a horseshoe magnet is placed in the middle of the wire, what is the relationship between the frequency of vibration of the wire (n) and the frequency of the AC mains (f)?", options: { A: "The frequency of the wire is exactly twice the frequency of the AC mains (n = 2f).", B: "The frequency of the wire is exactly equal to the frequency of the AC mains (n = f).", C: "The frequency of the wire is half the frequency of the AC mains (n = f/2).", D: "The presence of the magnet has no effect on the frequency of vibration of the wire." }, correct: "B" },
  { id: 25, text: "In the experiment to find the focal length of a concave lens, why is the concave lens placed in contact with a known convex lens?", options: { A: "Because a concave lens alone forms only a virtual image which cannot be obtained on a screen.", B: "To eliminate the chromatic aberration of both lenses.", C: "To protect the surface of the concave lens from scratches.", D: "Because light can pass only through a combination of two lenses and not through a concave lens alone." }, correct: "A" }
];

// ──────────────────────────────────────────────
//  §3  LANGUAGE SELECTOR
// ──────────────────────────────────────────────
const QUESTIONS = (sessionStorage.getItem('quiz_language') === 'en')
  ? QUESTIONS_EN
  : QUESTIONS_HI;

// ──────────────────────────────────────────────
//  §4  FIRESTORE — Generic CRUD Helpers
//  All collection-specific functions delegate here.
// ──────────────────────────────────────────────

/** Sort submissions newest-first by submittedAt. */
function _sortByDate(arr) {
  return arr.slice().sort((a, b) => {
    const ta = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
    const tb = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
    return tb - ta;
  });
}

/** Get a Firestore CollectionReference for the given collection name. */
function _col(name) {
  return window.db.collection(name);
}

async function _saveDoc(collection, doc) {
  await _col(collection).doc(doc.id).set(doc);
}

async function _getAllDocs(collection) {
  const snap = await _col(collection).get();
  return _sortByDate(snap.docs.map(d => d.data()));
}

async function _clearCollection(collection) {
  const snap = await _col(collection).get();
  if (snap.empty) return;
  const batch = window.db.batch();
  snap.docs.forEach(doc => batch.delete(doc.ref));
  await batch.commit();
}

function _subscribeTo(collection, callback, onError) {
  return _col(collection).onSnapshot(
    { includeMetadataChanges: false },
    (snapshot) => {
      callback(_sortByDate(snapshot.docs.map(d => d.data())));
    },
    (err) => {
      console.error(`Firestore [${collection}] snapshot error:`, err);
      if (typeof onError === 'function') onError(err);
    }
  );
}

// ──────────────────────────────────────────────
//  §5  FIRESTORE — Pre-Test API
// ──────────────────────────────────────────────

const saveSubmission         = (sub) => _saveDoc(CONFIG.firestoreCollection, sub);
const getSubmissions         = ()    => _getAllDocs(CONFIG.firestoreCollection);
const clearSubmissions       = ()    => _clearCollection(CONFIG.firestoreCollection);
const subscribeToSubmissions = (cb, onErr) => _subscribeTo(CONFIG.firestoreCollection, cb, onErr);

// ──────────────────────────────────────────────
//  §6  FIRESTORE — Post-Test API
// ──────────────────────────────────────────────

const saveSubmissionPost         = (sub) => _saveDoc(CONFIG.firestoreCollectionPost, sub);
const getSubmissionsPost         = ()    => _getAllDocs(CONFIG.firestoreCollectionPost);
const clearSubmissionsPost       = ()    => _clearCollection(CONFIG.firestoreCollectionPost);
const subscribeToSubmissionsPost = (cb, onErr) => _subscribeTo(CONFIG.firestoreCollectionPost, cb, onErr);

// ──────────────────────────────────────────────
//  §7  FIRESTORE — Auto-Fill & Lookup
// ──────────────────────────────────────────────

/** Look up a pre-test submission by a field value (e.g. mobile, email). */
async function lookupPreTestByField(field, value) {
  try {
    const snap = await _col(CONFIG.firestoreCollection)
      .where(field, '==', value)
      .limit(1)
      .get();
    return snap.empty ? null : snap.docs[0].data();
  } catch (err) {
    console.warn('Auto-fill lookup failed:', err);
    return null;
  }
}

/** Fetch a single pre-test submission by its document ID. */
async function fetchPreTestById(id) {
  try {
    const doc = await _col(CONFIG.firestoreCollection).doc(id).get();
    return doc.exists ? doc.data() : null;
  } catch (err) {
    console.warn('Pre-test fetch failed:', err);
    return null;
  }
}

// ──────────────────────────────────────────────
//  §8  GRADING
// ──────────────────────────────────────────────

function gradeAnswers(answers) {
  let score = 0;
  const details = QUESTIONS.map((q, i) => {
    const given = answers[i] || null;
    const isCorrect = given === q.correct;
    if (isCorrect) score++;
    return { questionId: q.id, given, correct: q.correct, isCorrect };
  });
  return { score, total: QUESTIONS.length, passed: score >= CONFIG.passMark, details };
}

// ──────────────────────────────────────────────
//  §9  UTILITIES
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

// ──────────────────────────────────────────────
//  §10  SESSION HELPERS
// ──────────────────────────────────────────────

const _SESSION_KEYS = ['name', 'uniqueid', 'mobile', 'school', 'email'];

function savePendingUser(name, uniqueid, mobile, school, email) {
  const vals = { name, uniqueid, mobile, school, email };
  _SESSION_KEYS.forEach(k => sessionStorage.setItem(`quiz_pending_${k}`, vals[k]));
}

function getPendingUser() {
  const user = {};
  _SESSION_KEYS.forEach(k => { user[k] = sessionStorage.getItem(`quiz_pending_${k}`) || ''; });
  return user;
}

function cacheSubmissionLocally(submission) {
  sessionStorage.setItem('quiz_last_submission', JSON.stringify(submission));
}

function getCachedSubmission() {
  try {
    const raw = sessionStorage.getItem('quiz_last_submission');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

// ──────────────────────────────────────────────
//  §11  SCROLL REVEAL (runs on DOMContentLoaded)
// ──────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('js-enabled');

  // Fallback IntersectionObserver for browsers without scroll-driven animations
  if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.08 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
  }
});
