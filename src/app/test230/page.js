'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './page.module.css';

export default function Test230() {
  const [coordinates, setCoordinates] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const handleImageClick = (e) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Calculate click position relative to image
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Get image natural dimensions
    const naturalWidth = imageRef.current.naturalWidth;
    const naturalHeight = imageRef.current.naturalHeight;
    
    // Calculate position in PDF coordinates (assuming image will be embedded at its natural size)
    // PDF coordinates: (0,0) is bottom-left, so we need to flip Y
    const pdfX = (x / rect.width) * naturalWidth;
    const pdfY = naturalHeight - ((y / rect.height) * naturalHeight);
    
    const label = prompt('Enter label for this coordinate (e.g., "Nume", "Email"):') || 'Point';
    
    const newCoord = {
      id: Date.now(),
      label,
      x: pdfX,
      y: pdfY,
      displayX: x,
      displayY: y,
      naturalWidth,
      naturalHeight
    };
    
    setCoordinates([...coordinates, newCoord]);
    console.log(`Added coordinate: ${label} at PDF (${pdfX.toFixed(1)}, ${pdfY.toFixed(1)})`);
  };

  const removeCoordinate = (id) => {
    setCoordinates(coordinates.filter(coord => coord.id !== id));
  };

  const copyCoordinates = () => {
    const coordString = coordinates.map(coord => 
      `// ${coord.label}\nconst ${coord.label.toLowerCase().replace(/\s+/g, '')}X = scaleCoord(${coord.x.toFixed(1)});\nconst ${coord.label.toLowerCase().replace(/\s+/g, '')}Y = height - scaleCoord(${coord.y.toFixed(1)}, false);`
    ).join('\n\n');
    
    navigator.clipboard.writeText(coordString);
    alert('Coordinates copied to clipboard!');
  };

  const clearAll = () => {
    if (confirm('Clear all coordinates?')) {
      setCoordinates([]);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Formular 230 - Coordinate Finder</h1>
        <p className={styles.instructions}>
          Click on the image to add coordinates. Each click will prompt you for a label.
          The coordinates will be calculated in PDF format (bottom-left origin).
        </p>
        
        <div className={styles.controls}>
          <button onClick={copyCoordinates} className={styles.button}>
            Copy Coordinates to Clipboard
          </button>
          <button onClick={clearAll} className={styles.button}>
            Clear All
          </button>
        </div>

        <div ref={containerRef} className={styles.imageContainer}>
          <img
            ref={imageRef}
            src="/tineriivorbesc.jpg"
            alt="Formular 230"
            onClick={handleImageClick}
            onLoad={() => setImageLoaded(true)}
            className={styles.image}
          />
          
          {/* Render coordinate markers */}
          {coordinates.map((coord) => (
            <div
              key={coord.id}
              className={styles.marker}
              style={{
                left: `${coord.displayX}px`,
                top: `${coord.displayY}px`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                removeCoordinate(coord.id);
              }}
            >
              <div className={styles.markerDot}></div>
              <div className={styles.markerLabel}>{coord.label}</div>
              <div className={styles.markerCoords}>
                ({coord.x.toFixed(1)}, {coord.y.toFixed(1)})
              </div>
            </div>
          ))}
        </div>

        <div className={styles.coordinatesList}>
          <h2 className={styles.coordinatesListTitle}>Coordinates ({coordinates.length})</h2>
          {coordinates.length === 0 ? (
            <p>No coordinates added yet. Click on the image to add points.</p>
          ) : (
            <div className={styles.coordTable}>
              <div className={styles.coordHeader}>
                <span>Label</span>
                <span>X</span>
                <span>Y</span>
                <span>Action</span>
              </div>
              {coordinates.map((coord) => (
                <div key={coord.id} className={styles.coordRow}>
                  <span>{coord.label}</span>
                  <span>{coord.x.toFixed(1)}</span>
                  <span>{coord.y.toFixed(1)}</span>
                  <button
                    onClick={() => removeCoordinate(coord.id)}
                    className={styles.removeBtn}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

