import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from 'src/components/cart/cart.component';
import { NomenclatureComponent } from 'src/components/nomenclature/nomenclature.component';
import { PageNotFoundComponent } from 'src/components/page-not-found/page-not-found.component';
import { SearchComponent } from 'src/components/search/search.component';

const routes: Routes = [
  { path: 'products', title: 'Каталог товаров', component: NomenclatureComponent },
  { path: 'search', title: 'Поиск товаров', component: SearchComponent },
  { path: 'cart', title: 'Корзина', component: CartComponent },
  { path: '',   redirectTo: '/products', pathMatch: 'full' },
  { path: '**', title: '404 Страница не найдена', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }