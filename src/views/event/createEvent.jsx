import React from "react";
import { Form, Input, DatePicker, Select, Button } from "antd";
import { useSelector } from "react-redux";
import axiosInstance from "../../axiosSetup";

const { Option } = Select;

const CreateEvent = (props) => {
  const [form] = Form.useForm();
  const { setEvents, events, setCreateformModal } = props;
  // Se obtiene el array de granjas y la granja seleccionada desde Redux
  const { farms, selectedFarm } = useSelector((state) => state.farm);
  const [pigs, setPigs] = React.useState([]);

  // Función para obtener los cerdos según la granja seleccionada
  const fetchPigsByFarm = async (farmId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(`/pig?farm_id=${farmId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setPigs(response.data.data);
      } else {
        setPigs([]);
      }
    } catch (error) {
      console.error("Error fetching pigs:", error);
      setPigs([]);
    }
  };

  // Cuando se cambia la granja en el formulario
  const handleFarmChange = (value) => {
    if (value) {
      fetchPigsByFarm(value);
      // Reiniciamos el campo de cerdo
      form.setFieldsValue({ pig_id: undefined });
    } else {
      setPigs([]);
      form.setFieldsValue({ pig_id: undefined });
    }
  };

  const onFinish = async (values) => {
    const payload = {
      message: values.message,
      pig_id: Number(values.pig_id),
      farm_id: Number(values.farm_id),
      reminder_date: values.reminder_date.format("YYYY-MM-DD"),
      type: "reminder",
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post("/events", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Evento creado con éxito:", response.data);
      setEvents([...events, response.data.data]);
      setCreateformModal(false);
      form.resetFields();
    } catch (error) {
      console.error("Error creando evento:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Falló la creación del evento:", errorInfo);
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20, background: "#fff", borderRadius: 8 }}>
      <h2 style={{ textAlign: "center" }}>Crear Evento</h2>
      <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          name="message"
          label="Mensaje"
          rules={[{ required: true, message: "Por favor, ingrese un mensaje" }]}
        >
          <Input placeholder="Ej: Vender animal" />
        </Form.Item>
        <Form.Item
          name="farm_id"
          label="Granja"
          rules={[{ required: true, message: "Por favor, seleccione la granja" }]}
          initialValue={selectedFarm ? selectedFarm.id : undefined}
        >
          <Select placeholder="Seleccione una granja" allowClear onChange={handleFarmChange}>
            {farms.map((farm) => (
              <Option key={farm.id} value={farm.id}>
                {farm.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="pig_id" label="Cerdo" rules={[{ required: true, message: "Por favor, seleccione el cerdo" }]}>
          <Select placeholder="Seleccione un cerdo" allowClear>
            {pigs.map((pig) => (
              <Option key={pig.id} value={pig.id}>
                {pig.birth_code ? pig.birth_code : `Cerdo ${pig.id}`}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="reminder_date"
          label="Fecha de Recordatorio"
          rules={[{ required: true, message: "Por favor, seleccione la fecha" }]}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
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
