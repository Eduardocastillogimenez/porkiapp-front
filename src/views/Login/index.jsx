import { useState } from "react";
import { Form, Input, Button, Checkbox, message, Spin } from "antd";
import { Link } from "react-router";
import axiosInstance from "../../axiosSetup";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log("Valores del formulario:", values);
    setLoading(true);
    try {
      // Realizamos la petición POST a /login con el body esperado.
      const response = await axiosInstance.post("/login", {
        email: values.email,
        password: values.password,
      });
      console.log("Inicio de sesión exitoso:", response.data);
      message.success("Inicio de sesión exitoso");
      // Aquí puedes agregar la lógica para redireccionar o almacenar el token, etc.
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      message.error("Error en el inicio de sesión");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Error en el formulario:", errorInfo);
    message.error("Por favor, revisa el formulario");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Spin spinning={loading}>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{
            width: "100%",
            maxWidth: "400px",
            minWidth: "350px",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
          layout="vertical"
        >
          <Form.Item
            label="Correo Electrónico"
            name="email"
            rules={[
              { required: true, message: "Por favor, ingresa tu correo!" },
              { type: "email", message: "Ingresa un correo electrónico válido!" },
            ]}
          >
            <Input placeholder="frank@example.com" />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: "Por favor, ingresa tu contraseña!" }]}
          >
            <Input.Password placeholder="12345678" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Recordarme</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Iniciar Sesión
            </Button>
          </Form.Item>
          <div style={{ textAlign: "center" }}>
            ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
          </div>
        </Form>
      </Spin>
    </div>
  );
};

export default Login;
