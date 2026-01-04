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
    telefonPrefix: '+40',
    localitate: '',
    judet: '',
    strada: '',
    numar: '',
    perioada: '',
    acordGDPR: true,
    acordComunicare: true,
    acordEmail: true
  });

  const [cnpError, setCnpError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateCNP = (cnp) => {
    const cleanedCnp = cnp.trim();
    
    if (!cleanedCnp) {
      setCnpError('');
      return true;
    }

    if (!/^\d{13}$/.test(cleanedCnp)) {
      setCnpError('CNP-ul trebuie să conțină exact 13 cifre');
      return false;
    }

    const firstDigit = parseInt(cleanedCnp[0]);
    if (firstDigit < 1 || firstDigit > 8) {
      setCnpError('Prima cifră a CNP-ului este invalidă');
      return false;
    }

    const year = parseInt(cleanedCnp.substr(1, 2));
    const month = parseInt(cleanedCnp.substr(3, 2));
    const day = parseInt(cleanedCnp.substr(5, 2));

    let fullYear;
    if (firstDigit === 1 || firstDigit === 2) {
      fullYear = 1900 + year;
    } else if (firstDigit === 3 || firstDigit === 4) {
      fullYear = 1800 + year;
    } else if (firstDigit === 5 || firstDigit === 6) {
      fullYear = 2000 + year;
    } else {
      fullYear = 2000 + year;
    }

    if (month < 1 || month > 12) {
      setCnpError('Luna din CNP este invalidă');
      return false;
    }

    if (day < 1 || day > 31) {
      setCnpError('Ziua din CNP este invalidă');
      return false;
    }

    const date = new Date(fullYear, month - 1, day);
    if (date.getFullYear() !== fullYear || date.getMonth() !== month - 1 || date.getDate() !== day) {
      setCnpError('Data din CNP este invalidă');
      return false;
    }

    const countyCode = parseInt(cleanedCnp.substr(7, 2));
    if (countyCode < 1 || countyCode > 52) {
      setCnpError('Codul județului din CNP este invalid');
      return false;
    }

    const weights = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleanedCnp[i]) * weights[i];
    }
    const remainder = sum % 11;
    const controlDigit = remainder < 10 ? remainder : 1;
    const providedControlDigit = parseInt(cleanedCnp[12]);

    if (controlDigit !== providedControlDigit) {
      setCnpError('Cifra de control a CNP-ului este invalidă');
      return false;
    }

    setCnpError('');
    return true;
  };

  const validateEmail = (email) => {
    const cleanedEmail = email.trim();
    
    if (!cleanedEmail) {
      setEmailError('');
      return true;
    }

    if (!cleanedEmail.includes('@')) {
      setEmailError('Adresa de email trebuie să conțină @');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanedEmail)) {
      setEmailError('Adresa de email nu este validă');
      return false;
    }

    setEmailError('');
    return true;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'cnp') {
      if (value.length === 13) {
        validateCNP(value);
      } else {
        setCnpError('');
      }
    }

    if (name === 'email') {
      validateEmail(value);
    }
  };

  const handleCnpBlur = (e) => {
    validateCNP(e.target.value);
  };

  const handleEmailBlur = (e) => {
    validateEmail(e.target.value);
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
    
    if (!validateCNP(formData.cnp)) {
      alert('Vă rugăm să introduceți un CNP valid!');
      return;
    }
    
    if (isSignatureEmpty) {
      alert('Vă rugăm să adăugați semnătura!');
      return;
    }
    
    const dataToPass = {
      ...formData,
      signatureData: signatureData
    };
    sessionStorage.setItem('form230Data', JSON.stringify(dataToPass));
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: formData,
          signatureData: signatureData,
          action: 'form_submit'
        }),
      });
      
      if (!response.ok) {
        console.error('Failed to send email notification');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
    
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
                      onBlur={handleCnpBlur}
                      maxLength="13"
                      pattern="[0-9]{13}"
                      required 
                      className={cnpError ? styles.inputError : ''}
                    />
                    {cnpError && (
                      <small className={styles.errorMessage}>{cnpError}</small>
                    )}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleEmailBlur}
                      className={emailError ? styles.inputError : ''}
                    />
                    {emailError && (
                      <small className={styles.errorMessage}>{emailError}</small>
                    )}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="telefon">Telefon</label>
                    <div className={styles.phoneInputContainer}>
                      <select
                        id="telefonPrefix"
                        name="telefonPrefix"
                        value={formData.telefonPrefix}
                        onChange={handleChange}
                        className={styles.phonePrefix}
                      >
                        <option value="+40">+40 (RO)</option>
                        <option value="+1">+1 (US/CA)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+49">+49 (DE)</option>
                        <option value="+33">+33 (FR)</option>
                        <option value="+39">+39 (IT)</option>
                        <option value="+34">+34 (ES)</option>
                        <option value="+36">+36 (HU)</option>
                        <option value="+359">+359 (BG)</option>
                        <option value="+381">+381 (RS)</option>
                        <option value="+373">+373 (MD)</option>
                        <option value="+380">+380 (UA)</option>
                      </select>
                      <input 
                        type="tel" 
                        id="telefon" 
                        name="telefon" 
                        value={formData.telefon}
                        onChange={handleChange}
                        placeholder="712345678"
                        className={styles.phoneNumber}
                      />
                    </div>
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
