import React from "react";

// internally used by Forecaster, so no need to export
function DailyItem(props) {
  const day = props.day;
  return (
    <div className="item">
      <span>{day.weekday}</span>
      <span>
        <img src={day.icon} />
      </span>
      <span>{day.high}</span>
      <span>{day.low}</span>
    </div>
  );
}

export default function Forecaster(props) {
  const { days } = props;

  const day1 = days[0],
    day2 = days[1],
    day3 = days[2],
    day4 = days[3],
    day5 = days[4],
    day6 = days[5],
    day7 = days[6];

  return (
    <div>
      <DailyItem day={day1} />
      <DailyItem day={day2} />
      <DailyItem day={day3} />
      <DailyItem day={day4} />
      <DailyItem day={day5} />
      <DailyItem day={day6} />
      <DailyItem day={day7} />
    </div>
  );
}
