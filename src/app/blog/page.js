import Link from 'next/link';
import styles from './page.module.css';

export default function Blog() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>Gânduri și resurse pentru tineri</h1>
          <p className={styles.heroDescription}>
            Aici scriu despre ce mă gândesc, ce am învățat și ce se întâmplă în spatele cortinei. 
            Fără filtre, fără pretenții – doar gânduri reale despre lucruri reale.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.articlesGrid}>
            <article className={styles.articleCard}>
              <div className={styles.articleImage}>
                <p>📝</p>
              </div>
              <div className={styles.articleContent}>
                <span className={styles.articleDate}>15 Martie 2024</span>
                <h2>Cum am pornit Tinerii Vorbesc</h2>
                <p className={styles.articleExcerpt}>
                  Povestea reală despre cum am ajuns aici – frustrări, momente de panică, 
                  dar și momente când am realizat că chiar facem ceva important...
                </p>
                <Link href="#" className={styles.readMore}>
                  Citește mai mult →
                </Link>
              </div>
            </article>
            <article className={styles.articleCard}>
              <div className={styles.articleImage}>
                <p>📝</p>
              </div>
              <div className={styles.articleContent}>
                <span className={styles.articleDate}>10 Martie 2024</span>
                <h2>Ce am învățat din primul an de podcast</h2>
                <p className={styles.articleExcerpt}>
                  Un an de conversații, oameni interesanți și momente când am realizat că 
                  uneori cel mai bun lucru pe care-l poți face e să asculti...
                </p>
                <Link href="#" className={styles.readMore}>
                  Citește mai mult →
                </Link>
              </div>
            </article>
            <article className={styles.articleCard}>
              <div className={styles.articleImage}>
                <p>📝</p>
              </div>
              <div className={styles.articleContent}>
                <span className={styles.articleDate}>5 Martie 2024</span>
                <h2>De ce tinerii din România au nevoie de un spațiu să vorbească</h2>
                <p className={styles.articleExcerpt}>
                  Reflecții despre ce am observat în ultimii ani și de ce cred că e important 
                  să dăm oamenilor tineri șansa să-și spună ideile fără să fie judecați...
                </p>
                <Link href="#" className={styles.readMore}>
                  Citește mai mult →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

