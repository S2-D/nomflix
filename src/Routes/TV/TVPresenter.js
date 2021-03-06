import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Section from "../../Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";
import Carousel from "Components/Carousel";

const Container = styled.div`
  padding: 10px;
`;

const Title = styled.span`
  font-size: 22px;
  font-weight: 600;
`;

const TVPresenter = ({ topRated, popular, airingToday, loading, error }) => (
  <>
    <Helmet>
      <title> TV | Nomflix</title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : (
      <Container>
        <Title>🌟 top Rated</Title>
        {topRated && topRated.length > 0 && (
          <Carousel nowPlaying={topRated} isMovie={false} />
        )}
        {popular && popular.length > 0 && (
          <Section title="😆👍 Popluar Show">
            {popular.map((show) => (
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
        {airingToday && airingToday.length > 0 && (
          <Section title="📺 Airing Today">
            {airingToday.map((show) => (
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
        {error && <Message color="e74c3c" text={error} />}
      </Container>
    )}
  </>
);

TVPresenter.propTypes = {
  topRated: PropTypes.array,
  popular: PropTypes.array,
  airingToday: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default TVPresenter;
