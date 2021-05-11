import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import { ArrowBack, ArrowForward } from '@carvana/icons';
import { trackEvent } from '@carvana/purchase-helpers';
import { CalendarIcon } from '@carvana/purchase-icons';
import { CarvanaButton } from '@carvana/purchase-styles';
import { UploadDocument } from '../../../../../ducks/actions';
import { incomeInformationEvents as events } from '../../../income-verification.analytics';
import * as payStubWizardStyles from '../../document-wizard-modal/document-wizard-modal.styles';
import * as payStubDateRangeFormStyles from './pay-stub-date-range-form.styles';

const sc = { ...payStubWizardStyles, ...payStubDateRangeFormStyles };
const DATE_FORMAT = 'MM/DD/YYYY';

const PayStubDateRangeForm = ({ goToStep }) => {
  const { activeDocument: { formData }, activeDocumentId: docId, selectedIncomeType } = useSelector(state => state.incomeInformation);
  const { errors, setFieldValue, setTouched, touched, values } = useFormikContext();
  const { endDate, startDate } = values;
  const [focusedInput, setFocusedInput] = useState();
  const [legalNamePrinted, setLegalNamePrinted] = useState(false);
  const [employerNameMatches, setEmployerNameMatches] = useState(false);
  const isHourly = selectedIncomeType === 'employedHourly';
  const invalidDateMsg = errors?.endDate || errors?.startDate || errors?.dateRangeWithin31Days;

  const onDatesChange = ({
    startDate: newStartDate,
    endDate: newEndDate
  }) => {
    setTimeout(() => {
      if (newStartDate !== startDate) {
        setFieldValue('startDate', newStartDate?.format(DATE_FORMAT) || '');
        setTouched({ startDate: true });
      }

      if (newEndDate !== endDate) {
        setFieldValue('endDate', newEndDate?.format(DATE_FORMAT) || '');
        setTouched({ endDate: true });
      }

      if (!touched.startDate || (touched.startDate && !touched.endDate)) {
        setTouched({
          startDate: true,
          endDate: true
        });
      }
    }, 0)
  };

  useEffect(() => {
    setFieldValue('isHourly', isHourly);
    if (formData?.startDate) {
      setTimeout(() => {
        setFieldValue('startDate', moment(formData?.startDate.substring(0, 10)).format(DATE_FORMAT));
        setFieldValue('endDate', moment(formData?.endDate.substring(0, 10)).format(DATE_FORMAT));

        setTouched({
          startDate: true,
          endDate: true
        });
      }, 0)
    }
  }, []);

  useEffect(() => {
    const error = invalidDateMsg;

    if (error) trackEvent(events.UPLOAD_DATE_PICKER_VALIDATION, { error });
  }, [invalidDateMsg]);

  const gotToNextStep = () => {
    if (docId === 1) {
      goToStep(3);
      trackEvent(events.UPLOAD_NEXT);
    } else {
      UploadDocument(values)
        .then(() =>{
          goToStep(4);
          trackEvent(events.UPLOAD_NEXT);
        })
    }
  };

  return (
    <sc.WizardForm>
      <sc.FormHeading>Upload your {docId === 2 && '2nd'} most recent pay stub</sc.FormHeading>
      <sc.WizardText style={{ marginBottom: '24px'}}>
        This pay stub {docId === 1
          ? <>must be your most recent and <b>dated within the last 35 days.</b></>
          : <><b>must be consecutive to your most recent pay stub.</b></>
        }
      </sc.WizardText>
      <sc.FormQuestion>
        What is the date range of this pay stub&#63;
      </sc.FormQuestion>

      <sc.DateRangePickerWrapper className={invalidDateMsg && 'invalid'}>
        {invalidDateMsg && <sc.AlertIconRed />}
        <DateRangePicker
          readOnly
          anchorDirection='right'
          customArrowIcon={<></>}
          customInputIcon={<CalendarIcon />}
          displayFormat='MM/DD/YYYY'
          endDate={!endDate ? null : moment(endDate, DATE_FORMAT)}
          endDateId='endDate'
          focusedInput={focusedInput}
          hideKeyboardShortcutsPanel
          isOutsideRange={day =>
            day.isAfter(moment().endOf('day')) ||
            day.isBefore(moment().subtract(6, 'months'))
          }
          keepOpenOnDateSelect={false}
          maxDate={moment().add(7, 'days')}
          minDate={moment().subtract(6, 'months')}
          navNext={<ArrowForward />}
          navPrev={<ArrowBack />}
          numberOfMonths={1}
          onClose={({ startDate, endDate }) => {
            if (startDate && endDate)
            trackEvent(events.UPLOAD_DATE_PICKER_DONE, {
                startDate: startDate.format(DATE_FORMAT),
                endDate: endDate.format(DATE_FORMAT)
              });
            else
            trackEvent(events.UPLOAD_DATE_PICKER_CLOSE);
          }}
          onDatesChange={onDatesChange}
          onFocusChange={newFocusedInput => {
            setFocusedInput(newFocusedInput);
            if (!focusedInput) trackEvent(events.UPLOAD_DATE_PICKER_OPEN);
          }}
          required={false}
          showDefaultInputIcon={true}
          startDate={!startDate ? null : moment(startDate, DATE_FORMAT)}
          startDateId='startDate'
        />
        {invalidDateMsg && <sc.ValidationText>{invalidDateMsg}</sc.ValidationText>}
      </sc.DateRangePickerWrapper>

      <sc.FormCheckbox
        name='legalNamePrinted'
        label='My legal first and last name are on the document.'
        onChange={() => {
          setLegalNamePrinted(!legalNamePrinted);
          trackEvent(legalNamePrinted
            ? events.UPLOAD_NAME_UNSELECT
            : events.UPLOAD_NAME_SELECT);
        }}
        value={legalNamePrinted}
      />
      {docId === 2 &&
        <sc.FormCheckbox
          name='employerNameMatches'
          label='My employer name is on both documents.'
          onChange={() => {
            setEmployerNameMatches(!employerNameMatches);
            trackEvent(employerNameMatches
              ? events.UPLOAD_EMPLOYER_UNSELECT
              : events.UPLOAD_EMPLOYER_SELECT);
          }}
          value={employerNameMatches}
        />
      }
      <CarvanaButton
        disabled={!legalNamePrinted ||
          (docId === 2 && !employerNameMatches) ||
          (!touched.startDate && !touched.endDate) ||
          !!errors.startDate ||
          (!startDate || !endDate || errors.endDate?.includes('no later than today'))
        }
        onClick={() => { gotToNextStep(); }}
      >
        Next
      </CarvanaButton>
    </sc.WizardForm>
  );
};

PayStubDateRangeForm.propsTypes = {
  goToStep: PropTypes.func.isRequired
};

export default PayStubDateRangeForm;
