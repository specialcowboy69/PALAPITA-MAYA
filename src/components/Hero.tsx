import styles from './Hero.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero({ dict }: { dict: any }) {
  return (
    <section className={styles.hero}>
      <div className={styles.imageWrapper}>
        <Image 
          src="/cabin-exterior.jpg"
          alt="Palapita Maya"
          fill
          priority
          unoptimized
          className={styles.image}
        />
        <div className={styles.overlay}></div>
      </div>
      <div className={`container ${styles.content}`}>
        <div className={styles.textBackground}>
          <p className={styles.subtitle}>{dict.subtitle}</p>
          <h1 className={styles.title}>
            {dict.title1} <br/> {dict.title2}
          </h1>
        </div>
        <div className={styles.ctaWrapper}>
          <Link href="#book" className={styles.button}>
            {dict.book_now} <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
