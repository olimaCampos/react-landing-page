import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { MiApi } from "./components/MiApi";

function App() {

  return (
    <>
      <Navbar className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="">
            <img
              alt=""
              src="/assets/img/logo/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            SWAPI Gallery
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <MiApi />
      </Container>
    </>
  );
}

export default App;
