import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Store, select } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import { Filter } from 'src/models/filter';
import { Product } from 'src/models/product';
import { ApiService } from 'src/service/api.service';
import { DELETE_PRODUCT, DeleteProduct, GET_PRODUCT_LIST, ProductState } from 'src/store/actions/product.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public products: Product[];
  public productCount: number;
  public cartSum: number;
  public productStore$: Observable<ProductState>;
  public productSubscription: Subscription = new Subscription();

  constructor(private router: Router, 
              private apiService: ApiService, 
              private store: Store<any>,
              private changeDetector: ChangeDetectorRef) {
    this.products = [];
    this.productCount = 0;
    this.cartSum = 0;
    this.productStore$ = store.pipe(select('products'));
  }

  ngOnInit(): void {
    this.productSubscription = this.productStore$.pipe(map(x => x.productIds)).subscribe({
        next: (n) => this.FilterProductsByIds(n),
        error: (e) => console.error(e)
      }
    );
  }

  public FilterProductsByIds(productIds: number[]): void {
    //this.router.navigate(['/search', { category: 1 }]);
    this.cartSum = 0;
    if (productIds.length > 0) {
      let filter = new Filter();
      filter.productIds = productIds;
      this.apiService.GetNomenclature(filter).then(
        result => {
          this.products = result;
          for (let product of this.products) {
            this.cartSum += product.price;
          }
          this.changeDetector.detectChanges();
        }
      );
    } else {
      this.products = [];
    }
  }

  public DeleteProductFromCart(productId: number): void {
    let categoryAction: DeleteProduct = {
      type: DELETE_PRODUCT,
      payload: productId
    };
    this.store.dispatch(categoryAction);
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }
}