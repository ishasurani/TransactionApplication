import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface Transaction {
  id: String,
  date: number,
  Comments: String,
  status: String,
}

@Injectable({
  providedIn: 'root'
})

export class TransactionService {
    private apiUrl = 'http://localhost:3000/transactions';

    constructor(private http: HttpClient) {}

    getTransactionById(id: number) {
        return this.http.get<Transaction>(`${this.apiUrl}/${id}`)
      }

    getTransactions(startDate: number, endDate: number) {
        return this.http.get<any[]>(`${this.apiUrl}/${startDate}/${endDate}`);

    }

    updateTransaction(transaction: Transaction) {
      return this.http.put<any>(`${this.apiUrl}/${transaction.id}`, transaction);
    }
}