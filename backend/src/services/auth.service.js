const pool = require("../config/db");
const jwt = require("jsonwebtoken");

exports.login = async (username, password) => {

  const result = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );

  const user = result.rows[0];

  if (!user) throw new Error("Usuario no existe");

  // 🔥 (por ahora sin bcrypt para simplificar)
  if (user.password !== password) {
    throw new Error("Password incorrecto");
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role_id
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role_id
    }
  };
};