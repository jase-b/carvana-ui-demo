/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BBBLogo } from '@carvana/purchase-icons';
import store from '@carvana/purchase-store';
import { CarvanaButton, CheckboxNext, Panel, SubtitleNext, TitleNext } from '@carvana/purchase-styles';
import * as actions from '../../ducks/actions';
import * as sc from './drivers-license.styles';
import DriversLicenseDocument from './components/drivers-license-document';

const DriversLicense = () => {
  const { driversLicenseDocuments } = useSelector(state => state.driversLicense);

  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [imgReadableChecked, setImgReadableChecked] = useState(
    driversLicenseDocuments.every(file => file.uploaded)
  );
  const [filesSelected, setFilesSelected] = useState(false);
  const [filesUploaded] = useState(
    driversLicenseDocuments.every(file => file.status === 'complete')
  );

  const handleContinueButtonClick = () => {
    setUploadInProgress(true);

    if (filesSelected && !filesUploaded) {
      store.dispatch(actions.ScanDriversLicense({ images: driversLicenseDocuments }))
        .then(({ value }) => {
          if (value?.isValidScan === false) {
            setUploadInProgress(false);
            actions.OpenDriversLicenseInvalidModal();
          } else {
            store.dispatch(actions.UploadDriversLicenseAndRouteOnSuccess({ images: driversLicenseDocuments }));
          }
        })
        .catch(err => err);
    } else {
      store.dispatch(actions.GetDashboardAndRouteToNextStep());
    }
  };

  useEffect(() => {
    setFilesSelected(driversLicenseDocuments.every(
      file => file.status === 'incomplete'
    ));
  }, [driversLicenseDocuments]);

  return (
    <sc.Wrapper>
      <TitleNext>Let's start with your driver's license</TitleNext>
      <SubtitleNext>
        A valid, readable driver&apos;s license is required to purchase a vehicle from Carvana.
      </SubtitleNext>
      <Panel>
        {driversLicenseDocuments.map(doc => (
          <DriversLicenseDocument document={doc} key={`${doc.side}-${doc.id}`} />
        ))}
      </Panel>
      {!filesUploaded &&
        <sc.CheckboxWrapper>
          <CheckboxNext 
            name="img-readable-checkbox"
            text="I can read my driver's license and all four corners are visible for both front and back driver's license images."
            onChange={() => setImgReadableChecked(!imgReadableChecked)}
            value={imgReadableChecked}
          />
        </sc.CheckboxWrapper>
      }
      <sc.ButtonWrapper>
        <CarvanaButton
          disabled={!filesUploaded && (!filesSelected || !imgReadableChecked)}
          isLoading={uploadInProgress}
          onClick={handleContinueButtonClick}
          uppercase
        >
          {!filesUploaded && <>Upload &amp; </>}Continue
        </CarvanaButton>
        <BBBLogo style={{ marginTop: '80px' }} />
      </sc.ButtonWrapper>
    </sc.Wrapper>
  );
};

export default DriversLicense;