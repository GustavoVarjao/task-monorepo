import type { PostFormObject } from './TaskObject';

export type UrlData = {
  id?: string;
  searchTerm?: string;
};

export type RequestData = {
  method: string;
  taskBody?: PostFormObject;
} & UrlData;
