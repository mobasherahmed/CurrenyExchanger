import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConverterComponent } from './components/converter/converter.component';
import { CurrencyDeatilsComponent } from './components/currency-deatils/currency-deatils.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/converter',
      pathMatch: 'full',
  },
  { path: 'converter', component: ConverterComponent},
  { path: 'details/:from/:to/:amount', component: CurrencyDeatilsComponent},
  { path: '**', redirectTo: 'converter' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
