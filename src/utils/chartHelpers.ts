/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
  Chart,
  ChartType,
  MultiSeriesDataPoint,
  SingleSeriesDataPoint,
} from "../types/chart.types";

export const detectChartType = (data: Chart["data"]): ChartType => {
  for (const point of data) {
    if (point[1] !== null) {
      return Array.isArray(point[1]) ? "multi" : "single";
    }
  }
  return "single";
};

export const convertChart = (chart: any): Chart => {
  const type = detectChartType(chart.data);
  if (type === "single") {
    return {
      title: chart.title,
      data: chart.data as SingleSeriesDataPoint[],
    };
  } else {
    return {
      title: chart.title,
      data: chart.data as MultiSeriesDataPoint[],
    };
  }
};
