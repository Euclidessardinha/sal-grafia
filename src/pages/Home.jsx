import "./Home.css";

function Home() {
  const whatsappNumber = "258845630823";

  const whatsappMessage = encodeURIComponent(
    "Olá! Gostaria de saber mais sobre o Sal & Grafia."
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="home-page">

      {/* =========================
          HEADER
      ========================= */}
      <header className="home-header">

        <a href="/" className="home-brand">

            <img
              src="/logo-sal-grafia.png"
              alt="Sal & Grafia"
            />

          <span>Sal & Grafia</span>

        </a>

        <a
          href={whatsappUrl}
          className="home-header-whatsapp"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>

      </header>


      {/* =========================
          HERO
      ========================= */}
      <main>

        <section className="home-hero">

          <div className="home-hero-overlay"></div>

          <div className="home-hero-content">

            <span className="home-hero-label">
              SAL & GRAFIA
            </span>

            <h1>
              Gastronomia,
              <br />
              <span>cultura e arte.</span>
            </h1>

            <p>
              Um espaço onde os sabores encontram a cultura,
              a criatividade e a arte em uma experiência única.
            </p>

            <div className="home-hero-actions">

              <a
                href="/menu"
                className="home-button home-button-primary"
              >
                Ver Menu
                <span>→</span>
              </a>

              <a
                href={whatsappUrl}
                className="home-button home-button-secondary"
                target="_blank"
                rel="noreferrer"
              >
                Falar Connosco
                <span>↗</span>
              </a>

            </div>

          </div>


          <div className="home-hero-scroll">

            <span>EXPLORE</span>

            <span className="home-scroll-line"></span>

          </div>

        </section>


        {/* =========================
            VISITE-NOS
        ========================= */}
        <section className="home-visit">

          <div className="home-visit-header">

            <span>UMA EXPERIÊNCIA PARA DESCOBRIR</span>

            <h2>
              Visite-nos
              <span>.</span>
            </h2>

            <p>
              Descubra um espaço onde gastronomia,
              cultura e arte se encontram.
            </p>

          </div>


          <div className="home-visit-grid">

            {/* LOCALIZAÇÃO */}
            <div className="home-visit-card">

              <div className="home-visit-icon">
                ⌖
              </div>

              <div>

                <span>LOCALIZAÇÃO</span>

                <h3>
                  Sal & Grafia
                </h3>

                <p>
                  Fundação Fernando Leite Couto
                </p>

              </div>

            </div>


            {/* EXPERIÊNCIA */}
            <div className="home-visit-card">

              <div className="home-visit-icon">
                ✦
              </div>

              <div>

                <span>EXPERIÊNCIA</span>

                <h3>
                  Gastronomia & Cultura
                </h3>

                <p>
                  Sabores, arte e momentos especiais
                </p>

              </div>

            </div>


            {/* CONTACTO */}
            <div className="home-visit-card">

              <div className="home-visit-icon">
                ◉
              </div>

              <div>

                <span>CONTACTO</span>

                <h3>
                  WhatsApp
                </h3>

                <p>
                  Fale connosco diretamente
                </p>

              </div>

            </div>

          </div>


          <div className="home-visit-action">

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              Falar pelo WhatsApp

              <span>
                →
              </span>

            </a>

          </div>

        </section>

      </main>


      {/* =========================
          FOOTER
      ========================= */}
      <footer className="home-footer">

        <div className="home-footer-brand">

          <strong>
            SAL & GRAFIA
          </strong>

          <span>
            Gastronomia, cultura e arte.
          </span>

        </div>


        <div className="home-footer-links">

          <a href="/menu">
            Ver Menu
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            Contactar
          </a>

        </div>


        <div className="home-footer-copy">

          © {new Date().getFullYear()} Sal & Grafia

        </div>

      </footer>

    </div>
  );
}

export default Home;