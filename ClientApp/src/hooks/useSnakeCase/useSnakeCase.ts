import { useCallback } from "react";

export const useSnakeCase = () => {
  const convertToSnakeCase = useCallback((str) => {
    return str.replace(/([A-Z])/g, "_$1").toUpperCase();
  }, []);

  return { convertToSnakeCase };
};
