import { TmdbDao } from './TmdbDao';
import { inject, bindable, computedFrom } from 'aurelia-framework';

@inject(TmdbDao)
export class App {
  movies: object[];
  @bindable query: string = "The Force Awakens";
  @bindable currentPage: number = 1;
  numPages: number = 1;
  totalResults: number = 0;
  requestPending: boolean = false;
  selectedMovie: number = undefined;

  tmdbDao: TmdbDao;

  constructor(tmdbDao) {
    this.tmdbDao = tmdbDao;
    this.searchMovies(this.query);
  }

  @computedFrom('selectedMovie', 'movies')
  get getBackground() {
      if (this.selectedMovie !== undefined) {
          return {
                  'background-image': 'url(https://image.tmdb.org/t/p/w1280' + this.movies[this.selectedMovie]["backdrop_path"] + ")"
              };
      }
      else {
          return {}
      }
  }

  queryChanged() {
    this.searchMovies(this.query);
  }

  currentPageChanged() {
    this.searchMovies(this.query, this.currentPage);
  }

  searchMovies(query: string, page: number = 1) {
    this.requestPending = true;
    document.body.scrollTop = 0;
    this.tmdbDao.searchMovies(query, page)
      .then((data) => {
        if(data["totalResults"] === 0) {
          this.selectedMovie = undefined;
        }
        else {
          this.selectedMovie = 0;
        }
        this.requestPending = false;
        this.movies = data["movies"];
        this.numPages = data["numPages"];
        this.currentPage = data["currentPage"];
        this.totalResults = data["totalResults"];
      })
  }
}