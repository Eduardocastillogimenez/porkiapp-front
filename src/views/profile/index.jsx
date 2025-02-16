import React from 'react';
import { Layout, Card, Avatar, Descriptions, Row, Col } from 'antd';
import './index.css';
import ContainerMain from '../../components/Layout.jsx'

const { Header, Content } = Layout;
const { Meta } = Card;

const Profile = () => {
  const user = {
    nombre: 'Juan Pérez',
    correo: 'juan.perez@example.com',
    telefono: '+58 424-1234567',
    direccion: '123 Calle Falsa, Ciudad Ficticia, Venezuela',
    imagen: "https://th.bing.com/th/id/OIP.LpGfDv6YCiIB67DzTPPOGAAAAA?rs=1&pid=ImgDetMain"
  };

  return (
    <ContainerMain>
      <Row justify="center">
        <Col>
          <Card
            style={{ width: 400 }}
            cover={<img alt="example" src={user.imagen} />}
          >
            <Meta
              avatar={<Avatar src={user.imagen} />}
              title={user.nombre}
              description={user.correo}
            />
            <Descriptions column={1} bordered style={{ marginTop: '16px' }}>
              <Descriptions.Item label="Nombre">{user.nombre}</Descriptions.Item>
              <Descriptions.Item label="Correo">{user.correo}</Descriptions.Item>
              <Descriptions.Item label="Teléfono">{user.telefono}</Descriptions.Item>
              <Descriptions.Item label="Dirección">{user.direccion}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </ContainerMain>
  );
};

export default Profile;
