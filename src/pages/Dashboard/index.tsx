import { useState } from 'react';
import { Alert } from 'react-native';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Container } from './styles';
import { InputAmount } from '../../components/InputAmount';
import { InputDate } from '../../components/InputDate';
import { convertDate } from '../../utils/converDate';
import { formatAmount } from '../../utils/formatAmount';
import { taxCreate } from '../../storage/tax/taxCreate';
import { taxGetAll } from '../../storage/tax/taxGetAll';

export function Dashboard() {
  const [invoice, setInvoice] = useState('');
  const [product, setProduct] = useState('');
  const [code, setCode] = useState('');
  const [invoiceAmount, setInvoiceAmount] = useState('');
  const [supplier, setSupplier] = useState('');
  const [dateOfInvoice, setDateOfInvoice] = useState('');

  async function handleAddNewTax() {
    if (!invoice || !product || !code || !invoiceAmount || !supplier || !dateOfInvoice) {
      Alert.alert('Todos os campos são obrigatórios');
      return;
    }

    if (code.trim() !== '1708' && code.trim() !== '3770' && code.trim() !== '3746') {
      Alert.alert('Apenas os códigos de impostos 1708, 3770 ou 3746');
      return;
    }

    const data = {
      invoice,
      product,
      code,
      invoiceAmount: formatAmount(invoiceAmount),
      supplier: supplier.toUpperCase(),
      dateOfInvoice: convertDate(dateOfInvoice),
    };

    try {
      await taxCreate(data);
      const result = await taxGetAll();
      console.log('Dados lidos ', result);
      clearFields();
    } catch (error) {
      console.error('Erro ao adicionar nova taxa:', error);
      Alert.alert('Erro ao adicionar nova taxa');
    }
  }

  function clearFields() {
    setInvoice('');
    setProduct('');
    setCode('');
    setInvoiceAmount('');
    setSupplier('');
    setDateOfInvoice('');
  }

  return (
    <Container>
      <Header title='Cadastro de Notas' />

      <Input
        placeholder='Nota Fiscal'
        placeholderTextColor='#FFFFFF'
        keyboardType='numeric'
        value={invoice}
        onChangeText={value => setInvoice(value)}
      />

      <Input
        placeholder='Produto'
        placeholderTextColor='#FFFFFF'
        value={product}
        onChangeText={value => setProduct(value)}
      />

      <Input
        placeholder='Codigo do Imposto'
        placeholderTextColor='#FFFFFF'
        keyboardType='numeric'
        value={code}
        onChangeText={value => setCode(value)}
      />

      <InputAmount
        placeholder='Valor do Imposto'
        placeholderTextColor='#FFFFFF'
        value={invoiceAmount}
        onChangeText={value => setInvoiceAmount(value)}
      />

      <Input
        placeholder='Fornecedor'
        placeholderTextColor='#FFFFFF'
        value={supplier}
        onChangeText={value => setSupplier(value)}
      />

      <InputDate
        placeholder='Data'
        placeholderTextColor='#FFFFFF'
        value={dateOfInvoice}
        onChangeText={value => setDateOfInvoice(value)}
      />

      <Button title='Adicionar' onPress={handleAddNewTax} />
    </Container>
  );
}
