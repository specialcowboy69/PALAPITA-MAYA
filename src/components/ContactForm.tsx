'use client';

import { useState } from 'react';

interface ContactFormProps {
  dict: any;
}

export default function ContactForm({ dict }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" style={{ padding: '6.4rem 0', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '700px' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            {dict.ContactForm.label}
          </p>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: 'var(--text-primary)' }}>
            {dict.ContactForm.title}
          </h2>
        </div>

        <form 
          onSubmit={handleSubmit}
          style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            padding: '3rem', 
            borderRadius: '4px',
            border: '1px solid rgba(0,0,0,0.05)'
          }}
        >
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: '500', color: 'var(--text-primary)' }}>
              {dict.ContactForm.name}
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={dict.ContactForm.name_placeholder}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '0',
                border: '1px solid rgba(28, 27, 25, 0.2)',
                backgroundColor: 'transparent',
                outline: 'none',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: '500', color: 'var(--text-primary)' }}>
              {dict.ContactForm.email}
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder={dict.ContactForm.email_placeholder}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '0',
                border: '1px solid rgba(28, 27, 25, 0.2)',
                backgroundColor: 'transparent',
                outline: 'none',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: '500', color: 'var(--text-primary)' }}>
              {dict.ContactForm.message}
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={dict.ContactForm.message_placeholder}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '0',
                border: '1px solid rgba(28, 27, 25, 0.2)',
                backgroundColor: 'transparent',
                outline: 'none',
                resize: 'none',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              width: '100%',
              backgroundColor: 'var(--text-primary)',
              color: 'var(--bg-primary)',
              padding: '1.2rem',
              borderRadius: '0',
              border: 'none',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.2s',
              opacity: status === 'loading' ? 0.7 : 1
            }}
          >
            {status === 'loading' ? dict.ContactForm.sending : dict.ContactForm.send}
          </button>

          {status === 'success' && (
            <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid #166534', color: '#166534', textAlign: 'center', fontSize: '0.9rem' }}>
              {dict.ContactForm.success}
            </div>
          )}

          {status === 'error' && (
            <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid #991b1b', color: '#991b1b', textAlign: 'center', fontSize: '0.9rem' }}>
              {dict.ContactForm.error}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
