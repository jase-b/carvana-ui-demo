import React from 'react';
import { DashboardModalActions as modal } from '@carvana/purchase-helpers';
import { CarvanaButton } from '@carvana/purchase-styles';
import * as sc from './drivers-license-invalid-modal.styles';

const DriversLicenseInvalidModal = () => {
  return (
    <sc.Wrapper>
      <sc.TextWrapper>
        <sc.HeadingWrapper>
          <sc.Heading>We were unable to read your driver&apos;s license</sc.Heading>
          <sc.Subheading>Please try again with higher quality images. Some tips:</sc.Subheading>
        </sc.HeadingWrapper>
        <sc.List>
          <sc.ListItem>Make sure all four corners of the driver&#39;s license are visible in the images.</sc.ListItem>
          <sc.ListItem>Make sure there&#39;s no glare on the driver&#39;s license photos from the camera.</sc.ListItem>
          <sc.ListItem>Double-check your driver&#39;s license expiration date. We cannot accept expired driver&#39;s licenses.</sc.ListItem>
        </sc.List>
      </sc.TextWrapper>
      <sc.ButtonWrapper>
        <CarvanaButton onClick={modal.CloseModal} text='Try Again' uppercase />
      </sc.ButtonWrapper>
    </sc.Wrapper>
  );
};

export default DriversLicenseInvalidModal;