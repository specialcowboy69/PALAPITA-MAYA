import styles from './Navbar.module.css';
import Link from 'next/link';

export default function Navbar({ dict, lang }: { dict: any, lang: string }) {
  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.logo}>
          <Link href={`/${lang}`}>CASITA IXCHEL</Link>
        </div>
        <div className={styles.links}>
          <Link href={`/${lang}#about`}>{dict.about}</Link>
          <Link href={`/${lang}#gallery-map`}>{dict.location}</Link>
          <Link href={`/${lang}#contact`}>{dict.contact}</Link>
        </div>
        <div className={styles.cta}>
          <Link href={`/${lang}#book`} className={styles.bookButton}>{dict.book}</Link>
        </div>
      </div>
    </nav>
  );
}
