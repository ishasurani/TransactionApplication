import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { AppRoutingModule } from './app.routes';
import { TransactionService } from './transaction.service';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, TransactionDetailComponent, TransactionListComponent, CommonModule, ReactiveFormsModule],
  providers: [TransactionService, provideHttpClient(), FormsModule, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}