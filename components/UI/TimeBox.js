import Link from "next/link";

import styles from "./TimeBox.module.css";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TimeBox = ({ id, className, title, href, type }) => {
  const classes = `${styles.box} ${className}`;

  const thisWeekRange = () => {
    if (new Date().getDay() === 0) {
      return { dayRange: "Sun", dateRange: new Date().getDate() };
    } else {
      return {
        dayRange: `Sun - ${days[new Date().getDay()]}`,
        dateRange: `${
          new Date().getDate() - new Date().getDay()
        } - ${new Date().getDate()}`,
      };
    }
  };

  const monthRange = () => {
    let today = new Date();
    let sunday = new Date();
    sunday.setDate(today.getDate() - new Date().getDay());

    if (today.getMonth() === sunday.getMonth()){
      return months[today.getMonth()];
    } else {
      return `${months[sunday.getMonth()]} - ${months[today.getMonth()]}`;
    }
  }

  if (type === "week" && new Date().getDay() === 0){
    return ("");
  }

  if (type === "month" && new Date().getDate() <= 7){
    return ("");
  }

  return (
    <div id={id} className={classes}>
      {" "}
      <Link href={href} className={styles.link}>
        <div className={styles.title}>{title}</div>
        {type === "today" && (
          <div className={styles.timeDiv}>
            <span className={styles.small}>{days[new Date().getDay()]}</span>
            <span className={styles.big}>{new Date().getDate()}</span>
            <span className={styles.mid}>{months[new Date().getMonth()]}</span>
          </div>
        )}
        {type === "week" && (
          <div className={styles.timeDiv}>
            <span className={styles.small}>{thisWeekRange().dateRange}</span>
            <span className={styles.midBig}>{thisWeekRange().dayRange}</span>
            <span className={styles.mid}>{monthRange()}</span>
          </div>
        )}
        {type === "month" && (
          <div className={styles.timeDiv}>
            <span className={styles.big}>{months[new Date().getMonth()]}</span>
            <span className={styles.mid}>{`1 - ${new Date().getDate()}`}</span>
          </div>
        )}
      </Link>
    </div>
  );
};

export default TimeBox;
