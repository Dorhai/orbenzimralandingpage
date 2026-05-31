export const siteContent = {
  gym: {
    name: "אור בן זימרא",
    tagline: "מאמן כושר אישי",
    // Logo brand text (shown in the logo lockup)
    logoText: "OR BEN ZIMRA",
    logoSubtext: "FITNESS COACH"
  },
  contact: {
    phone: "050-000-0000",
    email: "or@orbenzimra.co.il",
    address: "אימונים באולם, בבית או בחוץ — תל אביב והמרכז"
  },
  nav: {
    links: [
      { label: "בית", href: "#home" },
      { label: "אודות", href: "#about" },
      { label: "אימונים", href: "#programs" },
      { label: "יתרונות", href: "#benefits" },
      { label: "מחירים", href: "#pricing" },
      { label: "גלריה", href: "#gallery" },
    ],
    cta: "קבעו אימון ניסיון"
  },
  hero: {
    label: "מאמן כושר אישי",
    // Two-line headline (overlapping style). Edit freely:
    headlineLine1: "כושר אישי.",
    headlineLine2: "תוצאות אמיתיות.",
    subtitle: "אימון אישי מותאם בדיוק עבורך — ליווי צמוד, תוכנית מדויקת ותוצאות שאפשר לראות. בואו נגיע ליעד יחד.",
    primaryCta: "קבעו אימון ניסיון",
    secondaryCta: "צפו במסלולים"
  },
  about: {
    title: "אודותי",
    paragraph: "אני אור בן זימרא, מאמן כושר אישי עם ניסיון של למעלה מעשור. אני מאמין שכל אחד יכול להגיע לגוף חזק ובריא — רק צריך את הגישה הנכונה. אני בונה תוכניות אימון מותאמות אישית, עוקב אחר ההתקדמות שלך ודוחף אותך להשיג את המטרות שלך, בקצב שלך.",
    stats: [
      { value: "10+", label: "שנות ניסיון" },
      { value: "500+", label: "מתאמנים מלווים" },
      { value: "95%", label: "שביעות רצון" }
    ]
  },
  programs: {
    title: "סוגי האימון",
    items: [
      {
        title: "אימון אישי 1 על 1",
        description: "אימון פרטני מלא עם ליווי צמוד, תיקון טכניקה והתאמת עומסים בזמן אמת — באולם, בבית או בחוץ.",
        imageUrl: "https://placehold.co/600x400/202A36/ffffff?text=Personal+Training"
      },
      {
        title: "אימוני כוח וחיטוב",
        description: "תוכניות ממוקדות לבניית שריר, חיזוק ושיפור הרכב הגוף — עם מעקב התקדמות שבועי.",
        imageUrl: "https://placehold.co/600x400/202A36/ffffff?text=Strength"
      },
      {
        title: "ירידה במשקל וכושר",
        description: "שילוב של אימונים מותאמים וליווי תזונתי בסיסי — כדי להגיע ליעד בצורה בריאה ובר-קיימא.",
        imageUrl: "https://placehold.co/600x400/202A36/ffffff?text=Weight+Loss"
      },
      {
        title: "אימון זוגי / קטן",
        description: "אימון עם חבר/ה, בן/בת זוג או קבוצה קטנה — אותה מקצועיות, עם מוטיבציה משותפת ומחיר נוח יותר.",
        imageUrl: "https://placehold.co/600x400/202A36/ffffff?text=Partner"
      }
    ]
  },
  benefits: {
    title: "למה לבחור בי?",
    items: [
      {
        title: "תוכנית מותאמת אישית",
        description: "כל תוכנית נבנית מאפס לפי המטרות, הרמה והאורח חיים שלך — לא תבנית גנרית."
      },
      {
        title: "ליווי ומעקב שוטף",
        description: "מעקב התקדמות, התאמות בזמן אמת וזמינות לשאלות בין האימונים."
      },
      {
        title: "גמישות מלאה",
        description: "אימונים באולם, בבית, בפארק — בשעות שמתאימות לשגרה שלך."
      },
      {
        title: "תוצאות מוכחות",
        description: "מתאמנים שמגיעים ליעדים — ירידה במשקל, עלייה בכוח ושיפור בביטחון העצמי."
      }
    ]
  },
  testimonials: {
    title: "מה אומרים המתאמנים",
    items: [
      {
        name: "יעל לוי",
        quote: "אחרי שנים של ניסיונות לבד, סוף סוף מצאתי מאמן שמבין אותי. אור בנה לי תוכנית שמתאימה לחיים שלי — והתוצאות מדברות בעד עצמן.",
        role: "מתאמנת 8 חודשים"
      },
      {
        name: "דניאל כהן",
        quote: "הגעתי עם כאבי גב וחוסר ביטחון. היום אני חזק יותר, קל יותר וממליץ על אור לכל מי שרוצה מאמן אמיתי, לא סתם מישהו שסופר חזרות.",
        role: "מתאמן שנה וחצי"
      },
      {
        name: "מיכל שרון",
        quote: "האימונים הזוגיים עם החברה שלי הפכו לחלק הכי טוב בשבוע. אור יודע איך לדחוף בלי לשבור, ותמיד מרגישים שאכפת לו.",
        role: "מתאמנת 6 חודשים"
      }
    ]
  },
  pricing: {
    title: "מסלולים ומחירים",
    plans: [
      {
        name: "אימון בודד",
        price: "250",
        period: "לאימון",
        description: "מושלם להיכרות ראשונה או אימון נקודתי",
        features: ["אימון אישי 60 דקות", "הערכת רמה ומטרות", "תוכנית בסיסית להמשך"],
        cta: "קבעו אימון"
      },
      {
        name: "חבילת 8",
        price: "1,800",
        period: "לחבילה",
        description: "המסלול הפופולרי — תוצאות אמיתיות תוך חודשיים",
        features: ["8 אימונים אישיים", "תוכנית אימון מותאמת", "מעקב התקדמות שבועי", "זמינות בוואטסאפ"],
        cta: "התחילו עכשיו"
      },
      {
        name: "ליווי חודשי",
        price: "2,200",
        period: "לחודש",
        description: "למי שרוצה ליווי מלא ותוצאות מקסימליות",
        features: ["12 אימונים בחודש", "תוכנית תזונה בסיסית", "מעקב יומי והתאמות", "אימון זוגי — ללא תוספת"],
        cta: "דברו איתי"
      }
    ]
  },
  gallery: {
    title: "מהאימונים בשטח",
    images: [
      "https://placehold.co/600x600/202A36/ffffff?text=Training+1",
      "https://placehold.co/600x600/202A36/ffffff?text=Training+2",
      "https://placehold.co/600x600/202A36/ffffff?text=Training+3",
      "https://placehold.co/600x600/202A36/ffffff?text=Training+4"
    ]
  },
  marquee: {
    items: ["כוח", "מחויבות", "התמדה", "תוצאות", "בריאות", "מוטיבציה", "משמעת", "אנרגיה"]
  },
  contactCta: {
    title: "מוכנים להתחיל?",
    subtitle: "השאירו פרטים או צרו קשר לקביעת אימון ניסיון ללא התחייבות.",
    cta: "שליחה"
  },
  footer: {
    social: [
      { platform: "Facebook", url: "#" },
      { platform: "Instagram", url: "#" },
      { platform: "WhatsApp", url: "#" }
    ],
    copyright: "אור בן זימרא. כל הזכויות שמורות."
  }
};
