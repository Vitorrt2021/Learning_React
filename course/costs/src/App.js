import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/pages/Home";
import Company from "./components/pages/Company";
import NewProject from "./components/pages/NewProject";
import Contact from "./components/pages/Contact";

import Container from "./components/layout/Container";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Projects from "./components/pages/Projects";
import Project from "./components/pages/Project";
import Login from "./components/pages/Login";
import Cadastro from "./components/pages/Cadastro";
import Loading from "./components/layout/Loading";

function App() {
  const [connect, setConnect] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);

  useEffect(() => {
    const url = "http://localhost:3004/users/isconnect";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRemoveLoading(true);
        if (data.message !== "Acesso negado") {
          setConnect(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {!removeLoading && <Loading />}

      {removeLoading && (
        <>
          {!connect && (
            <Router>
              <Container customClass="min_height">
                <Routes>
                  <Route exat path="/" element={<Login />}></Route>
                  <Route path="/projects" element={<Projects />}></Route>
                  <Route path="/contact" element={<Contact />}></Route>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/register" element={<Cadastro />}></Route>
                  <Route path="/newproject" element={<NewProject />}></Route>
                  <Route path="/company" element={<Company />}></Route>
                  <Route path="/project/:id" element={<Project />}></Route>
                </Routes>
              </Container>
            </Router>
          )}
          {connect && (
            <Router>
              <NavBar />
              <Container customClass="min_height">
                <Routes>
                  <Route exat path="/" element={<Home />}></Route>
                  <Route path="/projects" element={<Projects />}></Route>
                  <Route path="/contact" element={<Contact />}></Route>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/register" element={<Cadastro />}></Route>
                  <Route path="/newproject" element={<NewProject />}></Route>
                  <Route path="/company" element={<Company />}></Route>
                  <Route path="/project/:id" element={<Project />}></Route>
                </Routes>
              </Container>
              <Footer />
            </Router>
          )}
        </>
      )}
    </>
  );
}

export default App;
