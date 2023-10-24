import { Action } from '@ngrx/store';

export interface CategoryState {
  categoryId: number
}
 
export const GET_SELECTED_CATEGORY = '[Category] GET_SELECTED_CATEGORY';
export const UPDATE_SELECTED_CATEGORY = '[Category] UPDATE_SELECTED_CATEGORY';

export class GetCategory implements Action {
  readonly type = GET_SELECTED_CATEGORY;
}

export class UpdateCategory implements Action {
  readonly type = UPDATE_SELECTED_CATEGORY;

  constructor(public payload: CategoryState) { }
}

export type CategoryActionUnion = GetCategory | UpdateCategory;