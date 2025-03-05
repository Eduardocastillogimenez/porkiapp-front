import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL_BACK;

const axiosInstance = axios.create({
  baseURL: apiUrl,
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
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
