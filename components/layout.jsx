import { Container } from "react-bootstrap";
import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }) {
  return (
    <Container fluid className="min-vh-100 d-flex flex-column m-0 p-0">
      <Header />
      <main className="d-flex flex-column flex-fill ">{children}</main>
      <Footer />
    </Container>
  );
}
