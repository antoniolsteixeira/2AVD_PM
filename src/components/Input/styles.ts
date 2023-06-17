import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize'


export const Container = styled.View`
  width: 100%;
  padding: ${RFValue(10)}px;
  
  
`;

export const InputStyle = styled.TextInput`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.GRAY_700};
  color: ${({ theme }) => theme.colors.WHITE};
  padding:${RFValue(10)}px;
  font-size:${RFValue(14)}px;
  margin-top: ${RFValue(2)}px;
  min-height: 56px;
  max-height: 56px;
  border-radius: 6px;
  padding: 16px;
`;