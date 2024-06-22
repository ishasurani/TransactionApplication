import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';

export const routes: Routes = [
    { path: 'transactions', component: TransactionListComponent},
    { path: 'transactions/:start/:end', component: TransactionListComponent},
    { path: 'transaction/:id', component: TransactionDetailComponent},
    { path: '**', redirectTo: '/transactions', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }