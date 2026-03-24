const authService = require("../services/auth.service");

exports.login = async (req, res) => {
  try {

    const { username, password } = req.body;

    const result = await authService.login(username, password);

    res.json(result);

  } catch (error) {

    console.error(error);
    res.status(401).send("Credenciales inválidas");

  }
};