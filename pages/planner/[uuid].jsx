import React, { useState, useEffect } from "react";
import PlannerTable from "../../components/PlannerComponents/PlannerTable";
import axios from "axios";
import { useRouter } from "next/router";

function Planner() {
  const router = useRouter();
  const { uuid } = router.query;
  const [plannerData, setPlannerData] = useState("");
  const [contentLoaded, setContentLoaded] = useState(false);

  function getUserData() {
    axios({
      url: "/api/planner/" + uuid,
      method: "get",
    })
      .then((res) => {
        setPlannerData(res.data);
      })
      .then(() => {
        setContentLoaded(true);
      })
      .catch((err) => {
        const statusCode = err.response.status;
        if (statusCode === 401) {
          router.push("/login");
        } else if (statusCode === 404) {
          console.log(err);
        } else {
          console.log(err);
        }
      });
  }

  useEffect(() => {
    console.log(uuid);
    if (uuid && !contentLoaded) {
      getUserData();
    }
  });

  return (
    <div className="Planner flex-fill">
      <h1>Itinerary Planner</h1>
      {contentLoaded ? (
        <PlannerTable data={plannerData.data} update={setContentLoaded} />
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default Planner;
