import {
  Container,
  Description,
  Amount,
  Footer,
} from "./styles";
import { TotalTaxStorageDTO } from "../../storage/TotalTaxStorageDTO";


type Props = {
  data: TotalTaxStorageDTO
}

export function TotalImposto({data }: Props) {
  return (
    <Container>
      
      <Description>Codigo do Imposto</Description>
      <Description>{data.code}</Description>
      <Footer>
        <Amount>R${data.totalAmount}</Amount>
      </Footer>
    </Container>
  )
}
