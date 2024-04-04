import PropTypes from 'prop-types';

// Define PropTypes for Appointment type
export const Appointment = PropTypes.shape({
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
});

// Define PropTypes for Blockout type
export const Blockout = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});

// Define PropTypes for EventItem type
export const EventItem = PropTypes.shape({
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
  data: PropTypes.shape({
    appointment: Appointment,
    blockout: Blockout,
  }),
  isDraggable: PropTypes.bool,
});
