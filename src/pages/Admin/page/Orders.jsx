import React, { useEffect, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";

import {
  ordersData,
  contextMenuItems,
  ordersGrid,
} from "../../../components/Admin/data/dummy";
import { Header } from "../../../components/Admin";
import img from "../../../assets/forest_itj.png";
import product6 from "../../../components/Admin/data/product6.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  const navigate = useNavigate();
  const [ordersinfo, setOrdersinfo] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await axios.get(
          "http://localhost:8080/api/reservation/getAll",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const transformedData = response.data.map((order, index) => ({
          OrderID: order.id,
          CustomerEmail: `${order.userEmail}`,
          TotalAmount: `${order.price} zł`,
          WorkshopTitle: `${order.workshopTitle}`,
          InstructorEmail: `${order.instructorEmail}`,
          Location: `${order.place}`,
          Status: `${order.status}`,
          StatusBg: order.status !== "inprogres" ? "#8BE78B" : "#FB9678",
          ProductImage: img,
        }));

        setOrdersinfo(transformedData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
      <GridComponent
        id="gridcomp"
        dataSource={ordersinfo}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            Edit,
            PdfExport,
          ]}
        />
      </GridComponent>
    </div>
  );
};
export default Orders;
