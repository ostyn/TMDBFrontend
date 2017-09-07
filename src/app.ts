import { TmdbDao } from './TmdbDao';
import { inject, bindable, computedFrom } from 'aurelia-framework';

@inject(TmdbDao)
export class App {
  movies: object[];
  @bindable query: string = "";
  @bindable currentPage: number = 1;
  numPages: number = 1;
  totalResults: number = 0;
  requestPending: boolean = false;
  selectedMovie: number = undefined;

  tmdbDao: TmdbDao;

  constructor(tmdbDao) {
    this.tmdbDao = tmdbDao;
  }

  @computedFrom('selectedMovie', 'movies')
  get getBackground() {
      if (this.selectedMovie !== undefined) {
          return {
                  'background-image': 'url(https://image.tmdb.org/t/p/w1280' + this.movies[this.selectedMovie]["backdrop_path"] + ")",
                  'opacity': '0.5'
              };
      }
      else {
          return {}
      }
  }

  queryChanged() {
    this.searchMovies(this.query);
    this.selectedMovie = 0;
  }

  currentPageChanged() {
    this.searchMovies(this.query, this.currentPage);
    this.selectedMovie = 0;
  }

  selectMovie(index) {
    if (this.selectedMovie == index) {
      this.selectedMovie = undefined;
    }
    else {
      this.selectedMovie = index;
    }
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
