'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Cum pot susține proiectele?',
      answer: 'Poți să ne ajuți în mai multe moduri: prin sponsorizări (formularul 230 pentru persoane fizice), prin voluntariat sau pur și simplu prin a ne ajuta să ne facem cunoscuți. Fiecare ajutor contează. Vezi pagina de Susține-ne pentru detalii.'
    },
    {
      question: 'Pot fi invitat în podcast?',
      answer: 'Da, absolut! Dacă ai o poveste interesantă sau crezi că ai ceva de spus, scrie-ne. Nu căutăm doar "influenceri" sau oameni cunoscuți – căutăm oameni reali cu povești reale.'
    },
    {
      question: 'Cine poate deveni voluntar?',
      answer: 'Oricine are peste 14 ani și vrea să facă ceva concret. Nu contează experiența sau background-ul – dacă ai energie și vrei să ajuți, ești binevenit. Completează formularul din pagina Despre Noi.'
    },
    {
      question: 'Ce tipuri de evenimente organizați?',
      answer: 'Organizăm diferite tipuri de evenimente – workshop-uri, conferințe, întâlniri. Depinde de moment și de ce resurse avem. Cel mai bine e să ne urmărești pe social media sau să ne scrii să vezi ce planificăm.'
    },
    {
      question: 'Cum pot colabora cu voi?',
      answer: 'Da, lucrăm cu oricine are aceeași viziune. Organizații, branduri, oameni – dacă crezi că putem face ceva împreună, scrie-ne. Discutăm deschis despre orice idee.'
    },
    {
      question: 'Unde pot asculta podcasturile?',
      answer: 'Toate episoadele sunt pe pagina de Podcasturi. Le poți asculta direct de pe site sau le găsești și pe platformele de streaming (Spotify, Apple Podcasts etc.).'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>Întrebări frecvente</h1>
          <p className={styles.heroDescription}>
            Astea sunt întrebările pe care le primim cel mai des. Dacă nu găsești răspunsul 
            aici, scrie-ne direct.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`${styles.faqItem} ${openIndex === index ? styles.faqItemOpen : ''}`}
              >
                <button 
                  className={styles.faqQuestion}
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <span>{faq.question}</span>
                  <span className={styles.faqIcon}>{openIndex === index ? '−' : '+'}</span>
                </button>
                {openIndex === index && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.ctaSection}>
            <h2>Nu ai găsit răspunsul?</h2>
            <p>Scrie-ne direct – răspundem la toate mesajele, chiar dacă uneori durează puțin pentru că suntem o echipă mică.</p>
            <a href="/contact" className={styles.contactBtn}>
              Contactează-ne
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

