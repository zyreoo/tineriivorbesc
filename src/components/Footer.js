import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3>Tinerii Vorbesc</h3>
            <p>Vocea noii generații</p>
          </div>
          <div className={styles.section}>
            <h4>Linkuri rapide</h4>
            <ul>
              <li><Link href="/despre-noi">Despre Noi</Link></li>
              <li><Link href="/podcasturi">Podcasturi</Link></li>
              <li><Link href="/proiecte">Proiecte</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className={styles.section}>
            <h4>Contact</h4>
            <p>📧 carinadianatanaselea@gmail.com</p>
            <p>📍 România</p>
          </div>
          <div className={styles.section}>
            <h4>Urmărește-ne</h4>
            <p>Linkuri social media</p>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Tinerii Vorbesc. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
}

