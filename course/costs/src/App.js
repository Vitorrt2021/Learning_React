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

function App() {
  return (
    <Login> </Login>
    // <Router>
    //   <NavBar />
    //   <Container customClass="min_height">
    //     <Routes>
    //       <Route exat path="/" element={<Home />}></Route>
    //       <Route path="/projects" element={<Projects />}></Route>
    //       <Route path="/contact" element={<Contact />}></Route>
    //       <Route path="/newproject" element={<NewProject />}></Route>
    //       <Route path="/company" element={<Company />}></Route>
    //       <Route path="/project/:id" element={<Project />}></Route>
    //     </Routes>
    //   </Container>
    //   <Footer />
    // </Router>
  );
}

export default App;
