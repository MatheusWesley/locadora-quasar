export default class LocalStorageServices {
  constructor(key) {
    this.key = key;
  }

  // Obtém os dados do localStorage
  getFromStorage() {
    try {
      const data = localStorage.getItem(this.key);
      return JSON.parse(data) || [];
    } catch (error) {
      console.error('Erro ao obter dados do localStorage:', error);
      return [];
    }
  }

  // Salva os dados no localStorage
  saveToStorage(data) {
    try {
      localStorage.setItem(this.key, JSON.stringify(data));
      return data;
    } catch (error) {
      console.error('Erro ao salvar dados no localStorage:', error);
      return [];
    }
  }
}
