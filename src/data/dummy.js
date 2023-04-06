import moment from "moment";

const dummy_data = [
  {
    title: "Task 1",
    description: "Description of Task 1",
    status: "OPEN",
    tags: ["Important"],
    dueDate: null,
    key: 1,
    created: moment().format(),
  },
  {
    title: "Task 2",
    description: "Description of Task 2",
    status: "OPEN",
    tags: ["Important"],
    dueDate: null,
    key: 2,
    created: moment().format(),
  },
];

export { dummy_data };
