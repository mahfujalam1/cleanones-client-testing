const fs = require('fs');
const file = 'src/utils/translations.ts';
let code = fs.readFileSync(file, 'utf8');


code = code.replace(/schedule: string;/g, 'schedule: string; cleaningPlan: string;');
code = code.replace(/notifications: \{([\s\S]*?)\};\n\}/, 'notifications: {$1};\n  roster: { title: string; dayView: string; weekView: string; date: string; };\n  shiftMonitoring: { shiftsCount: string; };\n  workers: { employees: string; };\n}');


const langs = ['en', 'nl', 'pl', 'uk', 'pt', 'ar', 'fr', 'es'];
for (const l of langs) {
  
  const r = new RegExp(`(${l}: \\{[\\s\\S]*?sidebar: \\{[\\s\\S]*?schedule: "[^"]*"),`);
  code = code.replace(r, '$1, cleaningPlan: "Cleaning Plan",');
  
  const r2 = new RegExp(`(${l}: \\{[\\s\\S]*?titles: \\{[\\s\\S]*?schedule: "[^"]*"),`);
  code = code.replace(r2, '$1, cleaningPlan: "Cleaning Plan",');

  const rdash = new RegExp(`(${l}: \\{[\\s\\S]*?dashboard: \\{[\\s\\S]*?welcomeTitle: "[^"]*"),`);
  code = code.replace(rdash, '$1, allShiftsOnSchedule: "All shifts on schedule", onTime: "On time",');

  const rnotif = new RegExp(`(${l}: \\{[\\s\\S]*?notifications: \\{[\\s\\S]*?\\},\\n  \\},)`);
  code = code.replace(rnotif, `$1\n    roster: { title: "Schedule", dayView: "Day View", weekView: "Week View", date: "Date" },\n    shiftMonitoring: { shiftsCount: "shifts" },\n    workers: { employees: "employees" },\n  },`);
}

fs.writeFileSync(file, code);
