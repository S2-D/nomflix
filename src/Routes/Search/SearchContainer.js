import { moviesApi, tvApi } from "api";
import React from "react";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    loading: false,
    error: null,
    movieTrend: null,
    tvTrend: null,
  };

  async componentDidMount() {
    try {
      const {
        data: { results: movieTrend },
      } = await moviesApi.trend();
      movieTrend.splice(5, 15);
      const {
        data: { results: tvTrend },
      } = await tvApi.trend();
      tvTrend.splice(5, 15);
      console.log(movieTrend);
      this.setState({
        movieTrend,
        tvTrend,
      });
      console.log(movieTrend);
    } catch {
      this.setState({
        error: "Can't find information.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByTerm();
    }
  };

  updateTerm = (event) => {
    const {
      target: { value },
    } = event;
    this.setState({
      searchTerm: value,
    });
  };

  searchByTerm = async () => {
    const { searchTerm } = this.state;
    this.setState({ loading: true });
    try {
      const {
        data: { results: movieResults },
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);
      this.setState({ movieResults, tvResults });
    } catch {
      this.setState({ error: "Can't find results." });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      movieResults,
      tvResults,
      searchTerm,
      loading,
      error,
      movieTrend,
      tvTrend,
    } = this.state;
    console.log(this.state);
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        loading={loading}
        error={error}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
        movieTrend={movieTrend}
        tvTrend={tvTrend}
      />
    );
  }
}
