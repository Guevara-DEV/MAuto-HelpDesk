import { useState } from "react";
import API from "../api/api";

export default function CreateTicket() {

  const [form, setForm] = useState({
    title: "",
    description: "",
    category_id: 1,
    priority_id: 1,
    department_id: 1
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post("/tickets", form);

      alert("Ticket creado correctamente");

      // limpiar formulario
      setForm({
        title: "",
        description: "",
        category_id: 1,
        priority_id: 1,
        department_id: 1
      });

    } catch (error) {

      console.log(error.response?.data);
      alert("Error creando ticket");

    }
  };

  return (
    <div>
      <h2>Crear Ticket</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
        />

        <br /><br />

        <select name="category_id" onChange={handleChange}>
          <option value="1">Hardware</option>
          <option value="2">Software</option>
          <option value="3">Red</option>
        </select>

        <br /><br />

        <select name="priority_id" onChange={handleChange}>
          <option value="1">Baja</option>
          <option value="2">Media</option>
          <option value="3">Alta</option>
          <option value="4">Crítica</option>
        </select>

        <br /><br />

        <select name="department_id" onChange={handleChange}>
          <option value="1">HR</option>
          <option value="3">PRODUCTION</option>
          <option value="9">IT</option>
        </select>

        <br /><br />

        <button type="submit">Crear Ticket</button>

      </form>
    </div>
  );
}