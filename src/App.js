import React, { useEffect, useState } from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import EditMovieForm from "./components/EditMovieForm";
import MovieListItem from "./components/MovieListItem";
import MovieHeader from './components/MovieHeader';
import AddMovieForm from "./components/AddMovieForm";
import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {
    setMovies(movies.filter(x => x.id !== Number(id)));
  }

  const addToFavorites = (id) => {
    const movieToAdd = movies.find(x => x.id === id)
    setFavoriteMovies([...favoriteMovies,movieToAdd])

  }

  const deleteFavoriteItem=(id)=>{
    setFavoriteMovies(favoriteMovies.filter(x => x.id !== Number(id)));

  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Routes>
            <Route path="movies/edit/:id" element={<EditMovieForm setMovies={setMovies} />} />

            <Route path="movies/:id" element={<Movie addToFavorites={addToFavorites} 
                                                     deleteMovie={deleteMovie}
                                                     deleteFavoriteItem={deleteFavoriteItem}/>} />
            <Route path="movies/add" element={<AddMovieForm setMovies={setMovies} />} />
            <Route path="movies" element={<MovieList movies={movies} />} />

            <Route path="/" element={<Navigate to="/movies" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};


export default App;
