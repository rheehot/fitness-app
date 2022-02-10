import React from 'react';
import Template from 'templates/Template';
import RecordCalendar from 'components/Record/RecordCalendar';

const Record = () => {
  return (
    <Template>
      <RecordCalendar initialMonth={2} />
    </Template>
  );
};

export default Record;
