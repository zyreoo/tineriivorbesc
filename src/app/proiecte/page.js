import Link from 'next/link';
import Image from 'next/image';
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
            <h2>🎙️ Podcast</h2>
            <div className={styles.projectCard}>
              <p>
                Podcastul nostru – unde vorbim cu oameni interesanți despre lucruri care contează. 
                Fără scripturi, fără filtre, doar conversații reale cu tineri care fac lucruri interesante, 
                discuții deschise despre subiecte care contează și povești pe care le ascultăm cu plăcere.
              </p>
              <Link href="/podcasturi" className={styles.projectLink}>
                Ascultă podcasturile →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.projectSection}>
            <h2>📅 Evenimente</h2>
            <div className={styles.projectsGrid}>
              <div className={styles.projectCard}>
                <h3>Organizare evenimente</h3>
                <p>
                  Organizăm evenimente când putem – workshop-uri, întâlniri, conferințe. 
                  Ideea e să aducem oameni împreună și să creăm momente în care se întâmplă ceva real.
                </p>
                <Link href="/contact" className={styles.projectLink}>
                  Află mai multe →
                </Link>
              </div>
              <div className={styles.projectCard}>
                <h3>🚐 Caravana Tinerii Vorbesc</h3>
                <p>
                  Visul nostru mare: să mergem cu un van prin România și să ajungem în orașe 
                  unde tinerii nu prea au unde să-și spună ideile. Vrem să creăm spații de 
                  conversație și să dăm voce tinerilor din toate colțurile țării.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.projectSection}>
            <h2>📺 Proiecte în desfășurare</h2>
            <div className={styles.projectsGrid}>
              <div className={styles.projectCard}>
                <h3>📺 TV</h3>
                <p>
                  Proiecte și apariții în emisiuni TV unde discutăm despre tineri, despre 
                  oportunități și despre cum putem crea un impact pozitiv în comunitate.
                </p>
              </div>
              <div className={styles.projectCard}>
                <h3>📻 Radio</h3>
                <p>
                  Colaborări cu posturi de radio pentru a ajunge la mai mulți tineri și 
                  a le oferi o platformă pentru a-și exprima ideile și opiniile.
                </p>
              </div>
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
              Câteva poze din evenimentele noastre – oameni reali, momente reale, 
              conversații care chiar au contat.
            </p>
            <div className={styles.galleryGrid}>
              <div className={styles.galleryItem}>
                <Image
                  src="/photos/used/WhatsApp Image 2025-12-26 at 1.09.44 PM (2).jpeg"
                  alt="Moment din eveniment"
                  width={400}
                  height={400}
                  className={styles.galleryImage}
                />
              </div>
              <div className={styles.galleryItem}>
                <Image
                  src="/photos/used/WhatsApp Image 2025-12-26 at 1.09.44 PM (3).jpeg"
                  alt="Moment din eveniment"
                  width={400}
                  height={400}
                  className={styles.galleryImage}
                />
              </div>
              <div className={styles.galleryItem}>
                <Image
                  src="/photos/used/WhatsApp Image 2025-12-26 at 1.09.44 PM (4).jpeg"
                  alt="Moment din eveniment"
                  width={400}
                  height={400}
                  className={styles.galleryImage}
                />
              </div>
              <div className={styles.galleryItem}>
                <Image
                  src="/photos/used/WhatsApp Image 2025-12-26 at 1.09.44 PM (5).jpeg"
                  alt="Moment din eveniment"
                  width={400}
                  height={400}
                  className={styles.galleryImage}
                />
              </div>
              <div className={styles.galleryItem}>
                <Image
                  src="/photos/used/WhatsApp Image 2025-12-26 at 1.09.45 PM (2).jpeg"
                  alt="Moment din eveniment"
                  width={400}
                  height={400}
                  className={styles.galleryImage}
                />
              </div>
              <div className={styles.galleryItem}>
                <Image
                  src="/photos/used/WhatsApp Image 2025-12-26 at 1.09.46 PM (2).jpeg"
                  alt="Moment din eveniment"
                  width={400}
                  height={400}
                  className={styles.galleryImage}
                />
              </div>
              <div className={styles.galleryItem}>
                <Image
                  src="/photos/used/WhatsApp Image 2025-12-26 at 1.09.47 PM (1).jpeg"
                  alt="Moment din eveniment"
                  width={400}
                  height={400}
                  className={styles.galleryImage}
                />
              </div>
              <div className={styles.galleryItem}>
                <Image
                  src="/photos/used/WhatsApp Image 2025-12-26 at 1.09.48 PM (1).jpeg"
                  alt="Moment din eveniment"
                  width={400}
                  height={400}
                  className={styles.galleryImage}
                />
              </div>
              <div className={styles.galleryItem}>
                <Image
                  src="/photos/used/WhatsApp Image 2025-12-26 at 1.09.48 PM (2).jpeg"
                  alt="Moment din eveniment"
                  width={400}
                  height={400}
                  className={styles.galleryImage}
                />
              </div>
              <div className={styles.galleryItem}>
                <Image
                  src="/photos/used/WhatsApp Image 2025-12-26 at 1.09.49 PM (1).jpeg"
                  alt="Moment din eveniment"
                  width={400}
                  height={400}
                  className={styles.galleryImage}
                />
              </div>
              <div className={styles.galleryItem}>
                <Image
                  src="/photos/used/WhatsApp Image 2025-12-26 at 1.09.49 PM (2).jpeg"
                  alt="Moment din eveniment"
                  width={400}
                  height={400}
                  className={styles.galleryImage}
                />
              </div>
              <div className={styles.galleryItem}>
                <Image
                  src="/photos/used/WhatsApp Image 2025-12-26 at 1.09.50 PM (1).jpeg"
                  alt="Moment din eveniment"
                  width={400}
                  height={400}
                  className={styles.galleryImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
