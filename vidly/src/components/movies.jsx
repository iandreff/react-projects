import React, { Component } from "react";

import Pagination from "./common/pagination";
import { getMovies } from "../Services/fakeMovieService";
import { getGenres } from "../Services/fakeGenreService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: [],
    pageSize: 4,
    currentPage: 1
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(elem => elem._id !== movie._id);
    this.setState({ movies: movies }); //this is equal to {movies}
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSelect = genre => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1
    });
  };

  handleSort = path => {
    console.log(path);
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      selectedGenre
    } = this.state;
    if (count === 0) return <p>There are no movies in DB</p>;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => selectedGenre._id === m.genre._id)
        : allMovies;
    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemSelect={this.handleSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>

        <div className="col">
          <p>Showing {filtered.length} movies in the DB</p>
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
