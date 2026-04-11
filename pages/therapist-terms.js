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

export default function TherapistTerms() {
  return (
    <>
      <Head>
        <title>תקנון מטפלים — מגע</title>
        <meta name="description" content="תקנון ותנאי שימוש למטפלים הרשומים בפלטפורמת מגע" />
      </Head>

      <nav style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #f0f0f0', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, background: '#0F6E56', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 14 }}>מ</div>
          <span style={{ fontWeight: 700, fontSize: 18, color: '#111' }}>מגע</span>
        </Link>
        <Link href="/join" style={{ fontSize: 13, color: '#0F6E56', textDecoration: 'none', fontWeight: 600 }}>הצטרף כמטפל ←</Link>
      </nav>

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px 60px', fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif', direction: 'rtl' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: '#111', marginBottom: 8, letterSpacing: '-0.5px' }}>תקנון מטפלים</h1>
          <p style={{ fontSize: 14, color: '#aaa' }}>עדכון אחרון: ינואר 2024 · חל על כל מטפל הנרשם לפלטפורמה</p>
        </div>

        <div style={{ background: '#E1F5EE', borderRadius: 16, padding: '14px 18px', marginBottom: 24, border: '1px solid #9FE1CB' }}>
          <p style={{ fontSize: 13, color: '#065F46', fontWeight: 600, margin: 0 }}>📋 תקנון זה מהווה הסכם מחייב בינך לבין הנהלת מגע. הרשמה לפלטפורמה מהווה הסכמה מלאה לכל הסעיפים.</p>
        </div>

        <Section title="1. הצהרת מקצועיות ואחריות המטפל">
          <P>המטפל הנרשם לפלטפורמה <B>מצהיר ומתחייב</B> כי:</P>
          <Ul>
            <Li>הוא בעל הסמכה חוקית ותקפה לביצוע הטיפולים המפורטים בפרופילו</Li>
            <Li>הוא בעל ביטוח מקצועי תקף המכסה את כל סוגי הטיפולים שהוא מציע</Li>
            <Li>כל הפרטים שמסר בהרשמה — לרבות שם, הסמכות, ניסיון ותמונה — הינם נכונים ומדויקים</Li>
            <Li>הוא עומד בכל דרישות החוק הישראלי לעניין מתן טיפולי גוף ומגע</Li>
            <Li>הוא מתחייב לנהוג בצניעות, כבוד ומקצועיות בכל אינטראקציה עם לקוחות</Li>
            <Li>הוא נושא באחריות מלאה ובלעדית לכל אירוע, נזק, תביעה או תלונה הנוגעים לטיפוליו</Li>
          </Ul>
          <P><B>הצהרת שיפוי:</B> המטפל מתחייב לשפות את האתר ובעליו בגין כל הוצאה, נזק, תביעה או תשלום שיידרש האתר לשלם כתוצאה מפעילות המטפל.</P>
        </Section>

        <Section title="2. סמכויות ניהול — זכות ההנהלה">
          <P>להנהלת האתר <B>זכות בלעדית ומוחלטת</B>, על פי שיקול דעתה הבלעדי ומבלי שתהיה חייבת לנמק החלטתה, לבצע את הפעולות הבאות:</P>
          <Ul>
            <Li><B>דחייה:</B> לדחות בקשת הרשמה של מטפל ללא הסבר</Li>
            <Li><B>השעיה:</B> להשעות פרופיל מטפל באופן מיידי, זמני או קבוע</Li>
            <Li><B>מחיקה:</B> למחוק פרופיל מטפל ללא הודעה מראש — בפרט בעקבות תלונות גולשים, חשד להתנהגות לא הולמת, או כל סיבה אחרת</Li>
            <Li><B>עריכה:</B> לערוך, לקצר או לשנות תוכן שהמטפל העלה</Li>
            <Li><B>חסימה:</B> לחסום כתובת IP או פרטי חשבון של מטפל</Li>
          </Ul>
          <P>המטפל מוותר מראש על כל טענה, ערר, או תביעה בנוגע להחלטות ניהוליות אלה.</P>
        </Section>

        <Section title="3. מודל תשלום — הסכמה מפורשת">
          <P>המטפל מסכים במפורש למודל התשלום הבא:</P>
          <Ul>
            <Li><B>חודש ראשון:</B> 25 ₪ (דמי הצטרפות והרצה)</Li>
            <Li><B>מהחודש השני:</B> 39 ₪ לחודש, מתחדש אוטומטית</Li>
            <Li><B>ביטול:</B> ניתן לבטל בכל עת. אין החזרים על חלקי חודש</Li>
            <Li><B>הסרת פרופיל:</B> במקרה של הסרת פרופיל ביוזמת ההנהלה — לא יינתן כל החזר כספי</Li>
            <Li><B>שינוי מחיר:</B> ההנהלה רשאית לשנות את מחירי המנוי בהודעה של 30 יום מראש</Li>
          </Ul>
        </Section>

        <Section title="4. תוכן ופרסום">
          <Ul>
            <Li>המטפל אחראי בלעדית לנכונות כל המידע בפרופילו</Li>
            <Li>חל איסור מוחלט על פרסום תוכן כוזב, מטעה, גס, פוגעני, או לא הולם</Li>
            <Li>התמונות שיועלו צריכות להיות מקצועיות ומציגות את המטפל בלבד</Li>
            <Li>חל איסור על פרסום פרטי קשר נוספים שמטרתם עקיפת הפלטפורמה</Li>
          </Ul>
        </Section>

        <Section title="5. סודיות ופרטיות לקוחות">
          <P>המטפל מתחייב לשמור בסוד מוחלט על כל מידע אישי שיתקבל מלקוחות דרך הפלטפורמה, ולא לעשות בו שימוש לכל מטרה אחרת פרט לאספקת השירות המבוקש.</P>
        </Section>

        <Section title="6. דין וסמכות שיפוט">
          <P>תקנון זה כפוף לדיני מדינת ישראל. כל מחלוקת בין המטפל לבין ההנהלה תידון בבתי המשפט המוסמכים במחוז תל אביב בלבד.</P>
        </Section>

        <div style={{ background: '#f9f9f7', borderRadius: 16, padding: '16px 20px', marginTop: 8, border: '1px solid #eee' }}>
          <p style={{ fontSize: 13, color: '#888', margin: 0, lineHeight: 1.7 }}>
            לשאלות: <a href="mailto:idan17322@gmail.com" style={{ color: '#0F6E56', fontWeight: 600, textDecoration: 'none' }}>idan@gmail.com</a>
            {' · '}
            <Link href="/terms" style={{ color: '#0F6E56', fontWeight: 600, textDecoration: 'none' }}>תנאי שימוש כלליים</Link>
            {' · '}
            <Link href="/privacy" style={{ color: '#0F6E56', fontWeight: 600, textDecoration: 'none' }}>מדיניות פרטיות</Link>
          </p>
        </div>
      </main>
    </>
  )
}