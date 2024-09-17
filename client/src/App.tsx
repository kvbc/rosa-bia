import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/GlownaStrona";
import RegistersPage from "./pages/RejestryStrona";
import GeodesyPage from "./pages/GeodezjaStrona";
import InvestorsPage from "./pages/InwestorzyStrona";
import Navbar from "./components/home_page/Navbar";
import "./App.css";
import PKOBStrona from "./pages/PKOBStrona";
import KonfiguracjaStrona from "./pages/KonfiguracjaStrona";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <br />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/rejestry" element={<RegistersPage />} />
                    <Route path="/geodezja" element={<GeodesyPage />} />
                    <Route path="/inwestorzy" element={<InvestorsPage />} />
                    <Route path="/pkob" element={<PKOBStrona />} />
                    <Route
                        path="/konfiguracja"
                        element={<KonfiguracjaStrona />}
                    />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
