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

export default function Privacy() {
  return (
    <>
      <Head>
        <title>מדיניות פרטיות — מגע</title>
        <meta name="description" content="מדיניות הפרטיות של פלטפורמת מגע" />
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
          <h1 style={{ fontSize: 30, fontWeight: 800, color: '#111', marginBottom: 8, letterSpacing: '-0.5px' }}>מדיניות פרטיות</h1>
          <p style={{ fontSize: 14, color: '#aaa' }}>עדכון אחרון: ינואר 2024 · בהתאם לחוק הגנת הפרטיות, תשמ"א-1981</p>
        </div>

        <Section title="1. מידע שאנו אוספים">
          <P><B>ממטפלים הנרשמים לפלטפורמה:</B></P>
          <Ul>
            <Li>שם מלא</Li>
            <Li>מספר טלפון (לצורך יצירת קשר ישיר עם לקוחות)</Li>
            <Li>עיר מגורים / אזור פעילות</Li>
            <Li>תמונת פרופיל</Li>
            <Li>סוגי טיפולים ומחיר</Li>
            <Li>תיאור אישי ושנות ניסיון</Li>
            <Li>תאריך ושעת ההסכמה לתנאים (לצורכי תיעוד משפטי)</Li>
          </Ul>
          <P><B>ממבקרי האתר:</B> האתר עשוי לאסוף מידע טכני אנונימי כגון סוג דפדפן, זמן ביקור, ועמודים שנצפו — לצורכי שיפור חוויית המשתמש בלבד.</P>
        </Section>

        <Section title="2. כיצד המידע משמש ומוצג">
          <P><B>מידע המטפלים מוצג באופן ציבורי</B> באתר לכל גולש, לצורך יצירת קשר ישיר. זה כולל:</P>
          <Ul>
            <Li>שם המטפל — <B>מוצג לציבור</B></Li>
            <Li>תמונת הפרופיל — <B>מוצגת לציבור</B></Li>
            <Li>עיר פעילות — <B>מוצגת לציבור</B></Li>
            <Li>סוגי טיפולים ומחיר — <B>מוצגים לציבור</B></Li>
            <Li>מספר טלפון — <B>מועבר ישירות ללקוח</B> דרך קישור וואטסאפ</Li>
            <Li>תיאור אישי — <B>מוצג לציבור</B></Li>
          </Ul>
          <P>על ידי הרשמה לפלטפורמה, המטפל מסכים במפורש לפרסום פרטיו לציבור כמפורט לעיל.</P>
        </Section>

        <Section title="3. אחסון ואבטחת מידע">
          <P>המידע מאוחסן בשרתי <B>Supabase</B> — שירות ענן בינלאומי העומד בתקני אבטחה מחמירים. התמונות מאוחסנות ב-Supabase Storage עם גישה מאובטחת.</P>
          <P>אנו נוקטים באמצעי אבטחה סבירים להגנה על המידע, אך <B>איננו יכולים להבטיח אבטחה מוחלטת</B> מפני כל פריצה או דליפה. השימוש בפלטפורמה מהווה הסכמה לסיכון זה.</P>
        </Section>

        <Section title="4. שיתוף מידע עם צדדים שלישיים">
          <P>האתר <B>אינו מוכר ואינו מעביר</B> מידע אישי לצדדים שלישיים למטרות מסחריות. המידע עשוי להיות מועבר אך ורק במקרים הבאים:</P>
          <Ul>
            <Li>על פי דרישת רשות מוסמכת או צו בית משפט</Li>
            <Li>לצורך הגנה על זכויות האתר בהליך משפטי</Li>
            <Li>במקרה של מכירה או מיזוג של הפלטפורמה — תוך מתן הודעה מראש</Li>
          </Ul>
        </Section>

        <Section title="5. זכויות המשתמש">
          <P>בהתאם לחוק הגנת הפרטיות הישראלי, לכל מטפל הזכות:</P>
          <Ul>
            <Li><B>לעיין</B> במידע השמור עליו</Li>
            <Li><B>לתקן</B> מידע שגוי</Li>
            <Li><B>למחוק</B> את פרופילו ואת כל המידע הקשור אליו</Li>
          </Ul>
          <P>לבקשות מחיקה ועיון: <a href="mailto:idan17322@gmail.com" style={{ color: '#0F6E56', fontWeight: 600, textDecoration: 'none' }}>idan17322@gmail.com</a>. הבקשה תטופל תוך 30 יום.</P>
        </Section>

        <Section title="6. עוגיות (Cookies)">
          <P>האתר עשוי להשתמש בעוגיות בסיסיות לצורך תפקוד תקין של הממשק. השימוש באתר מהווה הסכמה לשימוש בעוגיות אלה.</P>
        </Section>

        <Section title="7. שינויים במדיניות">
          <P>ההנהלה שומרת לעצמה את הזכות לעדכן מדיניות זו בכל עת. שינויים מהותיים יפורסמו באתר. המשך השימוש לאחר פרסום השינויים מהווה הסכמה אליהם.</P>
        </Section>

        <div style={{ background: '#f9f9f7', borderRadius: 16, padding: '16px 20px', marginTop: 8, border: '1px solid #eee' }}>
          <p style={{ fontSize: 13, color: '#888', margin: 0, lineHeight: 1.7 }}>
            לפניות פרטיות: <a href="mailto:idan17322@gmail.com" style={{ color: '#0F6E56', fontWeight: 600, textDecoration: 'none' }}>idan17322@gmail.com</a>
            {' · '}
            <Link href="/terms" style={{ color: '#0F6E56', fontWeight: 600, textDecoration: 'none' }}>תנאי שימוש</Link>
            {' · '}
            <Link href="/therapist-terms" style={{ color: '#0F6E56', fontWeight: 600, textDecoration: 'none' }}>תקנון מטפלים</Link>
          </p>
        </div>
      </main>
    </>
  )
}
