import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
  Toolbar,
} from "@syncfusion/ej2-react-grids";

import {
  employeesData,
  contextMenuItems,
  employeesGrid,
} from "../../../components/Admin/data/dummy";
import { Header } from "../../../components/Admin";

function Employees() {
  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employees" />
      <GridComponent
        id="gridcomp"
        width="auto"
        dataSource={employeesData}
        allowPaging
        allowSorting
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {employeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Search]} />
      </GridComponent>
    </div>
  );
}

export default Employees;
