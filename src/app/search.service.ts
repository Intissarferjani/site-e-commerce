import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _searchResults: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  readonly searchResults$: Observable<Product[]> = this._searchResults.asObservable();

  constructor() { }

  updateSearchResults(results: Product[]): void {
    this._searchResults.next(results);
  }
}
