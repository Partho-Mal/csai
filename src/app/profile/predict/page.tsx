"use client";
import { useState } from "react";

export default function PredictForm() {
  const [inputData, setInputData] = useState({
    feature1: "",
    feature2: "",
    feature3: "",
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    
    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      });

      if (!res.ok) throw new Error("Prediction failed");

      const data = await res.json();
      setPrediction(data.prediction);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h1>Prediction Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Feature 1"
          value={inputData.feature1}
          onChange={(e) => setInputData({ ...inputData, feature1: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Feature 2"
          value={inputData.feature2}
          onChange={(e) => setInputData({ ...inputData, feature2: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Feature 3"
          value={inputData.feature3}
          onChange={(e) => setInputData({ ...inputData, feature3: e.target.value })}
          required
        />
        <button type="submit">Predict</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {prediction !== null && <p>Prediction: {prediction}</p>}
    </div>
  );
}
