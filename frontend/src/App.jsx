import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Tickets from "./pages/Tickets";
import CreateTicket from "./pages/CreateTicket";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/create" element={<CreateTicket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;