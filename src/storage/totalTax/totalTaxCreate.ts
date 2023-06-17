import AsyncStorage from '@react-native-async-storage/async-storage'
import { TotalTaxStorageDTO } from '../TotalTaxStorageDTO';
import { TAX_COLLECTION, TOTAL_TAX_COLLECTION } from '../storageConfig';
import { totalTaxGetAll } from './totalTaxGetAll';

export async function totalTaxCreate(newSale: TotalTaxStorageDTO) {
  try {
    const storageTotal = await totalTaxGetAll()

    const storage = [...storageTotal, newSale]

    await AsyncStorage.setItem(TOTAL_TAX_COLLECTION, JSON.stringify(storage))
  } catch (error) {
    throw error;
  }

}