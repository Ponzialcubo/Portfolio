export default function Container({
  children,
  maxWidth = 1280,
  padding = 'clamp(20px, 5vw, 64px)',
  style = {},
}) {
  return (
    <div style={{
      maxWidth,
      margin: '0 auto',
      padding: `0 ${padding}`,
      width: '100%',
      ...style,
    }}>
      {children}
    </div>
  )
}
