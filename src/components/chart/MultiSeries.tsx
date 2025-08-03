import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { MultiSeriesDataPoint } from "../../types/chart.types";
import styles from "./MultiSeriesChart.module.css";

interface MultiSeriesChartProps {
  data: MultiSeriesDataPoint[];
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
}

const MultiSeriesChart: React.FC<MultiSeriesChartProps> = ({
  data,
  width,
  height,
  margin,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Transform data into three series
    const series: [number, number][][] = [0, 1, 2].map((index) => {
      return data
        .filter((d) => d[1] !== null && d[1][index] !== null)
        .map((d) => [d[0], d[1]![index]!] as [number, number]);
    });

    // Get all valid data points for scaling
    const allDataPoints = series.flat();

    if (allDataPoints.length === 0) return;

    // Set scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(allDataPoints, (d) => d[0]) as [number, number])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(allDataPoints, (d) => d[1]) as [number, number])
      .range([height, 0]);

    // Create line generator
    const line = d3
      .line<[number, number]>()
      .x((d) => xScale(d[0]))
      .y((d) => yScale(d[1]));

    // Add axes
    g.append("g")
      .attr("class", styles.xAxis)
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    g.append("g").attr("class", styles.yAxis).call(d3.axisLeft(yScale));

    // Colors for the three lines
    const lineClasses = [styles.lineBlue, styles.lineGreen, styles.lineRed];

    // Add lines for each series
    series.forEach((seriesData, index) => {
      if (seriesData.length > 0) {
        g.append("path")
          .datum(seriesData)
          .attr("class", `${styles.line} ${lineClasses[index]}`)
          .attr("d", line);
      }
    });
  }, [data, width, height, margin]);

  return (
    <svg
      ref={svgRef}
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
      className={styles.chart}
    />
  );
};

export default MultiSeriesChart;
