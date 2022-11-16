import {
  faCircleCheck,
  faCirclePlus,
  faLocationPin,
  faPlusCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import { useState, useContext } from "react";
import {
  Card,
  Button,
  Modal,
  Col,
  Image,
  Container,
  Row,
  Carousel,
  Dropdown,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import ReactTooltip from "react-tooltip";

export default function AttractionCards({ data }) {
  const [attraction, setAttraction] = useState(data);
  const [show, setShow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [plannersLoaded, setPlannersLoaded] = useState(false);
  const [plannerIDs, setPlannerIDs] = useState([]);

  function handleAddToPlanner(e) {
    console.log(attraction);
    axios({
      url: "/api/planner",
      method: "put",
      data: { uuid: e.target.id, data: attraction, method: "ADD" },
    }).then((res) => {
      console.log(res.data);
      setShowSuccess(true);
      setTimeout(() => {
        setShow(false);
      }, 2000);
    });
  }

  useEffect(() => {
    if (!plannersLoaded) {
      axios({
        url: "/api/planner",
        method: "get",
      }).then((res) => {
        const { data } = res;
        if (data && data !== null && data !== undefined) {
          console.log(data);
          setPlannerIDs(data);
          setPlannersLoaded(true);
        }
      });
    }
  });

  return (
    <>
      <Col className="d-flex">
        <Card className="flex-fill text-start">
          <Card.Body className="w-100 h-100 d-flex flex-column justify-content-around">
            <h5>{attraction.name}</h5>
            <p>{attraction.location.formatted_address}</p>
            <p>
              <FontAwesomeIcon icon={faLocationPin} /> &nbsp;
              {(attraction.distance / 1000).toFixed(2)} KM from City Center
            </p>
            <Button
              variant="outline-secondary"
              className="align-self-end"
              onClick={() => setShow(!show)}
              centered={true}
            >
              More Info
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        className="attraction-modal"
        centered
      >
        <Modal.Body className="">
          <Container className="">
            <Row>
              <Col>
                <Modal.Title>{attraction.name}</Modal.Title>
              </Col>
              <Col className="text-end">
                {attraction.categories.map((category, idx) => {
                  const categoryIcon =
                    category.icon.prefix + "bg_32" + category.icon.suffix;
                  return (
                    <>
                      <Image
                        src={categoryIcon}
                        data-tip={category.name}
                        key={`category-${attraction.name}-${idx}`}
                      />
                      <ReactTooltip />
                    </>
                  );
                })}
              </Col>
            </Row>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <h5 className="d-inline me-1">{attraction.rating}</h5>
                    <FontAwesomeIcon icon={faStar} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>{attraction.location.formatted_address}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>
                      <FontAwesomeIcon icon={faLocationPin} /> &nbsp;
                      {(attraction.distance / 1000).toFixed(2)} KM from City
                      Center
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>{attraction.hours.display}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>{attraction.description}</p>
                  </Col>
                </Row>
              </Col>
              <Col lg="6" sm="6" md="6">
                <Carousel slide className="">
                  {attraction.photos.map((photo, index) => {
                    const photoURL = photo.prefix + "original" + photo.suffix;
                    return (
                      <Carousel.Item>
                        <Image
                          className="d-block mx-auto"
                          src={photoURL}
                          key={`images-${attraction.name}-${index}`}
                          alt={attraction.name}
                        />
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </Col>
            </Row>
            {/*  */}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Dropdown>
            <Dropdown.Toggle>
              <FontAwesomeIcon icon={faCirclePlus} />
              &nbsp; Add to Planner
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Link passHref legacyBehavior href="/planner/create">
                <Dropdown.Item>
                  <FontAwesomeIcon icon={faPlusCircle} />
                  Create a Planner
                </Dropdown.Item>
              </Link>
              {plannersLoaded ? (
                <>
                  {plannerIDs.map((planners) => {
                    return (
                      <Dropdown.Item
                        onClick={handleAddToPlanner}
                        id={planners.uuid}
                        key={planners.uuid}
                      >
                        {planners.name}
                      </Dropdown.Item>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Footer>
        <ToastContainer position="bottom-end" className="me-3 mb-3">
          <Toast
            show={showSuccess}
            onClose={() => setShowSuccess(false)}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <FontAwesomeIcon
                icon={faCircleCheck}
                color="green"
                className="me-1"
              />
              <strong className="me-auto">Attraction Added</strong>
            </Toast.Header>
            <Toast.Body>Added {attraction.name}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Modal>
    </>
  );
}

/*  */
