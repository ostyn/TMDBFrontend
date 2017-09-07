import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class TmdbDao {
    http : HttpClient;
    apiKey : string = "500ea8259cebb337641f2a3500bc8dd8";

    constructor(httpClient){
        this.http = httpClient;
        this.http.baseUrl = "https://api.themoviedb.org/3/";
    }
    searchMovies(query : string, page : number = 1) : Promise<object> {
        if(query === "" || query === undefined) {
            return Promise.resolve({
                'movies' : [],
                'currentPage' : 1,
                'numPages' : 1,
                'totalResults' : 0
            });
        }
        return this.http.fetch(`search/movie?query=${query}&api_key=${this.apiKey}&page=${page}`)
          .then(response => {
              if(response.status > 400)
                  throw response;
              return response.json();
          })
          .then((data)=>{
            return {
                'movies' : data["results"],
                'currentPage' : data["page"],
                'numPages' : data["total_pages"],
                'totalResults' : data["total_results"]
            };
          })
          .catch((err)=>{
            console.log(`error: ${err}`);
            return err;
          });
      }
}