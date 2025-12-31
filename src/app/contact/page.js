import styles from './page.module.css';

export default function Contact() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>Hai să vorbim!</h1>
          <p className={styles.heroDescription}>
            Ai o întrebare? Vrei să te implici? Sau pur și simplu vrei să vorbim? Scrie-ne – 
            citim toate mesajele și încercăm să răspundem cât mai repede.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            <div className={styles.contactFormSection}>
              <h2>Trimite un mesaj</h2>
              <form className={styles.contactForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="nume">Nume *</label>
                  <input type="text" id="nume" name="nume" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="subiect">Subiect *</label>
                  <select id="subiect" name="subiect" required>
                    <option value="">Selectează...</option>
                    <option value="voluntariat">Voluntariat</option>
                    <option value="invitat">Propune invitat</option>
                    <option value="proiect">Despre proiecte</option>
                    <option value="colaborare">Colaborare</option>
                    <option value="alta">Altă întrebare</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="mesaj">Mesaj *</label>
                  <textarea 
                    id="mesaj" 
                    name="mesaj" 
                    rows="6" 
                    required
                    placeholder="Scrie mesajul tău aici..."
                  ></textarea>
                </div>
                <button type="submit" className={styles.submitBtn}>
                  Trimite mesajul
                </button>
              </form>
            </div>
            <div className={styles.contactInfoSection}>
              <h2>Date de contact</h2>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📧</span>
                  <div>
                    <h3>Email</h3>
                    <a href="mailto:carinadianatanaselea@gmail.com">
                      carinadianatanaselea@gmail.com
                    </a>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📍</span>
                  <div>
                    <h3>Locație</h3>
                    <p>România</p>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>🔗</span>
                  <div>
                    <h3>Social Media</h3>
                    <div className={styles.socialLinks}>
                      <a href="https://www.youtube.com/@tineriivorbesc" target="_blank" rel="noopener noreferrer">
                        YouTube
                      </a>
                      {' • '}
                      <a href="https://www.instagram.com/tinerii_vorbesc/" target="_blank" rel="noopener noreferrer">
                        Instagram
                      </a>
                      {' • '}
                      <a href="https://www.facebook.com/profile.php?id=100080974780801" target="_blank" rel="noopener noreferrer">
                        Facebook
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

