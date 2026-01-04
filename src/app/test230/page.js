'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function Test230() {
  const imageContainerRef = useRef(null);
  const [fields, setFields] = useState({
    nume: { value: '', top: 320, left: 120, width: 200 },
    prenume: { value: '', top: 365, left: 120, width: 200 },
    cnp: { value: '', top: 339, left: 670, width: 300 },
    strada: { value: '', top: 410, left: 120, width: 200 },
    numar: { value: '', top: 410, left: 580, width: 45 },
    initialaTatalui: { value: '', top: 320, left: 590, width: 30 },
    email: { value: '', top: 390, left: 725, width: 250 },
    judet: { value: '', top: 455, left: 510, width: 90 },
    telefon: { value: '', top: 440, left: 725, width: 200 },
    semnatura: { value: '', top: 1445, left: 271, width: 180 },
    localitate: { value: '', top: 500, left:132, width: 200 },
  });

  const [signatureData, setSignatureData] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [showControls, setShowControls] = useState(false);
  const [scaleFactor, setScaleFactor] = useState({ x: 1, y: 1 });
  
  const referenceWidth = 800;
  const referenceHeight = 1133;

  useEffect(() => {
    const calculateScale = () => {
      if (!imageContainerRef.current) return;
      
      const img = imageContainerRef.current.querySelector('img');
      if (!img) return;
      
      if (img.complete) {
        const displayedWidth = img.offsetWidth;
        const displayedHeight = img.offsetHeight;
        
        const scaleX = displayedWidth / referenceWidth;
        const scaleY = displayedHeight / referenceHeight;
        
        setScaleFactor({ x: scaleX, y: scaleY });
      } else {
        img.onload = () => {
          const displayedWidth = img.offsetWidth;
          const displayedHeight = img.offsetHeight;
          
          const scaleX = displayedWidth / referenceWidth;
          const scaleY = displayedHeight / referenceHeight;
          
          setScaleFactor({ x: scaleX, y: scaleY });
        };
      }
    };

    calculateScale();
    
    window.addEventListener('resize', calculateScale);
    const timeout = setTimeout(calculateScale, 100);
    
    return () => {
      window.removeEventListener('resize', calculateScale);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const savedData = sessionStorage.getItem('form230Data');
    if (savedData) {
      try {
        const formData = JSON.parse(savedData);
        setFields(prev => ({
          ...prev,
          nume: { ...prev.nume, value: formData.nume || '' },
          prenume: { ...prev.prenume, value: formData.prenume || '' },
          cnp: { ...prev.cnp, value: formData.cnp || '' },
          strada: { ...prev.strada, value: formData.strada || '' },
          numar: { ...prev.numar, value: formData.numar || '' },
          initialaTatalui: { ...prev.initialaTatalui, value: formData.initialaTatalui || '' },
          email: { ...prev.email, value: formData.email || '' },
          judet: { ...prev.judet, value: formData.judet || '' },
          telefon: { ...prev.telefon, value: formData.telefon || '' },
          localitate: { ...prev.localitate, value: formData.localitate || '' },
        }));
        if (formData.signatureData) {
          setSignatureData(formData.signatureData);
        }
      } catch (error) {
        console.error('Error loading form data:', error);
      }
    }
  }, []);

  const handleInputChange = (fieldName, value) => {
    setFields(prev => ({
      ...prev,
      [fieldName]: { ...prev[fieldName], value }
    }));
  };

  const handlePositionChange = (fieldName, property, value) => {
    setFields(prev => ({
      ...prev,
      [fieldName]: { ...prev[fieldName], [property]: parseFloat(value) || 0 }
    }));
  };

  const handleFieldClick = (fieldName) => {
    setEditingField(fieldName);
    setShowControls(true);
  };

  const downloadCompletedImage = async () => {
    try {
      try {
        const emailFormData = {
          nume: fields.nume.value,
          prenume: fields.prenume.value,
          cnp: fields.cnp.value,
          email: fields.email.value,
          telefon: fields.telefon.value,
          localitate: fields.localitate.value,
          judet: fields.judet.value,
          strada: fields.strada.value,
          numar: fields.numar.value,
        };
        
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            formData: emailFormData,
            signatureData: signatureData,
            action: 'download_image'
          }),
        });
        
        if (!response.ok) {
          console.error('Failed to send email notification');
        }
      } catch (emailError) {
        console.error('Error sending email:', emailError);
      }
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = '/tineriivorbesc.jpg';
      });
      
      const displayedImg = imageContainerRef.current?.querySelector('img');
      const containerWidth = 1200;
      const displayedWidth = displayedImg ? displayedImg.offsetWidth : containerWidth;
      const displayedHeight = displayedImg ? displayedImg.offsetHeight : (img.height * containerWidth / img.width);
      
      const scaleX = img.width / displayedWidth;
      const scaleY = img.height / displayedHeight;
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.drawImage(img, 0, 0, img.width, img.height);
      
      const fontSize = 20 * scaleY;
      
      try {
        const fontUrl = 'https://fonts.gstatic.com/s/arimo/v28/P5sfzZCDf9_T_10c3i9MeHcyai_9Yg.woff2';
        const font = new FontFace('Arimo', `url(${fontUrl})`);
        await font.load();
        document.fonts.add(font);
        
        await document.fonts.ready;
        
        ctx.font = `${fontSize}px Arimo, sans-serif`;
      } catch (fontError) {
        console.warn('Could not load Arimo font file, trying Google Fonts API:', fontError);
        
        try {
          if (!document.querySelector('link[href*="fonts.googleapis.com"][href*="Arimo"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Arimo:wght@400;700&display=swap';
            document.head.appendChild(link);
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
          ctx.font = `${fontSize}px "Arimo", sans-serif`;
        } catch (e) {
          console.warn('Could not load Arimo font, using sans-serif fallback:', e);
          ctx.font = `${fontSize}px sans-serif`;
        }
      }
      
      ctx.fillStyle = '#000000';
      ctx.textBaseline = 'top';
      
      const replaceRomanianChars = (text) => {
        if (!text) return '';
        return text
          .replace(/ă/g, 'a').replace(/Ă/g, 'A')
          .replace(/â/g, 'a').replace(/Â/g, 'A')
          .replace(/î/g, 'i').replace(/Î/g, 'I')
          .replace(/ș/g, 's').replace(/Ș/g, 'S')
          .replace(/ț/g, 't').replace(/Ț/g, 'T');
      };
      
      const capitalizeFirstLetter = (text) => {
        if (!text) return '';
        return text
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      };
      
      const scalePos = (pos, useX = true) => {
        return pos * (useX ? scaleX : scaleY);
      };
      
      if (fields.nume.value) {
        ctx.fillText(replaceRomanianChars(capitalizeFirstLetter(fields.nume.value)), scalePos(fields.nume.left), scalePos(fields.nume.top, false));
      }
      
      if (fields.prenume.value) {
        ctx.fillText(replaceRomanianChars(capitalizeFirstLetter(fields.prenume.value)), scalePos(fields.prenume.left), scalePos(fields.prenume.top, false));
      }
      
      if (fields.initialaTatalui.value) {
        ctx.fillText(replaceRomanianChars(fields.initialaTatalui.value.toUpperCase()), scalePos(fields.initialaTatalui.left), scalePos(fields.initialaTatalui.top, false));
      }
      
      if (fields.cnp.value) {
        const cnpDigits = fields.cnp.value.toString().split('');
        const digitSpacing = 38 * scaleX;
        cnpDigits.forEach((digit, index) => {
          ctx.fillText(digit, scalePos(fields.cnp.left) + (index * digitSpacing), scalePos(fields.cnp.top, false));
        });
      }
      
      if (fields.strada.value) {
        ctx.fillText(replaceRomanianChars(fields.strada.value), scalePos(fields.strada.left), scalePos(fields.strada.top, false));
      }
      
      if (fields.numar.value) {
        ctx.fillText(replaceRomanianChars(fields.numar.value), scalePos(fields.numar.left), scalePos(fields.numar.top, false));
      }
      
      if (fields.localitate.value) {
        ctx.fillText(replaceRomanianChars(fields.localitate.value), scalePos(fields.localitate.left), scalePos(fields.localitate.top, false));
      }
      
      if (fields.judet.value) {
        ctx.fillText(replaceRomanianChars(fields.judet.value), scalePos(fields.judet.left), scalePos(fields.judet.top, false));
      }
      
      if (fields.email.value) {
        ctx.fillText(fields.email.value, scalePos(fields.email.left), scalePos(fields.email.top, false));
      }
      
      if (fields.telefon.value) {
        ctx.fillText(fields.telefon.value, scalePos(fields.telefon.left), scalePos(fields.telefon.top, false));
      }
      
      if (signatureData) {
        const signatureImg = new window.Image();
        signatureImg.crossOrigin = 'anonymous';
        
        await new Promise((resolve, reject) => {
          signatureImg.onload = resolve;
          signatureImg.onerror = reject;
          signatureImg.src = signatureData;
        });
        
        const signatureWidth = fields.semnatura.width * scaleX;
        const signatureHeight = (signatureImg.height * signatureWidth) / signatureImg.width;
        
        ctx.drawImage(signatureImg, scalePos(fields.semnatura.left), scalePos(fields.semnatura.top, false), signatureWidth, signatureHeight);
      }
      
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Formular_230_Completat_${fields.nume.value || 'User'}_${fields.prenume.value || 'Name'}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 'image/png');
      
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Eroare la generarea imaginii. Verifică consola pentru detalii.');
    }
  };

  return (
    <div style={{ 
      padding: '2rem', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5',
      overflowX: 'auto',
      width: '100%'
    }}>
      <div style={{ 
        marginBottom: '1rem', 
        display: 'flex', 
        gap: '1rem', 
        alignItems: 'center', 
        flexWrap: 'wrap',
        width: '100%',
        maxWidth: '1200px',
        justifyContent: 'center'
      }}>
        <button 
          onClick={() => setShowControls(!showControls)}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {showControls ? 'Hide' : 'Show'} Position Controls
        </button>
        <button 
          onClick={downloadCompletedImage}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Download Completed Image
        </button>
        {editingField && (
          <span style={{ padding: '0.5rem', backgroundColor: '#e0e0e0', borderRadius: '4px' }}>
            Editing: {editingField}
          </span>
        )}
      </div>

      <div 
        ref={imageContainerRef} 
        style={{ 
          position: 'relative', 
          display: 'inline-block',
          width: '1200px',
          minWidth: '1200px',
          maxWidth: '1200px'
        }}
      >
        <Image
          src="/tineriivorbesc.jpg"
          alt="Tinerii Vorbesc"
          width={1200}
          height={900}
          style={{ 
            width: '1200px',
            height: 'auto',
            display: 'block',
            maxWidth: 'none'
          }}
        />
        
        {Object.entries(fields).map(([fieldName, field]) => (
          <input
            key={fieldName}
            type="text"
            value={field.value}
            onChange={(e) => handleInputChange(fieldName, e.target.value)}
            onClick={() => handleFieldClick(fieldName)}
            placeholder={fieldName}
            style={{
              position: 'absolute',
              top: `${field.top}px`,
              left: `${field.left}px`,
              width: `${field.width}px`,
              padding: '4px 8px',
              border: editingField === fieldName ? '2px solid #0070f3' : '1px solid #ccc',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              fontSize: '12px',
              zIndex: editingField === fieldName ? 10 : 5,
              cursor: 'pointer',
            }}
          />
        ))}
      </div>

      {showControls && editingField && (
        <div style={{ 
          marginTop: '2rem', 
          padding: '1rem', 
          backgroundColor: 'white', 
          borderRadius: '8px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          minWidth: '400px'
        }}>
          <h3 style={{ marginTop: 0 }}>Position Controls for: {editingField}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label>
              Top: 
              <input
                type="number"
                value={fields[editingField].top}
                onChange={(e) => handlePositionChange(editingField, 'top', e.target.value)}
                style={{ marginLeft: '0.5rem', padding: '4px', width: '100px' }}
              />
            </label>
            <label>
              Left: 
              <input
                type="number"
                value={fields[editingField].left}
                onChange={(e) => handlePositionChange(editingField, 'left', e.target.value)}
                style={{ marginLeft: '0.5rem', padding: '4px', width: '100px' }}
              />
            </label>
            <label>
              Width: 
              <input
                type="number"
                value={fields[editingField].width}
                onChange={(e) => handlePositionChange(editingField, 'width', e.target.value)}
                style={{ marginLeft: '0.5rem', padding: '4px', width: '100px' }}
              />
            </label>
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => {
                setEditingField(null);
              }}
              style={{ padding: '0.5rem 1rem', backgroundColor: '#666', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Done
            </button>
            <button
              onClick={() => {
                console.log('Current positions:', fields);
                navigator.clipboard.writeText(JSON.stringify(fields, null, 2));
                alert('Positions copied to clipboard!');
              }}
              style={{ padding: '0.5rem 1rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Copy Positions to Clipboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

