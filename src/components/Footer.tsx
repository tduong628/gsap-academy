import './footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__grid">
        <div>
          <h2 className="footer__title">
            Now go make
            <br />
            <span>something move.</span>
          </h2>
          <p className="footer__note">
            Everything here uses the free GSAP core + ScrollTrigger and the
            official @gsap/react hook. Honor your users: every animation on this
            page respects <code>prefers-reduced-motion</code>.
          </p>
        </div>
        <div className="footer__links">
          <a href="https://gsap.com/docs/v3/" target="_blank" rel="noreferrer">
            GSAP Docs ↗
          </a>
          <a href="https://gsap.com/resources/React/" target="_blank" rel="noreferrer">
            useGSAP() Guide ↗
          </a>
          <a href="https://gsap.com/docs/v3/Plugins/ScrollTrigger/" target="_blank" rel="noreferrer">
            ScrollTrigger ↗
          </a>
          <a href="https://gsap.com/community/" target="_blank" rel="noreferrer">
            Community Forum ↗
          </a>
        </div>
      </div>
      <div className="shell footer__base mono-num">
        Built as a teaching artifact · GSAP Academy
      </div>
    </footer>
  );
}
