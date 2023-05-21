import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConverterComponent } from './components/converter/converter.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/converter',
      pathMatch: 'full',
  },
  { path: 'converter', component: ConverterComponent},
  { path: '**', redirectTo: 'converter' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
