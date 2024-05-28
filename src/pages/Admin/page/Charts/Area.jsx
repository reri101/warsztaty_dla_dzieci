import React from "react";
import {
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  DateTime,
  Legend,
  Tooltip,
  ChartComponent,
  SplineAreaSeries,
  AreaSeries,
} from "@syncfusion/ej2-react-charts";
import {
  areaCustomSeries,
  areaPrimaryXAxis,
  areaPrimaryYAxis,
} from "../../../../components/Admin/data/dummy";
import { ChartsHeader } from "../../../../components/Admin";
import { useStateContext } from "../../../../contexts/ContextProvider";

function Area() {
  const { currentMode } = useStateContext();

  return (
    <div className="m-4 md:m-10 mt-10 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader category="Area" title="Inflation Rate in percentage" />
      <ChartComponent
        id="area-chart"
        height="420px"
        primaryXAxis={areaPrimaryXAxis}
        primaryYAxis={areaPrimaryYAxis}
        chartArea={{ border: { width: 0 } }}
        tooltip={{ enable: true }}
        legendSettings={{ background: "white" }}
        background={currentMode === "Dark" ? "#33373E" : "#fff"}
      >
        <Inject services={[SplineAreaSeries, DateTime, Legend]} />
        <SeriesCollectionDirective>
          {areaCustomSeries.map((item, index) => (
            <SeriesDirective key={index} {...item} />
          ))}
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
}

export default Area;
