import AsyncStorage from '@react-native-async-storage/async-storage';

const CORES_KEY = '@cores_tarefas';

type CoresMap = Record<string, string>;

export async function salvarCorLocal(taskId: string, cor: string) {
  try {
    const json = await AsyncStorage.getItem(CORES_KEY);
    const cores: CoresMap = json ? JSON.parse(json) : {};
    cores[taskId] = cor;
    await AsyncStorage.setItem(CORES_KEY, JSON.stringify(cores));
  } catch (e) {
    console.error('Erro ao salvar cor local:', e);
  }
}

export async function buscarCores(): Promise<CoresMap> {
  try {
    const json = await AsyncStorage.getItem(CORES_KEY);
    return json ? JSON.parse(json) : {};
  } catch (e) {
    console.error('Erro ao buscar cores:', e);
    return {};
  }
}
