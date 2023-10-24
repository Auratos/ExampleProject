import { Injectable } from '@angular/core';
import axios from 'axios';
import { Category } from 'src/models/category';
import { Filter } from 'src/models/filter';
import { Product } from 'src/models/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  public async GetCategories() {
    return await axios.get('./assets/categories.json').then(
      result => {
        let allCategories: Category = {
          id: 0,
          name: 'All categories'
        };
        return [allCategories, ...result.data];
      }
    );
  }

  public async GetNomenclature(filter: Filter) {
    return await axios.get('./assets/nomenclature.json').then(
      result => {
        let res = result.data as Product[];
        if (filter != undefined) {
          res = res.filter(item => item.name?.toLowerCase().includes(filter.name != undefined ? filter.name.toLowerCase() : ''));
          if (filter.categoryId != undefined && filter.categoryId > 0) {
            res = res.filter(item => item.category == filter.categoryId);
          }
          if (filter.productIds.length > 0) {
            res = res.filter(item => filter.productIds.some(id => id == item.id));
          }
        }
        return res;
      }
    );
  }
}
