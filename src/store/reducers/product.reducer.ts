import { GET_PRODUCT_LIST, ProductActionUnion, ProductState, ADD_PRODUCT, DELETE_PRODUCT } from "../actions/product.actions";

export const initialState: ProductState = {
  productIds: []
};
  
export function ProductReducer(state: ProductState = initialState, action: ProductActionUnion): ProductState {
  switch (action.type) {
    case GET_PRODUCT_LIST:            
      return state;

    case ADD_PRODUCT:
      if (state.productIds.length != 0 && state.productIds.some(id => id == action.payload)) {
        return state;
      } else {
        return { productIds: [...state.productIds, action.payload] };
      }

    case DELETE_PRODUCT:
      if (state.productIds.length != 0 && state.productIds.some(id => id == action.payload)) {
        return { productIds: state.productIds.filter(id => id != action.payload) };
      } else {
        return state;
      }

    default:
      return state;
  }
}