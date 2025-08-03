import React, { useEffect, useState } from "react";
import type {
  SingleSeriesDataPoint,
  Chart,
  MultiSeriesDataPoint,
} from "../../types/chart.types";
import { detectChartType } from "../../utils/chartHelpers";
import SingleSeriesChart from "./SingleSeries";
import MultiSeriesChart from "./MultiSeries";
import styles from "./ChartContainer.module.css";

interface ChartContainerProps {
  chart: Chart;
}

const CHART_CONFIG = {
  width: 800,
  height: 400,
  margin: { top: 20, right: 30, bottom: 40, left: 50 },
};

const ChartContainer: React.FC<ChartContainerProps> = ({ chart }) => {
  const [singleChartData, setSingleChartData] = useState<
    SingleSeriesDataPoint[]
  >([]);

  const [multiChartData, setMultiChartData] = useState<MultiSeriesDataPoint[]>(
    []
  );

  const [chartType, setChartType] = useState<"single" | "multi" | undefined>(
    undefined
  );

  useEffect(() => {
    const chartType = detectChartType(chart.data);

    if (chartType === "single") {
      setSingleChartData(chart.data as SingleSeriesDataPoint[]);
      setMultiChartData([]);
    } else {
      setMultiChartData(chart.data as MultiSeriesDataPoint[]);
      setSingleChartData([]);
    }

    setChartType(chartType);
  }, [chart.data]);

  if (!chartType) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{chart.title}</h2>
      {chartType === "single" ? (
        <SingleSeriesChart
          data={singleChartData}
          width={
            CHART_CONFIG.width -
            CHART_CONFIG.margin.left -
            CHART_CONFIG.margin.right
          }
          height={
            CHART_CONFIG.height -
            CHART_CONFIG.margin.top -
            CHART_CONFIG.margin.bottom
          }
          margin={CHART_CONFIG.margin}
        />
      ) : (
        <MultiSeriesChart
          data={multiChartData}
          width={
            CHART_CONFIG.width -
            CHART_CONFIG.margin.left -
            CHART_CONFIG.margin.right
          }
          height={
            CHART_CONFIG.height -
            CHART_CONFIG.margin.top -
            CHART_CONFIG.margin.bottom
          }
          margin={CHART_CONFIG.margin}
        />
      )}
    </div>
  );
};

export default ChartContainer;
