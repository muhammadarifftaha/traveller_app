import React, { useState, useContext, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { deleteCookie, hasCookie, getCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  function getUser() {
    if (hasCookie("access_token")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }

  function handleLogout() {
    axios({
      url: `/api/session`,
      method: `delete`,
    }).then(() => {
      router.push("/");
      setLoggedIn(false);
    });
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect={true}>
      <Container>
        <Navbar.Brand>
          <Link passHref legacyBehavior href="/">
            <h2 className="m-0 p-0">Traveller App</h2>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            {loggedIn ? (
              <Link legacyBehavior passHref href="/dashboard">
                <Nav.Link>Dashboard</Nav.Link>
              </Link>
            ) : (
              <Link legacyBehavior passHref href="/">
                <Nav.Link>Home</Nav.Link>
              </Link>
            )}
            <Link legacyBehavior passHref href="/destinations">
              <Nav.Link>Destinations</Nav.Link>
            </Link>
            {loggedIn ? (
              <Nav.Link onClick={handleLogout}>Sign Out</Nav.Link>
            ) : (
              <>
                <Link legacyBehavior passHref href="/login">
                  <Nav.Link>Sign In</Nav.Link>
                </Link>
                <Link legacyBehavior passHref href="/Register">
                  <Nav.Link>Register</Nav.Link>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
