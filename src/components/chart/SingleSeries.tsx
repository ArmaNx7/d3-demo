import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { SingleSeriesDataPoint } from "../../types/chart.types";
import styles from "./SingleSeriesChart.module.css";

interface SingleSeriesChartProps {
  data: SingleSeriesDataPoint[];
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
}

const SingleSeriesChart: React.FC<SingleSeriesChartProps> = ({
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

    // Filter out null values
    const filteredData = data.filter((d) => d[1] !== null) as [
      number,
      number
    ][];

    if (filteredData.length === 0) return;

    // Set scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(filteredData, (d) => d[0]) as [number, number])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(filteredData, (d) => d[1]) as [number, number])
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

    // Add the line
    g.append("path")
      .datum(filteredData)
      .attr("class", styles.line)
      .attr("d", line);
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

export default SingleSeriesChart;
