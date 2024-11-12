import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="bg-dark text-body-secondary py-4">
      <div className="container">
        <p className="float-end mb-1">
          <a href="#top" className="voltar link-offset-2 link-underline link-underline-opacity-0">
            Voltar para o topo
          </a>
        </p>
        <div className="footer-color">
          <p className="mb-1">Netflix Brasil&copy; página feita consumindo API do TMDB!</p>
          <p>info@account.netflix.com</p>
          <p>Dúvidas? Ligue 0800 591 2876</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
