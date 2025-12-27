'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './Navigation.module.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Tinerii Vorbesc
        </Link>
        <button 
          className={styles.menuButton}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
          <li><Link href="/" onClick={() => setIsOpen(false)}>Acasă</Link></li>
          <li><Link href="/despre-noi" onClick={() => setIsOpen(false)}>Despre Noi</Link></li>
          <li><Link href="/podcasturi" onClick={() => setIsOpen(false)}>Podcasturi</Link></li>
          <li><Link href="/proiecte" onClick={() => setIsOpen(false)}>Proiecte</Link></li>
          <li><Link href="/servicii" onClick={() => setIsOpen(false)}>Servicii</Link></li>
          <li><Link href="/blog" onClick={() => setIsOpen(false)}>Blog</Link></li>
          <li><Link href="/sponsorizari" onClick={() => setIsOpen(false)}>Susține-ne</Link></li>
          <li><Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
          <li><Link href="/faq" onClick={() => setIsOpen(false)}>FAQ</Link></li>
        </ul>
      </div>
    </nav>
  );
}

