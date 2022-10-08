import { Modal, Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Favorites from "./Pages/Favorites";
import { useEffect, useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Profile from "./Components/Profile";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Orders from "./Components/Orders";
import AccountSettings from "./Components/AccountSettings";
import ForgotPassword from "./Components/ForgotPassword";

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const [reRender, setreRender] = useState(1);
  useEffect(() => {
    setUser(user);
  }, [location]);

  onAuthStateChanged(auth, (userProf) => {
    if (userProf && !user) {
      setUser(userProf);
    }
  });
  const [log, setLog] = useState("logIn");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <AuthProvider>
      <div className="App">
        <Modal isOpen={modal} centered toggle={toggle}>
          {log === "logIn" ? (
            <SignIn log={log} setLog={setLog} togglefun={toggle} />
          ) : log === "signUp" ? (
            <SignUp log={log} setLog={setLog} togglefun={toggle} />
          ) : (
            <ForgotPassword log={log} setLog={setLog} togglefun={toggle} />
          )}
        </Modal>
        <Navbar>
          <NavbarBrand href="/">Spandu & Manu</NavbarBrand>
          <Nav>
            <NavItem className="align-items-center">
              {user ? (
                <NavLink>
                  <Link
                    style={{ textDecoration: "none" }}
                    className="text-black"
                    to="/profile"
                  >
                    <i className="bi bi-person-fill mx-2"></i> My Account
                  </Link>
                </NavLink>
              ) : (
                <NavLink className="text-black" onClick={toggle}>
                  <i className="bi bi-person-fill mx-2"></i>
                  Sign In
                </NavLink>
              )}
            </NavItem>
            <NavItem>
              <NavLink className="text-black">
                <i className="bi bi-heart-fill mx-1" /> Favorites
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-black">
                <i className="bi bi-bag-fill mx-2"></i>Shopping Bag
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Routes>
          <Route path="" element={<Homepage />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="profile" element={<Profile user={user} />}>
            <Route path="orders" element={<Orders />} />
            <Route path="settings" element={<AccountSettings />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
