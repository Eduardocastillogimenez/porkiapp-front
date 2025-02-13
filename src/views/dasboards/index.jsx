import React, { useState } from 'react';
import { Table, Button, Modal, Checkbox, Form, Input, Select, InputNumber } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import ContainerMain from '../../components/Layout.jsx'
import { TablePig } from './utils.jsx'

const Dasboards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);

  const addPig = () => {
    setIsModalOpen(true);
  };
  
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };


  return (
    <ContainerMain>
      <Modal title="Registro de cerdo" open={isModalOpen}
        footer={
          <Button type="primary" onClick={handleCancel}>
            Cancelar
          </Button>
        }
      >
        <Form name="basic" labelCol={{ span: 8, }} wrapperCol={{ span: 16, }} style={{ maxWidth: 600, }}
          initialValues={{ remember: true, }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off"
        >
          <Form.Item name="codigo" label="Codigo"  rules={[ { required: true, message: 'Introduzca el Codigo!', }, ]} >
            <Input />
          </Form.Item>

          <Form.Item name="codigoParto" label="codigo de parto"  rules={[ { required: true, message: 'Introduzca el codigo de parto', }, ]} >
            <Input />
          </Form.Item>

          {/* <Form.Item label="Password" name="password"
            rules={[ { required: true, message: 'Please input your password!',  }, ]}
          >
            <Input.Password />
          </Form.Item> */}

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

          {/* <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      
      </Modal>
      <Button type='primary' onClick={addPig}>Registrar cerdo</Button>
      {/* <Table columns={columns} dataSource={data} onChange={onChange} /> */}
      <TablePig/>
    </ContainerMain>
   
)
} 
export default Dasboards;