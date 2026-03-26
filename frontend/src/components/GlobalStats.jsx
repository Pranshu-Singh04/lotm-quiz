import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { computeScores } from "../utils/scoring";
import { PATHWAYS } from "../data/pathways";

export default function ResultPage() {
  const location = useLocation();
  // QuizPage passed these through React Router navigation state
  const { selectedQuestions, answers } = location.state;

  const [globalStats, setGlobalStats] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // 1. Compute scores locally (same logic as your HTML file)
  const scores = computeScores(selectedQuestions, answers);

  // 2. Find the winner
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const winnerKey = sorted[0][0];
  const pathway = PATHWAYS[winnerKey];

  // 3. Send to backend + fetch global stats
  useEffect(() => {
    async function submitAndFetch() {
      try {
        // Submit this user's result
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/quiz/submit`,
          {
            pathway: winnerKey,
            scores: scores,
            questionIds: selectedQuestions.map(q => q.id),
            sessionId: crypto.randomUUID(),
          }
        );
        setSubmitted(true);

        // Fetch global distribution to show live stats
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/analytics/distribution`
        );
        setGlobalStats(res.data);

      } catch (err) {
        // Don't crash the result screen if backend is down
        console.error("Backend unavailable:", err);
      }
    }

    submitAndFetch();
  }, []); // runs once when page mounts

  return (
    <div className="result-screen">
      <h1>{pathway.name}</h1>
      <p>{pathway.sequence}</p>
      <p>{pathway.description}</p>

      {/* Live stats section — only shows once data loads */}
      {globalStats && <GlobalStats data={globalStats} userPathway={winnerKey} />}
    </div>
  );
}