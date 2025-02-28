import React from "react";
import { Form, Input, DatePicker, Select, Button } from "antd";

const { Option } = Select;

const CreateEvent = (props) => {
  const [form] = Form.useForm();
  const {setEvents, events, setCreateformModal} = props;

  const onFinish = (values) => {
    console.log("Evento creado con éxito:", values);
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
    <div style={{ maxWidth: 500, margin: "auto", padding: 20, background: "#fff", borderRadius: 8 }}>
      <h2 style={{ textAlign: "center" }}>Crear Evento</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="tipoEvento"
          label="Tipo de Evento"
          rules={[{ required: true, message: "Por favor seleccione el tipo de evento" }]}
        >
          <Select placeholder="Seleccione un tipo de evento">
            <Option value="vacunacion">Vacunación</Option>
            <Option value="alimentacion">Alimentación</Option>
            <Option value="reproduccion">Reproducción</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="fechaEvento"
          label="Fecha del Evento"
          rules={[{ required: true, message: "Por favor seleccione la fecha del evento" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="duracion"
          label="Duración Promedio (días)"
          rules={[{ required: true, message: "Por favor ingrese la duración" }]}
        >
          <Input type="number" placeholder="Ingrese la duración en días" />
        </Form.Item>

        <Form.Item name="idAnimal" label="ID del Animal">
          <Input placeholder="Opcional: ID del animal asociado" />
        </Form.Item>

        <Form.Item name="nota" label="Nota del Evento">
          <Input.TextArea rows={2} placeholder="Opcional: Nota adicional" />
        </Form.Item>

        <Form.Item name="descripcion" label="Descripción">
          <Input.TextArea rows={3} placeholder="Opcional: Descripción del evento" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Crear Evento
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateEvent;
