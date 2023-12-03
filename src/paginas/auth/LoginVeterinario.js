import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const LoginAdmin = () => {
  const navigate = useNavigate();

  const [veterinario, setVeterinario] = useState({
    email: '',
    password: ''
  });

  const { email, password } = veterinario;

  const onChange = (e) => {
    setVeterinario({
      ...veterinario,
      [e.target.name]: e.target.value
    });
  }

  useEffect(() => {
    document.getElementById("email").focus();
  }, []);

  const iniciarSesion = async () => {
    try {
      const response = await APIInvoke.invokeGET(`/Medicos?email=${veterinario.email}`);

      if (response.length === 0) {
        const msg = "El veterinario no existe. Verifique los datos ingresados.";
        swal({
          title: 'Error',
          text: msg,
          icon: 'error',
          buttons: {
            confirm: {
              text: 'Ok',
              value: true,
              visible: true,
              className: 'btn btn-danger',
              closeModal: true
            }
          }
        });
      } else {
        const storedPassword = response[0].password;

        if (password === storedPassword) {
          navigate("/homeMedico");
        } else {
          const msg = "Credenciales incorrectas. Verifique los datos ingresados.";
          swal({
            title: 'Error',
            text: msg,
            icon: 'error',
            buttons: {
              confirm: {
                text: 'Ok',
                value: true,
                visible: true,
                className: 'btn btn-danger',
                closeModal: true
              }
            }
          });
        }
      }
    } catch (error) {
      console.error("Error al verificar el administrador:", error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    iniciarSesion();
  }

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <Link to={"#"}>
            <b>Iniciar </b> Sesión Veterinario
          </Link>
        </div>

        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Bienvenido, ingrese sus credenciales</p>
            <form onSubmit={onSubmit}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />

                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />

                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>

              <div className="social-auth-links text-center mb-3">
                <p>- OR -</p>
                <button type="submit" className="btn btn-block btn-primary">
                  Ingresar
                </button>

                <Link to={"/CrearCuenta"} className="btn btn-block btn-danger">
                  Crear cuenta
                </Link>
                <Link to={"/"} className="btn btn-block btn-danger">
                  Login Usuarios
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;
