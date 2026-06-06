import { useState, useEffect } from 'react'
import heroImage from '../assets/str-vision-funeraire-creation-tombe-sepulture-paysagere-memorial-numerique-qrcode.webp'
import logoCimelo from '../assets/logo-cimelo-str-vision-funeraire-creation-tombe-sepulture-paysagere-memorial-numerique-qrcode.png'
import mainLogo from '../assets/logo-str-vision-funeraire-creation-tombe-sepulture-paysagere-memorial-numerique-qrcode.png'
import qrCodeImage from '../assets/qrcode-str-vision-funeraire-creation-tombe-sepulture-paysagere-memorial-numerique.png'
import logoMemorialis from '../assets/logo-memorialis-str-vision-funeraire-creation-tombe-sepulture-paysagere-memorial-numerique-qrcode.webp'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import logoTransparent from '../assets/LOGO_Fond_Transparent.png'
import logoAura from '../assets/region-auvergne-rhone-alpes.svg'
import logoLoire from '../assets/departement-de-la-loire.svg'
import logoHauteLoire from '../assets/departement-de-la-haute-loire.svg'
import logoRhone from '../assets/departement-du-rhone.svg'
import ent01Avant from '../assets/realisations/entretien01-tombe-avant-loire-haute-loire-rhone-nettoyage-solution-tranquilite-repos-strdu43.jpg'
import ent01Apres from '../assets/realisations/entretien01-tombe-apres-loire-haute-loire-rhone-nettoyage-solution-tranquilite-repos-strdu43.jpg'
import ent02Avant from '../assets/realisations/entretien02-tombe-avant-loire-haute-loire-rhone-nettoyage-solution-tranquilite-repos-strdu43.jpg'
import ent02Apres from '../assets/realisations/entretien02-tombe-apres-loire-haute-loire-rhone-nettoyage-solution-tranquilite-repos-strdu43.jpg'
import ent03Avant from '../assets/realisations/entretien03-tombe-avant-loire-haute-loire-rhone-nettoyage-solution-tranquilite-repos-strdu43.jpg'
import ent03Apres from '../assets/realisations/entretien03-tombe-apres-loire-haute-loire-rhone-nettoyage-solution-tranquilite-repos-strdu43.jpg'

const BeforeAfterSlider = ({ beforeSrc, afterSrc, title }) => {
  const [sliderValue, setSliderValue] = useState(50);

  const handleSliderChange = (e) => {
    setSliderValue(parseFloat(e.target.value));
  };

  return (
    <div className="ba-container">
      <img src={afterSrc} alt="Après" className="ba-after" loading="lazy" />
      <div className="ba-before-wrapper" style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}>
        <img src={beforeSrc} alt="Avant" className="ba-before" loading="lazy" />
      </div>
      <div className="ba-label ba-label-before" style={{ opacity: sliderValue < 50 ? sliderValue / 50 : 1 }}>Avant</div>
      <div className="ba-label ba-label-after" style={{ opacity: sliderValue > 50 ? (100 - sliderValue) / 50 : 1 }}>Après</div>
      <div className="ba-title">{title}</div>
      <div className="ba-handle" style={{ left: `${sliderValue}%` }}></div>
      <input type="range" min="0" max="100" value={sliderValue} onChange={handleSliderChange} className="ba-slider" />
    </div>
  );
};

const ZoneMap = () => {
  useEffect(() => {
    // --- Apparition fluide ---
    const mapDiv = document.getElementById("map");
    if (!mapDiv || mapDiv._leaflet_id) return;
    
    setTimeout(() => {
      if (mapDiv) mapDiv.style.opacity = "1";
    }, 300);

    const centerCoords = [45.3631, 4.2334]; // Pont-Salomon
    const radius = 40000;

    // --- Fonction responsive ---
    function getResponsiveParams() {
      const isMobile = window.innerWidth < 768;
      return {
        zoomStart: isMobile ? 7.8 : 8,
        zoomTarget: isMobile ? 9 : 10,
        logoWidth: isMobile ? 90 : 120
      };
    }

    let { zoomStart, zoomTarget, logoWidth } = getResponsiveParams();

    // --- Initialisation carte ---
    const map = L.map("map", {
      zoomControl: true,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false
    }).setView(centerCoords, zoomStart);

    // --- Fond clair ---
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
    }).addTo(map);

    // --- Animation de zoom ---
    const flyToTimeout = setTimeout(() => map.flyTo(centerCoords, zoomTarget, { duration: 2 }), 500);

    // --- Cercle pulsant ---
    const circle = L.circle(centerCoords, {
      color: "#2f4858",
      weight: 2,
      fillColor: "#e0bd3e",
      fillOpacity: 0.25,
      radius: radius
    }).addTo(map);

    // --- Logo STR ---
    function createLogoIcon(width) {
      return L.divIcon({
        html: `
          <div id="str-logo" style="opacity:0; transition: opacity 1.5s ease;">
            <img src="${logoTransparent}"
                 style="width:${width}px; height:auto;" alt="STR Logo" />
          </div>`,
        className: "",
        iconSize: [width, width / 2],
        iconAnchor: [width / 2, width / 4]
      });
    }

    let logoIcon = createLogoIcon(logoWidth);
    let marker = L.marker(centerCoords, { icon: logoIcon }).addTo(map);
    marker.bindPopup("<b>STR</b><br>Zone d'intervention : 40 km autour de Pont-Salomon");

    const logoTimeout = setTimeout(() => {
      const logo = document.getElementById("str-logo");
      if (logo) logo.style.opacity = "1";
    }, 2500);

    // --- Effet pulsant ---
    let growing = true;
    const intervalId = setInterval(() => {
      const currentRadius = circle.getRadius();
      if (growing) {
        circle.setRadius(currentRadius + 80);
        if (currentRadius > radius + 1000) growing = false;
      } else {
        circle.setRadius(currentRadius - 80);
        if (currentRadius < radius - 1000) growing = true;
      }
    }, 60);

    // --- Réactivation de la navigation ---
    const dragTimeout = setTimeout(() => {
      map.dragging.enable();
      map.scrollWheelZoom.enable();
      map.doubleClickZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
    }, 3000);

    // --- Responsive dynamique en temps réel ---
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const { zoomTarget: newZoom, logoWidth: newLogoWidth } = getResponsiveParams();
        map.setView(centerCoords, newZoom);

        // Mise à jour du logo
        if (marker) map.removeLayer(marker);
        logoIcon = createLogoIcon(newLogoWidth);
        marker = L.marker(centerCoords, { icon: logoIcon }).addTo(map);
        marker.bindPopup("<b>STR</b><br>Zone d'intervention : 40 km autour de Pont-Salomon");
        setTimeout(() => {
          const logo = document.getElementById("str-logo");
          if (logo) logo.style.opacity = "1";
        }, 300);
      }, 200);
    };
    window.addEventListener("resize", handleResize);

    // --- Légende ---
    const legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "info legend");
      div.innerHTML = `
        <div style="
          background: rgba(255,255,255,0.85);
          padding: 10px 14px;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          font-family: 'Arial', sans-serif;
          font-size: 13px;
          color: #2f4858;
          line-height: 1.4;
          text-align: right;">
          <strong>STR</strong><br>
          Zone d'intervention<br>
          <span style="color:#e0bd3e;">≈ 40 km autour de Pont-Salomon</span>
        </div>`;
      return div;
    };
    legend.addTo(map);

    return () => {
      clearInterval(intervalId);
      clearTimeout(flyToTimeout);
      clearTimeout(logoTimeout);
      clearTimeout(dragTimeout);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: "500px", width: "100%", borderRadius: "12px", overflow: "hidden", opacity: 0, transition: "opacity 1.5s ease", position: "relative", zIndex: 1, marginTop: "24px" }}></div>;
}
export default function Home() {
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
  const [showRealizationsModal, setShowRealizationsModal] = useState(false)

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
  return (
    <>
      <div className="home-content">
        {/* HERO SECTION */}
        <section
          id="accueil"
          className="hero animate-fade-in"
          style={{
            backgroundImage: `url(${heroImage})`
          }}
        >
          <div className="hero-overlay" />
          <div className="container hero-grid">
            <div className="hero-content">
              <h1 className="hero-title">
                <span>STR</span>
                Une autre vision<br />du funéraire
              </h1>
              <p className="hero-description">
                Prenez soin de la mémoire de vos proches, même à distance. Nous créons des espaces de paix naturels et durables, où le souvenir demeure vivant et apaisant.
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
              <div className="section-description">
                Nous redéfinissons le monument funéraire en créant des jardins miniatures personnalisés qui honorent la vie et s'intègrent harmonieusement à la nature.
              </div>
            </div>

            <div className="service-card-large">
              <div>
                <div className="card-content">
                  <h3>L’alliance du vivant, du minéral et de matériaux durables</h3>
                  <p>
                    Nos sépultures paysagères réinventent l’hommage funéraire en privilégiant la chaleur du végétal et l’harmonie des matières naturelles. Chaque aménagement est pensé comme un espace vivant, évolutif et apaisant, conçu pour traverser les saisons avec élégance.
                  </p>
                  <ul className="card-features" style={{ marginBottom: '16px' }}>
                    <li>
                      <div>
                        <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Végétalisation harmonieuse</strong>
                        Arbustes pérennes (oliviers nains, buis), graminées légères (miscanthus, carex) et floraisons saisonnières sélectionnées pour un rendu vivant toute l’année.
                      </div>
                    </li>
                  </ul>

                  <div style={{ marginBottom: '16px' }}>
                    <p style={{ fontSize: '14px', marginBottom: '16px' }}>Pour s’adapter à chaque sensibilité, nous proposons plusieurs finitions, toutes sélectionnées pour leur tenue extérieure et leur esthétique intemporelle :</p>
                    <ul className="card-features" style={{ marginBottom: '24px' }}>
                      <li>
                        <div>
                          <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Acier Corten</strong>
                          Aspect cuivré et patine auto-protectrice, idéal pour un rendu chaleureux et contemporain.
                        </div>
                      </li>
                      <li>
                        <div>
                          <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Bois durable <span style={{ fontWeight: 'normal', fontSize: '13px' }}>(chêne thermo-chauffé, robinier, mélèze)</span></strong>
                          Une présence naturelle et douce, parfaite pour les familles recherchant une touche organique et chaleureuse.
                        </div>
                      </li>
                      <li>
                        <div>
                          <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Acier thermolaqué</strong>
                          Finition lisse et élégante, disponible en teintes sobres (noir, anthracite, brun), résistant aux UV et aux intempéries.
                        </div>
                      </li>
                      <li>
                        <div>
                          <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Composite minéral haut de gamme</strong>
                          Matériau stable, non poreux, imitant la pierre naturelle sans en reprendre la froideur. Idéal pour un rendu moderne et épuré.
                        </div>
                      </li>
                      <li>
                        <div>
                          <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Ardoise naturelle <span style={{ fontWeight: 'normal', fontSize: '13px' }}>(en option)</span></strong>
                          Texture fine, teinte profonde, parfaite pour un style discret et poétique.
                        </div>
                      </li>
                    </ul>
                  </div>

                  <ul className="card-features">
                    <li>
                      <div>
                        <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Lit de galets naturels</strong>
                        Galets de rivière, quartz blanc ou granulats décoratifs pour une finition minérale apaisante, invitant au recueillement.
                      </div>
                    </li>
                    <li>
                      <div>
                        <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Zéro entretien lourd</strong>
                        Chaque composition est pensée pour limiter l’arrosage, réduire la taille et garantir une tenue impeccable toute l’année.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-footer">
                <a href="#contact" className="btn btn-primary" onClick={() => setFormData(prev => ({ ...prev, service: 'creation' }))}>
                  Concevoir un aménagement
                </a>
              </div>
            </div>

            <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', color: 'var(--text-secondary)' }}>
              <span style={{ fontWeight: 500 }}>Partenariat exclusif avec :</span>
              <a href="https://cimelo.fr/" target="_blank" rel="noopener noreferrer" className="partner-logo-link">
                <img src={logoCimelo} alt="Logo Cimélo" style={{ height: '45px', objectFit: 'contain' }} loading="lazy" />
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 2: MÉMOIRE ÉTERNELLE (SERVICE INNOVANT MEMORIALIS.SHOP) */}
        <section id="memoire" className="section section-dark">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Mémorial numérique</span>
              <h2 className="section-title">QR Codes connectés</h2>
              <p className="section-description">
                Offrez à vos proches un hommage interactif éternel.
              </p>
            </div>

            <div className="service-card-large card-gold">
              <div>
                <div className="card-content">
                  <h3>La plaque funéraire connectée par QR Code</h3>
                  <p>
                    Une plaque discrète et élégante en <strong>aluminium anodisé</strong> ou <strong>inox</strong>, gravée d'un QR code haute précision.<br />
                    Elle peut être <strong>installée par nos soins</strong> ou <strong>par vous-même</strong> (expédition possible dans toute la France et à l'international).<br />
                    Une fois fixée sur le monument, elle permet à chaque visiteur d'accéder à un mémorial numérique en ligne.
                  </p>
                  <ul className="card-features">
                    <li>
                      <div>
                        <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Espace Souvenirs Sécurisé</strong>
                        Biographie rédigée, album souvenirs (photos/vidéos), hommages de la famille et messages.
                      </div>
                    </li>
                    <li>
                      <div>
                        <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Transmission Intergénérationnelle</strong>
                        Conservez l’histoire familiale et les récits de vie pour les générations futures. Un patrimoine émotionnel qui ne se perd plus.
                      </div>
                    </li>
                    <li>
                      <div>
                        <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Matériaux de Prestige</strong>
                        Plaques résistantes aux UV et aux intempéries, avec gravure inaltérable pour une tenue parfaite, année après année.
                      </div>
                    </li>
                    <li>
                      <div>
                        <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Utilisation simple et immédiate</strong>
                        Pas d'application à télécharger. Un simple scan avec l'appareil photo du smartphone suffit.
                      </div>
                    </li>
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

            <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', color: 'var(--text-secondary)' }}>
              <span style={{ fontWeight: 500 }}>Partenariat exclusif avec :</span>
              <a href="https://www.memorialis.shop/" target="_blank" rel="noopener noreferrer" className="partner-logo-link">
                <img src={logoMemorialis} alt="Logo Memorialis.shop" style={{ height: '45px', objectFit: 'contain' }} loading="lazy" />
              </a>
            </div>

            {/* Encadré d'information sur le concept */}
            <div className="memorial-demo">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent)', fontWeight: 'bold', marginBottom: '8px' }}>
                  Comment ça marche ?
                </span>

                <div className="how-it-works-grid">
                  <div className="how-it-works-step">
                    <span className="step-number">01</span>
                    <h4 className="step-title">Commandez votre plaque</h4>
                    <p className="step-desc">Choisissez le modèle et configurez les finitions selon vos préférences.</p>
                  </div>
                  <div className="how-it-works-step">
                    <span className="step-number">02</span>
                    <h4 className="step-title">Recevez votre QR code</h4>
                    <p className="step-desc">Dès la validation, un espace est créé. Vous recevez votre plaque sous 5-7 jours.</p>
                  </div>
                  <div className="how-it-works-step">
                    <span className="step-number">03</span>
                    <h4 className="step-title">Personnalisez le mémorial</h4>
                    <p className="step-desc">Ajoutez des photos, vidéos et une biographie pour honorer la mémoire de votre proche.</p>
                  </div>
                  <div className="how-it-works-step">
                    <span className="step-number">04</span>
                    <h4 className="step-title">Partagez avec vos proches</h4>
                    <p className="step-desc">Invitez famille et amis à découvrir le mémorial et à ajouter leurs témoignages.</p>
                  </div>
                </div>
                <div style={{ marginTop: '32px' }}>
                  <div
                    className="partner-logo-link"
                    onClick={() => setShowMemorialModal(true)}
                    style={{ cursor: 'pointer', padding: '12px' }}
                  >
                    <img
                      src={qrCodeImage}
                      alt="QR Code de démonstration"
                      loading="lazy"
                      style={{
                        width: '120px',
                        height: 'auto',
                        display: 'block'
                      }}
                    />
                  </div>
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
            <div className="memorial-modal" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '16px 24px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '18px', margin: 0 }}>Démonstration Interactive</h3>
                <button
                  onClick={() => setShowMemorialModal(false)}
                  style={{
                    background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer',
                    color: 'var(--text-secondary)', padding: '0', lineHeight: 1
                  }}
                  aria-label="Fermer"
                >
                  ✕
                </button>
              </div>
              <iframe
                src="https://memorialis.shop/memorial/demo-memorial"
                title="Démonstration Memorialis"
                style={{ width: '100%', height: '75vh', minHeight: '500px', border: 'none', display: 'block' }}
              />
            </div>
          </div>
        )}

        {/* MODAL / POP-UP DE RÉALISATIONS */}
        {showRealizationsModal && (
          <div className="realizations-modal-overlay">
            <div className="realizations-modal">
              <div className="realizations-modal-header">
                <h3>Nos Réalisations</h3>
                <button
                  className="realizations-modal-close"
                  onClick={() => setShowRealizationsModal(false)}
                  aria-label="Fermer"
                >
                  ✕
                </button>
              </div>
              <div className="realizations-modal-content">
                <BeforeAfterSlider 
                  beforeSrc={ent03Avant}
                  afterSrc={ent03Apres}
                  title="Nettoyage approfondi - Cimetière de Pont-Salomon"
                />
                <BeforeAfterSlider 
                  beforeSrc={ent02Avant}
                  afterSrc={ent02Apres}
                  title="Nettoyage approfondi - Tombe et soubassement"
                />
                <BeforeAfterSlider 
                  beforeSrc={ent01Avant}
                  afterSrc={ent01Apres}
                  title="Nettoyage & Restauration de la pierre"
                />
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: SERVICES COMPLÉMENTAIRES (SECONDAIRES) */}
        <section id="services" className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Accompagnement Continu</span>
              <h2 className="section-title">Préservation et Fleurissement</h2>
              <p className="section-description">
                Pour vous assurer une tranquillité d'esprit à chaque instant, nous proposons des services d'entretien méticuleux et un fleurissement personnalisé de vos sépultures.
              </p>
              <button 
                className="btn btn-secondary" 
                style={{ marginTop: '24px' }}
                onClick={() => setShowRealizationsModal(true)}
              >
                📸 Voir nos réalisations
              </button>
            </div>

            <div className="services-secondary">
              <div className="service-card-small">
                <h4><span className="bullet-leaf">🌿</span> Entretien Méticuleux</h4>
                <p>Nettoyage manuel doux de la pierre, élimination des mousses et lichens, lustrage du granit sans aucun produit chimique nocif ni nettoyeur haute pression agressif.</p>
              </div>

              <div className="service-card-small">
                <h4><span className="bullet-leaf">✨</span> Rénovation & Dignité</h4>
                <p>Remise en état des sépultures abîmées ou anciennes, reprise des joints d'étanchéité, re-peinture des lettrages effacés pour redonner au monument son éclat.</p>
              </div>

              <div className="service-card-small">
                <h4><span className="bullet-leaf">🌸</span> Fleurissement Personnalisé</h4>
                <p>Pose de plantes naturelles de saison adaptées au climat local ou de compositions artificielles haut de gamme. Nous fleurissons la sépulture à l'occasion d'une date anniversaire, d'une commémoration, ou simplement à la date de votre choix, sans occasion particulière.</p>
              </div>
            </div>

            {/* ZONE D'INTERVENTION & PARTENAIRES */}
            <div className="info-section" style={{ marginTop: '64px', display: 'flex', justifyContent: 'center' }}>
              <div className="info-card" style={{ width: '100%', maxWidth: '900px' }}>
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
                    <span className="zone-badge">AURA</span>
                    <span>Auvergne-Rhône-Alpes</span>
                  </div>
                </div>
                
                <ZoneMap mainLogo={mainLogo} />

                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '32px',
                  marginTop: '32px',
                  flexWrap: 'wrap'
                }}>
                  <a href="https://www.auvergnerhonealpes.fr/" target="_blank" rel="noopener noreferrer" className="partner-logo-link">
                    <img src={logoAura} alt="Région Auvergne-Rhône-Alpes" style={{ height: '60px', objectFit: 'contain' }} loading="lazy" />
                  </a>
                  <a href="https://www.loire.fr/" target="_blank" rel="noopener noreferrer" className="partner-logo-link">
                    <img src={logoLoire} alt="Département de la Loire" style={{ height: '60px', objectFit: 'contain' }} loading="lazy" />
                  </a>
                  <a href="https://www.hauteloire.fr/" target="_blank" rel="noopener noreferrer" className="partner-logo-link">
                    <img src={logoHauteLoire} alt="Département de la Haute-Loire" style={{ height: '60px', objectFit: 'contain' }} loading="lazy" />
                  </a>
                  <a href="https://www.rhone.fr/" target="_blank" rel="noopener noreferrer" className="partner-logo-link">
                    <img src={logoRhone} alt="Département du Rhône" style={{ height: '60px', objectFit: 'contain' }} loading="lazy" />
                  </a>
                </div>
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
            <p style={{ fontSize: '13px' }}>📞 <a href="tel:+33788689382">07 88 68 93 82</a></p>
            <p style={{ fontSize: '13px' }}>📍 Intervention : 42, 43, 69...</p>
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
