import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Edit,
  Filter,
  Inject,
  Toolbar,
  Sort,
} from "@syncfusion/ej2-react-grids";
import {
  customersData,
  customersGrid,
} from "../../../components/Admin/data/dummy";
import { Header } from "../../../components/Admin";
import axios from "axios";
import avatar from "../../../components/Admin/data/avatar2.jpg";

function Customers() {
  const [usersinfo, setUsersinfo] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await axios.get(
          "http://localhost:8080/api/user/every",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const transformedData = response.data.map((user, index) => ({
          CustomerID: 1 + index,
          CustomerName: `${user.name} ${user.lastname}`,
          CustomerEmail: user.email,
          CustomerImage: avatar,
          Email: user.email,
          Status: user.enabled ? "Active" : "Inactive",
          StatusBg: user.enabled ? "#8BE78B" : "#FF0000",
          Enabled: "0",
          TrCount: `${user.reservationCount}`,
          Location: user.city,
        }));

        setUsersinfo(transformedData);
        console.log(transformedData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, []);

  const handleActionComplete = (args) => {
    if (args.requestType === "delete") {
      const deletedIds = args.data.map((item) => item.CustomerID);
      const updatedUsersinfo = usersinfo.filter(
        (user) => !deletedIds.includes(user.CustomerID)
      );
      setUsersinfo(updatedUsersinfo);
      console.log("Updated user info:", updatedUsersinfo);
    } else if (args.requestType === "save") {
      const updatedData = args.data;
      const updatedUsersinfo = usersinfo.map((user) =>
        user.CustomerID === updatedData.CustomerID ? updatedData : user
      );
      setUsersinfo(updatedUsersinfo);
      console.log("Updated user info after editing:", updatedUsersinfo);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <GridComponent
        id="gridcomp"
        width="auto"
        dataSource={usersinfo}
        allowPaging
        allowSorting
        toolbar={["Delete"]}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        actionComplete={handleActionComplete}
      >
        <ColumnsDirective>
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Edit, Sort, Filter, Toolbar]} />
      </GridComponent>
    </div>
  );
}

export default Customers;
