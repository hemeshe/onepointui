import React from "react";

import * as S from "./styles";

import { Col } from "../grid";
// import { Icon } from "../icon";

type Props = {
  close?: () => void;
};

export const InProgress = ({ close }: Props) => {
  return (
    <S.Container>
      <S.StyledRow justifyContentCenter alignItemsCenter>
        <Col size={6} justifyContentCenter alignItemsCenter>
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.64438 45.8933C7.57166 47.9222 7.57166 51.2143 9.64438 53.2447C11.7189 55.2752 15.0801 55.2752 17.1528 53.2447C19.2255 51.2143 19.2255 47.9219 17.1528 45.8933C15.0801 43.8608 11.719 43.8608 9.64438 45.8933Z"
              fill="#A6A6A6"
            />
            <path
              d="M11.9432 32.0047C11.9432 28.7766 9.26922 26.1545 5.9716 26.1545C2.67399 26.1545 0 28.7766 0 32.0047C0 35.2364 2.67399 37.8549 5.9716 37.8549C9.26922 37.8549 11.9432 35.2367 11.9432 32.0047Z"
              fill="#A6A6A6"
            />
            <path
              d="M13.3977 7.94312C9.73405 7.94312 6.76318 10.8527 6.76318 14.4434C6.76318 18.0322 9.73405 20.9417 13.3977 20.9417C17.0632 20.9417 20.0323 18.0322 20.0323 14.4434C20.0322 10.8526 17.0632 7.94312 13.3977 7.94312Z"
              fill="#A6A6A6"
            />
            <path
              d="M31.3259 0C27.2963 0 24.0283 3.20248 24.0283 7.1503C24.0283 11.098 27.296 14.3005 31.3259 14.3005C35.3593 14.3005 38.6249 11.098 38.6249 7.1503C38.6271 3.20248 35.3593 0 31.3259 0Z"
              fill="#A6A6A6"
            />
            <path
              d="M31.3257 50.8994C28.7619 50.8994 26.6836 52.9356 26.6836 55.4514C26.6836 57.9618 28.762 60 31.3257 60C33.8914 60 35.9716 57.9617 35.9716 55.4514C35.9716 52.9356 33.8914 50.8994 31.3257 50.8994Z"
              fill="#A6A6A6"
            />
            <path
              d="M56.6802 28.7549C54.8484 28.7549 53.3638 30.2086 53.3638 32.0049C53.3638 33.8012 54.8484 35.2549 56.6802 35.2549C58.5138 35.2549 60.0001 33.8012 60.0001 32.0049C60.0001 30.2086 58.5138 28.7549 56.6802 28.7549Z"
              fill="#A6A6A6"
            />
            <path
              d="M46.4396 46.8108C44.886 48.3322 44.886 50.8025 46.4396 52.326C47.9952 53.8495 50.514 53.8495 52.0714 52.326C53.6249 50.8025 53.6249 48.3326 52.0714 46.8108C50.5139 45.2873 47.995 45.2873 46.4396 46.8108Z"
              fill="#A6A6A6"
            />
            <path
              d="M49.5094 16.7926C50.977 16.7926 52.1647 15.6298 52.1647 14.1925C52.1647 12.7569 50.977 11.5922 49.5094 11.5942C48.0455 11.5942 46.854 12.7569 46.856 14.1925C46.856 15.6298 48.0455 16.7926 49.5094 16.7926Z"
              fill="#A6A6A6"
            />
          </svg>
        </Col>
      </S.StyledRow>
      <S.StyledRow justifyContentCenter alignItemsCenter>
        <Col size={6} justifyContentCenter alignItemsCenter>
          Your new changes are undergoing few standard data checks. It might
          take few seconds to finish. Please wait...
        </Col>
      </S.StyledRow>
      <S.StyledRow justifyContentCenter alignItemsCenter>
        <Col size={6} justifyContentCenter alignItemsCenter>
          <S.Button onClick={close}>Cancel</S.Button>
        </Col>
      </S.StyledRow>
    </S.Container>
  );
};
