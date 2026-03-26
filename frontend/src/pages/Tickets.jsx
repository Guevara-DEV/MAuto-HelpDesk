import { useEffect, useState } from "react";
import API from "../api/api";


export default function Tickets() {

    const [tickets, setTickets] = useState([]);

    const loadTickets = async () => {
        try {
            const res = await API.get("/tickets");
            setTickets(res.data);
        } catch (error) {
            console.log(error.response?.data);
        }
    };

    useEffect(() => {

        const fetchData = async () => {
            await loadTickets();
        };

        fetchData();

    }, []);

    return (
  <div>

    {/* Header */}
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Tickets</h2>

      <button
        onClick={() => window.location.href = "/create"}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Nuevo Ticket
      </button>
    </div>

    {/* Lista */}
    <div className="grid gap-4">

      {tickets?.map(t => (

        <div
          key={t.id}
          className="bg-white p-4 rounded shadow hover:shadow-lg transition"
        >

          {/* Título */}
          <h3 className="text-lg font-bold mb-1">
            {t.title}
          </h3>

          {/* Descripción */}
          <p className="text-gray-600 text-sm mb-3">
            {t.description}
          </p>

          {/* Info */}
          <div className="flex justify-between items-center">

            {/* Estado */}
            <span className={`px-3 py-1 rounded text-white text-xs
              ${t.status === "Abierto" ? "bg-gray-500" : ""}
              ${t.status === "En proceso" ? "bg-yellow-500" : ""}
              ${t.status === "Resuelto" ? "bg-green-600" : ""}
            `}>
              {t.status}
            </span>

            {/* Prioridad */}
            <span className={`text-xs font-bold
              ${t.priority === "Baja" ? "text-green-600" : ""}
              ${t.priority === "Media" ? "text-yellow-500" : ""}
              ${t.priority === "Alta" ? "text-red-500" : ""}
              ${t.priority === "Critica" ? "text-red-700" : ""}
            `}>
              {t.priority}
            </span>

          </div>

        </div>

      ))}

    </div>

  </div>
);
}