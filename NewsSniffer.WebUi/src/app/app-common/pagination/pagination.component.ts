import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() itemsPerPage: number = 0;
  @Input() pageNumbers: number[] = [];
  
  currentPage!: number;
  lastPageNumber!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.lastPageNumber = this.pageNumbers.length != 1 ? this.pageNumbers[this.pageNumbers.length - 1] : 1;
    this.route.children[0].paramMap.subscribe(params => {
      this.currentPage = Number(params.get("id"));
    });
  }
  
  onNext(): void {
    this.route.url.pipe(map(segments => segments.join(''))).subscribe(url =>
      this.router.navigate([url, "page", this.currentPage < this.lastPageNumber
        ? this.currentPage + 1
        : this.lastPageNumber])
    );
  }

  onPrev(): void {
    this.route.url.pipe(map(segments => segments.join(''))).subscribe(url =>
      this.router.navigate([url, "page", this.currentPage > 1
        ? this.currentPage - 1
        : 1])
    );
  }

  onPageChange(): void {
    this.route.url.pipe(map(segments => segments.join(''))).subscribe(url => 
      this.router.navigate([url, "page", this.currentPage]));
  }
}
