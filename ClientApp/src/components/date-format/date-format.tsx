import React, { useState, useEffect } from "react";

type Props = {
  date: string | Date | undefined | null;
};

export const DateFormat: React.FC<Props> = ({ date }: Props) => {
  const [format, setFormat] = useState<string>();

  useEffect(() => {
    if (date) {
      let nd = new Date(date);
      let splitted = nd.toLocaleDateString("en-GB").split("/"); // British English uses day-month-year order
      let dd = splitted[0].length === 1 ? `0${splitted[0]}` : splitted[0];
      let mm = splitted[1].length === 1 ? `0${splitted[1]}` : splitted[1];
      let yyyy = splitted[2];
      let f = `${yyyy}-${mm}-${dd}`;
      setFormat(f);
    }
  }, [date]);
  return <React.Fragment>{format}</React.Fragment>;
};
