import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Image from 'next/image';
import Carousel from '@/components/Carousel';
import BookingForm from '@/components/BookingForm';
import ContactForm from '@/components/ContactForm';
import { Maximize, Utensils, Droplets, Trees, BedDouble } from 'lucide-react';
import { getDictionary, Locale } from '@/dictionaries';

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main>
      <Navbar dict={dict.Navbar} lang={lang} />
      <Hero dict={dict.Hero} />
      
      {/* About / History Section */}
      <section id="about" style={{ padding: '6.4rem 0', minHeight: '50vh' }}>
        <div className="container grid-2-cols">
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 400, marginBottom: '2rem' }}>
              {dict.About.title}
            </h2>
            <p style={{ marginBottom: '1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              {dict.About.p1}
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              {dict.About.p2}
            </p>
          </div>
          <div className="about-images">
            <div style={{ position: 'relative', width: '50%', aspectRatio: '4/5', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
              <Image src="/night-outdoor.jpg" alt="Jungle Cabin at Night" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'relative', width: '50%', aspectRatio: '4/5', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', marginTop: '4rem', overflow: 'hidden' }}>
              <Image src="/bedroom.jpg" alt="Bedroom Interior" fill style={{ objectFit: 'cover', objectPosition: 'center bottom' }} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Amenities Section */}
      <section id="amenities" style={{ padding: '6.4rem 0', backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>{dict.Amenities.label}</p>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 400 }}>{dict.Amenities.title}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <Maximize size={40} style={{ margin: '0 auto 1rem', color: 'var(--text-muted)' }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.Amenities.space}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{dict.Amenities.space_desc}</p>
            </div>
            <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <Utensils size={40} style={{ margin: '0 auto 1rem', color: 'var(--text-muted)' }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.Amenities.kitchen}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{dict.Amenities.kitchen_desc}</p>
            </div>
            <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <Droplets size={40} style={{ margin: '0 auto 1rem', color: 'var(--text-muted)' }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.Amenities.shower}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{dict.Amenities.shower_desc}</p>
            </div>
            <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <Trees size={40} style={{ margin: '0 auto 1rem', color: 'var(--text-muted)' }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.Amenities.nature}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{dict.Amenities.nature_desc}</p>
            </div>
            <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <BedDouble size={40} style={{ margin: '0 auto 1rem', color: 'var(--text-muted)' }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.Amenities.rest}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{dict.Amenities.rest_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Profiles / Experiences Section */}
      <section id="experiences" style={{ padding: '6.4rem 0', minHeight: '50vh' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>{dict.Experiences.label}</p>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 400 }}>{dict.Experiences.title}</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {/* Buzos */}
            <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', height: '400px', cursor: 'pointer' }}>
              <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop" alt="Buzos y Exploradores" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '2rem', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', color: 'white', pointerEvents: 'none' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.Experiences.divers}</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.9, lineHeight: 1.4 }}>{dict.Experiences.divers_desc}</p>
              </div>
            </div>

            {/* Parejitas */}
            <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', height: '400px', cursor: 'pointer' }}>
              <img src="/pareja_bosque.png" alt="Viaje de pareja" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '2rem', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', color: 'white', pointerEvents: 'none' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.Experiences.couples}</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.9, lineHeight: 1.4 }}>{dict.Experiences.couples_desc}</p>
              </div>
            </div>

            {/* Pajareros */}
            <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', height: '400px', cursor: 'pointer' }}>
              <img src="/pajaro_toh.png" alt="Amantes de la naturaleza" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '2rem', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', color: 'white', pointerEvents: 'none' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.Experiences.nature}</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.9, lineHeight: 1.4 }}>{dict.Experiences.nature_desc}</p>
              </div>
            </div>

            {/* Solitarios */}
            <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', height: '400px', cursor: 'pointer' }}>
              <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=800&auto=format&fit=crop" alt="Almas Solitarias / Nómadas" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '2rem', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', color: 'white', pointerEvents: 'none' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.Experiences.solitary}</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.9, lineHeight: 1.4 }}>{dict.Experiences.solitary_desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" style={{ padding: '6.4rem 0', minHeight: '40vh' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>{dict.Pricing.label}</p>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 400 }}>{dict.Pricing.title}</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Tarifa Estándar */}
            <div style={{ padding: '3rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{dict.Pricing.standard}</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#166534' }}>$1,333 MXN <span style={{ fontSize: '1rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>{dict.Pricing.night}</span></div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{dict.Pricing.min_stay}</p>
              <a href="#book" style={{ marginTop: 'auto', display: 'block', boxSizing: 'border-box', padding: '1rem 2rem', backgroundColor: 'var(--bg-dark)', color: 'var(--text-light)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', width: '100%', transition: 'background-color 0.3s', textDecoration: 'none' }}>{dict.Pricing.book_now}</a>
            </div>
            
            {/* Largo Plazo */}
            <div style={{ padding: '3rem', backgroundColor: 'var(--bg-primary)', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'absolute', top: '1.5rem', right: '-2rem', backgroundColor: '#eab308', color: '#000', padding: '0.25rem 3rem', transform: 'rotate(45deg)', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>{dict.Pricing.special}</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{dict.Pricing.long_term}</h3>
              <p style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{dict.Pricing.long_term_q}</p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{dict.Pricing.long_term_desc}</p>
              <a href="#contact" style={{ marginTop: 'auto', display: 'block', boxSizing: 'border-box', padding: '1rem 2rem', backgroundColor: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--text-primary)', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', width: '100%', transition: 'background-color 0.3s, color 0.3s', textDecoration: 'none' }}>{dict.Pricing.request}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="book" style={{ padding: '6.4rem 0', minHeight: '60vh' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>{dict.Booking.label}</p>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 400, marginBottom: '3rem' }}>{dict.Booking.title}</h2>
          
          <BookingForm dict={dict.BookingForm} />
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" style={{ padding: '6.4rem 0', backgroundColor: 'var(--bg-secondary)', minHeight: '50vh' }}>
         <div className="container grid-1-2-cols">
           <div>
              <p style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>{dict.Rooms.label}</p>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 400, marginBottom: '2rem' }}>{dict.Rooms.title}</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2rem' }}>
                {dict.Rooms.desc}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {dict.Rooms.checklist.map((item: string, i: number) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
           </div>
           <div className="room-image-container">
             <Image src="/living-room.jpg" alt="Living Room Interior" fill style={{ objectFit: 'cover' }} />
           </div>
         </div>
      </section>

      {/* Gallery & Map Section */}
      <section id="gallery-map" style={{ padding: '6.4rem 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>{dict.GalleryMap.gallery_label}</p>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 400, marginBottom: '2rem' }}>{dict.GalleryMap.gallery_title}</h2>
            <Carousel />
          </div>
          <div>
             <p style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>{dict.GalleryMap.location_label}</p>
             <h2 style={{ fontSize: '2.5rem', fontWeight: 400, marginBottom: '2rem' }}>{dict.GalleryMap.location_title}</h2>
             <div style={{ width: '100%', height: '400px', borderRadius: '8px', overflow: 'hidden' }}>
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3728.3905515955066!2d-87.0028524!3d20.856302799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDUxJzIyLjciTiA4N8KwMDAnMTAuMyJX!5e0!3m2!1ses!2ses!4v1778005443812!5m2!1ses!2ses" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen={false} 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade">
               </iframe>
             </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactForm dict={dict} />

      {/* Footer Section */}
      <footer style={{ backgroundColor: '#000', color: '#fff', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          {/* Social Icons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <a href="https://www.facebook.com/profile.php?id=61586730024368" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', backgroundColor: '#166534', borderRadius: '50%', padding: '0.5rem', display: 'flex' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://www.instagram.com/casitaixchel" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', backgroundColor: '#166534', borderRadius: '50%', padding: '0.5rem', display: 'flex' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
          </div>

          {/* Menu */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem', fontSize: '0.9rem', letterSpacing: '1px' }}>
            <a href="#about" style={{ color: '#fff', textDecoration: 'none' }}>{dict.Navbar.about}</a>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
            <a href="#gallery-map" style={{ color: '#fff', textDecoration: 'none' }}>{dict.Navbar.location}</a>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
            <a href="#contact" style={{ color: '#fff', textDecoration: 'none' }}>{dict.Navbar.contact}</a>
          </div>

          {/* Copyright */}
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px' }}>
            <p id="footer-contact">{dict.Footer.rights}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
