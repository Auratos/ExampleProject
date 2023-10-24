import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/models/category';
import { Filter } from 'src/models/filter';
import { Product } from 'src/models/product';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public products: Product[];
  public categories: Category[];
  public selectedCategory: number;
  public filter: Filter;
  public nameStr?: string;
  public queryParams: {[k: string]: any} = {};

  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiService: ApiService,
              private changeDetector: ChangeDetectorRef) {
    this.products = [];
    this.categories = [];
    this.filter = new Filter();
  }

  ngOnInit(): void {
    this.GetCategoryArray();
  }

  public GetCategoryArray() {
    this.apiService.GetCategories().then(
      result => {
        this.categories = result;
        this.CheckFilterParams();
        this.changeDetector.detectChanges();
      }
    );
  }

  public CheckFilterParams(): void {
    let needUpdateProducts: boolean = false;
    let filterCategoryId = parseInt(localStorage.getItem('filterCategoryId') ?? '');
    let filterName = localStorage.getItem('filterName') ?? undefined;

    let result = this.route.snapshot.queryParamMap.get('category');
    this.selectedCategory = parseInt(result ?? '');
    this.nameStr = this.route.snapshot.queryParamMap.get('name') ?? undefined;

    if (this.selectedCategory != undefined && !Number.isNaN(this.selectedCategory)) {
      let result = this.categories.find(item => item.id === this.selectedCategory);
      this.filter.categoryId = result?.id;
      needUpdateProducts = true;
    } else if (filterCategoryId != undefined && !Number.isNaN(filterCategoryId)) {
      this.filter.categoryId = filterCategoryId;
    }
    this.filter.name = this.nameStr ?? filterName;
    if (needUpdateProducts || this.nameStr != undefined) {
      this.FilterProducts();
    }
  }

  public FilterProducts(): void {
    this.apiService.GetNomenclature(this.filter).then(
      result => {
        this.queryParams = {};
        if (this.filter.categoryId) {
          this.queryParams['category'] = this.filter.categoryId;
        }
        if (this.filter.name) {
          this.queryParams['name'] = this.filter.name;
        }
        this.router.navigate(['/search'], { queryParams: this.queryParams});
        this.products = result;
        this.changeDetector.detectChanges();
      }
    );
  }

  public SetCategory(): void {
    localStorage.setItem('filterCategoryId', JSON.stringify(this.filter.categoryId));
  }

  public SetName(): void {
    if (this.filter.name != undefined && this.filter.name != '') {
      localStorage.setItem('filterName', this.filter.name);
    } else {
      localStorage.removeItem('filterName');
    }
  }

  public ClearFilter(): void {
    this.filter = new Filter();
    this.products = [];
    this.router.navigate(['/search']);
    localStorage.clear();
  }
}