import AsyncStorage from '@react-native-async-storage/async-storage'
import { TaxStorageDTO } from '../TaxStorageDTO';
import { TAX_COLLECTION } from '../storageConfig';
import { taxGetAll } from './taxGetAll';

export async function taxCreate(newSale: TaxStorageDTO) {
  try {
    const storageSale = await taxGetAll()

    const storage = [...storageSale, newSale]

    await AsyncStorage.setItem(TAX_COLLECTION, JSON.stringify(storage))
  } catch (error) {
    throw error;
  }

}