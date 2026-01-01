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
    perioada: '',
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
      
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      console.log(`PDF Dimensions: ${width} x ${height} points`);
      console.log('Note: PDF coordinates start from bottom-left (0,0)');
      console.log('Top-right corner is at:', width, height);
      
      alert(`Găsit ${fieldList.length} câmpuri în PDF. Verifică consola pentru lista completă și dimensiunile PDF.`);
    } catch (error) {
      console.error('Error listing PDF fields:', error);
      alert('Eroare la citirea câmpurilor PDF. Verifică consola.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSignatureEmpty) {
      alert('Vă rugăm să adăugați semnătura!');
      return;
    }
    
    try {
      await fillPDFForm();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Eroare la generarea PDF-ului. Verifică consola pentru detalii.');
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
    try {
      console.log('Step 1: Loading form template image...');
      
      const imageUrl = '/tineriivorbesc.jpg';
      const imageBytes = await fetch(imageUrl).then(res => res.arrayBuffer());
      
      console.log('Step 2: Creating PDF with form template as background...');
      const pdfDoc = await PDFDocument.create();
      
      let backgroundImage;
      try {
        backgroundImage = await pdfDoc.embedJpg(imageBytes);
        console.log('JPG image embedded successfully');
      } catch (e) {
        backgroundImage = await pdfDoc.embedPng(imageBytes);
        console.log('PNG image embedded successfully');
      }
      
      const { width, height } = backgroundImage.scale(1);
      console.log('PDF page dimensions:', width, 'x', height);
      
      const img = new Image();
      img.src = imageUrl;
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;
      console.log('Image natural dimensions:', naturalWidth, 'x', naturalHeight);
      
      const scaleX = width / naturalWidth;
      const scaleY = height / naturalHeight;
      console.log('Scale factors - X:', scaleX.toFixed(4), 'Y:', scaleY.toFixed(4));
      
      if (Math.abs(scaleX - 1.0) > 0.01 || Math.abs(scaleY - 1.0) > 0.01) {
        console.warn('WARNING: PDF dimensions differ from natural image size. Coordinates will be scaled.');
      }
      
      const firstPage = pdfDoc.addPage([width, height]);
      
      firstPage.drawImage(backgroundImage, {
        x: 0,
        y: 0,
        width: width,
        height: height,
      });
      
      console.log('Step 3: Adding text on top of form template...');
      console.log('PDF dimensions:', width, 'x', height);
      
      let formFieldsFilled = false;
      try {
        const form = pdfDoc.getForm();
        const fields = form.getFields();
        
        if (fields.length > 0) {
          console.log(`Found ${fields.length} form fields, attempting to fill...`);
          
          const fieldMapping = {
            nume: ['nume', 'name', 'surname', 'lastname', 'numele', 'nume_', 'nume.'],
            prenume: ['prenume', 'firstname', 'prenumele', 'prenume_', 'prenume.'],
            initialaTatalui: ['initiala', 'initial', 'tata', 'father', 'initiala_tatalui', 'initiala.'],
            cnp: ['cnp', 'cod_numeric', 'codnumeric', 'cod_numeric_personal', 'cnp_', 'cnp.'],
            email: ['email', 'e-mail', 'mail', 'email_', 'email.'],
            telefon: ['telefon', 'phone', 'tel', 'telefon_', 'telefon.', 'telefon_mobil'],
            localitate: ['localitate', 'city', 'oras', 'municipiu', 'localitate_', 'localitate.'],
            judet: ['judet', 'județ', 'county', 'sector', 'judet_', 'judet.', 'judetul'],
            strada: ['strada', 'stradă', 'street', 'adresa', 'strada_', 'strada.'],
            numar: ['numar', 'număr', 'number', 'nr', 'numar_', 'numar.', 'nr_'],
            procent: ['procent', 'percent', 'procent_', 'procent.', '%'],
            cui: ['cui', 'cod_fiscal', 'codfiscal', 'cui_', 'cui.', 'cod_identificare'],
            denumire: ['denumire', 'name_entity', 'nume_entitate', 'denumire_', 'denumire.'],
            iban: ['iban', 'cont_bancar', 'contbancar', 'iban_', 'iban.', 'account'],
          };
          
          const findMatchingField = (fieldName, searchTerms) => {
            const lowerFieldName = fieldName.toLowerCase();
            return searchTerms.some(term => lowerFieldName.includes(term));
          };
          
          fields.forEach(field => {
            const fieldName = field.getName();
            const fieldType = field.constructor.name;
            
            try {
              if (fieldType === 'PDFTextField') {
                const textField = form.getTextField(fieldName);
                
                if (findMatchingField(fieldName, fieldMapping.nume)) {
                  textField.setText(formData.nume || '');
                  formFieldsFilled = true;
                } else if (findMatchingField(fieldName, fieldMapping.prenume)) {
                  textField.setText(formData.prenume || '');
                  formFieldsFilled = true;
                } else if (findMatchingField(fieldName, fieldMapping.initialaTatalui)) {
                  textField.setText(formData.initialaTatalui || '');
                  formFieldsFilled = true;
                } else if (findMatchingField(fieldName, fieldMapping.cnp)) {
                  textField.setText(formData.cnp || '');
                  formFieldsFilled = true;
                } else if (findMatchingField(fieldName, fieldMapping.email)) {
                  textField.setText(formData.email || '');
                  formFieldsFilled = true;
                } else if (findMatchingField(fieldName, fieldMapping.telefon)) {
                  textField.setText(formData.telefon || '');
                  formFieldsFilled = true;
                } else if (findMatchingField(fieldName, fieldMapping.localitate)) {
                  textField.setText(formData.localitate || '');
                  formFieldsFilled = true;
                } else if (findMatchingField(fieldName, fieldMapping.judet)) {
                  textField.setText(formData.judet || '');
                  formFieldsFilled = true;
                } else if (findMatchingField(fieldName, fieldMapping.strada)) {
                  textField.setText(formData.strada || '');
                  formFieldsFilled = true;
                } else if (findMatchingField(fieldName, fieldMapping.numar)) {
                  textField.setText(formData.numar || '');
                  formFieldsFilled = true;
                } else if (findMatchingField(fieldName, fieldMapping.procent)) {
                  textField.setText('3.5');
                  formFieldsFilled = true;
                } else if (findMatchingField(fieldName, fieldMapping.cui)) {
                  textField.setText('51197056');
                  formFieldsFilled = true;
                } else if (findMatchingField(fieldName, fieldMapping.denumire)) {
                  textField.setText('Asociația Tinerii Vorbesc');
                  formFieldsFilled = true;
                } else if (findMatchingField(fieldName, fieldMapping.iban)) {
                  textField.setText('RO66BTRLRONCRT0CX1004301');
                  formFieldsFilled = true;
                }
              } else if (fieldType === 'PDFCheckBox') {
                const checkBox = form.getCheckBox(fieldName);
                const lowerFieldName = fieldName.toLowerCase();
                
                if (lowerFieldName.includes('nonprofit') || lowerFieldName.includes('entitate')) {
                  checkBox.check();
                  formFieldsFilled = true;
                }
                
                if ((lowerFieldName.includes('2') && lowerFieldName.includes('ani')) || 
                    (lowerFieldName.includes('2') && lowerFieldName.includes('year'))) {
                  if (formData.perioada === '2') {
                    checkBox.check();
                    formFieldsFilled = true;
                  }
                } else if ((lowerFieldName.includes('1') && lowerFieldName.includes('an')) ||
                           (lowerFieldName.includes('1') && lowerFieldName.includes('year'))) {
                  if (formData.perioada === '1') {
                    checkBox.check();
                    formFieldsFilled = true;
                  }
                }
                
                if (lowerFieldName.includes('acord') || lowerFieldName.includes('agree') || 
                    lowerFieldName.includes('gdpr') || lowerFieldName.includes('comunicare')) {
                  if (formData.acordGDPR || formData.acordComunicare) {
                    checkBox.check();
                    formFieldsFilled = true;
                  }
                }
              } else if (fieldType === 'PDFRadioGroup') {
                const radioGroup = form.getRadioGroup(fieldName);
                if (formData.perioada === '1') {
                  try {
                    radioGroup.select('1');
                    formFieldsFilled = true;
                  } catch (e) {
                    try {
                      radioGroup.select('1an');
                    } catch (e2) {
                      console.log(`Could not set radio group ${fieldName}`);
                    }
                  }
                } else if (formData.perioada === '2') {
                  try {
                    radioGroup.select('2');
                    formFieldsFilled = true;
                  } catch (e) {
                    try {
                      radioGroup.select('2ani');
                    } catch (e2) {
                      console.log(`Could not set radio group ${fieldName}`);
                    }
                  }
                }
              }
            } catch (e) {
              console.log(`Error filling field "${fieldName}":`, e);
            }
          });
          
          if (formFieldsFilled) {
            form.updateFieldAppearances();
            console.log('Form fields filled successfully');
          }
        }
      } catch (e) {
        console.log('No form fields found or error accessing form:', e);
      }
      
      console.log('PDF has no form fields. Adding text on top of existing PDF template.');
      console.log('PDF dimensions:', width, 'x', height);
      console.log('Original PDF background and form structure are preserved.');
      
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontSize = 13;
      const smallFontSize = 12;
      
      const replaceRomanianChars = (text) => {
        if (!text) return '';
        return text
          .replace(/ă/g, 'a').replace(/Ă/g, 'A')
          .replace(/â/g, 'a').replace(/Â/g, 'A')
          .replace(/î/g, 'i').replace(/Î/g, 'I')
          .replace(/ș/g, 's').replace(/Ș/g, 'S')
          .replace(/ț/g, 't').replace(/Ț/g, 'T');
      };
      
      const drawTextAt = (text, x, y, size = fontSize, logLabel = '') => {
        if (text) {
          firstPage.drawText(text, { x, y, size, font });
          if (logLabel) {
            console.log(`${logLabel}: "${text}" at (${x}, ${y})`);
          }
        }
      };
      
      const drawDigitsInBoxes = (digits, startX, y, digitSpacing = 13.5, size = fontSize) => {
        if (!digits) return;
        const digitArray = digits.toString().split('');
        digitArray.forEach((digit, index) => {
          firstPage.drawText(digit, {
            x: startX + (index * digitSpacing),
            y: y,
            size: size,
            font: font,
          });
        });
      };
      
      const scaleCoord = (coord, useX = true) => {
        const scale = useX ? scaleX : scaleY;
        return coord * scale;
      };
      
      const numeX = scaleCoord(295.7);
      const numeY = height - scaleCoord(1602.7, false);
      drawTextAt(replaceRomanianChars(formData.nume?.toUpperCase() || ''), numeX, numeY, fontSize, 'Nume');
      
      const prenumeX = scaleCoord(323.3);
      const prenumeY = height - scaleCoord(1536.5, false);
      drawTextAt(replaceRomanianChars(formData.prenume?.toUpperCase() || ''), prenumeX, prenumeY, fontSize, 'Prenume');
      
      if (formData.initialaTatalui) {
        const initialaX = scaleCoord(310);
        drawTextAt(replaceRomanianChars(formData.initialaTatalui.toUpperCase()), initialaX, numeY, fontSize, 'Initiala');
      }
      
      if (formData.cnp) {
        const cnpX = scaleCoord(803.3);
        const cnpY = height - scaleCoord(1555.3, false);
        const cnpSpacing = scaleCoord(14);
        drawDigitsInBoxes(formData.cnp, cnpX, cnpY, cnpSpacing, fontSize);
        console.log(`CNP: "${formData.cnp}" starting at (${cnpX.toFixed(1)}, ${cnpY.toFixed(1)})`);
      }
      
      const emailX = scaleCoord(926.9);
      const emailY = height - scaleCoord(1502.3, false);
      drawTextAt(formData.email || '', emailX, emailY, smallFontSize, 'Email');
      
      const stradaX = scaleCoord(293.5);
      const stradaY = height - scaleCoord(1482.5, false);
      drawTextAt(replaceRomanianChars(formData.strada || ''), stradaX, stradaY, fontSize, 'Strada');
      
      const numarX = scaleCoord(715.0);
      const numarY = height - scaleCoord(1483.6, false);
      drawTextAt(replaceRomanianChars(formData.numar || ''), numarX, numarY, fontSize, 'Numar');
      
      const telefonX = scaleCoord(962.2);
      const telefonY = height - scaleCoord(1444.9, false);
      drawTextAt(formData.telefon || '', telefonX, telefonY, fontSize, 'Telefon');
      
      if (formData.judet) {
        const judetX = scaleCoord(500);
        const judetY = height - scaleCoord(1460, false);
        drawTextAt(replaceRomanianChars(formData.judet), judetX, judetY, fontSize, 'Judet');
      }
      
      if (formData.localitate) {
        const localitateX = scaleCoord(293.5);
        const localitateY = height - scaleCoord(1440, false);
        drawTextAt(replaceRomanianChars(formData.localitate), localitateX, localitateY, fontSize, 'Localitate');
      }
      
      const checkbox1Y = height - scaleCoord(390, false);
      drawTextAt('X', scaleCoord(100), checkbox1Y, 14, 'Checkbox nonprofit');
      
      if (formData.perioada === '2') {
        const checkbox2Y = height - scaleCoord(410, false);
        drawTextAt('X', scaleCoord(100), checkbox2Y, 14, 'Checkbox 2 ani');
      }
      
      if (formData.acordComunicare) {
        const checkbox3Y = height - scaleCoord(510, false);
        drawTextAt('X', scaleCoord(65), checkbox3Y, 14, 'Checkbox acord comunicare');
      }
      
      if (signatureData) {
        try {
          const signatureImageBytes = await fetch(signatureData).then(res => res.arrayBuffer());
          let signatureImage;
          
          try {
            signatureImage = await pdfDoc.embedPng(signatureImageBytes);
          } catch {
            signatureImage = await pdfDoc.embedJpg(signatureImageBytes);
          }
          
          const signatureWidth = 140;
          const signatureHeight = (signatureImage.height * signatureWidth) / signatureImage.width;
          
          const semnaturaX = scaleCoord(454.6);
          const semnaturaY = height - scaleCoord(233.4, false);
          
          firstPage.drawImage(signatureImage, {
            x: semnaturaX,
            y: semnaturaY,
            width: signatureWidth,
            height: signatureHeight,
          });
          
          console.log(`Signature added at (${semnaturaX.toFixed(1)}, ${semnaturaY.toFixed(1)}) with size ${signatureWidth}x${signatureHeight}`);
        } catch (e) {
          console.error('Error adding signature to PDF:', e);
        }
      } else {
        console.log('No signature provided - skipping signature placement');
      }
      
      console.log('Saving PDF with original content preserved...');
      const pdfBytes = await pdfDoc.save();
      console.log('PDF saved, size:', pdfBytes.length, 'bytes');
      
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Formular_230_Completat_${formData.nume || 'User'}_${formData.prenume || 'Name'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log('PDF generated successfully with original template preserved.');
      console.log('If PDF appears blank, the original PDF might have a structure issue.');
      alert('Formularul a fost generat și descărcat cu succes!');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Eroare la generarea PDF-ului. Verifică consola pentru detalii.');
      throw error;
    }
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
