# Sequence Alignment Engine

> *"To ascend is to risk. Every Sequence is a cage — and the door only opens inward."*

A full-stack psychological alignment quiz inspired by *Lord of the Mysteries* by Cuttlefish That Loves Diving. Answer 20 questions drawn from a weighted pool of 40, and discover which of the 8 Beyonder Pathways would most likely accept you.

Live demo → **[lotm-quiz.vercel.app](https://lotm-quiz.vercel.app)**

---

## What It Is

This is a fan-made project built as a medium-complexity full-stack web application. It is not a simple BuzzFeed-style quiz — it uses a weighted scoring matrix across 8 psychological trait dimensions to determine Pathway alignment. Results are stored in a database and aggregated to show live global statistics.

---

## Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Frontend | React + Vite | Component-based UI, fast dev server |
| Routing | React Router v6 | Client-side SPA navigation |
| HTTP client | Axios | API requests with clean error handling |
| Backend | Node.js + Express | Lightweight REST API |
| Database | MongoDB + Mongoose | Flexible document storage for quiz results |
| Frontend hosting | Vercel | GitHub integration, instant deploys |
| Backend hosting | Railway | Simple Node hosting with env var management |

---

## System Architecture
```
┌─────────────────────────────────────┐
│           React Frontend            │
│  IntroPage → Warning → Quiz →       │
│  Loading → ResultPage               │
│                                     │
│  Scoring runs locally in browser    │
│  (computeScores utility function)   │
└────────────┬───────────┬────────────┘
             │           │
     POST /submit    GET /distribution
             │           │
┌────────────▼───────────▼────────────┐
│         Express Backend             │
│  /api/quiz/submit                   │
│  /api/analytics/distribution        │
│  /api/analytics/total               │
└────────────────────┬────────────────┘
                     │
          ┌──────────▼──────────┐
          │    MongoDB Atlas     │
          │  results collection  │
          └─────────────────────┘
```

---

## How the Scoring Algorithm Works

Each question has a **weight** of 1, 2, or 3 indicating its psychological significance. The 40-question bank is stratified into tiers and 20 questions are randomly sampled per session (5 from weight-1, 8 from weight-2, 7 from weight-3).

Each answer option carries raw scores for one or more Pathways. The final score for a Pathway is:
```
pathway_score = Σ (option_raw_score × question_weight)
```

This means a weight-3 question contributes 3× more to the result than a weight-1 question. The total maximum score is equal across all quiz sessions regardless of which 20 questions are drawn, because the sampling is stratified by weight tier.

At the result stage, raw scores are normalized to percentages for display:
```
pathway_percentage = pathway_score / total_all_scores × 100
```

---
