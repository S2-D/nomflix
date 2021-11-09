import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Slider from "react-slick";

const Img = styled.img`
  background-image: url(${(props) => props.bgUrl});
  display: block;
  /* height: 460px; */
  height: 18%;

  border-radius: 15px;
  justify-content: center;
  margin: 0px auto;
  filter: brightness(70%);
`;

const CarouselDiv = styled.div`
  margin: 40px 20px;
  display: flex;
  justify-content: center; /* 주 축의 방향에 따라 아이템을 정렬 */
  align-items: center; /* 주 축을 교차하는 교차축을 따라 아이템을 정렬 */
  &:hover {
    ${Img} {
      filter: brightness(100%);
    }
  }
`;

class Carousel extends React.Component {
  render() {
    const { nowPlaying, isMovie } = this.props;
    const settings = {
      dots: false, // 슬라이드 밑에 점 보이게
      infinite: true, // 무한으로 반복
      speed: 1000,
      autoplay: true,
      autoplaySpeed: 2000, // 넘어가는 속도
      slidesToShow: 4, // 4장씩 보이게
      slidesToScroll: 1, // 1장씩 뒤로 넘어가게
      centerMode: true,
      centerPadding: "0px", // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
    };
    return (
      <Slider {...settings}>
        {nowPlaying.map((movie) => (
          <Link to={isMovie ? `/movie/${movie.id}` : `/show/${movie.id}`}>
            {" "}
            <CarouselDiv>
              <Img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              />
            </CarouselDiv>
          </Link>
        ))}
      </Slider>
    );
  }
}

Carousel.propTypes = {
  id: PropTypes.number.isRequired,
  nowPlaying: PropTypes.array.isRequired,
};

export default Carousel;
