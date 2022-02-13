import React from 'react';
import Template from 'templates/Template';
import RecordCalendar from 'components/Record/RecordCalendar';

const Record = () => {
  return (
    <Template>
      <h1>운동일지</h1>
      <RecordCalendar />
      <hr />
    </Template>
  );
};

export default Record;
