import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Opcional: Interceptor para agregar token de autenticación en cada solicitud
axiosInstance.interceptors.request.use(
  (config) => {
    // Ejemplo: obtener el token del localStorage (ajusta según tu lógica de autenticación)
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Opcional: Interceptor para manejar errores de respuesta
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Maneja errores de autorización, por ejemplo, redirige al login
      console.error("No autorizado, por favor inicia sesión nuevamente.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
