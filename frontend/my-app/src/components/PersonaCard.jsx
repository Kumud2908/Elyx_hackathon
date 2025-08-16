import React from "react";
import { FaHeartbeat, FaDumbbell, FaAppleAlt, FaRunning, FaUsers, FaChartLine } from "react-icons/fa";

export default function PersonaCard({ persona }) {
  if (!persona)
    return <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '2.5rem' }}>No persona data available.</p>;

  const metrics = persona.metrics || {};

  return (
    <div style={{
width: '95%',
paddingTop: '2rem',
paddingRight: '2rem',  // Added right padding
paddingBottom: '1rem',
paddingLeft: '2rem',
backgroundColor: '#1f2937', // Dark background
color: '#fff',
boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
borderRadius: '1.5rem', // Applied to all corners for consistency
marginBottom: '0rem',
display: 'flex',
flexDirection: 'column',
alignItems: 'center'
}}>
      <div style={{
        textAlign: 'center',
        marginBottom: '1rem',
        width: '100%'
      }}>
        <h3 style={{
          fontSize: '2.25rem',
          fontWeight: 800,
          letterSpacing: '-0.025em',
          color: '#fff'
        }}> Elyx Member Dashboard</h3>
        <div style={{
          marginTop: '0.5rem',
          color: '#9ca3af',
          fontSize: '1.125rem',
          fontWeight: 300
        }}>
          <span style={{ fontWeight: 600, color: '#fff' }}>{persona.name}</span> | <span style={{ fontWeight: 300 }}>{persona.chronicCondition}</span>
        </div>
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1rem',
        width: '100%'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          backgroundColor: '#374151',
          borderRadius: '0.5rem',
          boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
          minWidth: '120px'
        }}>
          <FaHeartbeat style={{ color: '#f87171', fontSize: '1.125rem' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Medical</span>
            <span style={{ fontWeight: 600, color: '#fff' }}>{metrics.medicalHours || 0} hrs</span>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          backgroundColor: '#374151',
          borderRadius: '0.5rem',
          boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
          minWidth: '120px'
        }}>
          <FaAppleAlt style={{ color: '#4ade80', fontSize: '1.125rem' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Nutrition</span>
            <span style={{ fontWeight: 600, color: '#fff' }}>{metrics.nutritionHours || 0} hrs</span>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 0.5rem',
          backgroundColor: '#374151',
          borderRadius: '0.5rem',
          boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
          minWidth: '120px'
        }}>
          <FaDumbbell style={{ color: '#60a5fa', fontSize: '1.125rem' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Training</span>
            <span style={{ fontWeight: 600, color: '#fff' }}>{metrics.ptHours || 0} hrs</span>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          backgroundColor: '#374151',
          borderRadius: '0.5rem',
          boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
          minWidth: '120px'
        }}>
          <FaRunning style={{ color: '#a855f7', fontSize: '1.125rem' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Performance</span>
            <span style={{ fontWeight: 600, color: '#fff' }}>{metrics.performanceHours || 0} hrs</span>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          backgroundColor: '#374151',
          borderRadius: '0.5rem',
          boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
          minWidth: '120px'
        }}>
          <FaUsers style={{ color: '#facc15', fontSize: '1.125rem' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Concierge</span>
            <span style={{ fontWeight: 600, color: '#fff' }}>{metrics.conciergeHours || 0} hrs</span>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          backgroundColor: '#374151',
          borderRadius: '0.5rem',
          boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
          minWidth: '120px'
        }}>
          <FaChartLine style={{ color: '#f472b6', fontSize: '1.125rem' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Strategy</span>
            <span style={{ fontWeight: 600, color: '#fff' }}>{metrics.strategyHours || 0} hrs</span>
          </div>
        </div>
        
      </div>
    </div>
  );
}