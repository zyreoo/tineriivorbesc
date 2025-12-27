import styles from './page.module.css';

export default function Podcasturi() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>Podcasturile noastre</h1>
          <p className={styles.heroDescription}>
            Conversații reale cu oameni reali. Interviuri cu tineri care fac lucruri interesante, 
            discuții deschise despre subiecte care contează și povești pe care le ascultăm cu plăcere.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.episodesGrid}>
            <div className={styles.episodeCard}>
              <div className={styles.episodeImage}>
                <p>🎙️</p>
              </div>
              <div className={styles.episodeContent}>
                <h3>Episodul 1</h3>
                <p className={styles.episodeDescription}>
                  Primul episod – despre cum am pornit totul și de ce credem că e important să dăm 
                  tinerilor o voce.
                </p>
                <a href="#" className={styles.listenBtn}>Ascultă acum</a>
              </div>
            </div>
            <div className={styles.episodeCard}>
              <div className={styles.episodeImage}>
                <p>🎙️</p>
              </div>
              <div className={styles.episodeContent}>
                <h3>Episodul 2</h3>
                <p className={styles.episodeDescription}>
                  Discuție despre cum tinerii pot să-și construiască cariera în România și ce înseamnă 
                  să faci alegeri care chiar te fac fericit.
                </p>
                <a href="#" className={styles.listenBtn}>Ascultă acum</a>
              </div>
            </div>
            <div className={styles.episodeCard}>
              <div className={styles.episodeImage}>
                <p>🎙️</p>
              </div>
              <div className={styles.episodeContent}>
                <h3>Episodul 3</h3>
                <p className={styles.episodeDescription}>
                  Un invitat special ne povestește despre cum să transformi o idee într-un proiect real 
                  și de ce e important să nu renunți când lucrurile devin grele.
                </p>
                <a href="#" className={styles.listenBtn}>Ascultă acum</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.suggestionsSection}>
            <h2>Ai o idee sau un invitat?</h2>
            <p className={styles.introText}>
              Știi pe cineva interesant care ar avea ceva de spus? Sau ai un subiect despre care ai vrea 
              să vorbim? Scrie-ne – chiar citim toate mesajele și răspundem (promit!).
            </p>
            <form className={styles.suggestionForm}>
              <div className={styles.formGroup}>
                <label htmlFor="nume">Nume *</label>
                <input type="text" id="nume" name="nume" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="tip">Tip sugestie *</label>
                <select id="tip" name="tip" required>
                  <option value="">Selectează...</option>
                  <option value="subiect">Subiect de discuție</option>
                  <option value="invitat">Invitat</option>
                  <option value="alta">Altă sugestie</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="sugestie">Sugestia ta *</label>
                <textarea 
                  id="sugestie" 
                  name="sugestie" 
                  rows="6" 
                  placeholder="Descrie ideea ta sau invitatul propus..."
                  required
                ></textarea>
              </div>
              <button type="submit" className={styles.submitBtn}>
                Trimite sugestia
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

