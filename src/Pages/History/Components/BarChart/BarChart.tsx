// components/MyChart.tsx
import React from "react";
import ReactECharts from "echarts-for-react";
//import * as echarts from "echarts/core";

// Gunakan EChartsOption dari echarts/core
import type { EChartsOption } from "echarts";

interface BarChartProps{
    titleText: string,
    xAxisData: string[],
    seriesData: any
}

const BarChart: React.FC<BarChartProps> = ({titleText, xAxisData, seriesData}) => {
  const option: EChartsOption = {
    title: {
      text: titleText,
    },
    tooltip: {},
    xAxis: {
      show: true,
      data: xAxisData //["A", "B", "C", "D", "E"],
    },
    yAxis: {
        show: true
    },
    series: [
      {
        type: "bar",
        data: seriesData, //[5, 20, 36, 10, 10],
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: "60vh", width: "100%" }}
    />
  );
};

export default BarChart;
