import styles from './page.module.css';

export default function DespreNoi() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>Cine suntem și ce facem</h1>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h2>Tinerii Vorbesc – ONG</h2>
            <p>
              Să fiu sinceră, am început asta pentru că eram frustrată că nu exista un loc unde tinerii 
              să poată vorbi deschis despre ce gândesc cu adevărat. Fără filtre, fără să fie politicoși.
            </p>
            <p>
              „Tinerii Vorbesc" a devenit mai mult decât un ONG – e un spațiu unde tinerii pot să fie ei înșiși, 
              să-și spună ideile și să găsească oameni care le înțeleg.
            </p>
            <p>
              Organizăm evenimente când putem, facem podcasturi cu oameni interesanți și construim proiecte 
              care chiar au sens. Nu contează dacă ești la început sau ai deja experiență – dacă ai ceva de spus, 
              te ascultăm.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.carinaSection}>
            <h2>Carina Tănăselea</h2>
            <div className={styles.carinaContent}>
              <div className={styles.carinaText}>
                <p>
                  Salut! Eu sunt Carina. Am pornit „Tinerii Vorbesc" pentru că credeam (și încă cred) 
                  că tinerii din România au multe de spus, dar puțini care să-i asculte cu adevărat.
                </p>
                <p>
                  Fac podcasturi, moderiez evenimente și încerc să creez spații unde oamenii se simt 
                  confortabil să vorbească deschis. Nu sunt perfectă, nu am toate răspunsurile, dar 
                  știu să ascult și să pun întrebările potrivite.
                </p>
                <p>
                  Dincolo de toate astea, sunt o persoană normală care bea multă cafea, se stresează 
                  când nu merge ceva și se bucură când văd că proiectele noastre chiar ajută oameni.
                </p>
                <p>
                  Dacă vrei să știi mai multe despre mine sau despre cum am ajuns aici, hai să vorbim. 
                  Răspund la mesaje (chiar dacă uneori durează puțin).
                </p>
              </div>
              <div className={styles.carinaImage}>
                <div className={styles.imagePlaceholder}>
                  <p>Foto Carina</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.volunteerSection}>
            <h2>Vrei să te implici?</h2>
            <p className={styles.introText}>
              Căutăm oameni care chiar vor să facă ceva, nu doar să pună like-uri. Dacă te pasionează 
              ce facem și vrei să ajuți, hai să vorbim. Fiecare mână ajută, fiecare idee contează.
            </p>
            <form className={styles.volunteerForm}>
              <div className={styles.formGroup}>
                <label htmlFor="nume">Nume complet *</label>
                <input type="text" id="nume" name="nume" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="telefon">Telefon</label>
                <input type="tel" id="telefon" name="telefon" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="varsta">Vârstă *</label>
                <input type="number" id="varsta" name="varsta" min="14" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="oras">Oraș</label>
                <input type="text" id="oras" name="oras" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="motivatie">Spune-ne de ce te pasionează ce facem *</label>
                <textarea id="motivatie" name="motivatie" rows="5" required></textarea>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="experienta">Experiență relevantă (opțional)</label>
                <textarea id="experienta" name="experienta" rows="4"></textarea>
              </div>
              <button type="submit" className={styles.submitBtn}>
                Trimite formularul
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.mediaKitSection}>
            <h2>Media Kit</h2>
            <p>
              Ești jurnalist, partener sau sponsor și vrei să știi mai multe? Am pregătit un kit cu 
              informații despre ce facem, cum am ajuns aici și cum putem colabora.
            </p>
            <a href="#" className={styles.downloadBtn} download>
              Descarcă PDF →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

