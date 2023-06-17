import { Total } from "../../pages/Search";
import {
  Container,
  Description,
  Amount,
  Footer,
} from "./styles";

type Props = {
  data: Total
}

export function SeachTax({ data }: Props) {
  
    
    return (
      <Container>
      
      <Description>Codigo do Imposto</Description>
      <Description>{data.code}</Description>
      <Footer>
        <Amount>R${data.totals}</Amount>
      </Footer>
    </Container>
  )
}


