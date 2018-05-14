import React from 'react';
import spinner from './lg.double-ring-spinner.gif';

export default () => {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading..."
        style={{ width: '200px', margin: 'auto', display: 'block' }}
      />
    </div>
  );
};
