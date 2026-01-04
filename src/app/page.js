import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Tinerii Vorbesc</h1>
          <p className={styles.heroSubtitle}>Vocea noii generații</p>
          <p className={styles.heroDescription}>
            Podcasturi, proiecte și evenimente pentru tineri care vor să facă diferența.
          </p>
          <p className={styles.heroText}>
            Hei! Bine ai venit. Aici nu e doar un ONG clasic – e mai mult decât atât. E un loc unde tinerii 
            chiar au ceva de spus și unde cineva chiar ascultă.
          </p>
          <p className={styles.heroText}>
            Am început cu un podcast, dar am ajuns să construim o comunitate. Organizăm evenimente, facem proiecte 
            și, cel mai important, dăm oamenilor tineri șansa să-și spună povestea.
          </p>
          <p className={styles.heroText}>
            Dacă ai o idee, o opinie sau pur și simplu vrei să te implici, ești în locul potrivit. 
            Hai să vorbim!
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/podcasturi" className={`${styles.btn} ${styles.btnPrimary}`}>
              🎙️ Ascultă podcasturile
            </Link>
            <Link href="/proiecte" className={`${styles.btn} ${styles.btnSecondary}`}>
              📅 Vezi proiectele noastre
            </Link>
            <Link href="/sponsorizari" className={`${styles.btn} ${styles.btnSecondary}`}>
              💌 Susține-ne
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.gallerySection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Din culisele noastre</h2>
          <p className={styles.sectionDescription}>
            Câteva momente din evenimentele și proiectele noastre – oameni reali, conversații reale, impact real.
          </p>
          <div className={styles.galleryGrid}>
            <div className={styles.galleryItem}>
              <Image
                src="/photos/used/WhatsApp Image 2025-12-26 at 1.09.44 PM (1).jpeg"
                alt="Moment din eveniment"
                width={400}
                height={300}
                className={styles.galleryImage}
              />
              <Link href="/proiecte" className={styles.galleryLink}>
                Vezi galeria completă →
              </Link>
            </div>
            <div className={styles.galleryItem}>
              <Image
                src="/photos/used/WhatsApp Image 2025-12-26 at 1.09.45 PM (1).jpeg"
                alt="Moment din eveniment"
                width={400}
                height={300}
                className={styles.galleryImage}
              />
            </div>
            <div className={styles.galleryItem}>
              <Image
                src="/photos/used/WhatsApp Image 2025-12-26 at 1.09.46 PM (1).jpeg"
                alt="Moment din eveniment"
                width={400}
                height={300}
                className={styles.galleryImage}
              />
            </div>
            <div className={styles.galleryItem}>
              <Image
                src="/photos/used/WhatsApp Image 2025-12-26 at 1.09.44 PM (6).jpeg"
                alt="Moment din eveniment"
                width={400}
                height={300}
                className={styles.galleryImage}
              />
            </div>
            <div className={styles.galleryItem}>
              <Image
                src="/photos/used/WhatsApp Image 2025-12-26 at 1.09.45 PM (3).jpeg"
                alt="Moment din eveniment"
                width={400}
                height={300}
                className={styles.galleryImage}
              />
            </div>
            <div className={styles.galleryItem}>
              <Image
                src="/photos/used/WhatsApp Image 2025-12-26 at 1.09.46 PM (3).jpeg"
                alt="Moment din eveniment"
                width={400}
                height={300}
                className={styles.galleryImage}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
