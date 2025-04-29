import { BrowserRouter } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import ActiveSectionContextProvider from "./context/activeSectionProvider";
import Layout from "./components/Layout";
import Intro from "./components/Intro";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import ThemeSwitch from "./components/ThemeSwitch";
import ThemeContextProvider from "./context/ThemeContextProvider";
import About from "./components/About";

function App() {
	return (
		<BrowserRouter>
			<ThemeContextProvider>
				<ActiveSectionContextProvider>
					<Layout>
						<NavBar />
						<Intro />
						<Projects />
						<Skills />
						<About />
						<ThemeSwitch />
					</Layout>
				</ActiveSectionContextProvider>
			</ThemeContextProvider>
		</BrowserRouter>
	);
}

export default App;
