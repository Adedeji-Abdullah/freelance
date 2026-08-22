import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#0f172a' }}>
      <section style={{ padding: '64px 24px', background: '#ffffff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 420px' }}>
            <h1 style={{ fontSize: 40, lineHeight: '48px', margin: 0, fontWeight: 700 }}>Find trusted freelancers fast</h1>
            <p style={{ marginTop: 16, color: '#6b7280', fontSize: 18 }}>Hire vetted professionals for design, development, writing, and more — securely and efficiently.</p>

            <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/register" style={{ background: '#0b0b0b', color: '#fff', padding: '12px 20px', borderRadius: 8, fontWeight: 600, textDecoration: 'none' }}>Get started</Link>
              <Link to="/login" style={{ background: 'transparent', color: '#0b0b0b', padding: '12px 20px', borderRadius: 8, fontWeight: 600, border: '1px solid #e5e7eb', textDecoration: 'none' }}>Sign in</Link>
            </div>
          </div>

          <aside style={{ width: 360, flex: '0 0 360px' }}>
            <div style={{ borderRadius: 12, padding: 20, background: '#f8fafc', boxShadow: '0 8px 24px rgba(15,23,42,0.06)' }}>
              <h3 style={{ margin: 0, fontSize: 18 }}>Popular right now</h3>
              <ul style={{ marginTop: 12, padding: 0, listStyle: 'none' }}>
                <li style={{ padding: '8px 0', borderBottom: '1px solid #eef2f7' }}>
                  <strong>Product Designer</strong>
                  <div style={{ color: '#6b7280', fontSize: 13 }}>Avg. $40/hr · Remote</div>
                </li>
                <li style={{ padding: '8px 0', borderBottom: '1px solid #eef2f7' }}>
                  <strong>Full‑stack Developer</strong>
                  <div style={{ color: '#6b7280', fontSize: 13 }}>Avg. $55/hr · Remote</div>
                </li>
                <li style={{ padding: '8px 0' }}>
                  <strong>SEO Specialist</strong>
                  <div style={{ color: '#6b7280', fontSize: 13 }}>Avg. $30/hr · Contract</div>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section style={{ padding: '48px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>Why choose AL Freelancing?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            <div style={{ padding: 20, borderRadius: 10, background: '#fbfcfd', boxShadow: '0 6px 18px rgba(15,23,42,0.03)' }}>
              <h4 style={{ margin: '0 0 8px 0' }}>Vetted talent</h4>
              <p style={{ margin: 0, color: '#6b7280' }}>Profiles reviewed and verified so you hire with confidence.</p>
            </div>
            <div style={{ padding: 20, borderRadius: 10, background: '#fbfcfd', boxShadow: '0 6px 18px rgba(15,23,42,0.03)' }}>
              <h4 style={{ margin: '0 0 8px 0' }}>Secure payments</h4>
              <p style={{ margin: 0, color: '#6b7280' }}>Escrow and milestone payments protect both parties.</p>
            </div>
            <div style={{ padding: 20, borderRadius: 10, background: '#fbfcfd', boxShadow: '0 6px 18px rgba(15,23,42,0.03)' }}>
              <h4 style={{ margin: '0 0 8px 0' }}>Fast hiring</h4>
              <p style={{ margin: 0, color: '#6b7280' }}>Post a job and get proposals from top freelancers within hours.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '48px 24px', background: '#ffffff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: 20 }}>How it works</h3>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
            <div style={{ width: 240, padding: 18, borderRadius: 10, background: '#f8fafc' }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>1</div>
              <div style={{ marginTop: 8, color: '#6b7280' }}>Post a clear job brief</div>
            </div>
            <div style={{ width: 240, padding: 18, borderRadius: 10, background: '#f8fafc' }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>2</div>
              <div style={{ marginTop: 8, color: '#6b7280' }}>Review proposals & interview</div>
            </div>
            <div style={{ width: 240, padding: 18, borderRadius: 10, background: '#f8fafc' }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>3</div>
              <div style={{ marginTop: 8, color: '#6b7280' }}>Pay via secure escrow</div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ padding: 40, background: '#0b0b0b', color: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <h4 style={{ margin: 0 }}>Ready to get started?</h4>
            <p style={{ margin: '8px 0 0 0', color: '#d1d5db' }}>Create your account and post your first job in minutes.</p>
          </div>
          <div style={{ marginTop: 12 }}>
            <Link to="/register" style={{ background: '#fff', color: '#0b0b0b', padding: '10px 18px', borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}>Create account</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
