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
  firestoreCollectionPreBatch2: 'submissions_pre_batch2',
  firestoreCollectionPostBatch2: 'submissions_post_batch2',
  firestoreCollectionPostPracticalB2: 'submissions_post_practical_b2',
};

// ──────────────────────────────────────────────
//  §2  QUESTION BANKS
// ──────────────────────────────────────────────

// ── Hindi (Post-Test — Practical Skills) ────────
const QUESTIONS_HI = [
  {
    id: 1,
    text: "माइक्रोमीटर स्क्रूगेज के अंत में एक घर्षण-सीमित रैचेट प्रणाली (ratchet mechanism) क्यों प्रदान की जाती है?",
    options: {
      A: "मोटी वस्तुओं को मापते समय स्क्रू स्पिंडल के घूमने की गति को बढ़ाने के लिए।",
      B: "वस्तु से संपर्क होने पर स्पिंडल को कसकर लॉक करने के लिए ताकि दुर्घटनावश पाठ्यांक न बदले।",
      C: "वस्तु पर एकसमान, हल्का दबाव सुनिश्चित करने और वस्तु के विरूपण या चूड़ियों को घिसने से बचाने के लिए।",
      D: "वृत्तीय पैमाने की शून्य त्रुटि की स्वचालित रूप से गणना और समायोजन करने के लिए।"
    },
    correct: "C"
  },
  {
    id: 2,
    text: "यदि कोई छात्र मीटर सेतु के तार पर शून्य विक्षेप बिंदु खोजते समय जॉकी को जोर से रगड़ता या सरकाता है, तो तार को क्या संरचनात्मक क्षति होती है?",
    options: {
      A: "घर्षण के कारण तार में स्थानीय हॉटस्पॉट विकसित होते हैं और वह पिघल जाता है।",
      B: "तार का अनुप्रस्थ काट क्षेत्रफल असमान हो जाता है, जिससे प्रति इकाई लंबाई के नियत प्रतिरोध का नियम भंग होता है।",
      C: "यांत्रिक तनाव के कारण तांबे की टर्मिनल पट्टियाँ अपना कम प्रतिरोध खो देती हैं।",
      D: "सरकने वाले घर्षण के कारण गैल्वेनोमीटर के आंतरिक चुंबकीय कोर का संरेखण स्थायी रूप से बदल जाता है।"
    },
    correct: "B"
  },
  {
    id: 3,
    text: "चल-सूक्ष्मदर्शी (travelling microscope) का उपयोग करके कांच की सिल्ली (slab) का अपवर्तनांक ज्ञात करते समय, इसकी ऊपरी सतह पर लाइकोपोडियम पाउडर क्यों छिड़का जाता है?",
    options: {
      A: "सतह के परावर्तन को कम करने के लिए ताकि प्रकाश सुचारू रूप से गुजर सके।",
      B: "एक अन्यथा पारदर्शी और अदृश्य सतह पर फोकस करने के लिए एक स्पष्ट, दृश्यमान अपारदर्शी तल प्रदान करने के लिए।",
      C: "कांच के प्रकाशीय घनत्व से मिलान करने और अपवर्तक सीमा प्रभावों को समाप्त करने के लिए।",
      D: "कम शक्ति वाले लेंसों के लिए सिल्ली की आभासी गहराई को कृत्रिम रूप से बढ़ाने के लिए।"
    },
    correct: "B"
  },
  {
    id: 4,
    text: "किसी विद्युत रासायनिक सेल के विद्युत वाहक बल (EMF) को मापने के लिए उच्च प्रतिरोध वाले डिजिटल वोल्टमीटर की तुलना में विभवमापी (potentiometer) को कड़ाई से प्राथमिकता क्यों दी जाती है?",
    options: {
      A: "विभवमापी अत्यधिक पोर्टेबल, मजबूत और परिवेश के तापमान से पूरी तरह स्वतंत्र होता है।",
      B: "यह संतुलन पर शून्य-धारा विधी (null method) पर कार्य करता है, जिससे टेस्ट सेल से कोई धारा नहीं ली जाती और वास्तविक EMF मापा जाता है।",
      C: "इसका आंतरिक परिपथ प्रतिरोध कम होता है, जो बेहतर लॉगिंग के लिए मामूली वोल्टेज तरंगों को प्रवर्धित करता है।",
      D: "यह बिना किसी द्वितीयक समायोजन के प्रत्यावर्ती धारा (AC) और दिष्ट धारा (DC) को एक साथ माप सकता है।"
    },
    correct: "B"
  },
  {
    id: 5,
    text: "एक सरल लोलक के दोलनों को रिकॉर्ड करते समय, विराम घड़ी (stopwatch) को किस स्थिति पर शुरू करने से मानवीय प्रतिक्रिया सीमाओं के कारण होने वाली समय त्रुटियां न्यूनतम होती हैं?",
    options: {
      A: "अधिकतम स्थितिज ऊर्जा वाले चरम बाएं बिंदु पर।",
      B: "चरम सीधे बिंदु पर जहां वेग क्षण भर के लिए शून्य हो जाता है।",
      C: "एक चुनी हुई दिशा में निरंतर गति करते हुए केंद्रीय माध्य स्थिति (mean position) पर।",
      D: "किसी भी मनमाने स्थान पर, बशर्ते कुल कोणीय विस्थापन 15 डिग्री से ऊपर रखा जाए।"
    },
    correct: "C"
  },
  {
    id: 6,
    text: "उत्तल लेंस की फोकस दूरी ज्ञात करने की विस्थापन विधि (displacement method) में, वस्तु पिन और पर्दे के बीच की निश्चित दूरी (D) के संबंध में क्या अनिवार्य शर्त है?",
    options: {
      A: "D का मान फोकस दूरी के दोगुने (2f) के ठीक बराबर होना चाहिए।",
      B: "D का मान फोकस दूरी के चार गुने (4f) से कड़ाई से कम होना चाहिए।",
      C: "D का मान फोकस दूरी के चार गुने (4f) से कड़ाई से अधिक होना चाहिए।",
      D: "D का मान सहायक लेंस तत्वों के वक्रता त्रिज्या से मेल खाना चाहिए।"
    },
    correct: "C"
  },
  {
    id: 7,
    text: "एक आदर्श अमीटर/धारामापी और एक आदर्श वोल्टमीटर के आंतरिक प्रतिरोध का आदर्श मान क्रमशः क्या होता है?",
    options: {
      A: "शून्य ओम और अनंत ओम।",
      B: "अनंत ओम और शून्य ओम।",
      C: "गैल्वेनोमीटर प्रतिरोध (G) के बराबर और शून्य ओम।",
      D: "अनंत ओम और अनंत ओम।"
    },
    correct: "A"
  },
  {
    id: 8,
    text: "न्यूटन के शीतलन नियम के प्रयोग के दौरान कैलोरीमापी के अंदर के पानी को लगातार क्यों हिलाया (stir) जाना चाहिए?",
    options: {
      A: "विकिरण शीतलन की समग्र दर को कृत्रिम रूप से तेज करने के लिए।",
      B: "शीतलन अंतराल के दौरान पूरे तरल आयतन में एकसमान तापमान वितरण बनाए रखने के लिए।",
      C: "पात्र की खुली ऊपरी सतह से वाष्पीकरण के कारण होने वाली हानि को रोकने के लिए।",
      D: "आंतरिक तांबे के बर्तन के प्रभावी जल तुल्यांक को व्यवस्थित रूप से न्यूनतम करने के लिए।"
    },
    correct: "B"
  },
  {
    id: 9,
    text: "ग्लिसरीन से भरे एक लंबे कांच के बेलन का उपयोग करके सीमान्त वेग (terminal velocity) के प्रयोग में, स्टील की गेंद को उच्चतम संदर्भ चिह्न से थोड़ा ऊपर से क्यों गिराया जाता है?",
    options: {
      A: "गेंद को पर्याप्त प्रारंभिक संवेग देने के लिए ताकि वह चिपचिपे तरल के पृष्ठ तनाव को भेद सके।",
      B: "यह सुनिश्चित करने के लिए कि समय अंतराल शुरू होने से पहले गिरती हुई गेंद ने पूरी तरह से अपना नियत सीमान्त वेग प्राप्त कर लिया हो।",
      C: "गेंद को एक तरफ झुकने और कंटेनर की दीवार की सीमाओं से टकराने से रोकने के लिए।",
      D: "गिरने वाली वस्तु की सतह के चारों ओर सूक्ष्म वायु बुलबुलों के निर्माण को समाप्त करने के लिए।"
    },
    correct: "B"
  },
  {
    id: 10,
    text: "अर्ध-विक्षेप विधि (half-deflection method) द्वारा गैल्वेनोमीटर का प्रतिरोध (G) ज्ञात करने में, बैटरी के साथ श्रेणीक्रम में जुड़े उच्च प्रतिरोध बॉक्स (R) की प्राथमिक भूमिका क्या है?",
    options: {
      A: "मुख्य परिपथ की धारा को इतना कम रखना कि प्रारंभिक विक्षेप पैमाने की सीमाओं के भीतर रहे।",
      B: "एक समायोज्य शंट के रूप में कार्य करना जो बैटरी सेल के आंतरिक प्रतिरोध को पूरी तरह से संतुलित करता है।",
      C: "गैल्वेनोमीटर निलंबन कुंडली के आंतरिक योग्यता गुणांक (figure of merit) को बदलना।",
      D: "द्वितीयक परिपथ लूप को बाहरी विद्युत चुंबकीय लाइन शोर से अलग करना।"
    },
    correct: "A"
  },
  {
    id: 11,
    text: "यदि एक ऊर्ध्वाधर केशिका नली (capillary tube) को पानी में डुबोए रखते हुए ऊर्ध्वाधर रेखा से α कोण पर झुका दिया जाए, तो ऊर्ध्वाधर ऊंचाई (h) और नली के अनुदिश लंबाई (l) कैसे प्रभावित होती हैं?",
    options: {
      A: "ऊर्ध्वाधर ऊंचाई (h) और नली के अनुदिश लंबाई (l) दोनों बढ़ जाती हैं।",
      B: "ऊर्ध्वाधर ऊंचाई (h) अपरिवर्तित रहती है, लेकिन नली के अनुदिश लंबाई (l) बढ़ जाती है।",
      C: "ऊर्ध्वाधर ऊंचाई (h) बढ़ जाती है, लेकिन नली के अनुदिश लंबाई (l) अपरिवर्तित रहती है।",
      D: "झुकाव कोण के बावजूद दोनों पैरामीटर पूरी तरह से अपरिवर्तित रहते हैं।"
    },
    correct: "B"
  },
  {
    id: 12,
    text: "एक छात्र स्वरमापी (sonometer) के स्टील के तार को एक अन्य स्टील के तार से बदलता है जिसका व्यास पहले वाले से दोगुना है। समान तनाव (T) के तहत, मूल आवृत्ति में क्या परिवर्तन होता है?",
    options: {
      A: "मूल आवृत्ति दोगुनी हो जाती है।",
      B: "मूल आवृत्ति पूरी तरह से अपरिवर्तित रहती है।",
      C: "मूल आवृत्ति आधी हो जाती है।",
      D: "मूल आवृत्ति रूट दो (√2) के कारक से बढ़ जाती है।"
    },
    correct: "C"
  },
  {
    id: 13,
    text: "एक सिलिकॉन P-N संधि डायोड के पश्च अभिनति (reverse bias) मोड में, भंजन विभव से कम मानों के लिए पश्च धारा लगभग नियत और बहुत कम क्यों रहती है?",
    options: {
      A: "आरोपित क्षेत्र अवक्षय परत के आंतरिक विभव प्राचीर को शून्य तक कम कर देता है।",
      B: "धारा विशेष रूप से अल्पसंख्यक वाहकों (minority carriers) द्वारा ले जाई जाती है, जिनकी सांद्रता वोल्टेज के बजाय तापमान पर निर्भर करती है।",
      C: "बहुसंख्यक आवेश वाहक अत्यंत संकीर्ण संधि क्षेत्र से आसानी से टनल कर जाते हैं।",
      D: "बल्क सेमीकंडक्टर का अग्र प्रतिरोध पूर्ण शून्य न्यूनतम तक गिर जाता है।"
    },
    correct: "B"
  },
  {
    id: 14,
    text: "प्रयोगशाला में परिपथ कनेक्शन बनाने से पहले जोड़ने वाले तांबे के तारों के सिरों को रेगमाल (sandpaper) से अच्छी तरह क्यों साफ किया जाता है?",
    options: {
      A: "कॉम्पैक्ट टर्मिनल क्लैंपिंग के लिए तारों की भौतिक मोटाई को कम करने के लिए।",
      B: "इन्सुलेटिंग ऑक्साइड परतों को हटाने और एक स्वच्छ, कम प्रतिरोध वाले धातु-से-धातु विद्युत संपर्क को सुनिश्चित करने के लिए।",
      C: "तनाव के तहत आंतरिक तांबे के कोर के संरचनात्मक लचीलेपन को बढ़ाने के लिए।",
      D: "रनटाइम के दौरान जूल हीटिंग प्रभावों के कारण तार को फैलने से रोकने के लिए।"
    },
    correct: "B"
  },
  {
    id: 15,
    text: "यदि एक कांच के प्रिज्म को पूरी तरह से साफ पानी के टब में डुबो दिया जाए, तो हवा की तुलना में इसके न्यूनतम विचलन कोण (δm) में क्या परिवर्तन होगा?",
    options: {
      A: "न्यूनतम विचलन कोण बढ़ जाता है।",
      B: "न्यूनतम विचलन कोण घट जाता है।",
      C: "न्यूनतम विचलन कोण बिल्कुल समान रहता है।",
      D: "न्यूनतम विचलन कोण तुरंत गिरकर शून्य हो जाता है।"
    },
    correct: "B"
  },
  {
    id: 16,
    text: "जब एक पेचदार स्प्रिंग (helical spring) से द्रव्यमान M लटकाया जाता है, तो द्रव्यमान M (Y-अक्ष) बनाम विस्तार x (X-अक्ष) का ग्राफ एक सरल रेखा देता है। इस ग्राफ की प्रवणता (slope = m) से स्प्रिंग नियतांक (k) कैसे प्राप्त किया जाता है?",
    options: {
      A: "k = m",
      B: "k = 1 / m",
      C: "k = m × g",
      D: "k = g / m"
    },
    correct: "C"
  },
  {
    id: 17,
    text: "एक वस्तु पिन को अवतल दर्पण के वक्रता केंद्र (C) पर ठीक रखा गया है। इसका वास्तविक प्रतिबिंब कहाँ बनेगा, और उसका अभिविन्यास (orientation) क्या होगा?",
    options: {
      A: "फोकस बिंदु (F) पर, सीधा और अत्यधिक आवर्धित।",
      B: "अनंत पर, उल्टा और अत्यधिक छोटा।",
      C: "वक्रता केंद्र (C) पर, उल्टा और वस्तु के समान आकार का।",
      D: "दर्पण के पीछे, आभासी और सीधा।"
    },
    correct: "C"
  },
  {
    id: 18,
    text: "कौन सा संशोधन विभवमापी (potentiometer) सेटअप की परिचालन सुग्राहिता (operational sensitivity) को प्रभावी ढंग से बढ़ाता है?",
    options: {
      A: "प्राथमिक ड्राइविंग बैटरी सेल के विद्युत वाहक बल (EMF) को बढ़ाकर।",
      B: "बहु-तार विभवमापी लेआउट की कुल पथ लंबाई को कम करके।",
      C: "तार की लंबाई बढ़ाकर या प्राथमिक लूप में श्रेणीक्रम प्रतिरोध जोड़कर विभव प्रवणता (potential gradient) को कम करके।",
      D: "कॉन्स्टेंटन के स्थान पर तांबे के मोटे स्लाइड तार का उपयोग करके।"
    },
    correct: "C"
  },
  {
    id: 19,
    text: "जेनर डायोड के पश्च अभिनति प्रयोग में, जेनर भंजन देहली वोल्टेज (Zener breakdown threshold voltage) पार होने के बाद प्राथमिक परिचालन विशेषता क्या देखी जाती है?",
    options: {
      A: "परिपथ लूप की धारा तुरंत शून्य हो जाती है।",
      B: "पश्च धारा तेजी से बढ़ने पर भी जेनर डायोड के सिरों पर वोल्टेज लगभग नियत रहता है।",
      C: "जेनर डायोड जल जाता है और स्थायी रूप से खुले परिपथ (open-circuit) मार्ग के रूप में कार्य करता है।",
      D: "बहुसंख्यक वाहक टर्मिनलों पर गतिशील रूप से अपनी संरचनात्मक ध्रुवीयता बदलते हैं।"
    },
    correct: "B"
  },
  {
    id: 20,
    text: "एक गर्म, आर्द्र गर्मी के दिन अनुनाद नली (resonance tube) के प्रयोग द्वारा परिकलित ध्वनि की गति, एक ठंडे, शुष्क सर्दियों के दिन से भिन्न क्यों होती है?",
    options: {
      A: "उच्च तापमान और आर्द्रता हवा के घनत्व को कम कर देते हैं, जिससे ध्वनि की गति बढ़ जाती है।",
      B: "उच्च तापमान के कारण स्वरित्र द्विभुज (tuning fork) की आवृत्ति में अत्यधिक बदलाव आता है।",
      C: "बढ़ी हुई जल वाष्प सामग्री अंत्य संशोधन (end correction) कारक को पूर्ण शून्य पर सीमित कर देती है।",
      D: "धातु की नली की दीवार के ध्वनिक गुण फैलते हैं, जिससे संरचनात्मक अनुनाद अवमंदन (resonance damping) होता है।"
    },
    correct: "A"
  },
  {
    id: 21,
    text: "समांतर चतुर्भुज बल उपकरण (ग्रेवसांडे उपकरण) में लटकती हुई डोरियों के नीचे एक छोटा समतल दर्पण पट्टी क्यों रखी जाती है?",
    options: {
      A: "ड्राइंग पेज पर कमरे की ओवरहेड लाइटिंग को परावर्तित करने के लिए।",
      B: "बल सदिशों को चिह्नित करने से पहले धागे और उसके परावर्तन के एक सीध में होने को सुनिश्चित करके लंबन त्रुटि (parallax error) को समाप्त करने के लिए।",
      C: "लकड़ी के बोर्ड आवरण में किसी भी मामूली क्षैतिज झुकाव को संतुलित करने के लिए।",
      D: "वजन के तनाव के कारण ड्राइंग पेपर को मुड़ने से रोकने के लिए।"
    },
    correct: "B"
  },
  {
    id: 22,
    text: "एक सहायक उत्तल लेंस का उपयोग करके अवतल लेंस की फोकस दूरी ज्ञात करने के लिए दोनों तत्वों को कड़े संपर्क में रखा जाता है। यदि संयुक्त लेंस प्रणाली एक अपसारी (diverging) प्रणाली के रूप में कार्य करती है, तो क्या निष्कर्ष निकाला जा सकता है?",
    options: {
      A: "अवतल लेंस की फोकस दूरी उत्तल लेंस की फोकस दूरी से कम है।",
      B: "अवतल लेंस की फोकस दूरी उत्तल लेंस की फोकस दूरी से अधिक है।",
      C: "दोनों लेंस तत्वों में समान फोकस शक्ति विन्यास हैं।",
      D: "प्रायोगिक सेटअप अमान्य है और वास्तविक छवि निर्देशांक नहीं दे सकता।"
    },
    correct: "A"
  },
  {
    id: 23,
    text: "एक वर्नियर कैलीपर्स में -0.03 cm की ऋणात्मक शून्य त्रुटि है। यदि एक बेलन के व्यास का असंशोधित कच्चा माप 2.45 cm आता है, तो इसका वास्तविक संशोधित मान क्या है?",
    options: {
      A: "2.42 cm",
      B: "2.48 cm",
      C: "2.45 cm",
      D: "2.51 cm"
    },
    correct: "B"
  },
  {
    id: 24,
    text: "एक डिजिटल मल्टीमीटर को डायोड टेस्ट मोड पर सेट किया गया है। जब लाल प्रोब टर्मिनल X को और काला प्रोब टर्मिनल Y को छूता है, तो मल्टीमीटर का पाठ्यांक 0.7V होता है। जब इसे उलट दिया जाता है, तो यह 'OL' (ओपन लूप) प्रदर्शित करता है। यह क्या सत्यापित करता है?",
    options: {
      A: "टर्मिनल X एक कार्यात्मक डायोड का कैथोड (N-प्रकार क्षेत्र) है।",
      B: "टर्मिनल X एक कार्यात्मक डायोड का एनोड (P-प्रकार क्षेत्र) है।",
      C: "डायोड में आंतरिक शॉर्ट-सर्किट भंजन (breakdown) हुआ है।",
      D: "टर्मिनल Y एक कार्यात्मक डायोड का एनोड (P-प्रकार क्षेत्र) है।"
    },
    correct: "B"
  },
  {
    id: 25,
    text: "एक ओम के नियम के सेटअप में, वोल्टमीटर ±0.1V की सटीकता सीमा के साथ 4.0V पढ़ता है, और अमीटर ±0.05A की सटीकता सीमा के साथ 2.0A पढ़ता है। परिकलित प्रतिरोध (R) में अधिकतम प्रतिशत त्रुटि क्या है?",
    options: {
      A: "2.5%",
      B: "5.0%",
      C: "1.5%",
      D: "7.5%"
    },
    correct: "B"
  }
];

// ── English (Post-Test — Practical Skills) ────────
const QUESTIONS_EN = [
  { id: 1,  text: "Why is a friction-limiting ratchet mechanism provided at the end of a micrometer screw gauge?", options: { A: "To speed up the rotation of the screw spindle when measuring thick objects.", B: "To lock the spindle tightly once it contacts the object to prevent accidental shifts.", C: "To ensure uniform, gentle pressure on the object and prevent structural deformation or thread wear.", D: "To automatically calculate and offset the zero error of the circular scale." }, correct: "C" },
  { id: 2,  text: "What structural damage is caused if a student continuously slides the jockey hard against a metre bridge wire while searching for the null point?", options: { A: "The wire develops localized hotspots and melts due to frictional heating.", B: "The cross-sectional area of the wire becomes non-uniform, violating the core resistance-per-unit-length assumption.", C: "The copper terminal strips lose their low-resistance properties due to mechanical stress.", D: "The sliding friction permanently alters the magnetic core alignment of the galvanometer." }, correct: "B" },
  { id: 3,  text: "While determining the refractive index of a glass slab using a travelling microscope, why is lycopodium powder sprinkled on its top surface?", options: { A: "To minimize surface reflections and allow light to pass through smoothly.", B: "To provide a clear, visible, opaque focal plane on an otherwise transparent and invisible boundary.", C: "To match the optical density of the glass and eliminate refractive boundary effects.", D: "To artificially increase the apparent depth of the slab for low-power lenses." }, correct: "B" },
  { id: 4,  text: "Why is a potentiometer strictly preferred over a high-resistance digital voltmeter to measure the electromotive force (EMF) of an electrochemical cell?", options: { A: "The potentiometer is highly portable, robust, and completely independent of ambient temperature.", B: "It operates on a zero-current null method at balance, drawing no current from the test cell and thus measuring true EMF.", C: "It has a lower internal circuit resistance, which amplifies minor voltage ripples for better logging.", D: "It can measure alternating current and direct current simultaneously without secondary adjustments." }, correct: "B" },
  { id: 5,  text: "While recording oscillations of a simple pendulum, starting the stopwatch at which position minimizes timing errors caused by human reaction limits?", options: { A: "The extreme left point of maximum potential energy.", B: "The extreme right point where velocity drops to zero momentarily.", C: "The central mean position while moving consistently in a single chosen direction.", D: "Any arbitrary position, provided the total angular displacement is kept above 15 degrees." }, correct: "C" },
  { id: 6,  text: "In the displacement method to determine the focal length of a convex lens, what is the mandatory condition regarding the fixed distance (D) between the object pin and the screen?", options: { A: "D must be exactly equal to twice the focal length (2f).", B: "D must be strictly less than four times the focal length (4f).", C: "D must be strictly greater than four times the focal length (4f).", D: "D must match the radius of curvature of the auxiliary lens elements." }, correct: "C" },
  { id: 7,  text: "What are the ideal internal resistance values for an ideal ammeter and an ideal voltmeter respectively?", options: { A: "Zero ohms and Infinite ohms.", B: "Infinite ohms and Zero ohms.", C: "Equal to the galvanometer resistance (G) and Zero ohms.", D: "Infinite ohms and Infinite ohms." }, correct: "A" },
  { id: 8,  text: "Why must the water inside the calorimeter block be stirred continuously during Newton's law of cooling experiment?", options: { A: "To accelerate the overall rate of radiation cooling artificially.", B: "To maintain a uniform temperature distribution throughout the liquid volume during cooling intervals.", C: "To prevent evaporation loss from the open upper surface of the vessel.", D: "To systematically minimize the effective thermal water equivalent of the inner copper container." }, correct: "B" },
  { id: 9,  text: "In a terminal velocity experiment using a tall glass cylinder filled with glycerin, why is the steel ball dropped from a height slightly above the highest reference mark?", options: { A: "To give the sphere enough initial momentum to pierce the sticky liquid surface tension.", B: "To ensure the falling sphere has fully achieved its constant terminal velocity before the timed interval begins.", C: "To prevent the sphere from veering sideways and striking the boundaries of the container wall.", D: "To eliminate the formation of micro-air bubbles around the falling object's surface." }, correct: "B" },
  { id: 10, text: "In the half-deflection method to determine galvanometer resistance (G), what is the primary role of the high resistance box (R) connected in series with the battery?", options: { A: "To keep the main circuit current small enough to ensure the initial deflection stays within scale bounds.", B: "To act as an adjustable shunt that perfectly balances the internal resistance of the battery cell.", C: "To alter the intrinsic figure of merit of the galvanometer suspension coil.", D: "To isolate the secondary circuit loop from external electromagnetic line noise." }, correct: "A" },
  { id: 11, text: "If a vertical capillary tube is tilted by an angle α relative to the vertical line while immersed in water, how are the vertical height (h) and the length along the tube (l) affected?", options: { A: "Both the vertical height (h) and the length along the tube (l) increase.", B: "The vertical height (h) remains unchanged, but the length along the tube (l) increases.", C: "The vertical height (h) increases, but the length along the tube (l) remains unchanged.", D: "Both parameters remain entirely unchanged regardless of the tilt angle." }, correct: "B" },
  { id: 12, text: "A student replaces a steel sonometer wire with another steel wire that has double the diameter. Under the same tension (T), how does the fundamental frequency change?", options: { A: "The fundamental frequency doubles.", B: "The fundamental frequency remains completely unchanged.", C: "The fundamental frequency is halved.", D: "The fundamental frequency increases by a factor of root two." }, correct: "C" },
  { id: 13, text: "In the reverse bias mode of a silicon P-N junction diode, why does the reverse current remain nearly constant and small for variations in reverse voltage below breakdown?", options: { A: "The applied field lowers the potential barrier of the depletion region to zero.", B: "The current is carried exclusively by minority carriers, whose concentration depends on temperature rather than voltage.", C: "Majority charge carriers tunnel effortlessly through the extremely narrow junction area.", D: "The forward resistance of the bulk semiconductor drops to a absolute zero minimum." }, correct: "B" },
  { id: 14, text: "Why are the ends of connecting copper wires thoroughly cleaned with sandpaper before making circuit connections in the lab?", options: { A: "To reduce the physical thickness of the wires for compact terminal clamping.", B: "To strip away insulating oxide layers and ensure a clean, low-resistance metal-to-metal electrical contact.", C: "To increase the structural flexibility of the inner copper cores under stress.", D: "To prevent the wire from expanding due to Joule heating effects during runtime." }, correct: "B" },
  { id: 15, text: "If a glass prism is completely submerged in a trough of clean water, how does its angle of minimum deviation (δm) change compared to its value in air?", options: { A: "The angle of minimum deviation increases.", B: "The angle of minimum deviation decreases.", C: "The angle of minimum deviation remains exactly the same.", D: "The angle of minimum deviation drops immediately to zero." }, correct: "B" },
  { id: 16, text: "When a mass M is suspended from a helical spring, a graph of mass M (Y-axis) versus extension x (X-axis) yields a straight line. How is the spring constant (k) derived from the slope (m) of this graph?", options: { A: "k = m", B: "k = 1 / m", C: "k = m × g", D: "k = g / m" }, correct: "C" },
  { id: 17, text: "An object pin is placed exactly at the center of curvature (C) of a concave mirror. Where will its real image form, and what will be its orientation?", options: { A: "At the focal point (F), upright and highly magnified.", B: "At infinity, inverted and infinitely reduced.", C: "At the center of curvature (C), inverted and of identical size.", D: "Behind the mirror casing, virtual and upright." }, correct: "C" },
  { id: 18, text: "Which modification effectively increases the operational sensitivity of a potentiometer setup?", options: { A: "Increasing the electromotive force (EMF) of the primary driving battery cell.", B: "Decreasing the total path length of the multi-wire potentiometer layout.", C: "Reducing the potential gradient by increasing wire length or adding series resistance to the primary loop.", D: "Switching to a thicker slide wire made of copper instead of constantan." }, correct: "C" },
  { id: 19, text: "In a Zener diode reverse characteristics experiment, what is the primary operational trait observed once the Zener breakdown threshold voltage is crossed?", options: { A: "The circuit loop current immediately drops to zero.", B: "The voltage across the Zener diode remains nearly constant even as the reverse current increases sharply.", C: "The Zener diode burns out and acts permanently as an open-circuit path.", D: "Majority carriers dynamically change their structural polarity across terminals." }, correct: "B" },
  { id: 20, text: "Why does the speed of sound calculated via a resonance tube experiment on a hot, humid summer day differ from a cold, dry winter day?", options: { A: "High temperatures and humidity lower the air density, which increases the speed of sound.", B: "High temperatures cause the frequency of the tuning fork to shift drastically.", C: "Increased water vapor contents clamp the end correction factor to absolute zero.", D: "The acoustic properties of the metal tube wall expand, causing structural resonance damping." }, correct: "A" },
  { id: 21, text: "Why is a small plane mirror strip placed beneath the hanging cords in a vector parallelogram apparatus (Gravesand's apparatus)?", options: { A: "To reflect overhead room lighting onto the drawing page.", B: "To eliminate parallax error by ensuring the thread is aligned with its reflection before marking force vectors.", C: "To balance out any minor horizontal tilts in the wooden board casing.", D: "To prevent the drawing paper from warping under weight tension." }, correct: "B" },
  { id: 22, text: "To determine the focal length of a concave lens using an auxiliary convex lens, the two elements are placed in tight contact. If the combined lens pair acts as a diverging system, what can be inferred?", options: { A: "The focal length of the concave lens is shorter than that of the convex lens.", B: "The focal length of the concave lens is longer than that of the convex lens.", C: "Both lens elements have identical focal power configurations.", D: "The experimental setup is invalid and cannot yield real image coordinates." }, correct: "A" },
  { id: 23, text: "A Vernier calliper has a negative zero error of 0.03 cm. If the uncorrected raw measurement of a cylinder's diameter reads 2.45 cm, what is the true corrected value?", options: { A: "2.42 cm", B: "2.48 cm", C: "2.45 cm", D: "2.51 cm" }, correct: "B" },
  { id: 24, text: "A digital multimeter is set to diode test mode. When the red probe touches terminal X and the black touches terminal Y, the meter reads 0.7V. When reversed, it displays 'OL' (Open Loop). What does this verify?", options: { A: "Terminal X is the cathode (N-type region) of a functional diode.", B: "Terminal X is the anode (P-type region) of a functional diode.", C: "The diode has suffered an internal short-circuit breakdown.", D: "Terminal Y is the anode (P-type region) of a functional diode." }, correct: "B" },
  { id: 25, text: "In an Ohm's law setup, the voltmeter reads 4.0V with an accuracy limit of ±0.1V, and the ammeter reads 2.0A with an accuracy limit of ±0.05A. What is the maximum percentage error in the calculated resistance (R)?", options: { A: "2.5%", B: "5.0%", C: "1.5%", D: "7.5%" }, correct: "B" }
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
//  §6b  FIRESTORE — Pre-Test Batch 2 API
// ──────────────────────────────────────────────

const saveSubmissionBatch2         = (sub) => _saveDoc(CONFIG.firestoreCollectionPreBatch2, sub);
const getSubmissionsBatch2         = ()    => _getAllDocs(CONFIG.firestoreCollectionPreBatch2);
const clearSubmissionsBatch2       = ()    => _clearCollection(CONFIG.firestoreCollectionPreBatch2);
const subscribeToSubmissionsBatch2 = (cb, onErr) => _subscribeTo(CONFIG.firestoreCollectionPreBatch2, cb, onErr);

// ──────────────────────────────────────────────
//  §6c  FIRESTORE — Post-Test Batch 2 API
// ──────────────────────────────────────────────

const saveSubmissionPostBatch2         = (sub) => _saveDoc(CONFIG.firestoreCollectionPostBatch2, sub);
const getSubmissionsPostBatch2         = ()    => _getAllDocs(CONFIG.firestoreCollectionPostBatch2);
const clearSubmissionsPostBatch2       = ()    => _clearCollection(CONFIG.firestoreCollectionPostBatch2);
const subscribeToSubmissionsPostBatch2 = (cb, onErr) => _subscribeTo(CONFIG.firestoreCollectionPostBatch2, cb, onErr);

// ──────────────────────────────────────────────
//  §6d  FIRESTORE — Post-Test Practical Batch 2 API
// ──────────────────────────────────────────────

const saveSubmissionPostPracticalB2         = (sub) => _saveDoc(CONFIG.firestoreCollectionPostPracticalB2, sub);
const getSubmissionsPostPracticalB2         = ()    => _getAllDocs(CONFIG.firestoreCollectionPostPracticalB2);
const clearSubmissionsPostPracticalB2       = ()    => _clearCollection(CONFIG.firestoreCollectionPostPracticalB2);
const subscribeToSubmissionsPostPracticalB2 = (cb, onErr) => _subscribeTo(CONFIG.firestoreCollectionPostPracticalB2, cb, onErr);

// ──────────────────────────────────────────────
//  §7  FIRESTORE — Auto-Fill & Lookup
// ──────────────────────────────────────────────

/** Look up a pre-test submission by a field value — disabled for Batch 2 (fresh batch). */
async function lookupPreTestByField(field, value) {
  // Auto-fill disabled for Batch 2 — no prior data to look up
  return null;
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

const _SESSION_KEYS = ['name', 'uniqueid', 'mobile', 'school', 'email', 'district'];

function savePendingUser(name, uniqueid, mobile, school, email, district) {
  const vals = { name, uniqueid, mobile, school, email, district: district || '' };
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
