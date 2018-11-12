import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "../Services/fakeMovieService";
import { getGenres } from "../Services/fakeGenreService";

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock")
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });
    /*this get the parameter id:*/
    const movieId = this.props.match.params.id;
    if (movieId === "New") return; /*this verified if this is a new form*/
    /* retrieve the object movie from the fake service */
    const movie = getMovie(movieId);
    if (!movie)
      return this.props.history.replace(
        "/not-found"
      ); /**replace the current history insted set a new history */

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handlerSubmit}>
          {this.renderInput("title", "Title")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
