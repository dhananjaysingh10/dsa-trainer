import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Landing from "./pages/Landing";
import Navbar from "./components/Nabar";
import PrivateRoute from './components/PrivateRoute'
import ProfileDashboard from './pages/ProfileDashboard'
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/room/:code" element={<Room />} />
          <Route path="/profile" element={<ProfileDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
