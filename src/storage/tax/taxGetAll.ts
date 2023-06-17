import AsyncStorage from "@react-native-async-storage/async-storage";

import { TaxStorageDTO } from "../TaxStorageDTO";

import { TAX_COLLECTION } from "../storageConfig";

export async function taxGetAll() {
  try {
    const storage = await AsyncStorage.getItem(TAX_COLLECTION)

    const sale: TaxStorageDTO[] = storage ? JSON.parse(storage) : []

    return sale

  } catch (error) {
    throw error;
  }
}