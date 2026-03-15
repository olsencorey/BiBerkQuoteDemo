# BiBerk Quote Demo – Workers Comp & BOP

A small-business insurance quote demo that mirrors a biBerk-style, cloud-first, API-driven platform.

It includes:

- A C# ASP.NET Core Web API that calculates:
  - Workers’ Compensation premiums (payroll, class codes, state mods, experience mods)
  - Business Owner’s Policy (BOP) premiums (industry, revenue, property values, location risk)
- An Angular UI that lets a user toggle between Workers Comp and BOP and get instant quotes.

This project is designed as a portfolio piece to demonstrate API design, domain modeling, and full-stack implementation for commercial insurance.

---

## Tech Stack

- **Backend:** .NET 8 / ASP.NET Core Web API
- **Frontend:** Angular (standalone components, reactive forms)
- **Data / Logic:** In-memory rating logic (no external DB), C# services
- **Tooling:** Swagger/OpenAPI for API testing, HttpClient from Angular, CORS for local dev

---

## Domain Overview

### Workers’ Compensation

The Workers Comp quote endpoint estimates annual premium based on common rating inputs:

- **Industry class:** `office`, `construction`, `retail`  
- **Annual payroll:** e.g. `100000`  
- **State:** e.g. `PA`, `CA`  
- **Experience Mod:** rating factor around `1.0`  

Formula (simplified for demo):

> base premium = (payroll / 100) × class rate  
> workers comp premium = base premium × state modifier × experience mod

This mirrors real-world workers’ comp rating patterns where premiums depend on payroll, class code loss cost, state factors, and ex-mod.[web:33][web:34]

### Business Owner’s Policy (BOP)

The BOP quote endpoint estimates annual premium for a bundled property & liability package for small businesses.[web:100][web:105]

Inputs:

- **Industry:** `office`, `retail`, `contractor`
- **Annual revenue**
- **Building value**
- **Contents value** (equipment, inventory, etc.)
- **Location risk:** `low`, `medium`, `high`

Formula (simplified):

- Property premium ≈ percentage of `building + contents`
- Liability premium ≈ percentage of `annual revenue`
- Business income ≈ small percentage of `annual revenue`
- Location risk modifier adjusts the subtotal (low/medium/high)

This structure mimics how BOP pricing combines property, liability, and business income components.[web:100][web:118]

---

## Running the Backend (API)

### Prerequisites

- .NET 8 SDK installed

### Steps

From the API project folder (where `BiBerkQuoteAPI.csproj` lives):

```bash
dotnet restore
dotnet build
dotnet run
