import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInformation, UserReservationHistory } from "../../components";
import "./userDetails.css";
import axios from "axios";

function UserDetails() {
  const [userinfo, setUserinfo] = useState(null);
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
          "http://localhost:8080/api/user/info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserinfo(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, []);

  if (!userinfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user_details">
      <UserInformation user={userinfo} />
      <UserReservationHistory />
    </div>
  );
}

export default UserDetails;
