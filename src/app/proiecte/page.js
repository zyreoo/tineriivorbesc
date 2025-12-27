import Link from 'next/link';
import styles from './page.module.css';

export default function Proiecte() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>Ce facem concret</h1>
          <p className={styles.heroDescription}>
            Astea sunt proiectele noastre – unele le facem acum, altele le planificăm. 
            Toate au același scop: să dăm tinerilor un spațiu să vorbească și să fie auziți.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.projectSection}>
            <h2>Proiecte în desfășurare</h2>
            <div className={styles.projectsGrid}>
              <div className={styles.projectCard}>
                <h3>🎙️ Podcast</h3>
                <p>
                  Podcastul nostru – unde vorbim cu oameni interesanți despre lucruri care contează. 
                  Fără scripturi, fără filtre, doar conversații reale.
                </p>
                <Link href="/podcasturi" className={styles.projectLink}>
                  Vezi episoadele →
                </Link>
              </div>
              <div className={styles.projectCard}>
                <h3>📅 Evenimente</h3>
                <p>
                  Organizăm evenimente când putem – workshop-uri, întâlniri, conferințe. 
                  Ideea e să aducem oameni împreună și să creăm momente în care se întâmplă ceva real.
                </p>
                <Link href="/contact" className={styles.projectLink}>
                  Află mai multe →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.projectSection}>
            <h2>Inițiative viitoare</h2>
            <div className={styles.futureProject}>
              <h3>🚐 Caravana Tinerii Vorbesc</h3>
              <p>
                Visul nostru mare: să mergem cu un van prin România și să ajungem în orașe 
                unde tinerii nu prea au unde să-și spună ideile. E în planuri, dar vrem să-l 
                facem când o să fie momentul potrivit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.partnershipSection}>
            <h2>Colaborări și parteneriate</h2>
            <p>
              Lucrăm cu oricine are aceeași viziune – organizații, branduri, oameni care cred că 
              tinerii merită să fie auziți. Nu suntem pretențioși, dar vrem să colaborăm cu oameni 
              care chiar înțeleg ce facem.
            </p>
            <p>
              Dacă vrei să colaborezi sau să ne ajuți, 
              <Link href="/contact" className={styles.contactLink}> scrie-ne</Link> sau 
              <Link href="/sponsorizari" className={styles.contactLink}> vezi cum ne poți susține</Link>. 
              Răspundem la toate mesajele.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.gallerySection}>
            <h2>Momentele noastre</h2>
            <p className={styles.galleryDescription}>
              Câteva poze și clipuri din evenimentele noastre – oameni reali, momente reale, 
              conversații care chiar au contat.
            </p>
            <div className={styles.galleryGrid}>
              <div className={styles.galleryItem}>
                <div className={styles.galleryPlaceholder}>
                  <p>📸 Foto</p>
                </div>
              </div>
              <div className={styles.galleryItem}>
                <div className={styles.galleryPlaceholder}>
                  <p>📸 Foto</p>
                </div>
              </div>
              <div className={styles.galleryItem}>
                <div className={styles.galleryPlaceholder}>
                  <p>📸 Foto</p>
                </div>
              </div>
              <div className={styles.galleryItem}>
                <div className={styles.galleryPlaceholder}>
                  <p>📸 Foto</p>
                </div>
              </div>
              <div className={styles.galleryItem}>
                <div className={styles.galleryPlaceholder}>
                  <p>🎥 Video</p>
                </div>
              </div>
              <div className={styles.galleryItem}>
                <div className={styles.galleryPlaceholder}>
                  <p>📸 Foto</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

