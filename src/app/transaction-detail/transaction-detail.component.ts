import { Component, OnInit } from '@angular/core';
import { Transaction, TransactionService } from '../transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.scss'
})
export class TransactionDetailComponent implements OnInit {
  transaction!: Transaction;
  date: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
      const id = +this.route.snapshot.paramMap.get('id')!;
      this.transactionService.getTransactionById(id).subscribe((data: Transaction) => {
        this.transaction = data
        this.date = this.datePipe.transform(new Date(this.transaction.date), 'dd/MM/yyyy')!;
      });
    }

  back(): void {
    this.router.navigate(['/transaction']);
  }

  submit(): void {
    this.transactionService.updateTransaction(this.transaction).subscribe((data: Transaction) => {
      this.transaction = data;
      this.router.navigate(['/transaction']);
    });
  }
}
