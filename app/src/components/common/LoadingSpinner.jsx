import { COLORS } from '../../utils/constants'

export default function LoadingSpinner({ size = 40, color = COLORS.accentCyan }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 0',
    }}>
      <div style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `3px solid ${color}22`,
        borderTopColor: color,
        animation: 'spin 0.7s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
