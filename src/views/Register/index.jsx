import { useState } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import axiosInstance from "../../axiosSetup";
import { Link } from "react-router";

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log("Datos de registro:", values);
    setLoading(true);
    try {
      const response = await axiosInstance.post("/register", values);
      console.log("Registro exitoso:", response.data);
      message.success("Registro exitoso");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      message.error("Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Error en el registro:", errorInfo);
    message.error("Por favor, revisa el formulario");
  };

  const validatePasswordConfirmation = (_, value) => {
    if (!value || form.getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Las contraseñas no coinciden!"));
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
          form={form}
          name="register"
          layout="vertical"
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
        >
          <Form.Item
            label="Nombre Completo"
            name="name"
            rules={[{ required: true, message: "Por favor, ingresa tu nombre completo!" }]}
          >
            <Input placeholder="Pedro Soto" />
          </Form.Item>

          <Form.Item
            label="Correo Electrónico"
            name="email"
            rules={[
              { required: true, message: "Por favor, ingresa tu correo electrónico!" },
              { type: "email", message: "Ingresa un correo electrónico válido!" },
            ]}
          >
            <Input placeholder="pedro_soto@example.com" />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: "Por favor, ingresa tu contraseña!" }]}
            hasFeedback
          >
            <Input.Password placeholder="12345678" />
          </Form.Item>

          <Form.Item
            label="Confirmar Contraseña"
            name="password_confirmation"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Por favor, confirma tu contraseña!" },
              { validator: validatePasswordConfirmation },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="12345678" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Registrarse
            </Button>
          </Form.Item>
          <div style={{ textAlign: "center" }}>
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesion aqui</Link>
          </div>
        </Form>
      </Spin>
    </div>
  );
};

export default Register;
