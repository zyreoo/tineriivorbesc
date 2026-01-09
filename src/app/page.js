import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Tinerii Vorbesc</h1>
          <p className={styles.heroSubtitle}>Brand media național. Vocea tinerilor din România.</p>
          <p className={styles.heroDescription}>
            Tinerii Vorbesc este un brand media național, construit pe baza unei asociații care răspunde unei probleme reale din societatea românească.
          </p>
          <p className={styles.heroText}>
            Prea mulți tineri au vocație, talent și dorință de a reuși, dar nu au șansa, contextul sau conexiunile necesare pentru a activa în domeniul care îi reprezintă cu adevărat. Noi existăm pentru a schimba acest lucru.
          </p>
          <p className={styles.heroText}>
            Misiunea noastră este să oferim tuturor tinerilor din România o voce, direcție și oportunități reale de dezvoltare. Îi ajutăm să-și facă vocea auzită și să-și transforme pasiunea într-un drum profesional, devenind legătura dintre ei, nișa în care vor să activeze și mentorii care îi pot ghida.
          </p>
          <p className={styles.heroText}>
            Prin podcasturi, proiecte media și evenimente naționale, aducem împreună tineri aflați la început de drum și profesioniști cu experiență din diverse domenii. Creăm contexte de învățare, dialog și colaborare, facilităm accesul la know-how, la exemple reale de reușită și la oameni care pot deschide uși.
          </p>
          <p className={styles.heroText}>
            Tinerii Vorbesc nu este doar despre vizibilitate, ci despre șanse reale. Despre a reduce decalajul dintre potențial și oportunitate. Despre a construi o generație care nu este blocată de lipsa de conexiuni, ci susținută să crească în direcția vocației sale.
          </p>
          <p className={styles.heroText}>
            Dacă ești tânăr și simți că ai ceva de oferit, dar nu știi de unde să începi, aici este punctul tău de plecare. Tinerii Vorbesc – puntea dintre vocație, oameni și viitor.
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
