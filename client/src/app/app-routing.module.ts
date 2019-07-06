import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewPieComponent } from './pages/pie/new-pie/new-pie.component';
import { ListPiesComponent } from './pages/pie/list-pies/list-pies.component';

const routes: Routes = [
  { path: 'newpie', component: NewPieComponent },
  { path: 'pies', component: ListPiesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
