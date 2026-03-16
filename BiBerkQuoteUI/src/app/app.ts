import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

type QuoteResponse = {
  annualPremium: number;
  breakdown: Record<string, number>;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.html',
})
export class App {
  activeTab: 'workerscomp' | 'bop' = 'workerscomp';

  wcRequest = { industry: '', payroll: 0, state: '', experienceMod: 1.0 };
  wcResult: QuoteResponse | null = null;

  bopRequest = { industry: '', annualRevenue: 0, buildingValue: 0, contentsValue: 0, locationRisk: '' };
  bopResult: QuoteResponse | null = null;

  loading = false;
  errorMessage = '';

  private apiBase = 'http://localhost:5205/api/quotes';

  constructor(private http: HttpClient) {}

  calculateWorkersComp(): void {
    this.loading = true;
    this.errorMessage = '';
    this.wcResult = null;
    const url = this.apiBase + '/workerscomp';
    this.http.post<QuoteResponse>(url, this.wcRequest).subscribe({
      next: (res) => {
        this.wcResult = res;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error: ' + err.message;
        this.loading = false;
      }
    });
  }

  calculateBop(): void {
    this.loading = true;
    this.errorMessage = '';
    this.bopResult = null;
    const url = this.apiBase + '/bop';
    this.http.post<QuoteResponse>(url, this.bopRequest).subscribe({
      next: (res) => {
        this.bopResult = res;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error: ' + err.message;
        this.loading = false;
      }
    });
  }

  get wcBreakdownKeys(): string[] {
    return this.wcResult ? Object.keys(this.wcResult.breakdown) : [];
  }

  get bopBreakdownKeys(): string[] {
    return this.bopResult ? Object.keys(this.bopResult.breakdown) : [];
  }
}
