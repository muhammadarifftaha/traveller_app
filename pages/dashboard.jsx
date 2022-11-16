import React, { useState, useEffect } from "react";
import axios from "axios"; //no need to use .json
import {
  Container,
  Card,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import DestinationCards from "../components/DashboardComponents/DestinationCards";
import PlannerCards from "../components/DashboardComponents/PlannerCards";
import cityData from "../data/destinations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faCirclePlus, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const [destinationsData, setDestinationsData] = useState([]);
  const [plannerData, setPlannerData] = useState([]);
  const [destinationsLoaded, setDestinationsLoaded] = useState(false);
  const [plannerLoaded, setPlannerLoaded] = useState(false);
  const [show, setShow] = useState(false);

  const showUpdated = () => setShow(true);

  function fetchDestinationsData() {
    const dataArray = [];
    for (const key in cityData) {
      dataArray.push(cityData[key]);
    }

    setDestinationsData(dataArray);
    setDestinationsLoaded(true);
  }

  function fetchPlannerData() {
    axios({
      url: `/api/planner`,
      method: "get",
    }).then((res) => {
      setPlannerData(res.data);
      setPlannerLoaded(true);
    });
  }
  useEffect(() => {
    fetchPlannerData();
    showUpdated();
  }, []);

  useEffect(() => {
    fetchPlannerData();
    fetchDestinationsData();
  }, []);

  return (
    <Container
      fluid={true}
      className="flex-fill d-flex flex-column justify-content-start align-items-start gap-2 p-5 position-relative"
    >
      <h2>Dashboard</h2>

      <Container
        fluid={true}
        className="d-flex flex-column justify-content-center align-items-start p-0 gap-3 my-2"
      >
        <h5>Destinations</h5>
        <Container
          fluid={true}
          className="d-flex flex-row justify-content-start align-items-center gap-3 p-2"
          style={{ overflowX: "auto" }}
        >
          {destinationsLoaded ? (
            destinationsData.map((city) => {
              return (
                <DestinationCards
                  data={city}
                  key={city.data.id}
                  className="mb-3"
                />
              );
            })
          ) : (
            <h5>Loading...</h5>
          )}
        </Container>
      </Container>

      <Container
        fluid={true}
        className="d-flex flex-column justify-content-center align-items-start p-0 gap-3 my-2"
      >
        <h5>Planner</h5>
        <Container
          fluid={true}
          className="d-flex flex-row justify-content-start align-items-center gap-3 p-2"
          style={{ overflowX: "auto" }}
        >
          {plannerLoaded ? (
            plannerData.length > 0 ? (
              plannerData.map((planner) => {
                return (
                  <PlannerCards
                    data={planner}
                    key={planner.uuid}
                    state={setPlannerLoaded}
                  />
                );
              })
            ) : (
              <></>
            )
          ) : (
            <h5>Loading</h5>
          )}
          <Card className="flex-shrink-0 25 text-start p-4">
            <Card.Body>
              <Link passHref legacyBehavior href="/planner/create">
                <Button variant="primary" size="lg">
                  <FontAwesomeIcon icon={faCirclePlus} /> &nbsp; Create
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Container>
      </Container>
      <ToastContainer position="bottom-end" className="me-3 mb-3">
        <Toast show={show} onClose={() => setShow(false)} delay={3000} autohide>
          <Toast.Header>
            <FontAwesomeIcon
              icon={faInfoCircle}
              color="blue"
              className="me-1"
            />
            <strong className="me-auto">Planners Updated</strong>
          </Toast.Header>
          <Toast.Body>Planners updated.</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

// export default function Dashboard() {
//   const cityID = [
//     // "Tokyo",
//     8957779,
//     // "New York",
//     6588544,
//     // "London",
//     7930952,
//     // "Sydney",
//     6657923,
//   ];
//   const [destinations, setDestinations] = useState([cityData]);
//   const [dataLoaded, setDataLoaded] = useState(false);
//   const [plannerData, setPlannerData] = useState([]);
//   const [plannerLoaded, setPlannerLoaded] = useState(false);
//   const authKey = {
//     username: "eb1a569c1646e0d82877eb52b537d276",
//     //process.env.REACT_APP_
//     password: "20c2865d5d37237746f5bc89865d7198",
//   };

//   //API Key: eb1a569c1646e0d82877eb52b537d276
//   //Secret Key: 20c2865d5d37237746f5bc89865d7198

//   // async function fetchAPIData() {
//   // return axios({
//   //   url: `https://api.roadgoat.com/api/v2/destinations/${id}`,
//   //   method: "get",
//   //   auth: authKey,
//   // })

//   // name res.data.data>attributes>name
//   // budget res.data.data>attributs>budget[0].value
//   // rating res.data.data>attributes>average_rating
//   // const cityName = res.data.data.attributes.name;
//   // const data = {
//   //   name: cityName,
//   //   budget: res.data.data.attributes.budget[cityName].value,
//   //   rating: res.data.data.attributes.average_rating,
//   //   id: res.data.data.id
//   // };
//   // return data;
//   // };

//   function fetchPlannerData() {
//     axios({
//       url: `http://localhost:3003/api/planner`,
//       method: "get",
//     }).then((res) => {
//       // console.log(res.data);
//       setPlannerData(res.data);
//       setPlannerLoaded(true);
//       // const plannerData={
//       //   plannerName: res.data[0].name,
//       //   plannerTravelPeriod: res.data[0].travelPeriod,
//       //   plannerDestination: res.data[0].destination
//       //}
//     });
//   }

//   // async function fetchCityData() {
//   //   return await Promise.all(destinations.map(fetchAPIData)).then((data) => {
//   //     console.log(data);
//   //     setDestinations(data);
//   //     setDataLoaded(true);
//   //   });
//   // }

//   useEffect(() => {
//     // fetchAPIData();
//     fetchPlannerData();
//     console.log(destinations[0]["tokyo-japan"].data.attributes.name);
//   }, []);

//   return (
//     <Container
//       fluid={true}
//       className="flex-fill d-flex flex-column justify-content-around align-items-start gap-2 p-3"
//     >
//       <h2>Dashboard</h2>

//       <Container
//         fluid={true}
//         className="d-flex flex-column justify-content-center align-items-start"
//       >
//         <h5>Destinations</h5>
//         <Container
//           fluid={true}
//           className="d-flex flex-row justify-content-start align-items-center gap-1 "
//           style={{ overflowX: "auto" }}
//         >
//           {true ? (
//             <DestinationCards data={destinations} />
//           ) : (
//             <h5>Loading...</h5>
//           )}
//         </Container>
//       </Container>

//       <Container>
//         <h5>Planner</h5>
//         <Container className="d-flex flex-row justify-content-around align-items-center gap-1">
//           {plannerLoaded ? (
//             <PlannerCards plannerData={plannerData} key={plannerData.id} />
//           ) : (
//             // <div>{listDataPlanner}</div>
//             <h5>+</h5>
//           )}
//         </Container>
//       </Container>
//     </Container>
//   );
// }
