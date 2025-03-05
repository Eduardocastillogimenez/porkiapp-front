// src/views/SelectFarm.jsx

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Form, Input, Button, Spin, message } from "antd";
import axiosInstance from "../../axiosSetup";
import { setSelectedFarm, setFarms } from "../../features/farms/farmSlice"; 

const SelectFarm = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { farms, selectedFarm } = useSelector((state) => state.farm);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(farms.length > 0 ? "none" : "create");

  // Maneja la creación de una nueva granja
  const onFinishCreate = async (values) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/farms", values);
    
      if (response.data.success) {
        const newFarm = response.data.data;
        dispatch(setFarms([...farms, newFarm.farm ]));
        message.success("Granja creada exitosamente");
      }

      setMode("none");
    } catch (error) {
      console.error("Error al crear la granja:", error);
      message.error("Error al crear la granja");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailedCreate = (errorInfo) => {
    console.error("Error al crear la granja:", errorInfo);
  };

  // Maneja la unión a una granja existente
  const onFinishJoin = async (values) => {
    setLoading(true);

    try {
      const response = await axiosInstance.post("/farms/join", values);
      if (response.data.success) {
        const joinedFarm = response.data.data;
        dispatch(setFarms([...farms, joinedFarm.farm]));
      }

      setMode("none");
    } catch (error) {
      console.error("Error al unirse a la granja:", error);
      message.error("Error al unirse a la granja");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailedJoin = (errorInfo) => {
    console.error("Error al unirse a la granja:", errorInfo);
  };

  const handleSelectFarm = (farm) => {
    dispatch(setSelectedFarm(farm));
    nav("/dashboard");
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
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "6px",
            boxShadow: "0 2px 8px rgba(34, 33, 33, 0.1)",
            width: "400px",
            maxWidth: "600px",
          }}
        >
          {mode === "none" && (
            <>
              <h2 style={{
                fontSize: "24px",
                marginTop: "12px",
                marginBottom: "18px"
              }}>Selecciona una Granja</h2>
              {farms.length === 0 ? (
                <>
                  <p>No tienes granjas creadas aún.</p>

                  <Button type="primary" block onClick={() => setMode("create")}>
                    Crear Granja
                  </Button>

                  <Button block style={{ marginTop: 10 }} onClick={() => setMode("join")}>
                    Unirse a una Granja
                  </Button>
                </>
              ) : (
                <>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {farms.map((farm, index) => (
                      <li
                        key={index}
                        style={{
                          padding: "8px 12px",
                          margin: "8px 0",
                          backgroundColor: "#fafafa",
                          borderRadius: "4px",
                          cursor: "pointer",
                          border: "1px solid #e6e2e2",
                          transition: "background-color 0.3s",
                        }}
                        
                        onClick={() => handleSelectFarm(farm)}
                      >
                          <strong>{farm.name}</strong> - {farm.location}
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: 24 }}>
                    <Button type="primary" onClick={() => setMode("create")} style={{ marginRight: 12 }}>
                      Crear Nueva Granja
                    </Button>

                    <Button onClick={() => setMode("join")}>Unirse a una Granja</Button>
                  </div>
                </>
              )}
            </>
          )}

          {mode === "create" && (
            <>
              <h2>Crear Granja</h2>
              <Form
                name="createFarm"
                layout="vertical"
                onFinish={onFinishCreate}
                onFinishFailed={onFinishFailedCreate}
              >
                <Form.Item
                  label="Nombre de la Granja"
                  name="name"
                  rules={[{ required: true, message: "Ingresa el nombre de la granja" }]}
                >
                  <Input placeholder="Granja de Eduardo" />
                </Form.Item>

                <Form.Item
                  label="Ubicación"
                  name="location"
                  rules={[{ required: true, message: "Ingresa la ubicación de la granja" }]}
                >
                  <Input placeholder="Las vegas" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Crear
                  </Button>
                </Form.Item>
              </Form>
              <div style={{ textAlign: "center" }}>
                <Button type="link" onClick={() => setMode("join")}>
                  Unirse a una Granja
                </Button>

                {farms.length > 0 && (
                  <Button type="link" onClick={() => setMode("none")}>
                    Volver a la lista
                  </Button>
                )}
              </div>
            </>
          )}

          {mode === "join" && (
            <>
              <h2>Unirse a una Granja</h2>
              <Form
                name="joinFarm"
                layout="vertical"
                onFinish={onFinishJoin}
                onFinishFailed={onFinishFailedJoin}
              >
                <Form.Item
                  label="Código de Invitación"
                  name="invitation_code"
                  rules={[{ required: true, message: "Ingresa el código de invitación" }]}
                >
                  <Input placeholder="GG324HKR" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Unirse
                  </Button>
                </Form.Item>
              </Form>

              <div style={{ textAlign: "center" }}>
                <Button type="link" onClick={() => setMode("create")}>
                  Crear Granja
                </Button>

                {farms.length > 0 && (
                  <Button type="link" onClick={() => setMode("none")}>
                    Volver a la lista
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </Spin>
    </div>
  );
};

export default SelectFarm;
