import axios from "axios";
import React, { useEffect, useState } from "react";

const DashBoard = () => {
  const token = sessionStorage.getItem("userAuth");
  const [isview, setisview] = useState(false);

  const UserAuthentication = (isview) => {
    return setisview(!isview);
  };
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/Student/current", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setisview(true);
        console.log("Loged in as : ", res.data.name);
      })
      .catch((err) => console.error(err));
  }, []);

  return <div>This is the User DashBoard</div>;
};

export default DashBoard;