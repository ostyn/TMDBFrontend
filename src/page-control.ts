import { bindable } from 'aurelia-framework';
export class PageControl {
    @bindable currentPage: number;
    @bindable numPages: number;
    @bindable totalResults: number;
    @bindable disabled: boolean;
    changePage(num: number) {
        this.currentPage = num;
    }
}