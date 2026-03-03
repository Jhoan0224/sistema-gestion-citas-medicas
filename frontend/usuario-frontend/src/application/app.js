

export default class App {


    // metodos static de la App, no necesitan estado
    static async getHistorialCitas() {
        const RESP = {success: true, hasHistory: false, historialCitas: [  {
    "cita": "C001",
    "motivo": "Control anual",
    "especialidad": "Cardiología",
    "fecha": "2024-03-05",
    "opciones": "Ver detalles"
  },
  {
    "cita": "C002",
    "motivo": "Dolor persistente",
    "especialidad": "Traumatología",
    "fecha": "2024-03-06",
    "opciones": "Editar"
  }]}
        return RESP;
    }

}