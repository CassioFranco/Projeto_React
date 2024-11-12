import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import like from '../images/heart (1).png';
import unlike from '../images/heart.png';
import logo from '../images/Netflix_Logo_RGB.png';
import './Home.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [currentTheme, setCurrentTheme] = useState('auto');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
    loadFavorites();
    updateTheme(currentTheme);
  }, [currentTheme]);

  const fetchMovies = () => {
    const apiKey = '71b2633140294b7720dad85ff8cc2c93';
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    axios
      .get(url)
      .then((response) => {
        setMovies(
          response.data.results.map((movie) => ({
            ...movie,
            isFavorite: isFavorite(movie.id),
          }))
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const isFavorite = (movieId) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.includes(movieId);
  };

  const getPosterUrl = (path) => {
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  const goToMovie = (movieId) => {
    navigate(`/movie/${movieId}`);
  };


  const goToFavoritos = () => {
    navigate('/favoritos');
  };

  const toggleFavorite = (movie) => {
    movie.isFavorite = !movie.isFavorite;
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (movie.isFavorite) {
      favorites.push(movie.id);
    } else {
      const index = favorites.indexOf(movie.id);
      if (index > -1) {
        favorites.splice(index, 1);
      }
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    setMovies([...movies]);
  };

  const loadFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.forEach((favoriteId) => {
      const movie = movies.find((movie) => movie.id === favoriteId);
      if (movie) {
        movie.isFavorite = true;
      }
    });
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
    <html lang="pt-br" data-bs-theme={currentTheme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@docsearch/css@3"
        />
        <link
          href="../assets/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />

        <div className="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
          <button
            className="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center"
            id="bd-theme"
            type="button"
            aria-expanded="false"
            data-bs-toggle="dropdown"
            aria-label="Toggle theme (auto)"
          >
            <svg className="bi my-1 theme-icon-active" width="1em" height="1em">
              <use href="#circle-half"></use>
            </svg>
            <span className="visually-hidden" id="bd-theme-text">
              Toggle theme
            </span>
          </button>

          <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
            <li>
              <button
                type="button"
                className="dropdown-item d-flex align-items-center"
                onClick={() => changeTheme('light')}
                aria-pressed="false"
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
                className="dropdown-item d-flex align-items-center"
                onClick={() => changeTheme('dark')}
                aria-pressed="false"
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
                className="dropdown-item d-flex align-items-center active"
                onClick={() => changeTheme('auto')}
                aria-pressed="true"
              >
                <svg className="bi me-2 opacity-50" width="1em" height="1em">
                  <use href="#circle-half"></use>
                </svg>
                Auto
              </button>
            </li>
          </ul>
        </div>

        <main>
          <section className="py-4 text-center container">
            <div className="row py-lg-3">
              <div className="col-lg-6 col-md-8 mx-auto">
                <img
                  src={logo}
                  alt="logo"
                  width="500"
                />
                <p className="lead text-body-secondary">
                  Bem-vindo à nossa página de catálogo de filmes! Descubra novas histórias aqui cada filme conta
                  uma história, e estamos aqui para ajudar você a encontrá-las!
                </p>
                <p>
                  <button
                    className="teste btn btn-primary my-2"
                    onClick={goToFavoritos}
                  >
                    Favoritos
                  </button>
                </p>
              </div>
            </div>
          </section>

          <div className="album py-5 bg-body-tertiary">
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 d-flex justify-content-center">
                {movies.map((movie) => (
                  <div key={movie.id} className="col d-flex justify-content-center">
                    <div className="card shadow-sm" style={{ width: '18rem' }}>
                      <img
                        src={getPosterUrl(movie.poster_path)}
                        className="img-fluid rounded-start"
                        alt={movie.title}
                        style={{ width: '100%' }}
                      />
                      <h5 className="card-title">{movie.title}</h5>
                      <div> ⭐ {movie.vote_average}</div>
                      <div className="card-body">
                        <p className="card-text movie-description">{movie.overview}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn btn-secondary">
                            <button
                              onClick={() => goToMovie(movie.id)}
                              className="vermais-btn"
                            >
                              Ver mais
                            </button>
                          </div>
                          <button
                            className="btn favorite-button"
                            onClick={() => toggleFavorite(movie)}
                          >
                            <img
                              src={movie.isFavorite ? like : unlike}
                              alt={movie.isFavorite ? 'Favorito' : 'Não Favorito'}
                              width="24"
                              height="24"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </body>
      <Footer />
    </html>
  );
}

export default Home;
