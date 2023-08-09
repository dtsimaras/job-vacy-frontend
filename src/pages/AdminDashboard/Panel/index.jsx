import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';

const events = []

function Panel() {
  const localizer = momentLocalizer(moment);

  return (
    <div>
        {/* TODO: Add leave percentage, leave charts */}
      <h2>Panel</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

export default Panel;
