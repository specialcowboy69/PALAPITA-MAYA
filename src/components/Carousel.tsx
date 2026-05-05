'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import styles from './Carousel.module.css';

const images = [
  { src: '/cabin-exterior.jpg', alt: 'Fachada Exterior' },
  { src: '/night-outdoor.jpg', alt: 'Noche Exterior' },
  { src: '/bedroom.jpg', alt: 'Habitación' },
  { src: '/living-room.jpg', alt: 'Área de Estar' },
  { src: '/shower.jpg', alt: 'Baño Interior' },
];

export default function Carousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);

  return (
    <div className={styles.embla} ref={emblaRef}>
      <div className={styles.embla__container}>
        {images.map((image, index) => (
          <div className={styles.embla__slide} key={index}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className={styles.slideImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
