import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import {
  Toast,
  ToastContainer,
  Container,
  Card,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  faCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export default function Register() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    repassword: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showServerError, setShowServerError] = useState(false);
  const [validated, setValidated] = useState(false);
  const router = useRouter();

  const toggleShowError = () => setShowError(!showError);
  const toggleShowSuccess = () => setShowSuccess(!showSuccess);
  const toggleShowServerError = () => setShowServerError(!showServerError);

  function handleChange(e) {
    const input = e.target;
    const field = input.dataset.field;
    let value = input.value;
    setUserData((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });

    if (field === "username") {
      if (value.length <= 0) {
        input.classList.remove("is-invalid");
        input.classList.remove("is-valid");
        console.log("nothing");
        setValidated(false);
      } else if (
        /^(?=.[<>,.\\"'?!@#$%^&*()])/g.test(value) ||
        new RegExp("/").test(value) ||
        value.length < 8
      ) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        console.log("got wrong");
        setValidated(false);
      } else if (
        value.length >= 8 &&
        !/[.,/#!$%^&*;:{}=\-"'`~()][+><? .]/g.test(value)
      ) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        console.log(
          "all ok ",
          /[.,/#!$%^&*;:{}=\-"'`~()][+><? .]/g.test(value)
        );
        setValidated(true);
      }
    } else if (field === "password") {
      if (value.length <= 0) {
        input.classList.remove("is-invalid");
        input.classList.remove("is-valid");
        setValidated(false);
      } else if (
        /[.,/;:{}=\-"'`~()][+>< .]/g.test(value) === true ||
        value.length < 8
      ) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        setValidated(false);
      } else if (
        value.length >= 8 &&
        /[.,/;:{}=\-"'`~()][+>< .]/g.test(value) === false
      ) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        setValidated(true);
      }
    } else if (field === "repassword") {
      if (value !== userData.password) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        setValidated(false);
      } else if (value === userData.password) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        setValidated(true);
      } else {
        input.classList.remove("is-invalid");
        input.classList.remove("is-valid");
        setValidated(false);
      }
    }
  }

  function createUser(e) {
    e.preventDefault();
    if (validated) {
      axios({
        url: "/api/user",
        method: "post",
        data: { username: userData.username, password: userData.password },
      })
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            toggleShowSuccess();
            router.push("/login");
          } else if (res.status === 200) {
            toggleShowError();
          } else {
            toggleShowServerError();
          }
        })
        .catch((err) => {
          toggleShowServerError();
          console.log(err);
        });
    }
  }

  return (
    <Container
      fluid={true}
      className="d-flex flex-column justify-content-center align-items-center flex-fill position-relative"
    >
      <Card className="w-75 h-50">
        <Card.Body className="h-100 d-flex flex-column justify-content-center align-items-center gap-4">
          <h4>Register</h4>
          <Form
            noValidate
            className="w-75 d-flex flex-column justify-content-center align-content-center gap-3"
            onSubmit={createUser}
          >
            <FloatingLabel controlId="username" label="Username">
              <Form.Control
                type="text"
                placeholder="Username"
                value={userData.username}
                onChange={handleChange}
                data-field={"username"}
              />
              <Form.Control.Feedback
                tooltip={true}
                className="text-start"
                type="invalid"
              >
                Username must be at least 8 characters long.
                <br />
                Only alphanumeric characters (a-z, A-Z, 0-9) and underscore (_)
                allowed
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="password" label="Create Password">
              <Form.Control
                type="password"
                placeholder="Create Password"
                value={userData.password}
                onChange={handleChange}
                data-field={"password"}
              />
              <Form.Control.Feedback
                tooltip={true}
                className="text-start"
                type="invalid"
              >
                Password must be at least 8 characters long.
                <br />
                Only alphanumeric characters (a-z, A-Z, 0-9) and special
                characters (%, $, @, #, !, ?, ^, &, *, _) allowed
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="repassword" label="Confirm Password">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={userData.repassword}
                onChange={handleChange}
                data-field={"repassword"}
              />
              <Form.Control.Feedback
                tooltip={true}
                className="text-start"
                type="invalid"
              >
                Password does not match.
              </Form.Control.Feedback>
            </FloatingLabel>
            <Button
              className="flex-grow-0 flex-shrink-0 w-50 mx-auto"
              variant="primary"
              type="submit"
              disabled={validated ? false : true}
            >
              Create Account
            </Button>
            <p className="text-center">
              Already registered? <Link href="/login">Sign in</Link> instead.
            </p>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer position="bottom-end" className="me-2 mb-3">
        <Toast show={showError} onClose={toggleShowError} delay={3000} autohide>
          <Toast.Header style={{ color: "red" }}>
            <FontAwesomeIcon icon={faCircleExclamation} /> &nbsp;
            <strong className="me-auto"> Error</strong>
          </Toast.Header>
          <Toast.Body>
            User already exists. Choose a different username.
          </Toast.Body>
        </Toast>
        <Toast
          show={showServerError}
          onClose={toggleShowServerError}
          delay={3000}
          autohide
        >
          <Toast.Header style={{ color: "red" }}>
            <FontAwesomeIcon icon={faCircleExclamation} /> &nbsp;
            <strong className="me-auto">Server Error</strong>
          </Toast.Header>
          <Toast.Body>Server error, try again later. </Toast.Body>
        </Toast>
        <Toast
          show={showSuccess}
          onClose={toggleShowSuccess}
          delay={3000}
          autohide
        >
          <Toast.Header style={{ color: "green" }}>
            <FontAwesomeIcon icon={faCheck} /> &nbsp;
            <strong className="me-auto">User created</strong>
          </Toast.Header>
          <Toast.Body>Redirecting to Sign In page...</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}
