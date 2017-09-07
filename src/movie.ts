import { bindable } from 'aurelia-framework';
export class Movie {
    @bindable movieData: object;
    @bindable selectedMovie: number;
    @bindable id: number;
    selectMovie (){
        if(this.selectedMovie == this.id){
            this.selectedMovie = undefined;
        }
        else {
            this.selectedMovie = this.id;
        }
    }
    get getMovieCoverTitle() {
        return (this.selectedMovie == this.id) ? "Close": "";
    }
}