import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import AttractionCards from "./AttractionCards";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function AttractionList({ city }) {
  const [query, setQuery] = useState("");
  const [attractionData, setAttractionData] = useState([]);
  const [contentLoaded, setContentLoaded] = useState(false);
  const fetchQuery = encodeURIComponent(city);
  console.log(fetchQuery);

  function fetchAttractions() {
    axios({
      url: `https://api.foursquare.com/v3/places/search?fields=fsq_id%2Cname%2Clocation%2Ccategories%2Cdistance%2Cdescription%2Chours%2Csocial_media%2Crating%2Cprice%2Cphotos&near=${fetchQuery}&sort=POPULARITY&limit=20`,
      method: "get",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: process.env.FOURSQUARE_APIKEY,
      },
    })
      .then((res) => {
        const data = res.data.results;
        return [
          data.slice(0, 4),
          data.slice(4, 8),
          data.slice(8, 12),
          data.slice(12, 16),
          data.slice(16, 29),
        ];
      })
      .then((splitData) => {
        console.log(splitData);
        setAttractionData(splitData);

        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      })
      .finally((loaded) => {
        console.log(loaded);
        setContentLoaded(true);
      });
  }

  useEffect(() => {
    fetchAttractions();
  }, []);
  return (
    <>
      <Container className="my-4 d-flex flex-row justify-content-between align-items-center ">
        <h4>Attractions</h4>
        <Form className="d-flex flex-row gap-2">
          <InputGroup>
            <Form.Control
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
            />
            <Button type="button" variant="outline-primary">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </InputGroup>
          <Form.Select>
            <option defaultValue={true}>Category</option>
            <option>Item 1</option>
          </Form.Select>
        </Form>
      </Container>

      <Container fluid={true} className="flex-fill" id="attraction-list">
        {contentLoaded ? (
          attractionData.map((segments, idx) => {
            return (
              <Row key={`segment-${idx}`} xs={5} md={4} lg={4} className="my-2">
                {segments.map((attraction, index) => {
                  return (
                    <AttractionCards
                      key={`attraction-${index}`}
                      data={attraction}
                    />
                  );
                })}
              </Row>
            );
          })
        ) : (
          <h5>Loading...</h5>
        )}
      </Container>
    </>
  );
}
