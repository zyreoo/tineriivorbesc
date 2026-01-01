'use client';

import { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { PDFDocument, StandardFonts } from 'pdf-lib';
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
    perioada: '', // '1' sau '2'
    acordGDPR: false,
    acordComunicare: false,
    acordEmail: false
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

  const listPDFFields = async () => {
    try {
      const pdfUrl = '/230tineriivorbesc.pdf';
      const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const form = pdfDoc.getForm();
      const fields = form.getFields();
      
      const fieldList = fields.map(field => {
        return {
          name: field.getName(),
          type: field.constructor.name
        };
      });
      
      console.log('=== PDF FORM FIELDS ===');
      fieldList.forEach(field => {
        console.log(`${field.type}: "${field.name}"`);
      });
      console.log('=======================');
      
      alert(`Găsit ${fieldList.length} câmpuri în PDF. Verifică consola pentru lista completă.`);
    } catch (error) {
      console.error('Error listing PDF fields:', error);
      alert('Eroare la citirea câmpurilor PDF. Verifică consola.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if signature is required and provided
    if (isSignatureEmpty) {
      alert('Vă rugăm să adăugați semnătura!');
      return;
    }
    
    // Try to generate and download the PDF
    try {
      await fillPDFForm();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Eroare la generarea PDF-ului. Verifică consola pentru detalii.');
      // Only fallback to text file if PDF generation completely fails
      const summary = generateSummary();
      downloadTextFile(summary);
    }
  };

  const generateSummary = () => {
    return `
FORMULAR 230 - DATE COMPLETATE

I. DATE DE IDENTIFICARE A CONTRIBUABILULUI
Nume: ${formData.nume}
Inițiala tatălui: ${formData.initialaTatalui}
Prenume: ${formData.prenume}
CNP: ${formData.cnp}
Email: ${formData.email || 'Nu este completat'}
Telefon: ${formData.telefon || 'Nu este completat'}
Localitate: ${formData.localitate}
Județ: ${formData.judet}
Stradă: ${formData.strada || 'Nu este completat'}
Număr: ${formData.numar || 'Nu este completat'}

II. DESTINAȚIA SUMEI
Susținerea unei entități nonprofit: ☑
Cod de identificare fiscală: 51197056
Denumire: Asociația Tinerii Vorbesc
Cont bancar (IBAN): RO66BTRLRONCRT0CX1004301
Procent: 3,5%

Perioadă de redirecționare: ${formData.perioada === '1' ? '1 an' : formData.perioada === '2' ? '2 ani' : 'Nu este selectat'}

Acorduri:
- Acord GDPR: ${formData.acordGDPR ? 'Da' : 'Nu'}
- Acord comunicare date către entitate: ${formData.acordComunicare ? 'Da' : 'Nu'}
- Acord primire emailuri: ${formData.acordEmail ? 'Da' : 'Nu'}

Semnătură: ${signatureData ? 'Adăugată' : 'Nu este adăugată'}

Data completării: ${new Date().toLocaleDateString('ro-RO')}

INSTRUCȚIUNI:
1. Descarcă formularul 230 PDF din link-ul de pe site
2. Completează manual formularul cu datele de mai sus
3. Adaugă semnătura pe formularul PDF
4. Trimite formularul completat la ANAF
    `;
  };

  const downloadTextFile = async (summary) => {
    // Fallback: download text file and signature image
    const textBlob = new Blob([summary], { type: 'text/plain;charset=utf-8' });
    const textUrl = URL.createObjectURL(textBlob);
    const textLink = document.createElement('a');
    textLink.href = textUrl;
    textLink.download = `Formular_230_${formData.nume}_${formData.prenume}.txt`;
    document.body.appendChild(textLink);
    textLink.click();
    document.body.removeChild(textLink);
    URL.revokeObjectURL(textUrl);

    if (signatureData) {
      const imgBlob = await (await fetch(signatureData)).blob();
      const imgUrl = URL.createObjectURL(imgBlob);
      const imgLink = document.createElement('a');
      imgLink.href = imgUrl;
      imgLink.download = `Semnatura_${formData.nume}_${formData.prenume}.png`;
      document.body.appendChild(imgLink);
      imgLink.click();
      document.body.removeChild(imgLink);
      URL.revokeObjectURL(imgUrl);
    }
  };

  const fillPDFForm = async () => {
    // Fetch the PDF template
    const pdfUrl = '/230tineriivorbesc.pdf';
    const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
    
    // Load the PDF
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    
    // Try to get form fields first
    let hasFormFields = false;
    try {
      const form = pdfDoc.getForm();
      const fields = form.getFields();
      
      if (fields.length > 0) {
        hasFormFields = true;
        console.log('Found form fields, attempting to fill...');
        
        fields.forEach(field => {
          const fieldName = field.getName().toLowerCase();
          const fieldType = field.constructor.name;
          
          try {
            if (fieldType === 'PDFTextField') {
              const textField = form.getTextField(field.getName());
              
              if (fieldName.includes('nume') && !fieldName.includes('prenume')) {
                textField.setText(formData.nume || '');
              } else if (fieldName.includes('prenume')) {
                textField.setText(formData.prenume || '');
              } else if (fieldName.includes('initiala') || fieldName.includes('initial')) {
                textField.setText(formData.initialaTatalui || '');
              } else if (fieldName.includes('cnp') || (fieldName.includes('cod') && fieldName.includes('numeric'))) {
                textField.setText(formData.cnp || '');
              } else if (fieldName.includes('email') || fieldName.includes('e-mail')) {
                textField.setText(formData.email || '');
              } else if (fieldName.includes('telefon') || fieldName.includes('phone')) {
                textField.setText(formData.telefon || '');
              } else if (fieldName.includes('localitate') || fieldName.includes('city')) {
                textField.setText(formData.localitate || '');
              } else if (fieldName.includes('judet') || fieldName.includes('sector') || fieldName.includes('county')) {
                textField.setText(formData.judet || '');
              } else if (fieldName.includes('strada') || fieldName.includes('street') || fieldName.includes('stradă')) {
                textField.setText(formData.strada || '');
              } else if (fieldName.includes('numar') || fieldName.includes('number') || fieldName.includes('număr')) {
                textField.setText(formData.numar || '');
              } else if (fieldName.includes('procent') || fieldName.includes('percent')) {
                textField.setText('3.5');
              }
            } else if (fieldType === 'PDFCheckBox') {
              const checkBox = form.getCheckBox(field.getName());
              
              if (fieldName.includes('acord') || fieldName.includes('agree')) {
                if (formData.acordGDPR || formData.acordComunicare) {
                  checkBox.check();
                }
              }
              if ((fieldName.includes('2') && fieldName.includes('ani')) || fieldName.includes('year')) {
                if (formData.perioada === '2') {
                  checkBox.check();
                }
              }
            }
          } catch (e) {
            console.log(`Could not fill field: ${field.getName()}`, e);
          }
        });
        
        form.updateFieldAppearances();
      }
    } catch (e) {
      console.log('No form fields found or error accessing form:', e);
    }
    
    // If no form fields or form fields didn't work, add text directly
    // Coordinates based on standard Form 230 ANAF layout (A4: 595 x 842 points)
    console.log('Adding text directly to PDF at specific coordinates...');
    console.log('PDF dimensions:', width, 'x', height);
    
    // Load a font that supports Romanian characters
    // StandardFonts.Helvetica doesn't support all Romanian chars, so we'll use a workaround
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 9;
    
    // Helper function to replace Romanian characters with ASCII equivalents for PDF
    const replaceRomanianChars = (text) => {
      return text
        .replace(/ă/g, 'a').replace(/Ă/g, 'A')
        .replace(/â/g, 'a').replace(/Â/g, 'A')
        .replace(/î/g, 'i').replace(/Î/g, 'I')
        .replace(/ș/g, 's').replace(/Ș/g, 'S')
        .replace(/ț/g, 't').replace(/Ț/g, 'T');
    };
    
    // Section I: Date de identificare a contribuabilului
    // Row 1: Nume, Inițiala tatălui, Prenume
    if (formData.nume) {
      firstPage.drawText(replaceRomanianChars(formData.nume.toUpperCase()), {
        x: 55,
        y: height - 195,
        size: fontSize,
        font: font,
      });
    }
    
    if (formData.initialaTatalui) {
      firstPage.drawText(replaceRomanianChars(formData.initialaTatalui.toUpperCase()), {
        x: 235,
        y: height - 195,
        size: fontSize,
        font: font,
      });
    }
    
    if (formData.prenume) {
      firstPage.drawText(replaceRomanianChars(formData.prenume.toUpperCase()), {
        x: 285,
        y: height - 195,
        size: fontSize,
        font: font,
      });
    }
    
    // Row 1 (right side): CNP - each digit in separate box
    if (formData.cnp) {
      const cnpDigits = formData.cnp.split('');
      let cnpX = 395;
      cnpDigits.forEach((digit, index) => {
        firstPage.drawText(digit, {
          x: cnpX + (index * 13.5),
          y: height - 195,
          size: fontSize,
          font: font,
        });
      });
    }
    
    // Row 2: Email
    if (formData.email) {
      firstPage.drawText(formData.email, {
        x: 285,
        y: height - 215,
        size: fontSize - 1,
        font: font,
      });
    }
    
    // Row 3: Stradă, Număr, Telefon
    if (formData.strada) {
      firstPage.drawText(replaceRomanianChars(formData.strada), {
        x: 55,
        y: height - 235,
        size: fontSize,
        font: font,
      });
    }
    
    if (formData.numar) {
      firstPage.drawText(replaceRomanianChars(formData.numar), {
        x: 235,
        y: height - 235,
        size: fontSize,
        font: font,
      });
    }
    
    if (formData.telefon) {
      firstPage.drawText(formData.telefon, {
        x: 310,
        y: height - 235,
        size: fontSize,
        font: font,
      });
    }
    
    // Row 5: Județ/Sector, Localitate
    if (formData.judet) {
      firstPage.drawText(replaceRomanianChars(formData.judet), {
        x: 235,
        y: height - 275,
        size: fontSize,
        font: font,
      });
    }
    
    if (formData.localitate) {
      firstPage.drawText(replaceRomanianChars(formData.localitate), {
        x: 55,
        y: height - 295,
        size: fontSize,
        font: font,
      });
    }
    
    // Section II: Destinația sumei
    // Checkbox for nonprofit entity (pre-checked)
    firstPage.drawText('X', {
      x: 104,
      y: height - 405,
      size: 10,
      font: font,
    });
    
    // Checkbox for 2 years option (if selected)
    if (formData.perioada === '2') {
      firstPage.drawText('X', {
        x: 104,
        y: height - 425,
        size: 10,
        font: font,
      });
    }
    
    // CUI (Cod de identificare fiscală)
    const cui = '51197056';
    let cuiX = 310;
    cui.split('').forEach((digit, index) => {
      firstPage.drawText(digit, {
        x: cuiX + (index * 13.5),
        y: height - 445,
        size: fontSize,
        font: font,
      });
    });
    
    // Denumire entitate nonprofit (replace Romanian chars for PDF compatibility)
    firstPage.drawText(replaceRomanianChars('Asociația Tinerii Vorbesc'), {
      x: 150,
      y: height - 465,
      size: fontSize,
      font: font,
    });
    
    // Cont bancar (IBAN)
    const iban = 'RO66BTRLRONCRT0CX1004301';
    firstPage.drawText(iban, {
      x: 135,
      y: height - 485,
      size: fontSize - 1,
      font: font,
    });
    
    // Procent (3.5)
    firstPage.drawText('3', {
      x: 250,
      y: height - 505,
      size: fontSize,
      font: font,
    });
    firstPage.drawText(',', {
      x: 257,
      y: height - 505,
      size: fontSize,
      font: font,
    });
    firstPage.drawText('5', {
      x: 265,
      y: height - 505,
      size: fontSize,
      font: font,
    });
    
    // Checkbox for agreement to share data
    if (formData.acordComunicare) {
      firstPage.drawText('X', {
        x: 70,
        y: height - 530,
        size: 10,
        font: font,
      });
    }
    
    // Add signature image at the signature field location
    if (signatureData) {
      try {
        const signatureImageBytes = await fetch(signatureData).then(res => res.arrayBuffer());
        let signatureImage;
        
        try {
          signatureImage = await pdfDoc.embedPng(signatureImageBytes);
        } catch {
          signatureImage = await pdfDoc.embedJpg(signatureImageBytes);
        }
        
        // Position signature in the signature field (bottom section)
        const signatureWidth = 100;
        const signatureHeight = (signatureImage.height * signatureWidth) / signatureImage.width;
        
        // Signature field is typically at the bottom of the form
        firstPage.drawImage(signatureImage, {
          x: 80,
          y: height - 700, // Adjust based on actual signature field position
          width: signatureWidth,
          height: signatureHeight,
        });
      } catch (e) {
        console.error('Error adding signature to PDF:', e);
      }
    }
    
    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    
    // Download the filled PDF
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Formular_230_Completat_${formData.nume}_${formData.prenume}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // PDF downloaded successfully - no alert needed as download happens automatically
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
                          height: 200
                        }}
                        onEnd={handleSignatureEnd}
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
                  
                  {signatureData && (
                    <div className={styles.signaturePreview}>
                      <p>Semnătura a fost adăugată ✓</p>
                      <img src={signatureData} alt="Semnătură" className={styles.signatureImage} />
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={styles.submitBtn}>
                  Generează și descarcă datele
                </button>
                <button 
                  type="button" 
                  onClick={listPDFFields}
                  className={styles.debugBtn}
                >
                  Lista câmpuri PDF (debug)
                </button>
                <a href="/230tineriivorbesc.pdf" className={styles.downloadBtn} download>
                  Descarcă formularul gol (PDF)
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
