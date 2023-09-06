import { useState, useEffect } from "react";

export const useDateFormat = (d: string) => {
  const [date, setDate] = useState<string>();

  useEffect(() => {
    let nd = new Date(d);
    setDate(nd.toLocaleDateString());
  }, [d]);
  return date;
};
