import { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select, InputNumber, DatePicker } from "antd";
import ContainerMain from "../../components/Layout.jsx";
import { TablePig } from "./table.jsx";
import { PigInfoModal } from "./report.jsx";
import styled from "styled-components";
import axiosInstance from "../../axiosSetup";
import { useDispatch, useSelector } from "react-redux";
import { setFarms } from "../../features/farms/farmSlice.js";

const FirmContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  @media (max-width: 360px) {
    display: block;
  }
`;

const Title = styled.h1`
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Dasboards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Inicializamos dataPick como arreglo vacío y se actualizará con la respuesta real
  const { farms, selectedFarm } = useSelector((state) => state.farm);
  const [dataPick, setDataPick] = useState([]);
  const [detailsPig, setDetailsPig] = useState(false);
  const [modalCreateFirm, setModalCreateFirm] = useState(false);
  const [pigInfo, setPigInfo] = useState(false);
  const [form] = Form.useForm();
  const [formFarm] = Form.useForm();

  const dispatch = useDispatch();

  // Se ejecuta al montar el componente para obtener los datos reales de cerdos
  useEffect(() => {
    const fetchPigs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get(`/pig?farm_id=${selectedFarm.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setDataPick(response.data.data);
        }
      } catch (error) {
        if (error.status === 404) setDataPick([]);
        console.error("Error fetching pigs: ", error);
      }
    };

    fetchPigs();
  }, [selectedFarm]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Función para registrar un nuevo cerdo (petición POST)
  const onFinish = async (values) => {
    try {
      const payload = {
        gender: values.genero === "Hembra" ? "female" : "male",
        weight: values.peso,
        farm_id: parseInt(values.farm_id, 10),
        birth_code: values.codigo,
        birth_date: values.birth_date.format("YYYY-MM-DD"),
      };

      const token = localStorage.getItem("token");
      const response = await axiosInstance.post("/pig/create", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setDataPick((prevData) => [...prevData, response.data.data]);
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Error creando el cerdo:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Función para crear una granja (petición POST)
  const handleFarmSubmit = async (values) => {
    try {
      const payload = {
        name: values.name,
        location: values.location,
      };

      const token = localStorage.getItem("token");
      const response = await axiosInstance.post("/farms", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        // Agregamos la granja creada a las opciones (suponiendo que la respuesta incluya un id)

        const response = await axiosInstance.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setFarms(response.data.data.user.farms));
      }
      setModalCreateFirm(false);
      formFarm.resetFields();
    } catch (error) {
      console.error("Error creando la granja:", error);
    }
  };

  const onFinishFailedFarm = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const seePigDetails = (birth_code) => {
    console.log("birth_code:", birth_code);
    setDetailsPig(true);
    const selectPig = dataPick.find((e) => e.birth_code === birth_code);
    setPigInfo(selectPig);
  };

  return (
    <ContainerMain>
      {/* Modal para registrar un cerdo */}
      <Modal
        title="Registro de cerdo"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={
          <Button type="primary" onClick={handleCancel}>
            Cancelar
          </Button>
        }
      >
        <Form
          name="registroCerdo"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* Campo para birth_code */}
          <Form.Item name="codigo" label="Código" rules={[{ required: true, message: "Introduzca el Código!" }]}>
            <Input />
          </Form.Item>
          {/* Campo para género */}
          <Form.Item name="genero" label="Género" rules={[{ required: true, message: "Seleccione el Género" }]}>
            <Select placeholder="Seleccione una opción" allowClear>
              <Select.Option value="Macho">Macho</Select.Option>
              <Select.Option value="Hembra">Hembra</Select.Option>
            </Select>
          </Form.Item>
          {/* Campo para peso */}
          <Form.Item name="peso" label="Peso" rules={[{ required: true, message: "Introduzca el Peso" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          {/* Campo para granja (farm_id) */}
          <Form.Item name="farm_id" label="Granja" rules={[{ required: true, message: "Seleccione la granja" }]}>
            <Select placeholder="Seleccione una granja" allowClear>
              {farms.map((option) => (
                <Select.Option key={option.name} value={option.id}>
                  {option.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {/* Campo para birth_date */}
          <Form.Item
            name="birth_date"
            label="Fecha de Nacimiento"
            rules={[{ required: true, message: "Seleccione la fecha de nacimiento" }]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal para crear una granja */}
      <Modal title="Crear granja" open={modalCreateFirm} footer={null} onCancel={() => setModalCreateFirm(false)}>
        <Form
          name="crearGranja"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          form={formFarm}
          onFinish={handleFarmSubmit}
          onFinishFailed={onFinishFailedFarm}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="Nombre de la granja"
            rules={[{ required: true, message: "Introduzca el nombre!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label="Ubicación"
            rules={[{ required: true, message: "Introduzca la ubicación!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Crear
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* detalles de los cerdos */}
      <Modal title="Detalles del cerdo" open={detailsPig} footer={null} onCancel={() => setDetailsPig(false)}>
        <PigInfoModal pigInfo={pigInfo} />
      </Modal>

      <FirmContent>
        <Button type="primary" onClick={() => setModalCreateFirm(true)}>
          Crear granja
        </Button>
      </FirmContent>
      <Title>Dashboard</Title>
      <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ margin: "20px 0" }}>
        Registrar cerdo
      </Button>
      <TablePig dataPick={dataPick} seePigDetails={seePigDetails} />
    </ContainerMain>
  );
};

export default Dasboards;
