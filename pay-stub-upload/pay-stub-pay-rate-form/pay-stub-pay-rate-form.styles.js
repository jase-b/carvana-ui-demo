import styled from 'styled-components';

export const TooltipElem = styled.span`
  color: ${props => props.theme.carvana.blue.primary};
  text-decoration: underline;
`;

export const TooltipHeading = styled.span`
  display: block;
  font-weight: bold;
  margin-bottom: 7px;
`;

export const TotalHoursText = styled.p`
  color: ${props => props.theme.carvana.gray.dark};
  font-size: 12px;
  margin-top: 8px;
  max-width: 300px;
`;

export const FormInputWrapper = styled.div`
  margin-bottom: 40px;
`;