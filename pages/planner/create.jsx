import React, { useState, useEffect } from "react";
import cityData from "../../data/destinations";
import axios from "axios";
import {
  Container,
  Form,
  FloatingLabel,
  FormSelect,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useRouter } from "next/router";

export default function CreatePlanner() {
  const router = useRouter();
  const [newPlannerData, setNewPlannerData] = useState({
    name: "",
    travelPeriod: {
      start: "",
      end: "",
    },
    destination: "",
  });

  const [destinationsData, setDestinationsData] = useState([]);

  function fetchDestinationsData() {
    const dataArray = [];
    for (const key in cityData) {
      dataArray.push(cityData[key]);
    }
    setDestinationsData(dataArray);
    console.log(destinationsData);
  }

  useEffect(() => {
    fetchDestinationsData();
  }, []);

  function handleChange(e) {
    setNewPlannerData((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  }

  function handleDates(e) {
    setNewPlannerData((prevState) => {
      return {
        ...prevState,
        travelPeriod: {
          ...prevState.travelPeriod,
          [e.target.id]: e.target.value,
        },
      };
    });
  }

  // function handleDateChange(e) {
  //   setNewDate(())
  //   e.preventDefault();

  function handleSubmit(e) {
    e.preventDefault();

    axios({
      url: "/api/planner",
      method: "post",
      data: {
        name: newPlannerData.name,
        travelPeriod: newPlannerData.travelPeriod,
        destination: newPlannerData.destination,
      },
    })
      .then(() => {
        axios({
          url: "/api/planner",
          method: "get",
        });
        // .then((res) => {
        //   setPlannerIDsData(
        //     res.data.map((planner) => {
        //       return {
        //         name: planner.name,
        //         uuid: planner.uuid,
        //         destination: planner.destination,
        //       };
        //     })
        //   );
        // });
      })
      .then(() => {
        router.push(`/destinations/${newPlannerData.destination}`);
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

  return (
    <Container
      fluid={true}
      className="flex-fill d-flex flex-column justify-content-center align-items-center"
    >
      <h4 className="my-3">Create a Planner</h4>
      <Form
        onSubmit={handleSubmit}
        className="w-50 d-flex flex-column justify-content-center align-content-center gap-3 mx-auto"
      >
        <FloatingLabel controlId="name" label="Planner Name">
          <Form.Control
            type="text"
            value={newPlannerData.name}
            onChange={handleChange}
            placeholder="Planner Name"
          />
        </FloatingLabel>

        <InputGroup>
          <Form.Control
            type="date"
            id="start"
            value={newPlannerData.travelPeriod.start}
            onChange={handleDates}
            placeholder="Select Date"
          />
          <Form.Control
            type="date"
            id="end"
            value={newPlannerData.travelPeriod.end}
            onChange={handleDates}
            placeholder="Select Date"
          />
        </InputGroup>
        <FormSelect onChange={handleChange} id="destination">
          <option>Choose Destination</option>
          {destinationsData.map((city) => {
            return (
              // <>
              <option value={city.data.attributes.slug}>
                {city.data.attributes.name}
              </option>
              // </>
            );
          })}
        </FormSelect>

        <Button
          className="flex-grow-0 flex-shrink-0 w-50 mx-auto"
          type="submit"
        >
          Create
        </Button>
      </Form>
    </Container>
  );
}
