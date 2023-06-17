import {
  Container,
  Description,
  Amount,
  Footer,
  Date,
  Titles
} from "./styles";

import { convertDateToString } from "../../utils/convertDateToString";
import { TaxStorageDTO } from '../../storage/TaxStorageDTO'
import { formatCurrency } from '../../utils/formatCurrency';



type Props = {
  data: TaxStorageDTO
}

export function TransactionTax({ data }: Props) {
  
    
    const totalAmount = parseFloat(formatCurrency(data.invoiceAmount - (data.invoiceAmount * 0.0065) - (data.invoiceAmount * 0.03) - (data.invoiceAmount * 0.275))).toFixed(2);
    
    return (
      <Container>
        <Titles>
        <Description>CODIGO DO IMPOSTO</Description>
        </Titles>
        <Description>{data.code}</Description>
        <Titles>
        <Description>NOTA FISCAL</Description>
        </Titles>
        <Description>{data.invoice}</Description>
        <Titles>
        <Description>PRODUTO</Description>
        </Titles>
        <Description>{data.product}</Description>
        <Titles>
        <Description>FORNECEDOR</Description>
        </Titles>
        <Description>{data.supplier}</Description>
                  
          <Footer>
            
            <Amount>Valor do Imposto R$ {data.invoiceAmount}</Amount>
            
          </Footer>
          <Date>Data: {convertDateToString(data.dateOfInvoice).toLocaleDateString('pt-br')}</Date>

    </Container>
  )
}


