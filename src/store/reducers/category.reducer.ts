import { CategoryActionUnion, CategoryState, GET_SELECTED_CATEGORY, UPDATE_SELECTED_CATEGORY } from '../actions/category.actions';

export const initialState: CategoryState = {
  categoryId: 0
};
 
export function CategoryReducer(state: CategoryState = initialState, action: CategoryActionUnion): CategoryState {
  switch (action.type) {
    case GET_SELECTED_CATEGORY:            
      return state;

    case UPDATE_SELECTED_CATEGORY:
      return action.payload;

    default:
      return state;
  }
}