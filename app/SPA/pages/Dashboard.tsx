import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: 24, background: '#ffffff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '240px 1fr', gap: 24 }}>
        {/* Sidebar */}
        <aside style={{ borderRadius: 12, padding: 16, background: '#fbfcfd', height: 'fit-content' }}>
          <h3 style={{ marginTop: 0 }}>Your Menu</h3>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="#" style={{ color: '#0b0b0b', textDecoration: 'none' }}>Overview</a>
            <a href="#" style={{ color: '#0b0b0b', textDecoration: 'none' }}>Projects</a>
            <a href="#" style={{ color: '#0b0b0b', textDecoration: 'none' }}>Messages</a>
            <a href="#" style={{ color: '#0b0b0b', textDecoration: 'none' }}>Settings</a>
          </nav>
          <div style={{ marginTop: 16 }}>
            <button onClick={logout} style={{ background: '#0b0b0b', color: '#fff', padding: '8px 12px', borderRadius: 8 }}>Sign out</button>
          </div>
        </aside>

        {/* Main */}
        <main>
          <h1 style={{ marginTop: 0 }}>Overview</h1>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
            <div style={{ padding: 16, borderRadius: 10, background: '#fff', boxShadow: '0 6px 18px rgba(15,23,42,0.04)' }}>
              <div style={{ color: '#6b7280' }}>Earnings</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>$4,320</div>
            </div>
            <div style={{ padding: 16, borderRadius: 10, background: '#fff', boxShadow: '0 6px 18px rgba(15,23,42,0.04)' }}>
              <div style={{ color: '#6b7280' }}>Active Projects</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>3</div>
            </div>
            <div style={{ padding: 16, borderRadius: 10, background: '#fff', boxShadow: '0 6px 18px rgba(15,23,42,0.04)' }}>
              <div style={{ color: '#6b7280' }}>New Messages</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>5</div>
            </div>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
            <div style={{ padding: 16, borderRadius: 10, background: '#fff', boxShadow: '0 6px 18px rgba(15,23,42,0.04)' }}>
              <h3 style={{ marginTop: 0 }}>Recent activity</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ padding: '12px 0', borderBottom: '1px solid #eef2f7' }}>
                  <strong>Proposal received</strong>
                  <div style={{ color: '#6b7280', fontSize: 13 }}>Product Designer · 2 hours ago</div>
                </li>
                <li style={{ padding: '12px 0', borderBottom: '1px solid #eef2f7' }}>
                  <strong>Payment released</strong>
                  <div style={{ color: '#6b7280', fontSize: 13 }}>Full‑stack Developer · 1 day ago</div>
                </li>
              </ul>
            </div>

            <div style={{ padding: 16, borderRadius: 10, background: '#fff', boxShadow: '0 6px 18px rgba(15,23,42,0.04)' }}>
              <h3 style={{ marginTop: 0 }}>Quick actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button style={{ padding: '8px 12px', borderRadius: 8, background: '#0b0b0b', color: '#fff', border: 'none' }}>Post a job</button>
                <button style={{ padding: '8px 12px', borderRadius: 8, background: 'transparent', border: '1px solid #e5e7eb' }}>View proposals</button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
