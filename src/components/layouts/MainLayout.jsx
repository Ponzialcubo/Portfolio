import { NavigationProvider } from '../../context/NavigationContext'

export default function MainLayout({ children }) {
  return (
    <NavigationProvider>
      <div style={{ background: 'transparent', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </NavigationProvider>
  )
}
