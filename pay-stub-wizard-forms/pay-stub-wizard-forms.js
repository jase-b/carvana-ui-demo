import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { date as YupDate, object as YupObject } from 'yup';
import { Formik } from 'formik';
import { trackEvent } from '@carvana/purchase-helpers';
import { incomeInformationEvents as events } from '../../income-verification.analytics';
import PayStubDateRangeForm from './pay-stub-date-range-form';
import PayStubPayRateForm from './pay-stub-pay-rate-form';
import { documentWizardFormInitialValues, documentWizardFormSchema } from './pay-stub-wizard-forms.config';

const PayStubWizardForm = ({
  currentStepNumber,
  goToStep
}) => {
  const { id: docId } = useSelector(state => state?.incomeInformation?.activeDocument);
  const endDateLimit = docId === 1 ? 35 : 70;
  const endDateSchema = YupObject().shape({
    endDate: YupDate()
      .test(
        'endDateWithinRange',
        `End date needs to be within ${endDateLimit} days of today`,
        function (value) {
          return !value || moment().diff(moment(value), 'days') < (endDateLimit + 1);
        }
      )
  });
  const validationSchema = documentWizardFormSchema.concat(endDateSchema);

  useEffect(() => {
    trackEvent(events.UPLOAD_VIEW);
  }, [docId]);

  return (
    <Formik
      initialValues={documentWizardFormInitialValues}
      validationSchema={validationSchema}
    >
      <>
        {currentStepNumber === 2 &&
          <PayStubDateRangeForm goToStep={goToStep} />
        }
        {currentStepNumber === 3 &&
          <PayStubPayRateForm goToStep={goToStep} />
        }
      </>
    </Formik>
  );
}

PayStubWizardForm.propsTypes = {
  currentStepNumber: PropTypes.number.isRequired,
  goToStep: PropTypes.func.isRequired
};

export default PayStubWizardForm;
