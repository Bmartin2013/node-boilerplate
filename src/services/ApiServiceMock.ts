// leave it as it is once we have the real API
export class ApiService {
  async getMembers(): Promise<string[]> {
    return ["1234567890", "234567891"]; // Ejemplo de prueba
  }
}

export default ApiService;
