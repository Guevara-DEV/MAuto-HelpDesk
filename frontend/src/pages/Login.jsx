import { useState } from "react";
import API from "../api/api";

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {

      const res = await API.post("/auth/login", {
        username,
        password
      });

      localStorage.setItem("token", res.data.token);

      alert("Login correcto");

    } catch (error) {
      console.log("ERROR LOGIN:", error);
      console.log("RESPUESTA:", error.response?.data);
      alert("Error en login");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <h2 className="text-2xl font-bold text-red-500">
        Test Tailwind
      </h2>

      <input
        placeholder="Usuario"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Iniciar sesión
      </button>
    </div>
  );
}