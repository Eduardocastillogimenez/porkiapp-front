import { useEffect, useState } from "react";
import { Calendar, Modal, List, Button } from "antd";
import ContainerMain from "../../components/Layout.jsx";
import CreateEvent from "./createEvent.jsx";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axiosInstance from "../../axiosSetup";

const DivMain = styled.div`
  @media (max-width: 800px) {
    overflow-x: auto;
    position: relative;
  }
`;

const Container = styled.div`
  max-width: 60%;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;

  @media (max-width: 1340px) {
    max-width: 80%;
  }

  @media (max-width: 1100px) {
    max-width: 100%;
  }

  @media (max-width: 800px) {
    overflow-x: auto;
    width: 100%;
    min-width: 600px;
  }
`;

const ScrollableCalendar = styled.div`
  max-height: 700px;
  overflow-y: auto;
  min-width: 600px;

  @media (max-height: 1000px) {
    max-height: 600px;
  }

  @media (max-height: 920px) {
    max-height: 450px;
  }

  @media (max-height: 720px) {
    max-height: 200px;
  }
`;

const CalendarioEventos = () => {
  // Se obtiene la granja seleccionada desde Redux (suponemos que es el id o el objeto)
  const { selectedFarm } = useSelector((state) => state.farm);
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [createformModal, setCreateformModal] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);

  // Se obtiene la lista de eventos para la granja seleccionada
  useEffect(() => {
    const fetchEvents = async () => {
      if (!selectedFarm) return;
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get("/events", {
          headers: { Authorization: `Bearer ${token}` },
          params: { farm_id: selectedFarm.id || selectedFarm }, // Puede ser un objeto o el id directamente
        });
        if (response.data.success) {
          setEvents(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [selectedFarm]);

  // Renderiza el contador de eventos en cada celda del calendario basado en reminder_date
  const dateCellRender = (value) => {
    const eventDate = value.format("YYYY-MM-DD");
    const dayEvents = events.filter((event) => event.reminder_date === eventDate);
    return dayEvents.length ? (
      <div
        style={{
          background: "#1890ff",
          color: "white",
          padding: "2px",
          borderRadius: "5px",
          textAlign: "center",
        }}
      >
        {dayEvents.length} Evento(s)
      </div>
    ) : null;
  };

  // Al seleccionar una fecha se muestran los detalles de los eventos de ese día
  const onSelect = (value) => {
    const eventDate = value.format("YYYY-MM-DD");
    const dayEvents = events.filter((event) => event.reminder_date === eventDate);
    if (dayEvents.length) {
      setSelectedEvents(dayEvents);
      setModalVisible(true);
    }
  };

  return (
    <ContainerMain>
      <DivMain>
        <Container>
          <h2 style={{ textAlign: "center", marginTop: 20 }}>Calendario de Eventos</h2>
          <Button type="primary" style={{ marginBottom: 20, width: "20%" }} onClick={() => setCreateformModal(true)}>
            Crear Evento
          </Button>
          <ScrollableCalendar>
            <Calendar cellRender={dateCellRender} onSelect={onSelect} style={{ height: "100%" }} />
          </ScrollableCalendar>

          <Modal open={modalVisible} onCancel={() => setModalVisible(false)} footer={null}>
            <h3>Detalles de los Eventos</h3>
            <List
              dataSource={selectedEvents}
              renderItem={(event) => (
                <List.Item>
                  <div>
                    <p>
                      <strong>ID:</strong> {event.id}
                    </p>
                    <p>
                      <strong>Mensaje:</strong> {event.message}
                    </p>
                    <p>
                      <strong>Fecha de Recordatorio:</strong> {event.reminder_date}
                    </p>
                    <p>
                      <strong>ID del Cerdo:</strong> {event.pig_id}
                    </p>
                    <p>
                      <strong>Tipo:</strong> {event.type}
                    </p>
                    <p>
                      <strong>Activo:</strong> {event.active ? "Sí" : "No"}
                    </p>
                    {event.pig && (
                      <div style={{ marginLeft: 10 }}>
                        <p>
                          <strong>Datos del Cerdo:</strong>
                        </p>
                        <p>Género: {event.pig.gender}</p>
                        <p>Peso: {event.pig.weight}</p>
                        <p>Código de Nacimiento: {event.pig.birth_code}</p>
                        <p>Fecha de Nacimiento: {event.pig.birth_date}</p>
                      </div>
                    )}
                    {event.treatment && (
                      <div style={{ marginLeft: 10 }}>
                        <p>
                          <strong>Tratamiento:</strong>
                        </p>
                        <p>Nombre: {event.treatment.name}</p>
                        <p>Descripción: {event.treatment.description}</p>
                        <p>Estado: {event.treatment.status}</p>
                      </div>
                    )}
                  </div>
                </List.Item>
              )}
            />
          </Modal>

          <Modal open={createformModal} onCancel={() => setCreateformModal(false)} footer={null} title="Crear Evento">
            <CreateEvent setEvents={setEvents} events={events} setCreateformModal={setCreateformModal} />
          </Modal>
        </Container>
      </DivMain>
    </ContainerMain>
  );
};

export default CalendarioEventos;
