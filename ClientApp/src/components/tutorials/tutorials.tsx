import React from "react";

import * as S from "./styles";

import { VideoItem } from "./video-item";

const tutorials = [
  {
    title: "Introduction about Data Ingestion",
    link:
      "https://eu001-sp.shell.com/:v:/r/sites/AAAAA0416/WONAOSSMPs/oiwam4f3/Documents/STLBO_SD1900091_EDGE_PROJECT_MINERVA/04%20Stage%20Gate%203%20-%20Design/WIP-Video/Portal_Data%20Ingestion_21Aug.mp4?csf=1&web=1&e=Z19Gpg",
    thumbnail: "",
  },
  {
    title: "Introduction about Mapping",
    link:
      "https://eu001-sp.shell.com/:v:/r/sites/AAAAA0416/WONAOSSMPs/oiwam4f3/Documents/STLBO_SD1900091_EDGE_PROJECT_MINERVA/04%20Stage%20Gate%203%20-%20Design/WIP-Video/Portal_Mapping_21Jan21.mp4?csf=1&web=1&e=fZN0xW",
    thumbnail: "",
  },
  {
    title: "Introduction about Admin Mi Portal",
    link:
      "https://eu001-sp.shell.com/:v:/r/sites/AAAAA0416/WONAOSSMPs/oiwam4f3/Documents/STLBO_SD1900091_EDGE_PROJECT_MINERVA/04%20Stage%20Gate%203%20-%20Design/WIP-Video/Portal_Admin_MI%20Portal21Jan21.mp4?csf=1&web=1&e=or3B0n",
    thumbnail: "",
  },
  {
    title: "Introduction about Admin Mi Station",
    link:
      "https://eu001-sp.shell.com/:v:/r/sites/AAAAA0416/WONAOSSMPs/oiwam4f3/Documents/STLBO_SD1900091_EDGE_PROJECT_MINERVA/04%20Stage%20Gate%203%20-%20Design/WIP-Video/Portal_Admin_MI%20Station_21Jan21.mp4?csf=1&web=1&e=FHO3cs",
    thumbnail: "",
  },
];

export const Tutorials = () => {
  return (
    <S.Container>
      <S.Card>
        {tutorials &&
          tutorials.map((t, i) => (
            <VideoItem key={i + t.title} title={t.title} link={t.link} />
          ))}
      </S.Card>
    </S.Container>
  );
};
