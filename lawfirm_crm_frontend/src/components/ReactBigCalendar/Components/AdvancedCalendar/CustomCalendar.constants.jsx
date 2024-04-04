import moment from "moment";
import { EventItem } from "./CustomCalendar.types";

export const AppointmentStatusCode = {
  Pending: "P",
  CheckedIn: "CI",
};

export const EVENT_STATUS_COLORS = {
  P: "#bee2fa",
  CI: "#c7edca",
};

export const EVENTS = [
  {
    start: moment("2024-03-10T08:00:00").toDate(),
    end: moment("2024-03-10T09:00:00").toDate(),
    data: {
      appointment: {
        "id": 1,
        "start": "2024-03-10T12:00:00Z",
        "end": "2024-03-10T13:00:00Z",
        "appointment_id": 2,
        "appointment_status": "CI",
        "location": "Washington",
        "resource": "Dr David",
        "address": "Block 1\nSStreet 32\nLong Island\nNew York",
        "is_draggable": true,
        "category": "Hearing"
      },
    },
    isDraggable: true,
  },
  {
    start: moment("2024-03-10T12:00:00").toDate(),
    end: moment("2024-03-10T13:00:00").toDate(),
    data: {
      appointment: {
        id: 2,
        status: "CI",
        location: "Washington",
        resource: "Dr David",
        address: "Block 1\nSStreet 32\nLong Island\nNew York",
      },
    },
    isDraggable: false,
  },
  {
    start: moment("2024-03-12T09:00:00").toDate(),
    end: moment("2024-03-12T14:59:59").toDate(),
    data: {
      blockout: {
        id: 1,
        name: "Christmas Holidays",
      },
    },
    isDraggable: true,
  },
];
