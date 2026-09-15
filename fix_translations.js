const fs = require('fs');
const file = 'src/utils/translations.ts';
let code = fs.readFileSync(file, 'utf8');

const languages = ['nl', 'pl', 'uk', 'pt', 'ar', 'fr', 'es'];

languages.forEach(lang => {
  const sidebarRegex = new RegExp(`(${lang}: \\{[\\s\\S]*?sidebar: \\{[\\s\\S]*?schedule: "[^"]*",)([\\s\\S]*?\\},)`);
  code = code.replace(sidebarRegex, '$1 cleaningPlan: "Cleaning Plan",$2');
  
  const titlesRegex = new RegExp(`(${lang}: \\{[\\s\\S]*?titles: \\{[\\s\\S]*?schedule: "[^"]*",)([\\s\\S]*?\\},)`);
  code = code.replace(titlesRegex, '$1 cleaningPlan: "Cleaning Plan",$2');

  const dashboardRegex = new RegExp(`(${lang}: \\{[\\s\\S]*?dashboard: \\{[\\s\\S]*?welcomeTitle: "[^"]*",)([\\s\\S]*?\\},)`);
  code = code.replace(dashboardRegex, '$1 allShiftsOnSchedule: "All shifts on schedule", onTime: "On time",$2');

  const insertKeyRegex = new RegExp(`(${lang}: \\{[\\s\\S]*?notifications: \\{[\\s\\S]*?\\},\\n  \\},)`);
  code = code.replace(insertKeyRegex, `$1\n    roster: { title: "Schedule", dayView: "Day View", weekView: "Week View", date: "Date" },\n    shiftMonitoring: { shiftsCount: "shifts" },\n    workers: { employees: "employees" },\n  },`);
});

fs.writeFileSync(file, code);
