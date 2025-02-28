import React, { useState } from "react";
import { Calendar, Modal, List, Button } from "antd";
import ContainerMain from '../../components/Layout.jsx';
import CreateEvent from "./createEvent.jsx";
import styled from "styled-components";


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
  const [events, setEvents] = useState([
    { tipoEvento: "Vacunación", fechaEvento: "2025-03-01", duracion: 2, idAnimal: "123", nota: "Refuerzo anual", descripcion: "Vacunación contra la fiebre porcina" },
    { tipoEvento: "Alimentación", fechaEvento: "2025-03-01", duracion: 1, idAnimal: "12awfa46", nota: "Comida especial", descripcion: "Aumento de proteína en la dieta" },
    { tipoEvento: "Vacunación", fechaEvento: "2025-03-01", duracion: 1, idAnimal: "fawfa", nota: "Proteinas", descripcion: "Aumento de proteína en la dieta" },
    { tipoEvento: "Alimentación", fechaEvento: "2025-03-10", duracion: 1, idAnimal: "124afa", nota: "Comida especial", descripcion: "Aumento de proteína en la dieta" },
    { tipoEvento: "Alimentación", fechaEvento: "2025-03-10", duracion: 1, idAnimal: "124ahjj", nota: "especial", descripcion: "Aumento de proteína en la dieta" },
    { tipoEvento: "Alimentación", fechaEvento: "2025-03-20", duracion: 1, idAnimal: "12466", nota: "Comida especial", descripcion: "Aumento de proteína en la dieta" },
    { tipoEvento: "Alimentación", fechaEvento: "2025-03-22", duracion: 1, idAnimal: "12s364", nota: "Comida especial", descripcion: "Aumento de proteína en la dieta" },
    { tipoEvento: "Revisión médica", fechaEvento: "2025-03-05", duracion: 1, idAnimal: "4588dh6", nota: "Chequeo general", descripcion: "Revisión de salud completa" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [createformModal, setCreateformModal] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const dateCellRender = (value) => {
    const eventDate = value.format("YYYY-MM-DD");
    const dayEvents = events.filter(event => event.fechaEvento === eventDate);
    return dayEvents.length ? <div style={{ background: "#1890ff", color: "white", padding: "2px", borderRadius: "5px", textAlign: "center" }}>{dayEvents.length} Evento(s)</div> : null;
  };

  const onSelect = (value) => {
    const eventDate = value.format("YYYY-MM-DD");
    const dayEvents = events.filter(event => event.fechaEvento === eventDate);
    if (dayEvents.length) {
      setSelectedEvents(dayEvents);
      setModalVisible(true);
    }
  };

  const handleCreateEvent = (values) => {
    const newEvent = {
      tipoEvento: values.tipoEvento,
      fechaEvento: values.fechaEvento.format("YYYY-MM-DD"),
      duracion: values.duracion,
      idAnimal: values.idAnimal || "",
      nota: values.nota || "",
      descripcion: values.descripcion || "",
    };
    setEvents([...events, newEvent]);
    setCreateformModal(false);
  };

  return (
    <ContainerMain>
      <DivMain>
    <Container >
      <h2 style={{ textAlign: "center", marginTop: 20 }}>Calendario de Eventos</h2>
      <Button type="primary" style={{ marginBottom: 20, width: "20%" }} onClick={() => setCreateformModal(true)}>Crear Evento</Button>
      <ScrollableCalendar>
        <Calendar cellRender={dateCellRender} onSelect={onSelect} style={{ height: "100%" }} />
      </ScrollableCalendar>
      
      <Modal open={modalVisible} onCancel={() => setModalVisible(false)} footer={null}>
      <h3>Detalles de los Eventos</h3>
        <List
          dataSource={selectedEvents}
          renderItem={event => (
            <List.Item>
              <div>
                <p><strong>Tipo:</strong> {event.tipoEvento}</p>
                <p><strong>Fecha:</strong> {event.fechaEvento}</p>
                <p><strong>Duración:</strong> {event.duracion} días</p>
                {event.idAnimal && <p><strong>ID Animal:</strong> {event.idAnimal}</p>}
                {event.nota && <p><strong>Nota:</strong> {event.nota}</p>}
                {event.descripcion && <p><strong>Descripción:</strong> {event.descripcion}</p>}
              </div>
            </List.Item>
          )}
        />
      </Modal>
      
      <Modal open={createformModal} onCancel={() => setCreateformModal(false)} footer={null} title="Crear Evento">
        <CreateEvent setEvents={setEvents} events={events} setCreateformModal={setCreateformModal}/>
      </Modal>
    </Container>
    </DivMain>
    </ContainerMain>
  );
};

export default CalendarioEventos;
