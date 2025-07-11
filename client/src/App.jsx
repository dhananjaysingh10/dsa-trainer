import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Landing from "./pages/Landing";
import Navbar from "./components/Nabar";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/room/:code" element={<Room />} />
      </Routes>
    </Router>
  );
}

export default App;
