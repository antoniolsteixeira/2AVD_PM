import { useState, useCallback, useEffect } from 'react';
import { FlatList, ActivityIndicator, View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Header } from '../../components/Header';
import { TransactionTax } from '../../components/TransactionTax';
import { taxGetAll } from '../../storage/tax/taxGetAll';
import { TaxStorageDTO } from '../../storage/TaxStorageDTO';

import {
  Container,
  Transactions,
  LoadingContainer,
  LoadingText,
} from './styles';

export function ListSales() {
  const [dataSales, setDataSales] = useState<TaxStorageDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const loadDataTax = async () => {
    try {
      setLoading(true);
      const data = await taxGetAll();
      setDataSales(data);
    } catch (error) {
      console.error('Error loading tax data:', error);
      
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadDataTax();
    }, [])
  );

  useEffect(() => {
    loadDataTax();
  }, []);

  return (
    <Container>
      <Header title="Listagem de Impostos" />

      {loading ? (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#000000" />
          <LoadingText>Carregando dados...</LoadingText>
        </LoadingContainer>
      ) : (
        <Transactions>
          {dataSales.length === 0 ? (
            <View>
              <Text>Nenhum imposto encontrado.</Text>
            </View>
          ) : (
            <FlatList
              data={dataSales}
              renderItem={({ item }) => <TransactionTax data={item} />}
              showsVerticalScrollIndicator={false}
            />
          )}
        </Transactions>
      )}
    </Container>
  );
}
