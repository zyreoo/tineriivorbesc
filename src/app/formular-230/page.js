'use client';

import { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import styles from './page.module.css';

export default function Formular230() {
  const signaturePadRef = useRef(null);
  const [signatureData, setSignatureData] = useState(null);
  const [isSignatureEmpty, setIsSignatureEmpty] = useState(true);

  const [formData, setFormData] = useState({
    nume: '',
    initialaTatalui: '',
    prenume: '',
    cnp: '',
    email: '',
    telefon: '',
    localitate: '',
    judet: '',
    strada: '',
    numar: '',
    perioada: '',
    acordGDPR: true,
    acordComunicare: true,
    acordEmail: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSignatureEnd = () => {
    if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
      const dataURL = signaturePadRef.current.toDataURL();
      setSignatureData(dataURL);
      setIsSignatureEmpty(false);
    }
  };

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
      setSignatureData(null);
      setIsSignatureEmpty(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSignatureEmpty) {
      alert('Vă rugăm să adăugați semnătura!');
      return;
    }
    
    // Save form data to sessionStorage for test230 page
    const dataToPass = {
      ...formData,
      signatureData: signatureData
    };
    sessionStorage.setItem('form230Data', JSON.stringify(dataToPass));
    
    // Redirect to test230 page
    window.location.href = '/test230';
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>Formular 230</h1>
          <p className={styles.heroDescription}>
            Completează formularul pentru a direcționa până la 3,5% din impozitul tău anual 
            către Asociația Tinerii Vorbesc.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.formContainer}>
            <div className={styles.infoBox}>
              <h3>ℹ️ Informații importante</h3>
              <p>
                Acest formular îți permite să direcționezi până la 3,5% din impozitul anual 
                pe veniturile din salarii către Asociația Tinerii Vorbesc, fără costuri suplimentare.
              </p>
              <p>
                <strong>Datele organizației (precompletate):</strong>
              </p>
              <ul>
                <li><strong>CUI:</strong> 51197056</li>
                <li><strong>Denumire:</strong> Asociația Tinerii Vorbesc</li>
                <li><strong>IBAN:</strong> RO66BTRLRONCRT0CX1004301</li>
                <li><strong>Procent:</strong> 3,5%</li>
              </ul>
              <p className={styles.requiredNote}>
                <strong>Completarea căsuțelor anotate cu (*) este obligatorie</strong>
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formSection}>
                <h2>Date personale</h2>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="nume">Nume *</label>
                    <input 
                      type="text" 
                      id="nume" 
                      name="nume" 
                      value={formData.nume}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="initialaTatalui">Inițiala tatălui</label>
                    <input 
                      type="text" 
                      id="initialaTatalui" 
                      name="initialaTatalui" 
                      value={formData.initialaTatalui}
                      onChange={handleChange}
                      maxLength="1"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="prenume">Prenume *</label>
                    <input 
                      type="text" 
                      id="prenume" 
                      name="prenume" 
                      value={formData.prenume}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="cnp">CNP *</label>
                    <input 
                      type="text" 
                      id="cnp" 
                      name="cnp" 
                      value={formData.cnp}
                      onChange={handleChange}
                      maxLength="13"
                      pattern="[0-9]{13}"
                      required 
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="telefon">Telefon</label>
                    <input 
                      type="tel" 
                      id="telefon" 
                      name="telefon" 
                      value={formData.telefon}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="localitate">Localitate *</label>
                    <input 
                      type="text" 
                      id="localitate" 
                      name="localitate" 
                      value={formData.localitate}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="judet">Județ *</label>
                    <input 
                      type="text" 
                      id="judet" 
                      name="judet" 
                      value={formData.judet}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="strada">Stradă</label>
                    <input 
                      type="text" 
                      id="strada" 
                      name="strada" 
                      value={formData.strada}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="numar">Număr</label>
                    <input 
                      type="text" 
                      id="numar" 
                      name="numar" 
                      value={formData.numar}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <h2>Perioadă de redirecționare</h2>
                
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="perioada" 
                      value="1"
                      checked={formData.perioada === '1'}
                      onChange={handleChange}
                    />
                    <span>Vreau să redirecționez timp de 1 an</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="perioada" 
                      value="2"
                      checked={formData.perioada === '2'}
                      onChange={handleChange}
                    />
                    <span>Vreau să redirecționez timp de 2 ani</span>
                  </label>
                </div>
              </div>

              <div className={styles.formSection}>
                <h2>Acorduri</h2>
                
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input 
                      type="checkbox" 
                      name="acordGDPR" 
                      checked={formData.acordGDPR}
                      onChange={handleChange}
                      required
                    />
                    <span>
                      Sunt de acord cu prelucrarea datelor mele personale în conformitate cu 
                      Regulamentul (UE) 2016/679 privind protecția persoanelor fizice în ceea ce 
                      privește prelucrarea datelor cu caracter personal și privind libera circulație 
                      a acestor date și de abrogare a Directivei 95/46/CE (Regulamentul general privind 
                      protecția datelor) *
                    </span>
                  </label>
                  
                  <label className={styles.checkboxLabel}>
                    <input 
                      type="checkbox" 
                      name="acordComunicare" 
                      checked={formData.acordComunicare}
                      onChange={handleChange}
                    />
                    <span>
                      Sunt de acord ca datele de identificare (nume, prenume și cod numeric personal/număr 
                      de identificare fiscală), precum și suma direcționată să fie comunicate entității beneficiare.
                    </span>
                  </label>
                  
                  <label className={styles.checkboxLabel}>
                    <input 
                      type="checkbox" 
                      name="acordEmail" 
                      checked={formData.acordEmail}
                      onChange={handleChange}
                    />
                    <span>
                      Sunt de acord să primesc emailuri de la Asociația Tinerii Vorbesc
                    </span>
                  </label>
                </div>
              </div>

              <div className={styles.formSection}>
                <div className={styles.signatureSection}>
                  <h2>Semnătură *</h2>
                  <p className={styles.signatureNote}>
                    Semnează în caseta de mai jos folosind mouse-ul sau degetul (pe dispozitive touch).
                  </p>
                  
                  <div className={styles.signaturePadContainer}>
                    <div className={styles.signaturePad}>
                      <SignatureCanvas
                        ref={signaturePadRef}
                        canvasProps={{
                          className: styles.signatureCanvas,
                          width: 600,
                          height: 200,
                          style: { touchAction: 'none' }
                        }}
                        onEnd={handleSignatureEnd}
                        penColor="black"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={clearSignature}
                      className={styles.clearSignatureBtn}
                    >
                      Șterge semnătura
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={styles.submitBtn}>
                  Generează și descarcă datele
                </button>
              
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
