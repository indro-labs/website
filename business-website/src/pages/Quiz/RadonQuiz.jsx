import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./RadonQuiz.css";

const questions = [
  {
    question: "Has your home ever been tested for radon?",
    options: [
      { text: "Yes, within the last 2 years", score: 0 },
      { text: "Yes, but more than 2 years ago", score: 1, factor: "Older radon test result" },
      { text: "No, never tested", score: 3, factor: "Home has never been tested" },
      { text: "Not sure", score: 2, factor: "Unknown radon testing history" },
    ],
  },
  {
    question: "Does your home have a basement or lower-level living space?",
    options: [
      { text: "Yes, and we use it often", score: 3, factor: "Basement or lower-level living space" },
      { text: "Yes, but we rarely use it", score: 2, factor: "Basement or lower-level space" },
      { text: "No basement or lower level", score: 0 },
    ],
  },
  {
    question: "What type of area is your home in?",
    options: [
      { text: "Dense urban area", score: 0 },
      { text: "Suburban area", score: 1, factor: "Suburban location" },
      { text: "Small town", score: 2, factor: "Small town location" },
      { text: "Rural area", score: 3, factor: "Rural location" },
    ],
  },
  {
    question: "Have nearby homes or neighbours ever tested high for radon?",
    options: [
      { text: "Yes", score: 4, factor: "Nearby homes have tested high" },
      { text: "No", score: 0 },
      { text: "Not sure", score: 1, factor: "Unknown neighbourhood radon history" },
    ],
  },
  {
    question: "Do you use well water at home?",
    options: [
      { text: "Yes", score: 3, factor: "Well water use" },
      { text: "No", score: 0 },
      { text: "Not sure", score: 1, factor: "Unsure about well water" },
    ],
  },
];

function getResult(score, factors) {
  if (score <= 2) {
    return {
      title: "The Fresh-Air Optimist",
      level: "Low Concern",
      emoji: "🟢",
      message:
        "Your home does not show many common radon warning signs. However, radon cannot be predicted by home characteristics alone.",
      recommendation:
        "A long-term radon test is still the only way to know your home's actual radon level.",
      factors,
    };
  }

  if (score <= 5) {
    return {
      title: "The Curious Homeowner",
      level: "Worth Checking",
      emoji: "🟡",
      message:
        "Your home has some characteristics associated with elevated radon levels or has not been recently tested.",
      recommendation:
        "Testing is recommended, especially if your home has never been tested before.",
      factors,
    };
  }

  if (score <= 9) {
    return {
      title: "The Basement Explorer",
      level: "Strongly Recommend Testing",
      emoji: "🟠",
      message:
        "Your home shares several characteristics commonly seen in homes where radon testing should be prioritized.",
      recommendation: "A long-term radon test would be a smart next step.",
      factors,
    };
  }

  return {
    title: "The Radon Detective",
    level: "Testing Should Be a Priority",
    emoji: "🔴",
    message:
      "Your answers suggest multiple indicators commonly associated with elevated radon levels.",
    recommendation:
      "Testing should be a priority to understand your home's actual radon level.",
    factors,
  };
}

export default function RadonQuiz() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [factors, setFactors] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const startQuiz = () => {
    setStarted(true);
  };

  const handleAnswer = (option) => {
    const newScore = score + option.score;
    const newFactors = option.factor ? [...factors, option.factor] : factors;

    if (currentQuestion + 1 < questions.length) {
      setScore(newScore);
      setFactors(newFactors);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScore(newScore);
      setFactors(newFactors);
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setFactors([]);
    setShowResult(false);
  };

  const result = getResult(score, factors);
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (!started) {
    return (
      <>
        <NavBar />

        <main className="radon-quiz-page">
          <section className="quiz-start-card">
            <div className="start-badge">Radon Risk Quiz</div>

            <div className="radon-orb">
              <span></span>
            </div>

            <h1>Could your home be at risk for radon?</h1>

            <p className="start-intro">
              Radon is an invisible, odourless radioactive gas that can build up
              inside homes. Long-term exposure is the leading cause of lung cancer
              in non-smokers.
            </p>

            <div className="radon-facts">
              <div>
                <strong>1 in 6</strong>
                <span>Alberta homes may have dangerous radon levels</span>
              </div>

              <div>
                <strong>#1</strong>
                <span>Leading cause of lung cancer in non-smokers</span>
              </div>

              <div>
                <strong>90+ days</strong>
                <span>Recommended long-term testing period</span>
              </div>
            </div>

            <p className="start-note">
              Answer 5 quick questions to see whether radon testing should be a
              priority for your home.
            </p>

            <button className="primary-button start-button" onClick={startQuiz}>
              Start Quiz
            </button>

            <p className="start-disclaimer">
              This quiz does not measure your actual radon level. The only way to
              know is to complete a proper long-term radon test.
            </p>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <NavBar />

      <main className="radon-quiz-page">
        <section className="quiz-hero">
          <p className="eyebrow">Radon Risk Quiz</p>
          <h1>Could your home be at higher risk for radon?</h1>
          <p>
            Answer 5 quick questions to see whether radon testing should be a
            priority for your home.
          </p>
        </section>

        <section className="quiz-card">
          {!showResult ? (
            <>
              <div className="progress-bar">
                <div style={{ width: `${progress}%` }} />
              </div>

              <p className="question-count">
                Question {currentQuestion + 1} of {questions.length}
              </p>

              <h2>{questions[currentQuestion].question}</h2>

              <div className="answer-grid">
                {questions[currentQuestion].options.map((option) => (
                  <button key={option.text} onClick={() => handleAnswer(option)}>
                    {option.text}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="result-box">
              <div className="result-icon">{result.emoji}</div>

              <p className="result-label">{result.level}</p>
              <h2>{result.title}</h2>

              <p>{result.message}</p>

              {result.factors.length > 0 && (
                <>
                  <h3>What contributed to your result?</h3>
                  <ul className="factor-list">
                    {result.factors.map((factor) => (
                      <li key={factor}>✓ {factor}</li>
                    ))}
                  </ul>
                </>
              )}

              <p className="recommendation">
                <strong>{result.recommendation}</strong>
              </p>

              <div className="disclaimer">
                This quiz does not measure your actual radon level. Radon levels
                can vary significantly between homes, even within the same
                neighbourhood. The only reliable way to know your home's radon
                level is through long-term testing.
              </div>

              <button className="primary-button" onClick={restartQuiz}>
                Retake Quiz
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}