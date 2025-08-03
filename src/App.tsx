import React, { useEffect, useState } from "react";
import type { Chart } from "./types/chart.types";
import ChartContainer from "./components/chart/ChartContainer";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import ErrorMessage from "./components/errors/ErrorMessage";
import styles from "./App.module.css";
import chartData from "./data/data.json";
import { convertChart } from "./utils/chartHelpers";

const App: React.FC = () => {
  const [charts, setCharts] = useState<Chart[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const convertedCharts: Chart[] = chartData.map(convertChart);

      setCharts(convertedCharts);

      setLoading(false);
    } catch {
      setError("Error loading data");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>D3.js Chart Viewer</h1>
      <div className={styles.chartsContainer}>
        {charts.map((chart, index) => (
          <ChartContainer key={index} chart={chart} />
        ))}
      </div>
    </div>
  );
};

export default App;
