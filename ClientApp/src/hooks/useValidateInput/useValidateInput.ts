import { useCallback } from "react";

export const useValidateInput = () => {
  const isEmpty = useCallback((v) => {
    return Boolean(v === "" || !v);
  }, []);

  const isInvalidNum = useCallback((v) => {
    return Boolean(v && isNaN(Number(v)));
  }, []);

  const sanitizeInput = useCallback((input) => {
    return input ?? "";
  }, []);

  return {
    isEmpty,
    isInvalidNum,
    sanitizeInput,
  };
};
