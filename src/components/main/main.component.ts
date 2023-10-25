import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Store, select } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import { Category } from 'src/models/category';
import { ApiService } from 'src/service/api.service';
import { CategoryState, UPDATE_SELECTED_CATEGORY, UpdateCategory } from 'src/store/actions/category.actions';
import { GET_PRODUCT_LIST, ProductState } from 'src/store/actions/product.actions';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, OnDestroy {
  public categories: Category[];
  public selectedCategory$: Observable<CategoryState>;
  public selectedCategory: number;
  public selectedProductCount: number;
  public productStore$: Observable<ProductState>;
  public productSubscription: Subscription = new Subscription();

  constructor(private router: Router, private apiService: ApiService, private store: Store<any>) {
    this.categories = [];
    this.selectedCategory = 0;
    this.selectedProductCount = 0;
    this.selectedCategory$ = store.pipe(select('categories'));
    this.productStore$ = store.pipe(select('products'));
  }

  ngOnInit(): void {
    this.GetCategoryArray();
    this.productSubscription = this.productStore$.pipe(map(x => x.productIds)).subscribe({
        next: (n) => this.selectedProductCount = n.length,
        error: (e) => console.error(e)
      }
    );
  }  

  public GetCategoryArray() {
    this.apiService.GetCategories().then(
      result => {
        this.categories = result;
        this.selectedCategory = this.categories[0].id;
      }
    );
  }

  public ChangeCategory(categoryId: number): void {
    this.selectedCategory = categoryId;
    let categoryAction: UpdateCategory = {
      type: UPDATE_SELECTED_CATEGORY,
      payload: { categoryId: categoryId }
    }
    this.store.dispatch(categoryAction);
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }
}