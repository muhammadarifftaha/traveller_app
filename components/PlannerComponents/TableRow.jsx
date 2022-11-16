import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faMap, faX } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export default function TableRow({ data, update }) {
  const router = useRouter();
  const { uuid } = router.query;
  const [attraction, setAttraction] = useState(data);
  const [edit, setEdit] = useState(false);

  function handleDelete() {
    const id = attraction.fsq_id;
    axios({
      url: "/api/planner/",
      method: "put",
      data: { uuid: uuid, data: id, method: "DELETE" },
    }).then(() => {
      update(false);
    });
  }

  const renderTime = (str) => {
    const date = new Date(str);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const time = `${("00" + hour).slice(-2)}:${("00" + minute).slice(-2)}`;
    return time;
  };

  return (
    <tr>
      <>
        <td>{attraction.name}</td>
        <td>
          {attraction.categories
            .map((cat) => {
              return cat.name;
            })
            .join(" > ")}
        </td>
        <td>
          <Button
            variant="outline-primary"
            href={`https://www.google.com/maps/search/${encodeURIComponent(
              attraction.location.formatted_address
            )}`}
            target="_blank"
          >
            <FontAwesomeIcon icon={faMap} />
          </Button>
        </td>
      </>

      <td>
        <Button type="button" variant="outline-danger" onClick={handleDelete}>
          <FontAwesomeIcon icon={faX} />
        </Button>
      </td>
    </tr>
  );
}
