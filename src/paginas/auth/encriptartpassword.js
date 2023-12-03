// encriptarPassword.js

const bcrypt = require("bcryptjs");

const encriptarPassword = async (password) => {
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error al encriptar la contraseña:", error);
    throw error;
  }
};

export default encriptarPassword;
