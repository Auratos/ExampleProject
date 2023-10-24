import { Action } from "@ngrx/store";

export interface ProductState {
  productIds: number[]
}
   
export const GET_PRODUCT_LIST = '[Product] GET_PRODUCT_LIST';
export const ADD_PRODUCT = '[Product] ADD_PRODUCT';
export const DELETE_PRODUCT = '[Product] DELETE_PRODUCT';

export class GetProducts implements Action {
  readonly type = GET_PRODUCT_LIST;
}

export class AddProduct implements Action {
  readonly type = ADD_PRODUCT;

  constructor(public payload: number) { }
}

export class DeleteProduct implements Action {
  readonly type = DELETE_PRODUCT;

  constructor(public payload: number) { }
}

export type ProductActionUnion = GetProducts | AddProduct | DeleteProduct;