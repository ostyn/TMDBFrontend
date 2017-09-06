import {HttpClient} from 'aurelia-fetch-client';
import {inject, bindable} from 'aurelia-framework'
@inject(HttpClient)
export class App {
  movies : object [];
  http : HttpClient;
  apiKey : string = "500ea8259cebb337641f2a3500bc8dd8";
  @bindable query : string = "";
  pages : number = 1;
  totalResults : number = 0;
  @bindable currentPage : number = 1;
  constructor(httpClient) {
    this.http = httpClient;
    this.http.baseUrl = "https://api.themoviedb.org/3/";
  }
  activate(params) {
  }
  queryChanged() {
    this.searchMovies(this.query);
  }
  changePage(num){
    this.searchMovies(this.query, num);
  }
  getMovie(movieId : number) : Promise<object> {
    return this.http.fetch(`movie/${movieId}?api_key=${this.apiKey}`)
      .then(response => {
          if(response.status > 400)
              throw response;
          return response.json();
      })
      .then((data)=>{
        return data;
      })
      .catch((err)=>{
        console.log(`error: ${err}`);
        return err;
      });
  }
  searchMovies(query : string, page : number = 1) : Promise<object> {
    return this.http.fetch(`search/movie?query=${query}&api_key=${this.apiKey}&page=${page}`)
      .then(response => {
          if(response.status > 400)
              throw response;
          return response.json();
      })
      .then((data)=>{
        this.movies = data["results"];
        this.pages = data["total_pages"];
        this.currentPage = data["page"];
        this.totalResults = data["total_results"];
      })
      .catch((err)=>{
        console.log(`error: ${err}`);
        return err;
      });
  }
}
