import type { UrlData } from "@repo/types";

export const urlModifier = (
  { id, searchTerm }: UrlData,
  isPatch?: boolean
): string => {
  let url = "http://localhost:3333/tasks";

  if (id) {
    url = `${url}/${id}`;

    if (isPatch) {
      return `${url}/complete`;
    }
  }

  if (searchTerm) {
    url = `${url}?search=${searchTerm}`;
  }

  return url;
};
