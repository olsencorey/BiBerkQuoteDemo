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

    this.http.post<QuoteResponse>(`${this.apiBase}/workerscomp`, this.wcRequest)
      .subscribe({
        next: res => {
          this.wcResult = res;
          this.loading = false;
        },
        error: err => {
          this.errorMessage = 'Workers Comp error: ' + err.message;
          this.loading = false;
        }
      });
  }

  calculateBop(): void {
    this.loading = true;
    this.errorMessage = '';
    this.bopResult = null;

    this.http.post<QuoteResponse>(`${this.apiBase}/bop`, this.bopRequest)
      .subscribe({
        next: res => {
          this.bopResult = res;
          this.loading = false;
        },
        error: err => {
          this.errorMessage = 'BOP error: ' + err.message;
          this.loading = false;
        }
      });
  }

  get breakdownKeys(): string[] {
    const result = this.activeTab === 'workerscomp' ? this.wcResult : this.bopResult;
    return result ? Object.keys(result.breakdown) : [];
  }
}
