'use client';

import styles from './page.module.css';

const handleDownload = (filename) => {
  const link = document.createElement('a');
  link.href = `/${filename}`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function Sponsorizari() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>Ajută-ne să creștem vocea noii generații</h1>
          <p className={styles.heroDescription}>
            Fiecare contribuție contează – chiar și cea mai mică. Ne ajută să continuăm să facem 
            ce facem și să ajungem la mai mulți tineri. Alege cum vrei să ne ajuți.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.supportMethods}>
            <div className={styles.methodCard}>
              <h2>Formular 230</h2>
              <p>Dacă ești persoană fizică și vrei să ne ajuți, poți folosi formularul 230. 
              E simplu și rapid.</p>
              <a href="/formular-230" className={styles.downloadBtn}>
                Completează formularul online →
              </a>
              <a href="/230tineriivorbesc.pdf" className={styles.downloadBtn} download style={{marginTop: '0.5rem', display: 'block'}}>
                Sau descarcă PDF-ul →
              </a>
            </div>
            <div className={styles.methodCard}>
              <h2>Formular 177</h2>
              <p>Pentru companii care vor să ne susțină – formularul 177 pentru sponsorizări retroactive.</p>
              <a href="#" className={styles.downloadBtn} download>
                Descarcă formularul 177 →
              </a>
            </div>
            <div className={styles.methodCard}>
              <h2>Contract sponsorizare</h2>
              <p>Dacă vrei să colaborezi cu noi pe termen lung, putem discuta un contract de sponsorizare.</p>
              <a href="#" className={styles.downloadBtn} download>
                Descarcă contractul →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.bankingSection}>
            <h2>Date bancare</h2>
            <div className={styles.bankingInfo}>
              <div className={styles.bankingItem}>
                <h3>🏦 Nume organizație</h3>
                <p className={styles.bankingValue}>Asociația Tinerii Vorbesc</p>
              </div>
              <div className={styles.bankingItem}>
                <h3>💳 IBAN</h3>
                <p className={styles.bankingValue}>RO66BTRLRONCRT0CX1004301</p>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText('RO66BTRLRONCRT0CX1004301');
                    alert('IBAN copiat în clipboard!');
                  }}
                  className={styles.copyBtn}
                >
                  Copiază IBAN
                </button>
              </div>
              <div className={styles.bankingItem}>
                <h3>🔢 CUI</h3>
                <p className={styles.bankingValue}>51197056</p>
              </div>
            </div>
            <p className={styles.bankingNote}>
              Poți face transfer direct în contul nostru bancar folosind datele de mai sus.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.benefitsSection}>
            <h2>Ce primești când ne ajuți</h2>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitItem}>
                <h3>📢 Vizibilitate</h3>
                <p>Te menționăm în evenimente, pe site și în toate materialele noastre. 
                Vrem ca lumea să știe că ne-ai ajutat.</p>
              </div>
              <div className={styles.benefitItem}>
                <h3>🏆 Recunoaștere publică</h3>
                <p>Te recunoaștem public – nu doar o dată, ci în toate proiectele pe care le susținui.</p>
              </div>
              <div className={styles.benefitItem}>
                <h3>🤝 Parteneriate de impact</h3>
                <p>Colaborăm cu tine pentru a crea ceva care chiar face diferența. 
                Nu e doar despre bani, e despre impact real.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.mediaKitSection}>
            <h2>Media Kit</h2>
            <p>
              Am făcut un kit cu toate informațiile importante – ce facem, cum am ajuns aici, 
              ce impact avem și cum putem colabora. E util dacă vrei să ne prezinți altora.
            </p>
            <button 
              onClick={() => handleDownload('Media_Kit_Tinerii_Vorbesc.docx')}
              className={styles.downloadBtn}
            >
              Descarcă Media Kit →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

