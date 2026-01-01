'use client';

import Link from 'next/link';
import styles from './page.module.css';

const handleDownload = (filename) => {
  const link = document.createElement('a');
  link.href = `/${filename}`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function Servicii() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>Servicii Carina Tănăselea</h1>
          <p className={styles.heroSubtitle}>
            Prezentator • Moderator • Voice-over • Host podcast
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.contentSection}>
            <h2>🎙️ Cine sunt eu</h2>
            <p>
              Sunt Carina Tănăselea, fondatoarea brandului național „Tinerii Vorbesc", creator de conținut, 
              prezentator și gazda unuia dintre cele mai autentice proiecte media dedicate tinerilor din România.
            </p>
            <p>
              Mi-am început drumul în media la 15 ani, iar astăzi, la 19 ani, am construit un brand cu impact — 
              podcasturi, evenimente, caravane, colaborări cu ONG-uri, antreprenori, lideri, creatori și comunități 
              din toată țara.
            </p>
            <p>
              Am realizat voice-over pentru reclame, am colaborat cu posturi radio și organizații precum Rotary Club, 
              iar experiența mea în prezentare, public speaking și comunicare a crescut odată cu fiecare proiect în 
              care m-am implicat.
            </p>
            <p>
              Dincolo de scenă sau cameră, sunt un om care ascultă, întreabă, empatizează și se conectează cu publicul. 
              Nu prezint doar un eveniment — creez atmosferă, emoție și ritm.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.whySection}>
            <h2>De ce să lucrezi cu mine?</h2>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <h3>✔ Experiență reală în media și comunicare</h3>
                <p>
                  Lucrez de peste 4 ani în industria media – am prezentat podcasturi, am moderat evenimente, 
                  am realizat voice-over-uri pentru reclame, am colaborat cu posturi radio și am coordonat proiecte 
                  naționale. Nu sunt doar prezentator, ci un profesionist în comunicare, obișnuit să gestioneze 
                  camere, public, invitați și dinamica unui eveniment.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <h3>✔ Capacitatea de a ține publicul conectat</h3>
                <p>
                  Știu să creez ritm, să mențin atenția, să adaptez tonul și energia în funcție de atmosferă. 
                  Am o prezență caldă, coerentă și carismatică, care face publicul să asculte, să se implice 
                  și să rămână captivat.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <h3>✔ Comunicare matură, structurată și naturală</h3>
                <p>
                  Nu citesc de pe foaie. Construiesc un fir logic, lucrez cu emoția momentului, dar păstrez 
                  profesionalismul. Am abilitatea de a pune întrebările potrivite, de a gestiona situații neprevăzute 
                  și de a menține echilibrul scenicii.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <h3>✔ Înțeleg industriile, publicul și mesajul brandurilor</h3>
                <p>
                  Fiind fondatoarea unui brand național, știu cum trebuie comunicat un mesaj astfel încât să fie 
                  memorabil și coerent. Nu vin doar să prezint — ci să transmit, să susțin și să amplific ceea ce 
                  organizatorii vor să comunice.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <h3>✔ Flexibilitate și adaptare la orice tip de eveniment</h3>
                <p>
                  De la conferințe formale, la evenimente corporate, sesiuni educaționale, paneluri, lansări de 
                  produs sau proiecte pentru tineri — mă adaptez stilistic și energetic astfel încât evenimentul 
                  să curgă natural.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <h3>✔ Abilități de leadership și organizare</h3>
                <p>
                  Conduc o echipă, coordonez proiecte, gestionez invitați, comunic cu parteneri și am experiență 
                  în organizarea evenimentelor. Asta înseamnă că știu exact ce se întâmplă „în spate" și ajut la 
                  fluiditatea întregului moment, nu doar la partea de pe scenă.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <h3>✔ Voce versatilă, potrivită pentru media și branduri</h3>
                <p>
                  Realizez voice-over-uri pentru reclame, trailere, introduceri, materiale promoționale și colaborări 
                  radio. Vocea mea este clară, caldă, profesionistă și adaptabilă pe mai multe stiluri.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <h3>✔ Empatie și autenticitate</h3>
                <p>
                  Aduc emoție, înțelegere și respect în spațiul pe care îl prezint. Oamenii se simt în siguranță să 
                  vorbească, să se deschidă și să ofere valoare — iar publicul simte asta.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <h3>✔ O poveste personală care inspiră</h3>
                <p>
                  Am început la 15 ani, fără resurse, dar cu mult curaj. La 19 ani conduc un brand național și creez 
                  platforme pentru tineri. Povestea mea inspiră atât publicul, cât și invitații — iar asta oferă un 
                  plus de credibilitate și autenticitate evenimentelor în care sunt invitată.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.servicesSection}>
            <h2>🎤 Servicii oferite</h2>
            <div className={styles.servicesList}>
              <div className={styles.serviceItem}>
                <h3>1️⃣ Prezentare de evenimente</h3>
                <ul>
                  <li>conferințe</li>
                  <li>lansări</li>
                  <li>evenimente corporate</li>
                  <li>festivaluri</li>
                  <li>gale</li>
                  <li>evenimente pentru tineri și ONG-uri</li>
                </ul>
              </div>
              <div className={styles.serviceItem}>
                <h3>2️⃣ Moderare discuții & paneluri</h3>
                <ul>
                  <li>discuții pe scenă</li>
                  <li>paneluri cu antreprenori</li>
                  <li>discuții motivaționale</li>
                  <li>evenimente educaționale</li>
                </ul>
              </div>
              <div className={styles.serviceItem}>
                <h3>3️⃣ Hosting de podcast pentru branduri</h3>
                <ul>
                  <li>găzduirea formatului</li>
                  <li>structură, întrebări, ritm</li>
                  <li>stil conversațional profesional</li>
                </ul>
              </div>
              <div className={styles.serviceItem}>
                <h3>4️⃣ Voice-over</h3>
                <ul>
                  <li>reclame</li>
                  <li>intro/outro podcast</li>
                  <li>campanii video</li>
                  <li>promo-uri radio</li>
                </ul>
              </div>
              <div className={styles.serviceItem}>
                <h3>5️⃣ Prezentare în cadrul Caravanei Tinerii Vorbesc</h3>
                <p>Disponibilă pentru proiecte care susțin tinerii și educația.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.whyHelpSection}>
            <h2>De ce te ajut eu să ai un eveniment mai bun?</h2>
            <div className={styles.helpGrid}>
              <div className={styles.helpCard}>
                <h3>✔ Transform evenimentul într-o experiență, nu doar într-un program</h3>
                <p>
                  Rolul meu nu este doar să „țin microfonul", ci să dau ritm, atmosferă și coerență evenimentului. 
                  Creez fluiditate între momente, construiesc energie și mă asigur că publicul rămâne conectat de la 
                  început până la final.
                </p>
              </div>
              <div className={styles.helpCard}>
                <h3>✔ Asigur structură, claritate și continuitate</h3>
                <p>
                  Fiecare eveniment are momente mai lente și momente-cheie. Eu știu să le echilibrez, să creez 
                  tranziții elegante, să intervin când e nevoie și să mențin direcția potrivită – astfel încât totul 
                  să pară profesionist și controlat.
                </p>
              </div>
              <div className={styles.helpCard}>
                <h3>✔ Creez conexiuni între invitați și public</h3>
                <p>
                  Am experiență în conversații, paneluri, podcasturi și interviuri. Voi face invitații să se simtă 
                  în largul lor, le scot în evidență povestea și îi ajut să comunice autentic. Publicul va simți asta 
                  și va rămâne implicat.
                </p>
              </div>
              <div className={styles.helpCard}>
                <h3>✔ Ridic energia sălii și evit momentele moarte</h3>
                <p>
                  Cu experiența mea în media și moderare, știu exact cum să mențin vibe-ul potrivit: tonul potrivit 
                  pentru sala respectivă, ritmul corect, intervenții naturale și inspirate, dinamica potrivită între 
                  momente. Nimic nu e mai greu decât o sală „pierdută". Eu mă asigur că nu se întâmplă.
                </p>
              </div>
              <div className={styles.helpCard}>
                <h3>✔ Pun accent pe emoție, mesaj și storytelling</h3>
                <p>
                  Un eveniment memorabil nu este cel în care oamenii doar ascultă… ci cel în care simt. Știu să 
                  construiesc intensitate, curiozitate și emoție astfel încât participanții să rămână cu ceva valoros.
                </p>
              </div>
              <div className={styles.helpCard}>
                <h3>✔ Reprezint cu profesionalism imaginea organizatorului</h3>
                <p>
                  Înțeleg cât de important este modul în care este perceput un brand sau o instituție. Pe scenă: 
                  vorbesc clar, transmit încredere, reprezint mesajul organizatorilor cu responsabilitate, respect 
                  timpii, indicațiile și structura. Totul contează — și eu tratez asta cu seriozitate.
                </p>
              </div>
              <div className={styles.helpCard}>
                <h3>✔ Sunt un host care observă tot</h3>
                <p>
                  Nu las nimic la voia întâmplării: verific set-up-ul, am grijă ca invitații să fie confortabili, 
                  gestionez situațiile neașteptate, adaptez discursul pe loc dacă audiența o cere. Sunt atentă la 
                  oameni, la ce simt și la cum reacționează.
                </p>
              </div>
              <div className={styles.helpCard}>
                <h3>✔ Am o energie calmă, matură, dar în același timp caldă și prietenoasă</h3>
                <p>
                  Asta creează siguranță pe scenă, atât pentru invitați, cât și pentru public.
                </p>
              </div>
              <div className={styles.helpCard}>
                <h3>✔ Ajut brandurile și organizatorii să transmită mesajul lor în cel mai bun mod</h3>
                <p>
                  Fiind fondatoarea unui brand media, știu ce înseamnă comunicarea corectă. Înțeleg cum trebuie spus 
                  un mesaj ca să fie clar, memorabil și profesionist.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.contactSection}>
            <h2>💬 Hai să lucrăm împreună</h2>
            <p>
              Fiecare eveniment este unic, iar rolul meu este să îl transform într-o experiență memorabilă adaptată 
              mesajului, publicului și stilului tău.
            </p>
            <p>
              Pentru oferte personalizate, disponibilitate, colaborări sau proiecte speciale, mă poți contacta:
            </p>
            <div className={styles.contactInfo}>
              <p>📧 <a href="mailto:carinadianatanaselea@gmail.com">carinadianatanaselea@gmail.com</a></p>
              <p>📲 Social Media: 
                <a href="https://www.youtube.com/@tineriivorbesc" target="_blank" rel="noopener noreferrer"> YouTube</a>
                {' • '}
                <a href="https://www.instagram.com/tinerii_vorbesc/" target="_blank" rel="noopener noreferrer"> Instagram</a>
                {' • '}
                <a href="https://www.facebook.com/profile.php?id=100080974780801" target="_blank" rel="noopener noreferrer"> Facebook</a>
                {' • '}
                <a href="https://www.tiktok.com/@tineriivorbescofficial" target="_blank" rel="noopener noreferrer"> TikTok</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.pricingSection}>
            <h2>🔖 Despre prețuri</h2>
            <p>
              Tarifele se stabilesc în funcție de tipul evenimentului, durata, complexitatea și cerințele organizatorului. 
              Îți voi oferi o ofertă clară, corectă și adaptată proiectului tău.
            </p>
            <button 
              onClick={() => handleDownload('Servicii_Carina_Tanaselea_COMPLET.docx')}
              className={styles.downloadBtn}
            >
              Descarcă prezentarea completă a serviciilor →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
