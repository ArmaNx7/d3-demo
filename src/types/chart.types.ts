export type SingleSeriesDataPoint = [number, number | null];
export type SingleSeriesChart = {
  title: string;
  data: SingleSeriesDataPoint[];
};

export type MultiSeriesDataPoint = [
  number,
  [number | null, number | null, number | null] | null
];
export type MultiSeriesChart = {
  title: string;
  data: MultiSeriesDataPoint[];
};

export type Chart = SingleSeriesChart | MultiSeriesChart;

export type ChartType = "single" | "multi";
