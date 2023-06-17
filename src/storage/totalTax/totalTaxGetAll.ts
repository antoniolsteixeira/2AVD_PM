import AsyncStorage from "@react-native-async-storage/async-storage";
import {  TAX_COLLECTION } from "../storageConfig";
import { TotalTaxStorageDTO } from "../TotalTaxStorageDTO";

export async function totalTaxGetAll() {
  try {
    const storage = await AsyncStorage.getItem(TAX_COLLECTION)

    const taxes: TotalTaxStorageDTO[] = storage ? JSON.parse(storage) : []

    return taxes

  } catch (error) {
    throw error;
  }
}