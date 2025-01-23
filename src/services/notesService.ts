import { notesCrud } from "./notes/notesCrud";
import { scraping } from "./notes/scraping";

export const notesService = {
  ...notesCrud,
  ...scraping
};