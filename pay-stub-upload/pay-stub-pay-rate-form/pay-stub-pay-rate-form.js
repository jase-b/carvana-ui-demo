import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import NumberFormat from 'react-number-format';
import { trackEvent, Tooltip } from '@carvana/purchase-helpers';
import { CarvanaButton } from '@carvana/purchase-styles';
import { incomeInformationEvents as events } from '../../../income-verification.analytics';
import { UploadDocument } from '../../../../../ducks/actions';
import * as payStubWizardStyles from '../../document-wizard-modal/document-wizard-modal.styles';
import * as payStubPayRateStyles from './pay-stub-pay-rate-form.styles';

const sc = { ...payStubWizardStyles, ...payStubPayRateStyles };

const FormInput = ({ isAllowed, labelText, name, prefix }) => {
  const { setFieldValue, values } = useFormikContext();

  return (
    <sc.Label>
      <NumberFormat
        allowNegative={false}
        customInput={sc.FormField}
        decimalScale={2}
        isAllowed={isAllowed}
        name={name}
        onValueChange={vals => setFieldValue(name, vals.floatValue || '')}
        prefix={prefix}
        thousandSeparator={true}
        value={values[name]}
      />
      <sc.LabelText className={values[name] && 'shrink'}>
        {labelText}
      </sc.LabelText>
    </sc.Label>
  );
};

FormInput.propsTypes = {
  isAllowed: PropTypes.func,
  prefix: PropTypes.string
};

FormInput.defaultProps = {
  isAllowed: null,
  prefix: ''
};

const GrossPayToolTip = () => {
  return (
    <>
      <sc.TooltipHeading>Gross Pay</sc.TooltipHeading>
      <span>Also referred to as gross wages, gross earnings, or regular pay. Gross pay includes PTO (paid time off), holidays, and sick time. It is your total earnings prior to deductions.</span>
    </>
  );
};

const PayStubPayRateForm = ({ goToStep }) => {
  const { activeDocument: { formData }, activeDocumentId: docId, selectedIncomeType } = useSelector(state => state.incomeInformation);
  const isSalary = selectedIncomeType === 'employedSalary';
  const { setFieldValue, values } = useFormikContext();

  useEffect(() => {
    if (formData?.grossPay || formData?.hourlyRate) {
      setTimeout(() => {
        if (formData.isHourly) {
          setFieldValue('hourlyRate', formData.hourlyRate);
          setFieldValue('hoursWorked', formData.hoursWorked);
        } else {
          setFieldValue('grossPay', formData.grossPay );
        }
      }, 0)
    }
  }, []);

  const gotToNextStep = () => {
    UploadDocument(values)
    .then(() =>{
      goToStep(4);
      trackEvent(events.UPLOAD_NEXT);
    });
  }

  return (
    <sc.WizardForm>
      <sc.FormHeading style={{ marginBottom: '20px' }}>
        Confirm your {docId === 2 && '2nd'} most recent pay stub
      </sc.FormHeading>

      {isSalary
        ?
        <sc.FormInputWrapper>
          <sc.FormQuestion>What is your&nbsp;
            <Tooltip
              content={<GrossPayToolTip />}
              onClose={() => trackEvent(events.UPLOAD_GROSS_PAY_TOOL_TIP_CLOSE)}
              onOpen={() => trackEvent(events.UPLOAD_GROSS_PAY_TOOL_TIP)}
            >
              <sc.TooltipElem>gross</sc.TooltipElem>
            </Tooltip>
            &nbsp;pay for this pay period&#63;</sc.FormQuestion>
          <FormInput
            isAllowed={vals => !vals.floatValue || vals.floatValue < 1000000000}
            labelText='Gross Pay'
            name='grossPay'
            prefix={'$'}
          />
        </sc.FormInputWrapper>
        :
        <>
          <sc.FormInputWrapper>
            <sc.FormQuestion>How much do you get paid per hour&#63;</sc.FormQuestion>
            <FormInput
              isAllowed={vals => !vals.floatValue || vals.floatValue < 1000000}
              labelText='Hourly Rate'
              name='hourlyRate'
              prefix={'$'}
            />
          </sc.FormInputWrapper>

          <sc.FormInputWrapper>
            <sc.FormQuestion>How many hours did you work this pay period&#63;</sc.FormQuestion>
            <FormInput
              isAllowed={vals => !vals.floatValue || vals.floatValue < 720}
              labelText='Number of Hours'
              name='hoursWorked'
            />
            <sc.TotalHoursText>
              Total hours can include paid time off (PTO), sick time and paid holidays.
            </sc.TotalHoursText>
          </sc.FormInputWrapper>
        </>
      }

      <CarvanaButton
        disabled={isSalary
          ? !values.grossPay
          : (!values.hourlyRate || !values.hoursWorked)
        }
        onClick={() => {
          gotToNextStep();
        }}
      >
        Next
      </CarvanaButton>
    </sc.WizardForm>
  );
}

PayStubPayRateForm.propsTypes = {
  goToStep: PropTypes.func.isRequired
};

export default PayStubPayRateForm;
