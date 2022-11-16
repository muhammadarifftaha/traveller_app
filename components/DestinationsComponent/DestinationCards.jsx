import Link from "next/link";
import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

function DestinationCards({ data }) {
  const [destination, setDestination] = useState(data);
  return (
    <Card
      className="text-start mx-auto"
      style={{
        backgroundImage: `url(${destination.photo}) `,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        flex: "0 0 20%",
        height: "100%",
      }}
    >
      <Card.Body
        className="w-100 h-100"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.7),rgba(255,255,255,0.5), rgba(255,255,255,0.1))",
        }}
      >
        <Card.Title>{destination.name}</Card.Title>

        <Card.Text>
          Budget : {destination.budget}
          <br />
          Rating : {destination.rating}
        </Card.Text>
        <Link
          passHref
          legacyBehavior
          href={`/destinations/${destination.slug}`}
        >
          <Button variant="primary">See More</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default DestinationCards;
