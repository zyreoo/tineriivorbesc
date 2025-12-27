import Link from 'next/link';
import styles from './page.module.css';

export default function Servicii() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>Ce pot face pentru tine</h1>
          <p className={styles.heroDescription}>
            Dacă ai nevoie de cineva care să prezinte un eveniment, să modereze o discuție sau să 
            facă un podcast pentru brandul tău, poate te pot ajuta.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🎤</div>
              <h2>Prezentare de evenimente</h2>
              <p>
                Prezint evenimente de toate felurile – de la conferințe la workshop-uri. Încerc să 
                fac totul să fie natural, să nu pară forțat, și să oamenii să se simtă confortabil.
              </p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🎙️</div>
              <h2>Moderare conferințe</h2>
              <p>
                Moderez discuții și panel-uri. Să fiu sinceră, partea mea preferată e să văd cum 
                oamenii se aprind când vorbesc despre ce-i pasionează. Încerc să fac asta să se 
                întâmple cât mai des.
              </p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🎧</div>
              <h2>Podcast hosting</h2>
              <p>
                Fac podcasturi pentru branduri și ONG-uri care vor să-și spună mesajul într-un mod 
                autentic. Nu e despre marketing, e despre să găsim povestea reală din spatele brandului.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.ctaSection}>
            <h2>Dacă crezi că te pot ajuta, hai să vorbim</h2>
            <p>
              Nu promit că o să fie perfect, dar promit că o să mă implic. Scrie-mi și discutăm 
              despre proiectul tău – fără obligații, doar să vedem dacă se potrivește.
            </p>
            <Link href="/contact" className={styles.contactBtn}>
              Contactează-mă
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

