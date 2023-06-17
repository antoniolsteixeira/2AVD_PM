import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Header } from '../../components/Header';
import { Container, Transactions } from './styles';
import { TotalTaxStorageDTO } from '../../storage/TotalTaxStorageDTO';
import { taxGetAll } from '../../storage/tax/taxGetAll';
import { TotalImposto } from '../../components/TotalImposto';

export function TotalTaxes() {
  const [taxDataList, setTaxDataList] = useState<TotalTaxStorageDTO[]>([]);

  async function handleTotalTax() {
    const codeList = ['1708', '3770', '3746'];

    try {
      const data = await taxGetAll();
      const arrayData: TotalTaxStorageDTO[] = [];

      codeList.forEach(code => {
        const totalAmount = data
          .filter(dat => dat.code === code)
          .reduce((total, n) => total + n.invoiceAmount, 0);

        const dataObject: TotalTaxStorageDTO = {
          code,
          totalAmount,
        };

        arrayData.push(dataObject);
      });

      setTaxDataList(arrayData);
    } catch (error) {
      console.error('Erro ao obter dados de impostos:', error);
      setTaxDataList([]);
    }
  }

  useFocusEffect(useCallback(() => {
    handleTotalTax();
  }, []));

  return (
    <Container>
      <Header title='Totais de Impostos' />

      <Transactions>
        <FlatList
          data={taxDataList}
          renderItem={({ item }) => <TotalImposto data={item} />}
        />
      </Transactions>
    </Container>
  );
}
