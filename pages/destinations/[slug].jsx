import React, { useEffect, useState } from "react";
import { Card, Container, Spinner } from "react-bootstrap";
import cityData from "../../data/destinations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";
import AttractionList from "../../components/DestinationsComponent/AttractionList";
import { useRouter } from "next/router";
import { faGem, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faBagShopping,
  faBicycle,
  faChildren,
  faCity,
  faDollarSign,
  faGraduationCap,
  faLandmark,
  faMartiniGlassCitrus,
  faMusic,
  faPeace,
  faPeopleGroup,
  faPersonSkiingNordic,
  faPlaceOfWorship,
  faShield,
  faStar,
  faStarHalfStroke,
  faTicket,
  faTree,
  faUmbrellaBeach,
  faUtensils,
  faVenusMars,
  faWineBottle,
} from "@fortawesome/free-solid-svg-icons";

export default function DestinationDetails() {
  const router = useRouter();
  const { slug } = router.query;
  const [city, setCity] = useState(null);
  const [featured_photo, setFeatured_photo] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const metrics = {
    covid: {
      //larger than with max value at 100
      75: "Extreme",
      25: "Critical",
      10: "High",
      1: "Medium",
      0: "Low",
    },
    known_for: {
      charming: faHeart,
      foodie: faUtensils,
      nightlife: faMartiniGlassCitrus,
      architecture: faCity,
      history: faPlaceOfWorship,
      museums: faLandmark,
      "performing-arts": faTicket,
      music: faMusic,
      hipster: faBicycle,
      hippie: faPeace,
      posh: faGem,
      "family-friendly": faChildren,
      "lgbt-friendly": faVenusMars,
      diversity: faPeopleGroup,
      "beach-town": faUmbrellaBeach,
      "college-town": faGraduationCap,
      "ski-town": faPersonSkiingNordic,
      outdoorsy: faTree,
      wineries: faWineBottle,
      shopping: faBagShopping,
    },
  };

  function printIcons(key, value) {
    const iconsArr = [];
    if (key === "average_rating") {
      const fullRating = Math.floor(value);
      const halfRating = Math.ceil((Math.round(value * 2) / 2) % fullRating);

      for (let index = 1; index <= 5; index++) {
        if (index <= fullRating) {
          iconsArr.push(
            <FontAwesomeIcon
              icon={faStar}
              className="mx-1 p-1 border border-2 rounded border-dark"
              color="black"
            />
          );
        } else if (index === fullRating + 1 && halfRating !== 0) {
          iconsArr.push(
            <FontAwesomeIcon
              icon={faStarHalfStroke}
              className="mx-1 p-1 border border-2 rounded border-dark"
              color="black"
            />
          );
        } else {
          iconsArr.push(
            <FontAwesomeIcon
              icon={faStar}
              className="mx-1 p-1 border border-2 rounded border-dark"
              color="gray"
            />
          );
        }
      }
    } else if (key === "budget") {
      const rating = Math.round(value / 2);
      for (let index = 1; index <= 4; index++) {
        if (index <= rating) {
          iconsArr.push(
            <FontAwesomeIcon
              icon={faDollarSign}
              className="mx-1 p-1 border border-2 rounded border-dark"
              color="black"
            />
          );
        } else {
          iconsArr.push(
            <FontAwesomeIcon
              icon={faDollarSign}
              className="mx-1 p-1 border border-2 rounded border-dark"
              color="gray"
            />
          );
        }
      }
    } else if (key === "safety") {
      for (let index = 1; index <= 5; index++) {
        if (index <= value) {
          if (value >= 4) {
            iconsArr.push(
              <FontAwesomeIcon
                icon={faShield}
                className="mx-1 p-1 border border-2 rounded border-dark"
                color="green"
              />
            );
          } else if (value >= 2) {
            iconsArr.push(
              <FontAwesomeIcon
                icon={faShield}
                className="mx-1 p-1 border border-2 rounded border-dark"
                color="orange"
              />
            );
          } else {
            iconsArr.push(
              <FontAwesomeIcon
                icon={faShield}
                className="mx-1 p-1 border border-2 rounded border-dark"
                color="red"
              />
            );
          }
        } else {
          iconsArr.push(
            <FontAwesomeIcon
              icon={faShield}
              className="mx-1 p-1 border border-2 rounded border-dark"
              color="gray"
            />
          );
        }
      }
    }
    return iconsArr;
  }

  useEffect(() => {
    if (!dataLoaded) {
      setCity(cityData[slug]);
    }
  });

  useEffect(() => {
    if (city && Object.keys(city).length > 0) {
      setDataLoaded(true);
      setFeatured_photo(
        city.included.find(
          (data) =>
            data.id !== city.included[0].relationships.featured_photo.data.id &&
            data.type === "photo"
        ).attributes.image.full
      );
    }
  }, [city]);

  return (
    <>
      {dataLoaded ? (
        <Container
          fluid={true}
          style={{
            backgroundImage: `url(${featured_photo})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            padding: 0,
          }}
        >
          <Container
            fluid={true}
            className="py-4 text-start d-flex flex-column justify-content-around align-items-start"
            style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          >
            <h2 className="flex-fill">{`${city.data.attributes.name}`}</h2>

            <Container fluid={true} className="d-flex flex-row">
              <Card className="h-100 m-1">
                <Card.Body className="py-1">
                  <h6 className="mx-0 my-2">Budget</h6>
                  {printIcons(
                    "budget",
                    city.data.attributes.budget[city.data.attributes.name].value
                  )}
                </Card.Body>
              </Card>

              <Card className="h-100 m-1">
                <Card.Body className="py-1">
                  <h6 className="mx-0 my-2">Rating</h6>
                  {printIcons(
                    "average_rating",
                    city.data.attributes.average_rating
                  )}
                </Card.Body>
              </Card>

              <Card className="h-100 m-1">
                <Card.Body className="py-1">
                  <h6 className="mx-0 my-2">Safety</h6>
                  {printIcons(
                    "safety",
                    city.data.attributes.safety[city.data.attributes.name].value
                  )}
                </Card.Body>
              </Card>
              <Card className="h-100 m-1">
                <Card.Body className="py-1">
                  <h6 className="mx-0 my-2">Known For</h6>

                  {city.data.relationships.known_for.data.length >= 1 ? (
                    city.data.relationships.known_for.data.map((kf, idx) => {
                      const kfId = kf.id;
                      const kfdata = city.included.find(
                        (data) => data.id === kfId
                      ).attributes;
                      return (
                        <>
                          <FontAwesomeIcon
                            icon={metrics.known_for[kfdata.slug]}
                            className="mx-1 p-1 border border-2 rounded border-dark"
                            data-tip={kfdata.name}
                            key={`icon-${idx}`}
                          />
                          <ReactTooltip />
                        </>
                      );
                    })
                  ) : (
                    <p>Data Unavailable</p>
                  )}
                </Card.Body>
              </Card>
            </Container>
          </Container>
        </Container>
      ) : (
        <Container className="flex-fill d-flex  flex-column gap-3 justify-content-center align-items-center">
          <Spinner>
            <span className="visually-hidden">Loading</span>
          </Spinner>
          <p>Loading...</p>
        </Container>
      )}

      {dataLoaded ? (
        <AttractionList city={city.data.attributes.long_name} />
      ) : (
        <></>
      )}
    </>
  );
}
