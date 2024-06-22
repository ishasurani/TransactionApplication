import { Component, OnInit } from '@angular/core';
import { Transaction, TransactionService } from '../transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, ReactiveFormsModule],
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.scss'
})
export class TransactionDetailComponent implements OnInit {
  transaction!: Transaction;
  date: string = '';
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private datePipe: DatePipe,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
      const id = +this.route.snapshot.paramMap.get('id')!;
      this.transactionService.getTransactionById(id).subscribe((data: Transaction) => {
        this.transaction = data;
        this.date = this.datePipe.transform(new Date(this.transaction.date), 'dd/MM/yyyy')!;
        this.createForm();
      });
    }

  createForm(): void {
    this.form = this.fb.group({
      comments: [this.transaction.Comments, [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9 ]*')
      ]]
    })
  }

  back(): void {
    this.router.navigate(['/transaction']);
  }

  submit(): void {
    this.transaction.Comments = this.form.value.comments;
    this.transactionService.updateTransaction(this.transaction).subscribe((data: Transaction) => {
      this.transaction = data;
      this.router.navigate(['/transaction']);
    });
  }
}
