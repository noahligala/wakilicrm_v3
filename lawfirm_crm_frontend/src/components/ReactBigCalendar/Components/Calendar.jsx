import React from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./index.css"; // Import CSS file directly

const localizer = momentLocalizer(moment);

export default function Calendar(props) {
  return <BigCalendar {...props} localizer={localizer} />;
};

