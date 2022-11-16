import { faEye, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Toast, ToastContainer } from "react-bootstrap";

function PlannerCards({ data, state }) {
  const [plannerData, setPlannerData] = useState(data);

  function renderDates() {
    const start = new Date(plannerData.travelPeriod.start);
    const end = new Date(plannerData.travelPeriod.end);
  }

  function handleDelete(e) {
    const uuid = plannerData.uuid;
    axios({
      url: `/api/planner/${uuid}`,
      method: "delete",
    }).then(() => {
      state(false);
      axios({
        url: "/api/planner",
        method: "get",
      }).then((res) => {
        res.data.map((planner) => {
          return { name: planner.name, uuid: planner.uuid };
        });
      });
    });
  }

  return (
    <>
      <Card className="flex-grow-0 flex-shrink-0 w-25 text-start mb-3">
        <Card.Body>
          <Card.Title>{plannerData.name}</Card.Title>
          <Card.Text>
            Travel Period :
            {plannerData.travelPeriod.start +
              " - " +
              plannerData.travelPeriod.end}
            <br />
            Planner Destination : {plannerData.destination}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-end">
          <Link passHref legacyBehavior href={`/planner/${plannerData.uuid}`}>
            <Button variant="primary" className="me-1">
              <FontAwesomeIcon icon={faEye} />
            </Button>
          </Link>
          <Button
            variant="danger"
            onClick={handleDelete}
            data-uuid={plannerData.uuid}
          >
            <FontAwesomeIcon icon={faX} />
          </Button>
        </Card.Footer>
      </Card>{" "}
    </>
  );
}

export default PlannerCards;
