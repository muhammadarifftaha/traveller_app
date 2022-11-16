import { Container } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import DestinationCards from "../../components/DestinationsComponent/DestinationCards";
import cityData from "../../data/destinations";

export default function Destination() {
  const [destinationsData, setDestinationsData] = useState([]);

  const newData = () => {
    let content = [];
    for (let city in cityData) {
      const data = cityData[city].data;
      const included = cityData[city].included;
      const cityName = data.attributes.name;
      const photoId = included[0].relationships.featured_photo.data.id;

      const photo = included.find(
        (item) => item.id !== photoId && item.type === "photo"
      ).attributes.image.medium;

      const cityObj = {
        name: cityName,
        budget: data.attributes.budget[`${cityName}`].value,
        rating: data.attributes.average_rating,
        slug: data.attributes.slug,
        photo: photo,
      };
      content.push(cityObj);
    }
    setDestinationsData(content);
  };

  useEffect(() => {
    newData();
  }, []);

  const cities = Object.keys(destinationsData);

  return (
    <Container fluid={true} className="my-5 flex-fill overflow-auto">
      <h2 className="my-3">Destinations</h2>
      <Container
        fluid={true}
        className="d-flex flex-row justify-content-start align-items-center flex-wrap gap-5 "
      >
        {cities.map((city, idx) => {
          return (
            <DestinationCards
              data={destinationsData[city]}
              key={`city-${idx}`}
            />
          );
        })}
      </Container>
    </Container>
  );
}
