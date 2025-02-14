import styled from "styled-components/native"
import { ButtonProps } from "./index";

export const Container = styled.TouchableOpacity<ButtonProps>`
  background: ${({ disabled }: { disabled: React.ReactNode}) => disabled ? '#999' : '#D73035'};
  border-radius: 48px;
  padding: 14px 24px;
  align-items: center;
  justify-content: center;
`;
