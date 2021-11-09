import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Loader from "Components/Loader";
import Section from "Components/Section";
import Message from "Components/Message";
import Poster from "Components/Poster";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  /* margin-bottom: 50px; */
  width: 100%;
  margin: 50px 0px;
`;
const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 60%;
`;

const Recommend = styled.div`
  display: flex;
`;

const Title = styled.h2`
  margin: 40px 0px;
  font-size: 24px;
  font-weight: 600;
`;

const MovieSpan = styled.span`
  font-family: "Netflix Sans", sans-serif;
  margin: 20px 10px;
  padding: 5px 12px 8px 12px;
  font-size: 15px;
  background-color: #7941e5;
  border-radius: 15px;
  text-align: center;
  filter: brightness(80%);
  color: white;

  &:hover {
    filter: brightness(100%);
  }
`;

const TVSpan = styled.span`
  font-family: "Netflix Sans", sans-serif;
  margin: 20px 10px;
  padding: 5px 12px 8px 12px;
  font-size: 15px;
  background-color: #4287f5;
  border-radius: 15px;
  text-align: center;
  filter: brightness(80%);
  &:hover {
    filter: brightness(100%);
  }
`;

const SearchPresenter = ({
  movieResults,
  tvResults,
  searchTerm,
  loading,
  error,
  handleSubmit,
  updateTerm,
  movieTrend,
  tvTrend,
}) => (
  <Container>
    <Helmet>
      <title>Search | Nomflix</title>
    </Helmet>
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="Search Movies of TV Show..."
        value={searchTerm}
        onChange={updateTerm}
      ></Input>
    </Form>
    <Title>🎞 This Week's Top 5 Movies 🥰</Title>
    {movieTrend && movieTrend.length > 0 && (
      <Recommend>
        {movieTrend.map((movie) => (
          <Link to={`/movie/${movie.id}`}>
            <MovieSpan>{movie.title}</MovieSpan>
          </Link>
        ))}
      </Recommend>
    )}
    <Title>💃 This Week's Top 5 TV Shows 😆</Title>
    {tvTrend && tvTrend.length > 0 && (
      <Recommend>
        {tvTrend.map((tv) => (
          <Link to={`/show/${tv.id}`}>
            <TVSpan>{tv.original_name}</TVSpan>
          </Link>
        ))}
      </Recommend>
    )}

    {loading ? (
      <Loader />
    ) : (
      <>
        {movieResults && movieResults.length > 0 && (
          <Section title="Movie result">
            {movieResults.map((movie) => (
              <Poster
                key={movie.id}
                id={movie.id}
                imageUrl={movie.poster_path}
                title={movie.original_title}
                rating={movie.vote_average}
                year={movie.release_date.substring(0, 4)}
                isMovie={true}
              />
            ))}
          </Section>
        )}{" "}
        {tvResults && tvResults.length > 0 && (
          <Section title="TV Show result">
            {tvResults.map((show) => (
              <Poster
                key={show.id}
                id={show.id}
                imageUrl={show.poster_path}
                title={show.original_name}
                rating={show.vote_average}
                year={show.first_air_date.substring(0, 4)}
              />
            ))}
          </Section>
        )}
      </>
    )}
    {error && <Message color="#e74c3c" text={error} />}
    {tvResults &&
      movieResults &&
      tvResults.length === 0 &&
      movieResults.length === 0 && (
        <Message text={`Nothing found`} color="95a5a6" />
      )}
  </Container>
);

SearchPresenter.propTypes = {
  movieResults: PropTypes.array,
  tvResults: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  searchTerm: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  updateTerm: PropTypes.func.isRequired,
};

export default SearchPresenter;
