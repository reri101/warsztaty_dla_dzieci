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
import axios from "axios";
import avatar from "../../../components/Admin/data/avatar2.jpg";
import { Header } from "../../../components/Admin";

function Workshops() {
  const [workshopsInfo, setWorkshopsInfo] = useState([]);
  const [pageSettings, setPageSettings] = useState({
    currentPage: 1,
    pageSize: 10,
    totalRecordsCount: 0,
    totalPages: 0,
  });
  const navigate = useNavigate();
  const toolbarOptions = ["Delete", "Search"];
  const editing = { allowDeleting: true, allowEditing: true };

  const workshopGrid = [
    { type: "checkbox", width: "50" },
    {
      headerText: "Background Photo",
      width: "150",
      template: ({ BackgroundPhoto }) => (
        <img src={BackgroundPhoto} alt="background" className="w-10 h-10" />
      ),
      textAlign: "Center",
    },
    {
      field: "Title",
      headerText: "Title",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "Description",
      headerText: "Opis",
      width: "200",
      textAlign: "Center",
    },
    {
      field: "Duration",
      headerText: "Czas trwania",
      width: "100",
      textAlign: "Center",
    },
    {
      field: "PricePerChild",
      headerText: "Cena",
      width: "100",
      textAlign: "Center",
    },
    {
      field: "PricePerChildDiscounted",
      headerText: "Cena ze zniżką",
      width: "200",
      textAlign: "Center",
    },
    {
      field: "MinGroupForDiscounting",
      headerText: "Min grupa na zniżkę",
      width: "200",
      textAlign: "Center",
    },
    {
      field: "MaxGroup",
      headerText: "Max grupa",
      width: "120",
      textAlign: "Center",
    },
    {
      field: "WorkshopArea",
      headerText: "Adres",
      width: "100",
      textAlign: "Center",
    },
  ];

  useEffect(() => {
    console.log(pageSettings.pageSize);
    const fetchWorkshops = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await axios.get(
          "http://localhost:8080/api/workshop/for-admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              pageNumber: pageSettings.currentPage - 1,
              pageSize: pageSettings.pageSize,
            },
          }
        );

        const { content, totalElements, totalPages } = response.data;

        const transformedData = content.map((workshop) => ({
          WorkshopID: workshop.id,
          Title: workshop.title,
          Description: workshop.description,
          Duration: workshop.duration,
          PricePerChild: workshop.pricePerChild,
          PricePerChildDiscounted: workshop.pricePerChildDiscounted,
          MinGroupForDiscounting: workshop.minGroupForDiscounting,
          MaxAge: workshop.maxAge,
          MaxGroup: workshop.maxGroup,
          WorkshopArea: workshop.workshopArea,
          BackgroundPhoto: workshop.backgroundPhoto
            ? `data:image/jpeg;base64,${workshop.backgroundPhoto}`
            : avatar,
          Status: "Active",
          StatusBg: "#8BE78B",
        }));

        setWorkshopsInfo(transformedData);
        setPageSettings((prevSettings) => ({
          ...prevSettings,
          totalRecordsCount: totalElements,
          totalPages: totalPages,
        }));
      } catch (error) {
        console.error("Error fetching workshop data:", error);
      }
    };

    fetchWorkshops();
  }, [navigate, pageSettings.currentPage, pageSettings.pageSize]);

  const handleActionBegin = (args) => {
    if (args.requestType === "delete") {
      if (!window.confirm("Czy na pewno chcesz usunąć wybrane warsztaty?")) {
        args.cancel = true;
      }
    }
  };

  const handleActionComplete = (args) => {
    if (args.requestType === "delete") {
      const deletedIds = args.data.map((item) => item.WorkshopID);
      const updatedWorkshopsInfo = workshopsInfo.filter(
        (workshop) => !deletedIds.includes(workshop.WorkshopID)
      );
      setWorkshopsInfo(updatedWorkshopsInfo);
    } else if (args.requestType === "save") {
      const updatedData = args.data;
      const updatedWorkshopsInfo = workshopsInfo.map((workshop) =>
        workshop.WorkshopID === updatedData.WorkshopID ? updatedData : workshop
      );
      setWorkshopsInfo(updatedWorkshopsInfo);
    }
  };

  const handlePageChange = (args) => {
    setPageSettings({
      ...pageSettings,
      currentPage: args.currentPage,
      pageSize: args.pageSize,
    });
  };

  const handleAddWorkshop = () => {
    navigate("add-workshop");
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Page"
        title="Workshops"
        buttonText="Dodaj warsztat"
        buttonOnClick={handleAddWorkshop}
      />
      <GridComponent
        id="gridcomp"
        width="auto"
        dataSource={workshopsInfo}
        allowPaging
        pageSettings={pageSettings}
        allowSorting
        editSettings={editing}
        toolbar={toolbarOptions}
        actionBegin={handleActionBegin}
        actionComplete={handleActionComplete}
        dataStateChange={handlePageChange}
      >
        <ColumnsDirective>
          {workshopGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Edit, Search, Sort, Filter, Toolbar]} />
      </GridComponent>
    </div>
  );
}

export default Workshops;
