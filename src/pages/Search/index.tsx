import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Header } from '../../components/Header';
import { Container, Transactions } from './styles';
import { TaxStorageDTO } from '../../storage/TaxStorageDTO';
import { Alert, FlatList } from 'react-native';
import { taxGetAllSearch } from '../../storage/tax/taxGetAllSearch';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { SeachTax } from '../../components/SeachTax';

export type Total = {
  code?: string;
  supplier?: string;
  totals: number;
};

export function SearchTax() {
  const [code, setCode] = useState('');
  const [supplier, setSupplier] = useState('');
  const [dataExpenses, setDataExpenses] = useState<TaxStorageDTO[]>([]);
  const [total, setTotals] = useState<Total[]>([]);

  async function handleSearchSeller() {
    const trimmedCode = code.trim();
    const trimmedSupplier = supplier.trim();

    if (trimmedCode === '' && trimmedSupplier === '') {
      Alert.alert('Pesquisa de Taxas', 'Preencher corretamente');
      return;
    }

    const data = await fetchTaxData();

    const newData = data.filter(data => {
      const newCode = data.code.toUpperCase().includes(trimmedCode.toUpperCase());
      const newSupplier = data.supplier.toUpperCase().includes(trimmedSupplier.toUpperCase());
      return newCode && newSupplier;
    });

    setDataExpenses(newData);

    const newTotals = calculateTotals(newData);
    setTotals(newTotals);

    setCode('');
    setSupplier('');
  }

  const fetchTaxData = useCallback(async () => {
    try {
      const data = await taxGetAllSearch();
      return data;
    } catch (error) {
      // Tratar erros de busca de dados
      console.error('Erro ao buscar dados de taxas:', error);
      return [];
    }
  }, []);

  function calculateTotals(newData: TaxStorageDTO[]) {
    const newTotals = newData.reduce((soma: Total[], cur) => {
      const { code, supplier, invoiceAmount } = cur;
      let repetido;

      if (supplier !== '') {
        repetido = soma.find(elem => elem.supplier === supplier);
      } else if (code !== '') {
        repetido = soma.find(elem => elem.code === code);
      }

      if (repetido) {
        repetido.totals += invoiceAmount;
      } else {
        soma.push({
          code,
          supplier,
          totals: invoiceAmount,
        });
      }

      return soma;
    }, []);

    return newTotals;
  }

  return (
    <Container>
      <Header title='Pesquisa' />

      <Input
        placeholder='Codigo'
        placeholderTextColor='#FFFFFF'
        value={code}
        onChangeText={value => setCode(value)}
        keyboardType='numeric'
      />

      <Input
        placeholder='Fornecedor'
        placeholderTextColor='#FFFFFF'
        value={supplier}
        onChangeText={value => setSupplier(value)}
      />

      <Button title='Pesquisa' onPress={handleSearchSeller} />

      <Transactions>
        <FlatList
          data={total}
          renderItem={({ item }) => <SeachTax data={item} />}
        />
      </Transactions>
    </Container>
  );
}
