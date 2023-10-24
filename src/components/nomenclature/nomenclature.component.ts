import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Store, select } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import { Filter } from 'src/models/filter';
import { Product } from 'src/models/product';
import { ApiService } from 'src/service/api.service';
import { CategoryState, GET_SELECTED_CATEGORY } from 'src/store/actions/category.actions';

@Component({
  selector: 'app-nomenclature',
  templateUrl: './nomenclature.component.html',
  styleUrls: ['./nomenclature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NomenclatureComponent implements OnInit, OnDestroy {
  public products: Product[];
  public categoryStore$: Observable<CategoryState>;
  public categorySubscription: Subscription = new Subscription();

  constructor(private router: Router, 
              private apiService: ApiService, 
              private store: Store<any>,
              private changeDetector: ChangeDetectorRef) {
    this.products = [];
    this.categoryStore$ = store.pipe(select('categories'));
  }

  ngOnInit(): void {
    let categoryAction: Action = {
      type: GET_SELECTED_CATEGORY
    };
    this.categorySubscription = this.categoryStore$.pipe(map(x => x.categoryId)).subscribe({
        next: (n) => this.FilterProductsByCategory(n),
        error: (e) => console.error(e)
      }
    );
    this.store.dispatch(categoryAction);
  }

  public FilterProductsByCategory(categoryId: number): void {
    let filter = new Filter();
    filter.categoryId = categoryId;
    this.apiService.GetNomenclature(filter).then(
      result => {
        this.products = result;
        this.changeDetector.detectChanges();
      }
    );
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
  }
}