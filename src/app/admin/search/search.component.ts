import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { SearchService } from 'src/app/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResults: Product[] = [];

  constructor(private searchResultsService: SearchService) { }

  ngOnInit(): void {
    this.searchResultsService.searchResults$.subscribe(results => {
      this.searchResults = results;
    });
  }
}
