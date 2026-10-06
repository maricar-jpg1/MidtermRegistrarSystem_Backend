let subjects = [
  {
    id: 1,
    code: "CS101",
    title: "Introduction to Computing",
    description: "Fundamentals of computing",
    units: 3,
    program: "Computer Science",
    year_level: 1,
    semester: "1st Semester",
    prerequisite: "",
    status: "Active"
  },
  {
    id: 2,
    code: "CS102",
    title: "Programming 1",
    description: "Intro to programming using Python",
    units: 3,
    program: "Computer Science",
    year_level: 1,
    semester: "1st Semester",
    prerequisite: "",
    status: "Active"
  },
  {
    id: 3,
    code: "CS201",
    title: "Data Structures",
    description: "Advanced data structures",
    units: 3,
    program: "Computer Science",
    year_level: 2,
    semester: "1st Semester",
    prerequisite: "CS102",
    status: "Active"
  },
  {
    id: 4,
    code: "CS202",
    title: "Database Systems",
    description: "Relational databases and SQL",
    units: 3,
    program: "Computer Science",
    year_level: 2,
    semester: "2nd Semester",
    prerequisite: "CS102",
    status: "Active"
  },
  {
    id: 5,
    code: "IT101",
    title: "Web Development",
    description: "HTML, CSS, JS basics",
    units: 3,
    program: "Information Technology",
    year_level: 1,
    semester: "1st Semester",
    prerequisite: "",
    status: "Active"
  },
  {
    id: 6,
    code: "IT201",
    title: "Networking Fundamentals",
    description: "Network protocols",
    units: 3,
    program: "Information Technology",
    year_level: 2,
    semester: "2nd Semester",
    prerequisite: "",
    status: "Active"
  },
  {
    id: 7,
    code: "MATH101",
    title: "Discrete Mathematics",
    description: "Logic, sets, graphs",
    units: 3,
    program: "Mathematics",
    year_level: 1,
    semester: "1st Semester",
    prerequisite: "",
    status: "Active"
  }
];

module.exports = subjects;