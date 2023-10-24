import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Filter } from 'src/models/filter';
import { Product } from 'src/models/product';
import { ApiService } from 'src/service/api.service';
import { ADD_PRODUCT, AddProduct } from 'src/store/actions/product.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[] = [];

  constructor(private store: Store<any>,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  public AddProductToCart(productId: number): void {
    let categoryAction: AddProduct = {
      type: ADD_PRODUCT,
      payload: productId
    };
    this.store.dispatch(categoryAction);
  }
}