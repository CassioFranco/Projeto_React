import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import './Movies.css';

const Movies = () => {
    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([]);
    const [currentTheme, setCurrentTheme] = useState('auto');
    const [isFavorite, setIsFavorite] = useState(false);

    const fetchMovieDetails = (movieId) => {
        const apiKey = '71b2633140294b7720dad85ff8cc2c93';
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`;

        axios
            .get(url)
            .then((response) => {
                setMovie(response.data);
                fetchCast(movieId);
                checkIfFavorite(movieId);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const fetchCast = (movieId) => {
        const apiKey = '71b2633140294b7720dad85ff8cc2c93';
        const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=pt-BR`;

        axios
            .get(url)
            .then((response) => {
                setCast(response.data.cast);
            })
            .catch((error) => {
                console.error('Erro ao buscar o elenco:', error);
            });
    };

    const getPosterUrl = (path) => `https://image.tmdb.org/t/p/w500${path}`;
    const getActorImageUrl = (path) => `https://image.tmdb.org/t/p/w500${path}`;

    const changeTheme = (theme) => {
        setCurrentTheme(theme);
        updateTheme(theme);
    };

    const updateTheme = (theme) => {
        const htmlElement = document.documentElement;
        htmlElement.setAttribute('data-bs-theme', theme === 'auto' ? '' : theme);
    };

    useEffect(() => {
        const movieId = window.location.pathname.split('/').pop();
        fetchMovieDetails(movieId);
        updateTheme(currentTheme);
    }, [currentTheme]);

    const toggleFavorite = () => {
        const movieId = movie.id;
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (isFavorite) {
            favorites = favorites.filter((id) => id !== movieId);
        } else {
            favorites.push(movieId);
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        setIsFavorite(!isFavorite);
    };

    const checkIfFavorite = (movieId) => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.includes(movieId));
    };

    const genresString = movie.genres ? movie.genres.map((genre) => genre.name).join(', ') : '';

    return (
        <div>
            <Navbar />

            <div className="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
                <button className="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center" type="button">
                    <svg className="bi my-1 theme-icon-active" width="1em" height="1em">
                        <use href="#circle-half"></use>
                    </svg>
                    <span className="visually-hidden">Toggle theme</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow">
                    <li>
                        <button
                            type="button"
                            className={`dropdown-item d-flex align-items-center ${currentTheme === 'light' ? 'active' : ''}`}
                            onClick={() => changeTheme('light')}
                        >
                            <svg className="bi me-2 opacity-50" width="1em" height="1em">
                                <use href="#sun-fill"></use>
                            </svg>
                            Light
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className={`dropdown-item d-flex align-items-center ${currentTheme === 'dark' ? 'active' : ''}`}
                            onClick={() => changeTheme('dark')}
                        >
                            <svg className="bi me-2 opacity-50" width="1em" height="1em">
                                <use href="#moon-stars-fill"></use>
                            </svg>
                            Dark
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className={`dropdown-item d-flex align-items-center ${currentTheme === 'auto' ? 'active' : ''}`}
                            onClick={() => changeTheme('auto')}
                        >
                            <svg className="bi me-2 opacity-50" width="1em" height="1em">
                                <use href="#circle-half"></use>
                            </svg>
                            Auto
                        </button>
                    </li>
                </ul>
            </div>

            <div className="movie-box">
                <h1 className="title">{movie.title}</h1>
                <div className="movie-details d-flex justify-content-center">
                    <div className="poster-container">
                        <img className="poster" width="300px" src={getPosterUrl(movie.poster_path)} alt="Movie Poster" />
                    </div>
                    <div className="info-container">
                        <p>Nota: {movie.vote_average}</p>
                        <p>Duração: {movie.runtime} minutos</p>
                        <p>Orçamento: {movie.budget}</p>
                        <p>Gêneros: {genresString}</p>
                    </div>
                </div>
                <div className="bottom-details">
                    <p className="descricao">{movie.overview}</p>
                    <p className="lancamento">Data de Lançamento: {movie.release_date}</p>
                </div>
            </div>

            <div className="elenco-title">
                <h2>Elenco:</h2>
            </div>
            <div className="container">
                <div className="row">
                    {cast.map((actor) => (
                        <div className="col-6 col-md-4 col-lg-3 mb-4" key={actor.id}>
                            <div className="card text-center">
                                {actor.profile_path && (
                                    <img
                                        src={getActorImageUrl(actor.profile_path)}
                                        alt="Actor Image"
                                        className="card-img-top"
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{actor.name}</h5>
                                    <p className="card-text">como {actor.character}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Movies;
