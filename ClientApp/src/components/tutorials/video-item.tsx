import React, { useCallback } from "react";

import * as S from "./styles";

type Props = {
  title: string;
  link: string;
  thumbnail?: string;
};

export const VideoItem = ({ title, link, thumbnail }: Props) => {
  const handleClick = useCallback(() => {
    window.open(link, "_blank");
  }, [link]);
  return (
    <S.VideoRow onClick={handleClick}>
      <S.VideoCol size={3} alignItemsCenter>
        <svg
          width="116"
          height="84"
          viewBox="0 0 116 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 4C0 1.79086 1.79086 0 4 0H112C114.209 0 116 1.79086 116 4V80C116 82.2091 114.209 84 112 84H4C1.79086 84 0 82.2091 0 80V4Z"
            fill="#D9D9D9"
          />
          <path
            d="M79 42C79 53.598 69.598 63 58 63C46.402 63 37 53.598 37 42C37 30.402 46.402 21 58 21C69.598 21 79 30.402 79 42Z"
            fill="#A6A6A6"
          />
          <path d="M69 42L53 51L53 33L69 42Z" fill="#E6E6E6" />
        </svg>
      </S.VideoCol>
      <S.VideoDescCol size={9} alignItemsCenter justifyContentLeft>
        {title}
      </S.VideoDescCol>
    </S.VideoRow>
  );
};
