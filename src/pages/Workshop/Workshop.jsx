import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./workshop.css";
import { Navbar } from "../../components";
import { Footer, WorkshopDetails } from "../../containers";
import bg from "../../assets/forest_itj.png";

function WorkshopPage() {
  //   const { workshopName } = useParams();
  const [workshopDetails, setWorkshopDetails] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/workshop/${id}`
        );
        const data = await response.json();
        setWorkshopDetails(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching workshops:", error);
      }
    };

    fetchWorkshops();
  }, []);

  return (
    <div className="workshopPage">
      <Navbar />
      <div
        className="workshopPage__header"
        style={{
          backgroundImage: workshopDetails.backgroundPhoto
            ? `url(data:image/jpeg;base64,${workshopDetails.backgroundPhoto})`
            : `url(${bg})`,
        }}
      >
        <h1>Warsztat: {workshopDetails.title}</h1>
      </div>
      <WorkshopDetails workshop={workshopDetails} />
      <Footer />
    </div>
  );
}

export default WorkshopPage;
