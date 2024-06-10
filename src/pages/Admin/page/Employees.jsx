import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Edit,
  Search,
  Inject,
  Sort,
  Filter,
  Toolbar,
} from "@syncfusion/ej2-react-grids";

import {
  employeesData,
  contextMenuItems,
  employeesGrid,
} from "../../../components/Admin/data/dummy";
import { Header } from "../../../components/Admin";
import axios from "axios";
import avatar from "../../../components/Admin/data/avatar2.jpg";

function Employees() {
  const [instructorsinfo, setInstructorsinfo] = useState(null);
  const navigate = useNavigate();
  const toolbarOptions = ["Delete", "Search"];
  const editing = { allowDeleting: true, allowEditing: true };

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await axios.get(
          "http://localhost:8080/api/instructors",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const transformedData = response.data.map((employee, index) => ({
          EmployeeID: 1 + index,
          Name: `${employee.firstName} ${employee.lastName}`,
          EmployeeImage: avatar,
          Email: employee.email,
          Description: `${employee.description}`,
          Status: employee.enabled ? "Active" : "Inactive",
          StatusBg: employee.enabled ? "#8BE78B" : "#FF0000",
          Phone: `${employee.phone}`,
          TrCount: `${employee.reservationCount}`,
          HireDate: new Date(employee.hireDate).toLocaleDateString(),
          City: employee.city,
        }));

        setInstructorsinfo(transformedData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchInstructor();
  }, []);

  const handleActionBegin = (args) => {
    if (args.requestType === "delete") {
      if (
        !window.confirm("Czy na pewno chcesz usunąć wybranych użytkowników?")
      ) {
        args.cancel = true;
      }
    }
  };

  const handleActionComplete = (args) => {
    if (args.requestType === "delete") {
      const deletedIds = args.data.map((item) => item.EmployeeID);
      const updatedInstructorsInfo = instructorsinfo.filter(
        (instructor) => !deletedIds.includes(instructor.EmployeeID)
      );
      setInstructorsinfo(updatedInstructorsInfo);
    } else if (args.requestType === "save") {
      const updatedData = args.data;
      const updatedInstructorsinfo = instructorsinfo.map((instructor) =>
        instructor.EmployeeID === updatedData.EmployeeID
          ? updatedData
          : instructor
      );
      setInstructorsinfo(updatedInstructorsinfo);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employees" />
      <GridComponent
        id="gridcomp"
        width="auto"
        dataSource={instructorsinfo}
        allowPaging
        allowSorting
        editSettings={editing}
        toolbar={toolbarOptions}
        actionBegin={handleActionBegin}
        actionComplete={handleActionComplete}
      >
        <ColumnsDirective>
          {employeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Edit, Search, Sort, Filter, Toolbar]} />
      </GridComponent>
    </div>
  );
}

export default Employees;
