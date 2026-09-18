const fs = require('fs');
const file = 'src/utils/translations.ts';
let code = fs.readFileSync(file, 'utf8');


code = code.replace(/sidebar: \{([\s\S]*?)schedule: string;([\s\S]*?)\};/, 'sidebar: {$1schedule: string; cleaningPlan: string;$2};');
code = code.replace(/titles: \{([\s\S]*?)schedule: string;([\s\S]*?)\};/, 'titles: {$1schedule: string; cleaningPlan: string;$2};');
code = code.replace(/export interface TranslationDict \{([\s\S]*?)notifications: \{([\s\S]*?)\};\n\}/, 'export interface TranslationDict {$1notifications: {$2};\n  roster: { title: string; dayView: string; weekView: string; date: string; };\n  shiftMonitoring: { shiftsCount: string; };\n  workers: { employees: string; };\n}');


code = code.replace(/sidebar: \{([\s\S]*?)schedule: "Schedule",([\s\S]*?)\},/, 'sidebar: {$1schedule: "Schedule", cleaningPlan: "Cleaning Plan",$2},');
code = code.replace(/titles: \{([\s\S]*?)schedule: "Schedule",([\s\S]*?)\},/, 'titles: {$1schedule: "Schedule", cleaningPlan: "Cleaning Plan",$2},');
code = code.replace(/en: \{([\s\S]*?)notifications: \{([\s\S]*?)\},\n  \},/, 'en: {$1notifications: {$2},\n    roster: { title: "Schedule", dayView: "Day View", weekView: "Week View", date: "Date" },\n    shiftMonitoring: { shiftsCount: "shifts" },\n    workers: { employees: "employees" },\n  },');


code = code.replace(/dashboard: \{([\s\S]*?)welcomeTitle: "Welcome back",([\s\S]*?)\},/, 'dashboard: {$1welcomeTitle: "Welcome back", allShiftsOnSchedule: "All shifts on schedule", onTime: "On time",$2},');

fs.writeFileSync(file, code);
