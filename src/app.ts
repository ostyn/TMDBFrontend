import { TmdbDao }  from './TmdbDao';
import { inject, bindable } from 'aurelia-framework';

@inject(TmdbDao)
export class App {
  movies: object[];
  @bindable query: string = "";
  @bindable currentPage: number = 1;
  numPages: number = 1;
  totalResults: number = 0;
  requestPending : boolean = false;

  tmdbDao: TmdbDao;

  constructor(tmdbDao) {
    this.tmdbDao = tmdbDao;
  }

  queryChanged() {
    this.searchMovies(this.query);
  }

  currentPageChanged() {
    this.searchMovies(this.query, this.currentPage);
  }

  searchMovies(query: string, page: number = 1) {
    this.requestPending = true;
    this.tmdbDao.searchMovies(query, page)
      .then((data) => {
        this.requestPending = false;
        this.movies = data["movies"];
        this.numPages = data["numPages"];
        this.currentPage = data["currentPage"];
        this.totalResults = data["totalResults"];
      })
  }
}
