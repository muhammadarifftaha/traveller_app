import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";

function DestinationCards({ data }) {
  const [city, setCity] = useState(data);

  const cityName = city.data.attributes.name;
  const cityBudget = city.data.attributes.budget[cityName].value;
  const cityRating = Math.floor(city.data.attributes.average_rating);

  return (
    <Card className="flex-grow-0 flex-shrink-0 w-25 text-start">
      <Card.Body>
        <Card.Title>{city.data.attributes.name}</Card.Title>

        <Card.Text>
          Budget : {cityBudget}
          <br />
          Rating : {cityRating}
        </Card.Text>
        <Link
          passHref
          legacyBehavior
          href={`/destinations/${city.data.attributes.slug}`}
        >
          <Button variant="primary">See More</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default DestinationCards;
