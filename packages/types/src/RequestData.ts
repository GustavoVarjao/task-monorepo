export type UrlData = {
  id?: string;
  searchTerm?: string;
};

export type TaskTextData = {
  title: string;
  description: string;
};

export type RequestData = {
  method: string;
  taskBody?: TaskTextData;
} & UrlData;
