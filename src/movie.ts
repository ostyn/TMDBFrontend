import { bindable } from 'aurelia-framework';
export class Movie {
    @bindable movieData: object;
    @bindable selected: boolean;
}