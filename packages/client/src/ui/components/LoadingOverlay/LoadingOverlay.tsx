import * as React from 'react';

import './LoadingOverlay.css';

interface Props {
  visible: boolean;
}

export const LoadingOverlay: React.FC<Props> = ({
  visible,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="LoadingOverlay-wrapper">
      <div className="LoadingOverlay-text">Loading...</div>
    </div>
  );
}