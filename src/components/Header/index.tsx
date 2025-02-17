import { Container, Content, OrderHeader, TableOrder } from "./styles";
import { Text } from "../Text";
import { TouchableOpacity } from "react-native";

interface HeaderProps {
  selectedTable: string;
  onCancelOrder: () => void;
}

export function Header({ selectedTable, onCancelOrder }: HeaderProps) {
  return(
    <Container>
      {!selectedTable && (
        <>
          <Text size={14} opacity={0.9}>Bem vindo(a) ao</Text>
          <Text size={24} weight='700'>
            WAITER
            <Text size={24}>APP</Text>
          </Text>
        </>
      )}

      {selectedTable && (
        <Content>
          <OrderHeader>
            <Text weight="600" size={24}>Pedido</Text>
              <TouchableOpacity onPress={onCancelOrder}>
                <Text
                  color="#D73035"
                  weight="600"
                  size={14}
                >
                cancelar pedido
                </Text>
              </TouchableOpacity>
          </OrderHeader>

          <TableOrder>
            <Text color="#666666">Mesa {selectedTable}</Text>
          </TableOrder>
        </Content>
      )}
    </Container>
  );
}
