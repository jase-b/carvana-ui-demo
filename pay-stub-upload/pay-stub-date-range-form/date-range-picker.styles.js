import { css } from 'styled-components';
import 'react-dates/lib/css/_datepicker.css';

const commonStyles = {
  dateRangeInputDivider: css`
    border-right: 1px solid ${props => props.theme.carvana.gray.light};
    content: '';
    height: 52%;
    left: 51%;
    position: absolute;
    width: 15px;
  `,
  calendarDaySelected: css`
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  `
};

const dateRangePickerStyles = css`
  .DateRangePickerInput {
    align-items: center;
    border-color: ${props => props.theme.carvana.gray.light};
    border-radius: 3px;
    display: flex;
    height: 56px;
    padding: 0 28px 0 18px;
  }

  .DateRangePickerInput_calendarIcon {
    display: flex;
    margin: 0 18px 0 0;
    padding: 0;
  }

  .DateInput {
    width: 100px;
  }

  .DateInput_input {
    color: ${props => props.theme.carvana.blue.dark};
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    padding: 0;
    text-transform: uppercase;
  }

  .DateInput_input__focused {
    border-bottom-color: ${props => props.theme.carvana.blue.primary};
  }

  .DateRangePickerInput_arrow {
    align-self: stretch;
    position: relative;
    width: 40px;

    &::before {
      ${commonStyles.dateRangeInputDivider}
      border-radius: 0 0 4px 0;
      left: 0;
      top: 0;
      transform: skew(30deg);
    }

    &::after {
      ${commonStyles.dateRangeInputDivider}
      border-radius: 0 4px 0 0;
      bottom: 0;
      left: 0;
      transform: skew(-30deg);
    }
  }

  .DateRangePicker_picker {
    top: 80px !important;
  }

  .DayPickerNavigation {
    display: flex;
    justify-content: space-between;
  }

  .DayPickerNavigation_button {
    position: absolute;
    top: 24px;

    &:first-of-type {
      left: 26px;
    }

    &:last-of-type {
      right: 26px;
    }

    & svg {
      height: 16px;
      width: 16px;
    }

    & svg > g {
      fill: ${props => props.theme.carvana.blue.primary};
    }
  }

  .CalendarMonth_caption {
    color: ${props => props.theme.carvana.blue.dark};
  }

  .DayPicker_weekHeader_li {
    color: ${props => props.theme.carvana.blue.dark};
  }

  .CalendarDay {
    background-color: transparent;
    border: none;
    color: ${props => props.theme.carvana.gray.dark};
    position: relative;
    z-index: 1;

    &:hover {
      background-color: transparent;
      border: none;
    }

    &:not([class*='blocked']):hover {
      color: white;

      &::after {
        ${commonStyles.calendarDaySelected}
        background-color: ${props => props.theme.carvana.blue.primary};
        border-radius: 50%;
        z-index: -1;
      }
    }
  }

  .CalendarDay__selected {
    color: white;

    &:not([class*='no_selected_end']):not([class*='no_selected_start'])::before {
      ${commonStyles.calendarDaySelected}
      background-color: ${props => props.theme.carvana.gray.background};
      z-index: -2;
    }
  }

  .CalendarDay__selected_start {
    &::before {
      border-radius: 50% 0 0 50%;
    }

    &::after {
      ${commonStyles.calendarDaySelected}
      background-color: ${props => props.theme.carvana.green.primary};
      border-radius: 50%;
      z-index: -1;
    }
  }

  .CalendarDay__selected_end {
    &::before {
      border-radius: 0 50% 50% 0;
    }

    &::after {
      ${commonStyles.calendarDaySelected}
      background-color: ${props => props.theme.carvana.blue.medium};
      border-radius: 50%;
      z-index: -1;
    }
  }

  .CalendarDay__selected_span {
    &::before {
      ${commonStyles.calendarDaySelected}
      background-color: ${props => props.theme.carvana.gray.background};
      z-index: -1;
    }
  }

  .CalendarDay__blocked_out_of_range {
    color: ${props => props.theme.carvana.gray.light};

    &:hover {
      color: ${props => props.theme.carvana.gray.light};
    }
  }
`;

export default dateRangePickerStyles;
