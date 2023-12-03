import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './paginas/auth/login';
import LoginVeterinario from './paginas/auth/LoginVeterinario';
import CrearCuenta from './paginas/auth/CrearCuenta';
import Home from './paginas/home';
import HomeAdmin from './paginas/HomeAdmin';
import HomeMedico from './paginas/homeMedico';
import PanelAdmin from './paginas/GestionDeCitas/PanelAdmin';
import ProductosCrear from './paginas/GestionDeCitas/ProductosCrear';
import ProductosEditar from './paginas/GestionDeCitas/ProductosEditar';
import Productos from './paginas/GestionDeCitas/Productos';
import LoginAdmin from './paginas/auth/LoginAdmin';
import PanelUsuarios from './paginas/GestionDeCitas/PanelUsuarios';
import UsuariosEditar from './paginas/GestionDeCitas/UsuariosEditar';
import ProductoComprar from './paginas/GestionDeCitas/ProductoComprar';
import UsuarioCrear from './paginas/GestionDeCitas/UsuarioCrear';
import AgendarCitas from './paginas/GestionDeCitas/AgendarCitas';
import CitasMedico from './paginas/GestionDeCitas/CitasMedico';










/*import logo from './logo.svg';
import './App.css';*/

function App() {
  return (
    <Fragment>
      
      <Router>
        <Routes>
          <Route path="/" exact element={<Login/>}/> 
          <Route path="/CrearCuenta" exact element={<CrearCuenta/>}/>
          <Route path="/Home" exact element={<Home/>}/>
          <Route path="/HomeAdmin" exact element={<HomeAdmin/>}/>
          <Route path="/PanelAdmin" exact element={<PanelAdmin/>}/>
          <Route path="/ProductosCrear" exact element={<ProductosCrear/>}/>
          <Route path="/ProductosEditar/:idProducto" element={<ProductosEditar />} />
          <Route path="/Productos" exact element={<Productos/>}/>
          <Route path="/LoginAdmin" exact element={<LoginAdmin/>}/>
          <Route path="/LoginVeterinario" exact element={<LoginVeterinario/>}/>
          <Route path="/PanelUsuarios" exact element={<PanelUsuarios/>}/>
          <Route path="/UsuariosEditar/:idUsuario" element={<UsuariosEditar />} />
          <Route path="/ProductoComprar/:idProducto/:idUsuario" element={<ProductoComprar />} />
          <Route path="/UsuarioCrear" element={<UsuarioCrear />} />
          <Route path="/AgendarCitas" element={<AgendarCitas />} />
          <Route path="/homeMedico" element={<HomeMedico />} />
          <Route path="/CitasMedico" element={<CitasMedico />} />

        </Routes>
      </Router>
    </Fragment>
    
  );
}

export default App;