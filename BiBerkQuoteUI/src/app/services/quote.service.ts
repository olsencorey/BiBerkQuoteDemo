import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface QuoteRequest {
  industry: string;
  payroll: number;
  state: string;
  experienceMod?: number;
}

interface QuoteResponse {
  annualPremium: number;
  breakdown: { [key: string]: number };
}

export interface BopQuoteRequest {
  industry: string;
  annualRevenue: number;
  buildingValue: number;
  contentsValue: number;
  locationRisk: string; // 'low' | 'medium' | 'high'
}

export interface BopQuoteResponse {
  annualPremium: number;
  breakdown: { [key: string]: number };
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private apiUrl = 'http://localhost:5205/api/quotes';

  constructor(private http: HttpClient) { }

  calculateWorkersComp(req: QuoteRequest): Observable<QuoteResponse> {
    return this.http.post<QuoteResponse>(`${this.apiUrl}/workerscomp`, req);
  }
  calculateBop(req: BopQuoteRequest): Observable<BopQuoteResponse> {
    return this.http.post<BopQuoteResponse>(`${this.apiUrl}/bop`, req);
  }
}
