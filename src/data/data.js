const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const dayStr = new Date(date).toLocaleString("fr-DZ", options).replace(",", "");

  const [day, month, year] = dayStr.split(/[/ ]/);
  const formattedDateStr = `${year}/${month}/${day} `;

  return formattedDateStr;
};

const Today = formatDate(new Date());
const tasks = [
  {
    id: 1,
    task: "Buy groceries",
    tasktype: "Must Do",
    date: `${Today} 02:23`,
    isDone: false,
    drag: false,
  },
  {
    id: 2,
    task: "Finish project report",
    tasktype: "Should Do",
    date: `${Today} 12:20`,
    isDone: false,
    drag: false,
  },

  {
    id: 3,
    task: "Clean the house",
    tasktype: "Could Do",
    date: `${Today} 14:00`,
    isDone: false,
    drag: false,
  },
  {
    id: 4,
    task: "Study for exam",
    tasktype: "Must Do",
    date: `${Today} 13:00`,
    isDone: false,
    drag: false,
  },
  {
    id: 5,
    task: "Play Games",
    tasktype: "If I Have Time",
    date: `${Today} 22:00`,
    isDone: false,
    drag: false,
  },
  {
    id: 6,
    task: "Go for a walk",
    tasktype: "Could Do",
    date: `${Today} 16:15`,
    isDone: false,
    drag: false,
  },
  {
    id: 7,
    task: "Call mom",
    tasktype: "If I Have Time",
    date: `${Today} 20:45`,
    isDone: false,
    drag: false,
  },
  {
    id: 8,
    task: "Sleep",
    tasktype: "none",
    date: `${Today} 23:30`,
    isDone: false,
    drag: false,
  },
];

export default tasks;
