/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { VerificationDocument } from '@carvana/purchase-styles';
import * as actions from '../../../../ducks/actions';
import * as operations from '../../../../ducks/operations';

const DriversLicenseDocument = ({ document: doc }) => {
  const handleSelectedFile = files => {
    actions.SelectDriversLicenseFile({
      selectedFile: files[0],
      side: doc.side
    });
  };

  return (
    <VerificationDocument
      key={doc.title}
      documentId={doc.id}
      editFunction={() => actions.ViewDriversLicenseDocument(doc.id)}
      fileSelector={{
        enabled: !doc.status,
        handleSelectedFile
      }}
      title={doc.title}
      subtitle={operations.setVerificationDocumentSubtitle({ fileStatus: doc.status })}
      status={doc.status}
      showEdit={doc.status === 'incomplete'}
      showUpload={!doc.status}
    />
  );
};

DriversLicenseDocument.propTypes = {
  document: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    side: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
};

export default DriversLicenseDocument;