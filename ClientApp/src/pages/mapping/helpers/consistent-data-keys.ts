//import { IngestionFileDataType } from "../../../types/data-ingestion";
import { useSnakeCase } from "../../../hooks/useSnakeCase";

export const ConsistentDataKeys = (data: any[]) => {
  const { convertToSnakeCase } = useSnakeCase();
  const normalized = JSON.parse(JSON.stringify(data));
  normalized.forEach((el: any) => {
    for (var key in el) {
      if (key.toUpperCase() !== key) {
        el[convertToSnakeCase(key)] = el[key];
        delete el[key];
      }
    }
  });
  return normalized;
};
