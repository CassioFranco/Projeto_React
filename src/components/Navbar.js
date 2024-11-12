import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../images/Netflix_Logo_RGB.png';

function Navbar() {
    const navigate = useNavigate();

    const navigateToHome = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <header data-bs-theme="dark">
            <div className="collapse text-bg-dark" id="navbarHeader">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 col-md-7 py-4">
                            <h4>Sobre</h4>
                            <p className="text-body-secondary">
                                Bem-vindo à nossa página de catálogo de filmes, onde você pode explorar uma vasta seleção de
                                títulos de todos os gêneros! Descubra novas histórias, reveja clássicos e encontre recomendações
                                personalizadas para a sua próxima sessão de cinema. Aqui, cada filme conta uma história, e estamos
                                aqui para ajudar você a encontrá-las!
                            </p>
                        </div>
                        <div className="col-sm-4 offset-md-1 py-4">
                            <h4>Contatos</h4>
                            <ul className="list-unstyled">
                                <li>
                                    <a
                                        href="https://x.com/NetflixBrasil?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white"
                                    >
                                        Twitter
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.facebook.com/netflixbrasil/?locale=pt_BR"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white"
                                    >
                                        Facebook
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.instagram.com/netflixbrasil/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white"
                                    >
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.youtube.com/channel/UCc1l5mTmAv2GC_PXrBpqyKQ"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white"
                                    >
                                        YouTube
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbar navbar-dark bg-dark shadow-sm">
                <div className="container">
                    <a href="/" className="navbar-brand d-flex align-items-center" onClick={navigateToHome}>
                        <img src={logo} alt="logo" width="100" />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarHeader"
                        aria-controls="navbarHeader"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
