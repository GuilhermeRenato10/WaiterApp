import { Container } from "./styles";
import { Text } from "../Text";

export interface ButtonProps {
  children : string;
  onPress: () => void;
  disabled?: boolean;
}

export function Button({ children, onPress, disabled }: ButtonProps) {
  return(
    <Container onPress={onPress} disabled={disabled}>
      <Text weight="600" color="#fff">{children}</Text>
    </Container>
  );
}
