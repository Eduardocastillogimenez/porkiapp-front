import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select, InputNumber, Space } from 'antd';
import ContainerMain from '../../components/Layout.jsx'
import { TablePig } from './table.jsx';
import styled from "styled-components";

const FirmContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const data = [
  {
    key: '12gda623',
    codigo: '12gda623',
    codigoParto: '4455',
    edad: 32,
    peso: 12,
    genero: 'Macho',
  },
  {
    key: 'awfwa5256',
    codigo: 'awfwa5256',
    codigoParto: '4455565',
    edad: 42,
    peso: 10,
    genero: 'Hembra',
  },
  {
    key: 'watwwa8148',
    codigo: 'watwwa8148',
    codigoParto: '445574',
    edad: 32,
    peso: 85,
    genero: 'Macho',
  },
  {
    key: 'awwf0065',
    codigo: 'awwf0065',
    codigoParto: '0055',
    edad: 32,
    peso: 50,
    genero: 'Hembra',
  },
];

const selectFimOption = [
  {
    value: 'granjaLucy',
    label: 'Granja de Lucy',
  },
  {
    value: 'Yiminghe',
    label: 'yiminghe el granjero',
  }
]

const Dasboards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataPick, setDataPick] = useState(data);
  const [modalCreateFirm, setModalCreateFirm] = useState(false);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    values.key = values.codigo;
    const dataPickTemporary = dataPick;
    dataPickTemporary.push(values);
    setDataPick(dataPickTemporary);
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  const handleChangeFirm = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <ContainerMain>
      <Modal title="Registro de cerdo" open={isModalOpen} onCancel={()=> setIsModalOpen(false)}
        footer={
          <Button type="primary" onClick={handleCancel}>
            Cancelar
          </Button>
        }
      >
        <Form name="basic" labelCol={{ span: 8, }} wrapperCol={{ span: 16, }} style={{ maxWidth: 600, }} form={form}
          initialValues={{ remember: true, }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off"
        >
          <Form.Item name="codigo" label="Codigo"  rules={[ { required: true, message: 'Introduzca el Codigo!', }, ]} >
            <Input />
          </Form.Item>

          <Form.Item name="codigoParto" label="codigo de parto"  rules={[ { required: true, message: 'Introduzca el codigo de parto', }, ]} >
            <Input />
          </Form.Item>

          <Form.Item name="genero" label="Genero" rules={[ { required: true, message: 'Introduzca el Genero', } ]} >
            <Select placeholder="Seleccione una opción" allowClear >
              <Option value="Macho">Macho</Option>
              <Option value="Hembra">Hembra</Option>
            </Select>
          </Form.Item>

          <Form.Item name="edad" label="Edad" rules={[ { required: true, message: 'Introduzca la edad', }, ]} >
            <InputNumber style={{ width: '100%', }} />
          </Form.Item>

          <Form.Item name="peso" label="Peso" rules={[ { required: true, message: 'Introduzca la peso', }, ]} >
            <InputNumber style={{ width: '100%', }} />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="Crear granja" open={modalCreateFirm} footer={null} onCancel={()=> setModalCreateFirm(false)}>
        
      </Modal>

    <FirmContent>
      <Button type='primary' onClick={()=> setModalCreateFirm(true)}>Crear granja</Button>
      <Space wrap>
        <Select defaultValue="granjaLucy" style={{maxWidth: '200px'}}  onChange={handleChangeFirm} options={selectFimOption} />
      </Space>
    </FirmContent>
      
      <h1>Dashboard</h1>
      <Button type='primary' onClick={()=> setIsModalOpen(true)}>Registrar cerdo</Button>
      <TablePig dataPick={dataPick}/>
    </ContainerMain>
   
)
} 
export default Dasboards;