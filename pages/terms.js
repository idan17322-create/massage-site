import Head from 'next/head'
import Link from 'next/link'

const Section = ({ title, children }) => (
  <div style={{ background: '#fff', borderRadius: 20, padding: '24px 28px', marginBottom: 16, border: '1px solid #f0f0ee' }}>
    <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid #f5f5f3' }}>{title}</h2>
    <div style={{ fontSize: 14, color: '#555', lineHeight: 1.85 }}>{children}</div>
  </div>
)
const P = ({ children }) => <p style={{ marginBottom: 10 }}>{children}</p>
const B = ({ children }) => <strong style={{ color: '#111', fontWeight: 700 }}>{children}</strong>
const Li = ({ children }) => <li style={{ marginBottom: 6, paddingRight: 4 }}>{children}</li>
const Ul = ({ children }) => <ul style={{ paddingRight: 20, marginBottom: 10 }}>{children}</ul>

export default function Terms() {
  return (
    <>
      <Head>
        <title>תנאי שימוש — מגע</title>
        <meta name="description" content="תנאי השימוש של פלטפורמת מגע" />
      </Head>

      <nav style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #f0f0f0', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, background: '#0F6E56', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 14 }}>מ</div>
          <span style={{ fontWeight: 700, fontSize: 18, color: '#111' }}>מגע</span>
        </Link>
        <Link href="/" style={{ fontSize: 13, color: '#888', textDecoration: 'none' }}>← חזרה לאתר</Link>
      </nav>

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px 60px', fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif', direction: 'rtl' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: '#111', marginBottom: 8, letterSpacing: '-0.5px' }}>תנאי שימוש</h1>
          <p style={{ fontSize: 14, color: '#aaa' }}>עדכון אחרון: ינואר 2024 · חל על כל משתמשי הפלטפורמה</p>
        </div>

        <div style={{ background: '#FEF3C7', borderRadius: 16, padding: '14px 18px', marginBottom: 24, border: '1px solid #FCD34D' }}>
          <p style={{ fontSize: 13, color: '#92400E', fontWeight: 600, margin: 0 }}>⚠️ קריאה חשובה: השימוש באתר מהווה הסכמה מלאה לכל תנאים המפורטים להלן. אם אינך מסכים — אנא הפסק את השימוש באתר לאלתר.</p>
        </div>

        <Section title="1. הגדרות ומהות השירות">
          <P><B>מגע</B> הינה פלטפורמת לוח מודעות ותיווך דיגיטלית בלבד, המאפשרת למטפלים עצמאיים לפרסם את שירותיהם וללקוחות לאתר מטפלים בסביבתם.</P>
          <P><B>הצהרת תיווך מפורשת:</B> האתר אינו מספק שירותי עיסוי, טיפול גופני, טיפול נפשי, או כל שירות בריאותי אחר. האתר משמש אך ורק כמתווך טכנולוגי בין מטפלים עצמאיים ללקוחות פוטנציאליים.</P>
          <P><B>אין יחסי עובד-מעביד:</B> המטפלים הרשומים בפלטפורמה הינם עצמאים בלבד. אין בין האתר לבין המטפלים יחסי עובד-מעביד, שליחות, שותפות, או כל יחס משפטי אחר.</P>
        </Section>

        <Section title="2. העדר אחריות — הצהרה מוחלטת">
          <P><B>ההנהלה אינה אחראית, בשום מקרה ובשום נסיבות, לאף אחד מהבאים:</B></P>
          <Ul>
            <Li>טיב הטיפול, מקצועיותו, יעילותו, או תוצאותיו</Li>
            <Li>נזקים גופניים מכל סוג שהוא, לרבות כאב, פציעה, נכות זמנית או קבועה</Li>
            <Li>נזקים נפשיים, עגמת נפש, טראומה או כל נזק פסיכולוגי</Li>
            <Li>הטרדה מינית, מגע לא הולם, או כל התנהגות פסולה של מטפל</Li>
            <Li>רשלנות מקצועית, אי-הסמכה, או הצגת מידע כוזב על ידי מטפל</Li>
            <Li>נזק לרכוש שייגרם במהלך ביקור המטפל בבית הלקוח</Li>
            <Li>אי-הגעה, ביטול ברגע האחרון, או אי-עמידה בתנאי ההסכם בין הצדדים</Li>
            <Li>כל נזק ישיר, עקיף, תוצאתי, מיוחד או עונשי מכל סוג</Li>
          </Ul>
          <P><B>גבול האחריות הכספית:</B> במקרה שבית משפט יקבע אחריות כלשהי של האתר, תוגבל האחריות הכספית המרבית לסכום ששולם בפועל על ידי המשתמש לאתר בשלושת החודשים שקדמו לאירוע.</P>
        </Section>

        <Section title="3. אחריות המשתמש וויתור על תביעות">
          <P>המשתמש, בעצם כניסתו לאתר ושימושו בו, <B>מצהיר ומסכים באופן בלתי חוזר</B> לכל האמור:</P>
          <Ul>
            <Li>כל אינטראקציה עם מטפל — לרבות תיאום פגישה, קבלת טיפול, ותשלום — הינה עסקה בין הלקוח למטפל בלבד, באחריותם הבלעדית</Li>
            <Li>המשתמש מוותר על כל טענה, דרישה או תביעה כלפי האתר, הנהלתו, בעליו, עובדיו או מי מטעמו</Li>
            <Li>המשתמש מתחייב לבדוק באופן עצמאי את הסמכות, המקצועיות והאמינות של כל מטפל לפני קבלת טיפול</Li>
            <Li>מומלץ מאוד לבקש לראות תעודות הסמכה מקוריות ולוודא קיום ביטוח מקצועי בטרם הטיפול</Li>
          </Ul>
        </Section>

        <Section title="4. תוכן האתר ודיוקו">
          <P>האתר אינו אחראי על נכונות, שלמות, או עדכניות המידע שמוזן על ידי המטפלים. כל תמונה, תיאור, מחיר, הסמכה, או פרט אחר — הינם באחריות המטפל בלבד.</P>
          <P>האתר שומר לעצמו את הזכות להסיר, לשנות, או להשהות כל תוכן על פי שיקול דעתו הבלעדי.</P>
        </Section>

        <Section title="5. קניין רוחני">
          <P>כל תוכן, עיצוב, קוד, לוגו ומיתוג של האתר הינם קניינו הבלעדי של האתר ומוגנים בזכויות יוצרים. אין להעתיק, לשכפל, לפרסם מחדש, או לעשות כל שימוש מסחרי בתכנים ללא אישור מפורש בכתב.</P>
        </Section>

        <Section title="6. שינויים בתנאים">
          <P>ההנהלה שומרת לעצמה את הזכות לעדכן תנאים אלה בכל עת. המשך השימוש באתר לאחר פרסום תנאים מעודכנים מהווה הסכמה לתנאים החדשים.</P>
        </Section>

        <Section title="7. דין וסמכות שיפוט">
          <P>תנאים אלה כפופים לדיני מדינת ישראל בלבד. כל מחלוקת תידון בבתי המשפט המוסמכים במחוז תל אביב בלבד.</P>
        </Section>

        <div style={{ background: '#f9f9f7', borderRadius: 16, padding: '16px 20px', marginTop: 8, border: '1px solid #eee' }}>
          <p style={{ fontSize: 13, color: '#888', margin: 0, lineHeight: 1.7 }}>
            לשאלות משפטיות: <a href="mailto:idan17322@gmail.com" style={{ color: '#0F6E56', fontWeight: 600, textDecoration: 'none' }}>idan@gmail.com</a>
            {' · '}
            <Link href="/therapist-terms" style={{ color: '#0F6E56', fontWeight: 600, textDecoration: 'none' }}>תקנון מטפלים</Link>
            {' · '}
            <Link href="/privacy" style={{ color: '#0F6E56', fontWeight: 600, textDecoration: 'none' }}>מדיניות פרטיות</Link>
          </p>
        </div>
      </main>
    </>
  )
}
