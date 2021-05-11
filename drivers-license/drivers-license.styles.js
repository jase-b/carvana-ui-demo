import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 760px;
`;

export const CheckboxWrapper = styled.div`
  margin-top: 24px;
`;

export const Label = styled.p`
  color: ${props => props.theme.carvana.gray.dark};
  line-height: 1.5;
`;

export const ButtonWrapper = styled.div`
  align-items: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
`;
