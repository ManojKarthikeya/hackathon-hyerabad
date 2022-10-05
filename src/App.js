import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Favorites from "./Pages/Favorites";

function App() {
	return (
		<div className="App">
			<Navbar>
				<NavbarBrand>Spandu & Manu</NavbarBrand>
				<Nav>
					<NavItem className="align-items-center">
						<NavLink className="text-black">
							<i class="bi bi-person-fill mx-2"></i>Sign In
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink className="text-black">
							<i class="bi bi-heart-fill mx-1" /> Favorites
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink className="text-black">
							<i class="bi bi-bag-fill mx-2"></i>Shopping Bag
						</NavLink>
					</NavItem>
				</Nav>
			</Navbar>
			<Routes>
				<Route path="/" element={<Homepage />}/>
				<Route path="/favorites" element={<Favorites/>} />
			</Routes>
		</div>
	);
}

export default App;
