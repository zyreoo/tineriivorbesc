'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function Podcasturi() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/youtube-videos');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch videos');
        }
        
        setVideos(data.videos || []);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateDescription = (text, maxLength = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>Podcasturile noastre</h1>
          <p className={styles.heroDescription}>
            Podcasturile Tinerii Vorbesc cuprind mai multe tipuri de conversații, toate construite în jurul aceleiași idei: vocea tinerilor contează și merită să fie auzită.
          </p>
          <p className={styles.heroText}>
            Unele episoade sunt dedicate tinerilor care își fac vocea auzită prin experiențele lor de viață fie că vorbim despre performanță, fie despre parcursuri personale dificile, precum viața în orfelinat, dependențe, pierderi sau momente care le-au schimbat complet direcția. Sunt povești reale, spuse fără filtre.
          </p>
          <p className={styles.heroText}>
            Alte conversații sunt cu adulți și persoane publice care au știut să transforme vocea tinereții în impact: antreprenori, artiști, sportivi, creatori de conținut, medici sau profesioniști din diverse domenii, oameni care pot oferi perspectivă, inspirație și direcție.
          </p>
          <p className={styles.heroText}>
            Există și episoade în care tineri pasionați de un domeniu stau față în față cu adulți care au succes în acel domeniu. Acolo se nasc dialoguri sincere despre vocație, drum profesional, greșeli, alegeri și oportunități reale.
          </p>
          <p className={styles.heroText}>
            Indiferent de format, podcasturile noastre sunt spații autentice de dialog, unde poveștile nu sunt idealizate, iar experiența se întâlnește cu dorința de a crește. Sunt conversații care dau curaj, creează conexiuni și arată că drumul fiecăruia este diferit, dar posibil.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          {loading && (
            <div className={styles.loadingState}>
              <p>Se încarcă podcasturile...</p>
            </div>
          )}

          {error && (
            <div className={styles.errorState}>
              <p>⚠️ {error}</p>
              <p className={styles.errorHint}>
                Asigură-te că ai configurat YOUTUBE_API_KEY în fișierul .env.local
              </p>
            </div>
          )}

          {!loading && !error && videos.length === 0 && (
            <div className={styles.emptyState}>
              <p>Nu s-au găsit podcasturi momentan.</p>
            </div>
          )}

          {!loading && !error && videos.length > 0 && (
            <div className={styles.episodesGrid}>
              {videos.map((video) => (
                <div key={video.id} className={styles.episodeCard}>
                  <div className={styles.episodeImage}>
                    {video.thumbnail ? (
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        width={400}
                        height={225}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <p>🎙️</p>
                    )}
                  </div>
                  <div className={styles.episodeContent}>
                    <h3>{video.title}</h3>
                    {video.description && (
                      <p className={styles.episodeDescription}>
                        {truncateDescription(video.description)}
                      </p>
                    )}
                    {video.publishedAt && (
                      <p className={styles.episodeDate}>
                        {formatDate(video.publishedAt)}
                      </p>
                    )}
                    <a 
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.listenBtn}
                    >
                      Ascultă acum
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
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
