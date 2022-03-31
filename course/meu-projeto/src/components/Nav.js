import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";

import Home from "../pages/Home";
import Empresa from "../pages/Empresa";
import Contato from "../pages/Contato";
import Main from "./Main";
function Nav() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">
            <AiFillHome />
            Home
          </Link>
        </li>
        <li>
          <Link to="/main">Main</Link>
        </li>
        <li>
          <Link to="/empresa">Empresa</Link>
        </li>
        <li>
          <Link to="/contato">
            <AiOutlineMail />
            Contato
          </Link>
        </li>
      </ul>
      <Routes>
        <Route exat path="/" element={<Home />}></Route>
        <Route path="/empresa" element={<Empresa />}></Route>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/contato" element={<Contato />}></Route>
      </Routes>
    </Router>
  );
}
export default Nav;
