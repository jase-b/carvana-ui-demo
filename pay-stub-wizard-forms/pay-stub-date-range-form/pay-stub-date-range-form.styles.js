import styled from 'styled-components';
import { AlertIcon as _AlertIcon } from '../../document-wizard-modal/document-wizard-modal.styles';
import dateRangePickerStyles from './date-range-picker.styles';

export const DateRangePickerWrapper = styled.div`
  ${dateRangePickerStyles}
  display: inline-block;
  position: relative;

  &.invalid .DateRangePickerInput {
    border-color: ${props => props.theme.carvana.red.primary};
  }
`;

export const AlertIconRed = styled(_AlertIcon).attrs({
  red: 'true'
})`
  position: absolute;
  right: 8px;
  top: 6px;
  z-index: 1;

  & > svg {
    height: 18px;
    width: 18px;
  }
`;

export const ValidationText = styled.span`
  color: ${props => props.theme.carvana.red.primary};
  display: block;
  font-size: 12px;
  margin-top: 8px;
`;