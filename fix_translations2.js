const fs = require('fs');
const file = 'src/utils/translations.ts';
let code = fs.readFileSync(file, 'utf8');

// Replace all sidebar schedule: "..." with schedule: "...", cleaningPlan: "Cleaning Plan" if not already there
code = code.replace(/schedule: "([^"]*)",(\s*)notes:/g, 'schedule: "$1", cleaningPlan: "Cleaning Plan",$2notes:');

fs.writeFileSync(file, code);
