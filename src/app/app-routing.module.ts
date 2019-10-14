import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { AppComponent } from './app.component';
import { BankGridComponent } from './bank-grid/bank-grid.component';

const routes: Routes = [
  { path: '', component: BankGridComponent},
  { path: 'banks/:id', component: BankDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
