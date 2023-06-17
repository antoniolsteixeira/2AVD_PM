import AsyncStorage from "@react-native-async-storage/async-storage";

import { TotalTaxStorageDTOSearch } from "../TotalTaxStorageDTOSearch";

import { TAX_COLLECTION } from "../storageConfig";

export async function taxGetAllSearch() {
  try {
    const storage = await AsyncStorage.getItem(TAX_COLLECTION)

    const sale: TotalTaxStorageDTOSearch[] = storage ? JSON.parse(storage) : []

    return sale

  } catch (error) {
    throw error;
  }
}