import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Transaction, TransactionService } from '../transaction.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss'
})
export class TransactionListComponent {
  transactions: Transaction[] = [];
  start = 1000000000000;
  end = 2000000000000;


  constructor(private transactionService: TransactionService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.transactionService.getTransactions(this.start, this.end).subscribe((data: Transaction[]) => this.transactions = data)
  }

  formatDate(date: any): string {
    return this.datePipe.transform(new Date(date), 'dd/MM/yyyy')!;
}
}
