import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import logoTransparent from '../assets/LOGO_Fond_Transparent.png'
import qrCodeImage from '../assets/qrcode-str-vision-funeraire-creation-tombe-sepulture-paysagere-memorial-numerique.png'

export default function QRCodePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="app-container">
      <Helmet>
        <title>Plaque QR Code Mémorielle | STR</title>
        <meta name="description" content="Découvrez notre plaque mémorielle connectée par QR code en aluminium anodisé." />
      </Helmet>

      {/* HEADER & NAV */}
      <header className="header">
        <div className="container header-inner">
          <a href="/" className="logo-container" style={{ textDecoration: 'none' }}>
            <img src={logoTransparent} alt="STR - Une autre vision du funéraire" style={{ height: '45px', objectFit: 'contain' }} />
            <span className="logo-tagline">
              STR : Une autre vision<br />
              du funéraire
            </span>
          </a>

          <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            <a href="/" className="nav-link">Accueil</a>
            <a href="/#paysager" className="nav-link">Sépultures Paysagères</a>
            <a href="/?page=qrcode" className="nav-link active">Mémorial numérique</a>
            <a href="/#services" className="nav-link">Entretien / Rénovation</a>
            <a href="/#contact" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '13px' }}>
              Devis Gratuit
            </a>
          </nav>

          <div className="header-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Basculer le thème" title={theme === 'light' ? "Passer au thème sombre" : "Passer au thème clair"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                <path fill="currentColor" fillRule="evenodd" d="M277.333 405.333v85.333h-42.667v-85.333zm99.346-58.824l60.34 60.34l-30.17 30.17l-60.34-60.34zm-241.359 0l30.17 30.17l-60.34 60.34l-30.17-30.17zM256 139.353c64.422 0 116.647 52.224 116.647 116.647c0 64.422-52.225 116.647-116.647 116.647A116.427 116.427 0 0 1 139.352 256c0-64.423 52.225-116.647 116.648-116.647m0 42.666c-40.859 0-73.981 33.123-73.981 74.062a73.76 73.76 0 0 0 21.603 52.296c13.867 13.867 32.685 21.64 52.378 21.603zm234.666 52.647v42.667h-85.333v-42.667zm-384 0v42.667H21.333v-42.667zM105.15 74.98l60.34 60.34l-30.17 30.17l-60.34-60.34zm301.7 0l30.169 30.17l-60.34 60.34l-30.17-30.17zM277.332 21.333v85.333h-42.667V21.333z" />
              </svg>
            </button>

            <button className={`hamburger-btn ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(prev => !prev)} aria-label="Ouvrir le menu" aria-expanded={isMenuOpen}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>
      </header>

      <main className="main-content" style={{ paddingTop: '100px' }}>
        <section className="section section-dark">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Catalogue</span>
              <h1 className="section-title">Plaque Mémorielle Connectée</h1>
              <p className="section-description">
                Offrez un espace de mémoire numérique accessible d'un simple scan.
              </p>
            </div>

            <div className="service-card-large card-gold" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
                <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-primary)', padding: '24px', borderRadius: '12px' }}>
                  <img src={qrCodeImage} alt="Plaque Aluminium Anodisé" style={{ width: '200px', height: '200px', objectFit: 'contain' }} />
                </div>
                <div className="card-content" style={{ flex: '2 1 400px' }}>
                  <h3 style={{ fontSize: '28px', marginBottom: '12px' }}>Plaque basique en aluminium anodisé</h3>
                  <div style={{ fontSize: '24px', color: 'var(--accent)', fontWeight: 'bold', marginBottom: '16px' }}>59 €</div>
                  <p>
                    Une plaque discrète et élégante en <strong>aluminium anodisé</strong>, gravée d'un QR code haute précision. Conçue pour résister aux intempéries et s'intégrer harmonieusement sur tous types de monuments ou stèles paysagères.
                  </p>
                  <ul className="card-features" style={{ marginTop: '16px' }}>
                    <li>
                      <div>
                        <strong style={{ color: 'var(--text-primary)', display: 'block' }}>Espace Souvenirs Inclus</strong>
                        Accès à vie pour ajouter biographie, photos et témoignages.
                      </div>
                    </li>
                    <li>
                      <div>
                        <strong style={{ color: 'var(--text-primary)', display: 'block' }}>Résistance Extrême</strong>
                        Traitement anti-UV et anti-corrosion garanti.
                      </div>
                    </li>
                  </ul>
                  <div style={{ marginTop: '32px' }}>
                    <button className="btn btn-primary" style={{ width: '100%', maxWidth: '300px', padding: '16px' }}>
                      Commander (Bientôt disponible)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-bottom" style={{ marginTop: 0 }}>
          <span className="footer-copy">
            &copy; {new Date().getFullYear()} STR - Solution Tranquillité Repos. Tous droits réservés.
          </span>
          <div className="footer-bottom-links">
            <a href="/#mentions">Mentions Légales</a>
            <a href="/#confidentialite">Politique de Confidentialité</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
