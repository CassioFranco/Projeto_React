import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import './Favoritos.css';
import like from '../images/heart (1).png';
import unlike from '../images/heart.png';

const Favoritos = () => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [currentTheme, setCurrentTheme] = useState('auto');
    const navigate = useNavigate();

    useEffect(() => {
        loadFavoriteMovies();
        updateTheme(currentTheme);
    }, [currentTheme]);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favoriteMovies.map(movie => movie.id)));
    }, [favoriteMovies]);

    const loadFavoriteMovies = async () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const apiKey = '71b2633140294b7720dad85ff8cc2c93';
        const favoritePromises = favorites.map(id =>
            axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`)
        );

        try {
            const responses = await Promise.all(favoritePromises);
            const movies = responses.map(response => response.data);
            movies.forEach(movie => {
                movie.isFavorite = true;
            });
            setFavoriteMovies(movies);
        } catch (error) {
            console.error('Error fetching favorite movies:', error);
        }
    };

    const getPosterUrl = (path) => {
        return `https://image.tmdb.org/t/p/w500${path}`;
    };

    const goToMovie = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    const toggleFavorite = (movie) => {
        movie.isFavorite = !movie.isFavorite;
        const updatedMovies = [...favoriteMovies];

        if (movie.isFavorite) {
            updatedMovies.push(movie);
        } else {
            const index = updatedMovies.findIndex(m => m.id === movie.id);
            if (index > -1) updatedMovies.splice(index, 1);
        }

        setFavoriteMovies(updatedMovies);

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (movie.isFavorite) {
            favorites.push(movie.id);
        } else {
            const index = favorites.indexOf(movie.id);
            if (index > -1) favorites.splice(index, 1);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    const changeTheme = (theme) => {
        setCurrentTheme(theme);
        updateTheme(theme);
    };

    const updateTheme = (theme) => {
        const htmlElement = document.documentElement;
        htmlElement.setAttribute('data-bs-theme', theme === 'auto' ? '' : theme);
    };

    return (
        <div id="app" className="d-flex flex-column min-vh-100">
            <Navbar />

            <div className="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
                <button className="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center" id="bd-theme" type="button" aria-expanded="false" data-bs-toggle="dropdown" aria-label="Toggle theme (auto)">
                    <svg className="bi my-1 theme-icon-active" width="1em" height="1em">
                        <use href="#circle-half"></use>
                    </svg>
                    <span className="visually-hidden" id="bd-theme-text">Toggle theme</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
                    <li>
                        <button type="button" className="dropdown-item d-flex align-items-center" onClick={() => changeTheme('light')} aria-pressed="false">
                            <svg className="bi me-2 opacity-50" width="1em" height="1em">
                                <use href="#sun-fill"></use>
                            </svg>
                            Light
                        </button>
                    </li>
                    <li>
                        <button type="button" className="dropdown-item d-flex align-items-center" onClick={() => changeTheme('dark')} aria-pressed="false">
                            <svg className="bi me-2 opacity-50" width="1em" height="1em">
                                <use href="#moon-stars-fill"></use>
                            </svg>
                            Dark
                        </button>
                    </li>
                    <li>
                        <button type="button" className="dropdown-item d-flex align-items-center active" onClick={() => changeTheme('auto')} aria-pressed="true">
                            <svg className="bi me-2 opacity-50" width="1em" height="1em">
                                <use href="#circle-half"></use>
                            </svg>
                            Auto
                        </button>
                    </li>
                </ul>
            </div>

            <div className="tittle">
                <h1>Seus filmes favoritos:</h1>
            </div>

            <div className="flex-fill">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {favoriteMovies.length === 0 ? (
                        <div>Nenhum filme favorito encontrado.</div>
                    ) : (
                        favoriteMovies.map((movie) => (
                            <div key={movie.id} className="col">
                                <div className="card shadow-sm">
                                    <img src={getPosterUrl(movie.poster_path)} className="img-fluid rounded-start" alt={movie.title} />
                                    <h5 className="card-title">{movie.title}</h5>
                                    <div className="card-body">
                                        <p className="card-text movie-description">{movie.overview}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn btn-secondary">
                                                <button onClick={() => goToMovie(movie.id)} className="vermais-btn">Ver mais</button>
                                            </div>
                                            <button onClick={() => toggleFavorite(movie)} className="favorite-button" aria-label="Favoritar">
                                                <img src={movie.isFavorite ? like : unlike} alt={movie.isFavorite ? 'favorite' : 'not favorite'} className="favorite-icon" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Favoritos;
