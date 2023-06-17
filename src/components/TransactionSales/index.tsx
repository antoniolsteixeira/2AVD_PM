import {
  Container,
  Description,
  Amount,
  Footer,
  Date,
} from "./styles";

import { convertDateToString } from "../../utils/convertDateToString";
import { TaxStorageDTO } from '../../storage/TaxStorageDTO'
import { formatCurrency } from '../../utils/formatCurrency';



type Props = {
  data: TaxStorageDTO
}


export function TransactionSales({ data }: Props) {
  return (
    <Container>
      <Description>Codigo do Imposto</Description>
      <Description>{data.code}</Description>
      <Description>Nota Fiscal</Description>
      <Description>{data.invoice}</Description>
      <Description>Produto</Description>
      <Description>{data.product}</Description>
      <Description>Fornecedor</Description>
      <Description>{data.supplier}</Description>
      
      <Footer>
        <Amount>{formatCurrency(data.invoiceAmount)}</Amount>
        <Date>{convertDateToString(data.dateOfInvoice).toLocaleDateString('pt-br')}</Date>
        
      </Footer>

    </Container>
  )
}
