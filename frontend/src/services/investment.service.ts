import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define interfaces based on the API contract
export interface InvestmentRequest {
  investedIncome: number;
  termInMonths: number;
}

export interface InvestmentResponse {
  message: string | null;
  success: boolean;
  grossIncome: number;
  netIncome: number;
}

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  private readonly apiUrl = 'api/CdbInvestimentApi/process-investment';

  constructor(private http: HttpClient) { }

  processInvestment(request: InvestmentRequest): Observable<InvestmentResponse> {
    return this.http.post<InvestmentResponse>(this.apiUrl, request);
  }
}