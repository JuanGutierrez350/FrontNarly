import React, { useState, useEffect } from "react";
import APIInvoke from "../../utils/APIInvoke";
import { Button, Modal, Table } from "react-bootstrap";


const CitasMedico = () => {
  const [citas, setCitas] = useState([]);
  const [selectedCita, setSelectedCita] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [rechazoModalShow, setRechazoModalShow] = useState(false);

  const cargarCitas = async () => {
    try {
      const response = await APIInvoke.invokeGET("/Citas");
      if (Array.isArray(response)) {
        setCitas(response);
      } else {
        console.error("La respuesta de la API no es un array válido.");
      }
    } catch (error) {
      console.error("Error al cargar las citas:", error);
    }
  };

  const handleAceptar = async () => {
    if (selectedCita) {
      try {
        // Lógica para aceptar la cita en la API
        // Puedes enviar una solicitud PUT o POST con el ID de la cita y el estado de "aceptada"
        // await APIInvoke.invokePUT(`/citas/${selectedCita.id}`, { estado: "aceptada" });

        // Recargar las citas después de aceptar
        cargarCitas();
        setModalShow(false);
      } catch (error) {
        console.error("Error al aceptar la cita:", error);
      }
    }
  };

  const handleRechazar = async () => {
    if (selectedCita) {
      try {
        // Lógica para rechazar la cita en la API
        await APIInvoke.invokePUT(`/Citas/${selectedCita.id}`, { estado: "rechazada" });

        // Eliminar la cita de la lista local
        setCitas(citas.filter((cita) => cita.id !== selectedCita.id));

        // Mostrar la ventana modal de rechazo
        setRechazoModalShow(true);

        // Cerrar la ventana modal principal
        setModalShow(false);
      } catch (error) {
        console.error("Error al rechazar la cita:", error);
      }
    }
  };

  const handlePosponer = async () => {
    if (selectedCita) {
      try {
        // Lógica para posponer la cita en la API
        // Puedes enviar una solicitud PUT o POST con el ID de la cita y el estado de "pospuesta"
        // await APIInvoke.invokePUT(`/citas/${selectedCita.id}`, { estado: "pospuesta" });

        // Recargar las citas después de posponer
        cargarCitas();
        setModalShow(false);
      } catch (error) {
        console.error("Error al posponer la cita:", error);
      }
    }
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  const openModal = (cita) => {
    setSelectedCita(cita);
    setModalShow(true);
  };

  const closeModal = () => {
    setModalShow(false);
  };

  const closeRechazoModal = () => {
    setRechazoModalShow(false);
  };

  return (
    <div>
      <h2>Citas Disponibles</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Nombre</th>
            <th>Motivo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id}>
              <td>{cita.fecha}</td>
              <td>{cita.hora}</td>
              <td>{cita.nombrePerro}</td>
              <td>{cita.descripcion}</td>
              <td>
                <Button variant="primary" onClick={() => openModal(cita)}>
                  Ver Detalles
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={modalShow} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Fecha: {selectedCita?.fecha}</p>
          <p>Hora: {selectedCita?.hora}</p>
          <p>Motivo: {selectedCita?.descripcion}</p>
          <Button variant="success" onClick={handleAceptar}>
            Aceptar
          </Button>{" "}
          <Button variant="danger" onClick={handleRechazar}>
            Rechazar
          </Button>{" "}
          <Button variant="warning" onClick={handlePosponer}>
            Posponer
          </Button>
        </Modal.Body>
      </Modal>

      {/* Ventana modal para mostrar el mensaje de rechazo */}
      <Modal show={rechazoModalShow} onHide={closeRechazoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cita Rechazada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Has rechazado la cita con éxito.</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CitasMedico;
