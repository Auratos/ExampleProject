import { CategoryState } from './actions/category.actions';
import { ActionReducerMap } from '@ngrx/store';
import { CategoryReducer } from './reducers/category.reducer';
import { ProductReducer } from './reducers/product.reducer';
import { ProductState } from './actions/product.actions';

export const rootReducer = {};

export interface AppState {
  categories: CategoryState;
  products: ProductState;
};

export const reducers: ActionReducerMap<AppState, any> = {
  categories: CategoryReducer,
  products: ProductReducer
};