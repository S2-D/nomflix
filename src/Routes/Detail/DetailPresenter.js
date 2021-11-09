import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Loader from "Components/Loader";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;
const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;
const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 30px;
`;

const Title = styled.h3`
  margin: 20px 0;
  font-size: 32px;
  margin-bottom: 10px;
`;

const ItemContainer = styled.div``;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 14px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
  margin: 30px 0px;
`;

const A = styled.a`
  display: inline-block;
  margin-left: 10px;
  background-color: #f3c317;
  padding: 5px 10px;
  border-radius: 6px;
  color: black;
  font-weight: 800;
`;

const Img = styled.img`
  width: 200px;
  height: 300px;
  background-color: white;
  margin: 0px;
  padding: 10px;
`;
const Companies = styled.div`
  display: flex;
`;

const Production = styled.span`
  font-family: "Netflix Sans", sans-serif;
  margin: 20px 10px;
  padding: 5px 12px 8px 12px;
  font-size: 15px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  text-align: center;
`;

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      ></Backdrop>
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            {result.imdb_id ? (
              <A href={`https://www.imdb.com/title/${result.imdb_id}`}>IMDb</A>
            ) : null}
            {console.log(result)}
          </ItemContainer>
          <Overview>{result.overview}</Overview>

          {result.videos.results[0] ? (
            <>
              <Title>Trailers</Title>
              <iframe
                margin="20px"
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${result.videos.results[0].key}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </>
          ) : null}

          {result.production_companies.length > 0 ? (
            <>
              <Title>Productions</Title>

              <Companies>
                {result.production_companies.map((company) => (
                  <>
                    <Production>{company.name}</Production>
                  </>
                ))}
              </Companies>
            </>
          ) : null}

          {result.seasons ? (
            <>
              {" "}
              <Title>Seasons</Title>
              {result.seasons.map((season) => (
                <>
                  {season.poster_path ? (
                    <Img
                      src={`https://image.tmdb.org/t/p/w300${season.poster_path}`}
                    ></Img>
                  ) : null}
                </>
              ))}
            </>
          ) : null}
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
