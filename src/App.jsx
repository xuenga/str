import { useState, useEffect } from 'react'
import heroImage from './assets/str-vision-funeraire-creation-tombe-sepulture-paysagere-memorial-numerique-qrcode.webp'

function App() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    departement: '43',
    service: 'creation',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState('accueil')

  // États pour le Mémorial interactif (Démo QR Code)
  const [showMemorialModal, setShowMemorialModal] = useState(false)

  // État pour le menu mobile responsive
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Gestion du thème
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulation d'envoi du formulaire
    setIsSubmitted(true)
    setTimeout(() => {
      // Optionnel : réinitialiser après quelques secondes
    }, 5000)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="app-container">
      {/* HEADER & NAV */}
      <header className="header">
        <div className="container header-inner">
          <div className="logo-container">
            <span className="logo-text">
              <span className="logo-s">S</span>
              <span className="logo-t">T
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-6px',
                  fontSize: '12px',
                  color: '#4f7744'
                }}>🌿</span>
              </span>
              <span className="logo-r">R</span>
            </span>
            <span className="logo-tagline">Une autre vision du funéraire</span>
          </div>

          <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            <a
              href="#accueil"
              className={`nav-link ${activeTab === 'accueil' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('accueil');
                setIsMenuOpen(false);
              }}
            >
              Accueil
            </a>
            <a
              href="#paysager"
              className={`nav-link ${activeTab === 'paysager' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('paysager');
                setIsMenuOpen(false);
              }}
            >
              Sépultures Paysagères
            </a>
            <a
              href="#memoire"
              className={`nav-link ${activeTab === 'memoire' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('memoire');
                setIsMenuOpen(false);
              }}
            >
              Mémorial numérique
            </a>
            <a
              href="#services"
              className={`nav-link ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('services');
                setIsMenuOpen(false);
              }}
            >
              Entretien / Rénovation
            </a>
            <a
              href="#contact"
              className="btn btn-primary"
              style={{ padding: '8px 20px', fontSize: '13px' }}
              onClick={() => {
                setActiveTab('contact');
                setIsMenuOpen(false);
              }}
            >
              Devis Gratuit
            </a>
          </nav>

          <div className="header-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Basculer le thème"
              title={theme === 'light' ? "Passer au thème sombre" : "Passer au thème clair"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                <path fill="currentColor" fillRule="evenodd" d="M277.333 405.333v85.333h-42.667v-85.333zm99.346-58.824l60.34 60.34l-30.17 30.17l-60.34-60.34zm-241.359 0l30.17 30.17l-60.34 60.34l-30.17-30.17zM256 139.353c64.422 0 116.647 52.224 116.647 116.647c0 64.422-52.225 116.647-116.647 116.647A116.427 116.427 0 0 1 139.352 256c0-64.423 52.225-116.647 116.648-116.647m0 42.666c-40.859 0-73.981 33.123-73.981 74.062a73.76 73.76 0 0 0 21.603 52.296c13.867 13.867 32.685 21.64 52.378 21.603zm234.666 52.647v42.667h-85.333v-42.667zm-384 0v42.667H21.333v-42.667zM105.15 74.98l60.34 60.34l-30.17 30.17l-60.34-60.34zm301.7 0l30.169 30.17l-60.34 60.34l-30.17-30.17zM277.332 21.333v85.333h-42.667V21.333z" />
              </svg>
            </button>

            <button
              className={`hamburger-btn ${isMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMenuOpen(prev => !prev)}
              aria-label="Ouvrir le menu"
              aria-expanded={isMenuOpen}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">

        {/* HERO SECTION */}
        <section
          id="accueil"
          className="hero animate-fade-in"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="hero-overlay" />
          <div className="container hero-grid">
            <div className="hero-content">
              <h1 className="hero-title">
                <span>STR</span>
                Une autre vision du funéraire
              </h1>
              <p className="hero-description">
                Prenez soin de la mémoire de vos proches, même à distance. Nous concevons des havres de paix naturels, durables et connectés pour un souvenir vivant, digne et apaisant.
              </p>
              <div className="hero-buttons">
                <a href="#paysager" className="btn btn-primary">Découvrir nos créations</a>
                <a href="#memoire" className="btn btn-secondary">Mémoriaux QR Code</a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: CRÉATIONS PAYSAGÈRES (SERVICE INNOVANT CIMÉLO) */}
        <section id="paysager" className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Sépultures paysagères</span>
              <h2 className="section-title">Des créations uniques</h2>
              <p className="section-description">
                Nous redéfinissons le monument funéraire en créant des jardins miniatures personnalisés qui honorent la vie et s'intègrent harmonieusement à la nature. Partenariat exclusif avec <strong>Cimélo</strong>
              </p>
            </div>

            <div className="service-card-large">
              <div className="card-bg-gradient" />
              <div>
                <div className="card-icon">🌳</div>
                <div className="card-content">
                  <h3>L'alliance du vivant, du minéral et de l'acier Corten</h3>
                  <p>
                    Nos sépultures paysagères rejettent la froideur du marbre traditionnel au profit de compositions vivantes et chaleureuses. Chaque aménagement est une œuvre d'art éco-conçue, pensée pour durer et évoluer au gré des saisons.
                  </p>
                  <ul className="card-features">
                    <li><strong>Végétalisation soignée</strong> : Arbustes pérennes (oliviers nains, buis), graminées élégantes (miscanthus) et fleurs de saison.</li>
                    <li><strong>Acier Corten durable</strong> : Structure métallique à l'aspect cuivré et oxydé auto-protecteur, apportant noblesse et chaleur.</li>
                    <li><strong>Lit de galets naturels</strong> : Finition minérale soignée (galets de rivière ou quartz blanc) invitant au calme et à la méditation.</li>
                    <li><strong>Zéro entretien lourd</strong> : Concept paysager conçu pour nécessiter un minimum d'arrosage et de taille.</li>
                  </ul>
                </div>
              </div>
              <div className="card-footer">
                <a href="#contact" className="btn btn-primary" onClick={() => setFormData(prev => ({ ...prev, service: 'creation' }))}>
                  Concevoir un aménagement
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: MÉMOIRE ÉTERNELLE (SERVICE INNOVANT MEMORIALIS.SHOP) */}
        <section id="memoire" className="section section-dark">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Mémorial numérique</span>
              <h2 className="section-title">QR Code connectés</h2>
              <p className="section-description">
                Une passerelle entre le lieu de recueillement physique et les souvenirs numériques de toute une vie. Grâce à notre partenariat avec <strong>Memorialis.shop</strong>, offrez à vos proches un hommage interactif éternel.
              </p>
            </div>

            <div className="service-card-large card-gold">
              <div className="card-bg-gradient" />
              <div>
                <div className="card-icon">✨</div>
                <div className="card-content">
                  <h3>La plaque funéraire connectée par QR Code</h3>
                  <p>
                    Une plaque d'une discrétion et d'une élégance absolue en aluminium anodisé ou en plexiglass, gravée d'un QR code haute précision. Fixée sur le monument, elle permet à chaque visiteur de scanner le code pour entrer dans l'intimité des souvenirs de l'être cher.
                  </p>
                  <ul className="card-features">
                    <li><strong>Espace Souvenirs Sécurisé</strong> : Un album photo en ligne, une biographie rédigée, des messages et des hommages de la famille.</li>
                    <li><strong>Transmission Intergénérationnelle</strong> : Conservez l'histoire familiale, l'arbre généalogique et les récits de vie accessibles pour les enfants et petits-enfants.</li>
                    <li><strong>Matériaux de Prestige</strong> : Plaques résistantes aux UV et aux pires intempéries, avec gravure inaltérable.</li>
                    <li><strong>Simplicité Absolue</strong> : Pas d'application à télécharger. Un simple scan avec l'appareil photo du smartphone suffit.</li>
                  </ul>
                </div>
              </div>
              <div className="card-footer" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button className="btn btn-gold" onClick={() => setShowMemorialModal(true)}>
                  Explorer un mémorial de démonstration
                </button>
                <a href="#contact" className="btn btn-secondary" onClick={() => setFormData(prev => ({ ...prev, service: 'qrcode' }))}>
                  Demander une plaque connectée
                </a>
              </div>
            </div>

            {/* Encadré d'information sur le concept */}
            <div className="memorial-demo">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent)', fontWeight: 'bold', marginBottom: '8px' }}>
                  Comment ça marche ?
                </span>
                <p style={{ maxWidth: '600px', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                  1. Nous gravons et installons votre plaque physique sur le monument. <br />
                  2. Nous créons ensemble l'espace numérique (textes, photos, musiques). <br />
                  3. Les visiteurs scannent le code et accèdent instantanément à cette constellation de souvenirs.
                </p>
                <div className="qr-code-wrapper">
                  <div
                    onClick={() => setShowMemorialModal(true)}
                    style={{
                      width: '100px',
                      height: '100px',
                      background: 'repeating-conic-gradient(black 0% 25%, white 0% 50%) 50% / 12px 12px',
                      border: '2px solid black',
                      cursor: 'pointer'
                    }}
                  />
                </div>
                <span className="memorial-hint">
                  Scannez ou cliquez sur le QR Code virtuel ci-dessus pour découvrir le mémorial d'exemple de STR & Memorialis.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* MODAL / POP-UP DE DÉMONSTRATION DU MÉMORIAL (MEMORIALIS) */}
        {showMemorialModal && (
          <div className="memorial-modal-overlay">
            <div className="memorial-modal">
              {/* Header du Mémorial */}
              <div className="memorial-modal-header">
                <button
                  onClick={() => setShowMemorialModal(false)}
                  className="memorial-modal-close"
                  aria-label="Fermer"
                >
                  ✕
                </button>

                {/* Photo de profil sépia de démonstration */}
                <div className="memorial-modal-avatar-container">
                  {/* Avatar poétique / Arbre ou silhouette */}
                  <span style={{ fontSize: '48px' }}>👴</span>
                </div>

                <h3 style={{ fontSize: '26px', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
                  Jean-Pierre Dubreuil
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--accent)', letterSpacing: '1px', marginTop: '4px' }}>
                  1942 — 2025
                </p>
                <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--text-secondary)', marginTop: '12px' }}>
                  « Un amoureux de la Haute-Loire, des forêts de pins et des grandes balades en famille. »
                </p>
              </div>

              {/* Contenu du Mémorial */}
              <div className="memorial-modal-body">
                <h4 style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-primary)', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                  🎞️ Galerie de souvenirs
                </h4>

                {/* Simulation de grille de photos */}
                <div className="memorial-modal-gallery">
                  <div className="memorial-gallery-card memorial-gallery-card-1">
                    <span style={{ fontSize: '24px', marginBottom: '4px' }}>🏕️</span>
                    <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 'bold' }}>Camping en 1974</span>
                    <span style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Nostalgie B&W</span>
                  </div>

                  <div className="memorial-gallery-card memorial-gallery-card-2">
                    <span style={{ fontSize: '24px', marginBottom: '4px' }}>👨‍👩‍👧‍👦</span>
                    <span style={{ fontSize: '11px', color: 'var(--green)', fontWeight: 'bold' }}>Noël en Famille</span>
                    <span style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Couleurs HD</span>
                  </div>
                </div>

                <h4 style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-primary)', marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                  📜 Hommage de la famille
                </h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
                  « Jean-Pierre a passé sa vie à cultiver son jardin à Craponne-sur-Arzon. Sa gentillesse, son humour malicieux et son dévouement pour ses enfants resteront à jamais gravés dans nos cœurs. Ce mémorial en pleine nature et ce souvenir en ligne lui ressemblent tant : simples, vivants et sereins. »
                </p>

                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={() => setShowMemorialModal(false)}
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                  >
                    Fermer la démonstration
                  </button>
                  <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '10px' }}>
                    Propulsé par Memorialis.shop pour STR
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: SERVICES COMPLÉMENTAIRES (SECONDAIRES) */}
        <section id="services" className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Prestations de Proximité</span>
              <h2 className="section-title">Préservation et Fleurissement</h2>
              <p className="section-description">
                Pour assurer la tranquillité d'esprit des familles à chaque instant, nous assurons des prestations d'entretien méticuleuses et de fleurissement de proximité.
              </p>
            </div>

            <div className="services-secondary">
              <div className="service-card-small">
                <h4><span className="bullet-leaf">🌿</span> Entretien Méticuleux</h4>
                <p>Nettoyage manuel doux de la pierre, élimination des mousses et lichens, lustrage du granit sans aucun produit chimique nocif ni nettoyeur haute pression agressif.</p>
              </div>

              <div className="service-card-small">
                <h4><span className="bullet-leaf">✨</span> Rénovation & Dignité</h4>
                <p>Remise en état des sépultures abîmées ou anciennes, reprise des joints d'étanchéité, re-dorure ou re-peinture des lettrages effacés pour redonner au monument son éclat.</p>
              </div>

              <div className="service-card-small">
                <h4><span className="bullet-leaf">🌸</span> Fleurissement Régulier</h4>
                <p>Pose de plantes naturelles de saison adaptées au climat local, ou de compositions artificielles haut de gamme pour fleurir la sépulture aux dates anniversaires ou commémorations.</p>
              </div>
            </div>

            {/* ZONE D'INTERVENTION & PARTENAIRES */}
            <div className="info-section" style={{ marginTop: '64px' }}>
              <div className="info-card">
                <h3>📍 Zone d'Intervention</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Pour garantir la réactivité et la qualité de nos services d'entretien et de création paysagère, nous intervenons exclusivement sur une zone de proximité définie :
                </p>
                <div className="zones-list">
                  <div className="zone-item">
                    <span className="zone-badge">43</span>
                    <span>Haute-Loire (Craponne, Le Puy...)</span>
                  </div>
                  <div className="zone-item">
                    <span className="zone-badge">42</span>
                    <span>Loire (St-Étienne, Firminy...)</span>
                  </div>
                  <div className="zone-item">
                    <span className="zone-badge">69</span>
                    <span>Rhône (Lyon, Sud-Lyonnais...)</span>
                  </div>
                  <div className="zone-item">
                    <span className="zone-badge">ARA</span>
                    <span>Auvergne-Rhône-Alpes</span>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h3>🤝 Nos Partenariats de Confiance</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  Afin de proposer le meilleur niveau d'excellence pour nos mémoriaux et aménagements paysagers, nous collaborons avec des experts français reconnus :
                </p>
                <div className="partners-logos">
                  <div className="partner-logo-placeholder">CIMÉLO</div>
                  <div className="partner-logo-placeholder">MEMORIALIS</div>
                </div>
                <p className="partner-desc">
                  La synergie de la marbrerie paysagère sur-mesure et de la technologie connectée respectueuse de la mémoire.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: FORMULAIRE DE CONTACT & DEVIS */}
        <section id="contact" className="section section-dark">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">À votre écoute</span>
              <h2 className="section-title">Demander une étude personnalisée</h2>
              <p className="section-description">
                Qu'il s'agisse d'une création paysagère sur-mesure, de la pose d'une plaque connectée QR Code ou d'une prestation d'entretien, nous étudions votre demande avec le plus grand soin. Devis gratuit et sans engagement.
              </p>
            </div>

            <div className="contact-form-container">
              {isSubmitted ? (
                <div className="form-success-message animate-fade-in">
                  <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>🙏</span>
                  <h4>Votre demande a été transmise avec respect</h4>
                  <p style={{ fontSize: '14px', marginTop: '8px', color: 'var(--text-secondary)' }}>
                    Nous accusons réception de votre message. Notre équipe va étudier votre projet avec sensibilité et vous recontactera sous 24 à 48 heures pour vous proposer un devis gratuit et personnalisé.
                  </p>
                  <button
                    className="btn btn-secondary"
                    style={{ marginTop: '20px' }}
                    onClick={() => setIsSubmitted(false)}
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="nom">Votre Nom</label>
                      <input
                        type="text"
                        id="nom"
                        name="nom"
                        className="form-control"
                        placeholder="Ex: M. ou Mme Martin"
                        required
                        value={formData.nom}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="email">Adresse Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Ex: contact@email.com"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="telephone">Téléphone</label>
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        className="form-control"
                        placeholder="Ex: 06 12 34 56 78"
                        required
                        value={formData.telephone}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="departement">Département de la sépulture</label>
                      <select
                        id="departement"
                        name="departement"
                        className="form-control"
                        value={formData.departement}
                        onChange={handleInputChange}
                      >
                        <option value="43">Haute-Loire (43)</option>
                        <option value="42">Loire (42)</option>
                        <option value="69">Rhône (69)</option>
                        <option value="autre">Autre (Auvergne-Rhône-Alpes)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="service">Prestation Souhaitée</label>
                    <select
                      id="service"
                      name="service"
                      className="form-control"
                      value={formData.service}
                      onChange={handleInputChange}
                    >
                      <option value="creation">Conception de Sépulture Paysagère sur-mesure (Cimélo)</option>
                      <option value="qrcode">Plaque Mémorielle connectée QR Code (Memorialis)</option>
                      <option value="entretien">Entretien ponctuel ou fleurissement régulier</option>
                      <option value="renovation">Rénovation complète de sépulture ancienne</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Décrivez votre projet ou situation</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-control"
                      placeholder="Indiquez-nous la commune du cimetière et vos souhaits particuliers (choix des végétaux, plaque mémorielle, dates de fleurissement...)"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-submit-container">
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>
                      Transmettre ma demande de devis gratuit
                    </button>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginTop: '12px' }}>
                      🔒 Vos informations restent strictement confidentielles et ne sont utilisées que pour l'établissement de votre étude.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <h4>STR</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Solution Tranquillité Repos. Une autre vision du funéraire, un hommage vivant qui traverse les générations.
            </p>
          </div>

          <div className="footer-links">
            <h5>Prestations</h5>
            <ul>
              <li><a href="#paysager">Sépultures Paysagères</a></li>
              <li><a href="#memoire">Mémoriaux Connectés</a></li>
              <li><a href="#services">Entretien & Rénovation</a></li>
              <li><a href="#services">Fleurissement Saisonniers</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h5>Contact & Zone</h5>
            <p style={{ fontSize: '13px' }}>📞 +33 (0)7 88 68 93 82</p>
            <p style={{ fontSize: '13px' }}>📍 Intervention : 42, 43, 69</p>
            <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--text-muted)', marginTop: '12px' }}>
              En partenariat avec Cimélo & Memorialis.shop
            </p>
          </div>
        </div>

        <div className="container footer-bottom">
          <span className="footer-copy">
            &copy; {new Date().getFullYear()} STR - Solution Tranquillité Repos. Tous droits réservés.
          </span>
          <div className="footer-bottom-links">
            <a href="#mentions">Mentions Légales</a>
            <a href="#confidentialite">Politique de Confidentialité</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
