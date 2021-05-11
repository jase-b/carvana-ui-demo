import moment from 'moment';
import { boolean as YupBoolean, date as YupDate, object as YupObject , number as YupNumber } from 'yup';

export const documentWizardFormInitialValues = {
  hourlyRate: '',
  endDate: '',
  grossPay: '',
  hoursWorked: '',
  startDate: '',
  isHourly: null
};

export const documentWizardFormSchema = YupObject().shape({
  dateRangeWithin31Days: YupBoolean()
    .test(
      'dateRangeWithin31Days',
      'Date range should not be beyond 31 days',
      function () {
        const { startDate, endDate } = this.parent

        return (!startDate || !endDate) ||
          moment(endDate)?.diff(moment(startDate), 'days') <= 31;
      }),
  hourlyRate: YupNumber(),
  endDate: YupDate()
    .max(moment(), 'End date must be no later than today')
    .required('End date is required'),
  grossPay: YupNumber(),
  hoursWorked: YupNumber(),
  startDate: YupDate()
    .max(moment(), 'Start date must be no later than today')
    .required('Start date is required')
});
