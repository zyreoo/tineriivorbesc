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
            <div className={styles.introSection}>
              <h2>🧩 Alătură-te echipei care dă voce noii generații!</h2>
              <p className={styles.introText}>
                „Tinerii Vorbesc" caută colaboratori pasionați de media, foto-video, social media, 
                evenimente, IT, PR, Fundraising etc. Dacă vrei să contribui la ceva real, locul tău e aici.
              </p>
            </div>

            <form className={styles.volunteerForm}>
              <h3 className={styles.formSectionTitle}>📝 Formular</h3>

              <div className={styles.formSection}>
                <h4 className={styles.sectionLabel}>1. Date personale</h4>
                <div className={styles.formGroup}>
                  <label htmlFor="nume">Nume și prenume *</label>
                  <input type="text" id="nume" name="nume" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="varsta">Vârstă *</label>
                  <input type="number" id="varsta" name="varsta" min="14" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="oras">Oraș *</label>
                  <input type="text" id="oras" name="oras" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="telefon">Telefon *</label>
                  <input type="tel" id="telefon" name="telefon" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="instagram">Instagram</label>
                  <input type="text" id="instagram" name="instagram" placeholder="@username" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="facebook">Facebook</label>
                  <input type="text" id="facebook" name="facebook" placeholder="Link sau nume" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="linkedin">LinkedIn</label>
                  <input type="text" id="linkedin" name="linkedin" placeholder="Link profil" />
                </div>
              </div>

              <div className={styles.formSection}>
                <h4 className={styles.sectionLabel}>2. Domeniu de interes (alege una sau mai multe opțiuni) *</h4>
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" name="domeniu" value="social-media" />
                    <span>Social Media (Instagram / TikTok / YouTube / Facebook / LinkedIn)</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" name="domeniu" value="evenimente" />
                    <span>Evenimente & Caravana</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" name="domeniu" value="foto-video" />
                    <span>Foto / Video / Editare</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" name="domeniu" value="design" />
                    <span>Design grafic</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" name="domeniu" value="pr" />
                    <span>PR & Comunicare</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" name="domeniu" value="fundraising" />
                    <span>Sponsorizări & Fundraising</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" name="domeniu" value="granturi" />
                    <span>Fonduri Europene / Granturi</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" name="domeniu" value="blog" />
                    <span>Blog & Scriere conținut</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" name="domeniu" value="it" />
                    <span>IT / Website</span>
                  </label>
                </div>
              </div>

              <div className={styles.formSection}>
                <h4 className={styles.sectionLabel}>3. De ce vrei să te alături echipei? *</h4>
                <div className={styles.formGroup}>
                  <textarea 
                    id="motivatie" 
                    name="motivatie" 
                    rows="5" 
                    placeholder="Spune-ne de ce te pasionează ce facem și de ce vrei să te implici..."
                    required
                  ></textarea>
                </div>
              </div>

              <div className={styles.formSection}>
                <h4 className={styles.sectionLabel}>4. Ce abilități sau experiențe ai? *</h4>
                <div className={styles.formGroup}>
                  <textarea 
                    id="abilitati" 
                    name="abilitati" 
                    rows="5" 
                    placeholder="Descrie abilitățile tale, experiența relevantă sau ce aduci în echipă..."
                    required
                  ></textarea>
                </div>
              </div>

              <div className={styles.formSection}>
                <h4 className={styles.sectionLabel}>5. Cât timp poți dedica săptămânal proiectului? *</h4>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="timp" value="sub-3" required />
                    <span>&lt; 3 ore</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="timp" value="3-5" />
                    <span>3–5 ore</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="timp" value="5-10" />
                    <span>5–10 ore</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="timp" value="peste-10" />
                    <span>peste 10 ore</span>
                  </label>
                </div>
              </div>

              <div className={styles.formSection}>
                <h4 className={styles.sectionLabel}>6. Disponibilitate evenimente *</h4>
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" name="disponibilitate" value="cluj" />
                    <span>Doar Cluj</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" name="disponibilitate" value="bucuresti" />
                    <span>Doar București</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" name="disponibilitate" value="ambele" />
                    <span>Ambele</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" name="disponibilitate" value="alt-oras" />
                    <span>Alt oraș</span>
                  </label>
                </div>
              </div>

              <div className={styles.formSection}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" name="acord" required />
                  <span>
                    🔒 Prin completarea acestui formular, declar că informațiile oferite sunt reale 
                    și că înțeleg că unele roluri implică semnarea unui acord de confidențialitate. *
                  </span>
                </label>
              </div>

              <button type="submit" className={styles.submitBtn}>
                Trimite formularul
              </button>
            </form>

            <div className={styles.benefitsSection}>
              <h3 className={styles.benefitsTitle}>🎁 Ce îți oferim</h3>
              <ul className={styles.benefitsList}>
                <li>✅ Promovarea propriei activități pe platformele noastre</li>
                <li>✅ Networking cu invitați, parteneri și branduri</li>
                <li>✅ 40% din barteruri și giveaway-uri pentru managerii de platforme</li>
                <li>✅ Adeverință pentru CV & experiență practică</li>
                <li>✅ Acces la proiecte naționale și oportunități reale de creștere</li>
                <li>✅ Comision contracte imagine / fonduri europene (care depășesc un anumit prag)</li>
              </ul>
            </div>
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

