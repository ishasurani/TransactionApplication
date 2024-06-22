import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Transaction, TransactionService } from '../transaction.service';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';


@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss'
})
export class TransactionListComponent {
  transactions: Transaction[] = [];
  start = -8640000000000000;
  end = 8640000000000000;


  constructor(private route: ActivatedRoute, private transactionService: TransactionService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((p: Params) => {
      const params = p['params']
      this.start = params['start']? +params['start'] : -8640000000000000; 
      this.end = params['end']? +params['end'] : 8640000000000000;
      this.transactionService.getTransactions(this.start, this.end).subscribe((data: Transaction[]) => this.transactions = data)
    });
  }

  formatDate(date: any): string {
    return this.datePipe.transform(new Date(date), 'dd/MM/yyyy')!;
  }
}
