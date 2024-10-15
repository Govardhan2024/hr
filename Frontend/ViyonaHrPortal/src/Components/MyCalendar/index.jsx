// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const myEventsList = [
  {
    title: 'Conference',
    start: new Date(2024, 9, 20, 10, 0), // October 20, 2024, 10:00 AM
    end: new Date(2024, 9, 20, 12, 0), // October 20, 2024, 12:00 PM
  },
  {
    title: 'Meeting',
    start: new Date(2024, 9, 21, 14, 0), // October 21, 2024, 2:00 PM
    end: new Date(2024, 9, 21, 15, 0), // October 21, 2024, 3:00 PM
  },
];

const MyCalendar = () => (
  <div >
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
);

export default MyCalendar;
