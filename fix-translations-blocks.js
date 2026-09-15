const fs = require("fs");
let content = fs.readFileSync("src/utils/translations.ts", "utf8");

const additions = {
  nl: {
    blocks: `    roster: {
      title: "Planning", dayView: "Dagweergave", weekView: "Weekweergave", date: "Datum",
      dailyRoster: "Dagelijks rooster", shifts: "diensten", scheduled: "gepland", teamMember: "Teamlid",
      noTeamScheduled: "Geen teamleden gepland voor deze datum.", scheduledShift: "Geplande dienst (klik voor details)",
      currentTime: "Huidige tijd", scrollHint: "Scroll horizontaal om de volledige werkdag te bekijken",
      shiftDetails: "Details geplande dienst", viewFullPlan: "Volledig schoonmaakplan bekijken", close: "Sluiten",
      location: "Locatie", roomsScheduled: "Geplande kamers", tasksScheduled: "Geplande taken",
      assignedTeam: "Toegewezen teamleden", upcoming: "Aankomend", duration: "duur",
    },
    shiftMonitoring: { shiftsCount: "diensten" },
    workers: { employees: "medewerkers" },\n`
  },
  pl: {
    blocks: `    roster: {
      title: "Harmonogram", dayView: "Widok dnia", weekView: "Widok tygodnia", date: "Data",
      dailyRoster: "Codzienny harmonogram", shifts: "zmiany", scheduled: "zaplanowane", teamMember: "Członek zespołu",
      noTeamScheduled: "Brak członków zespołu zaplanowanych na tę datę.", scheduledShift: "Zaplanowana zmiana (kliknij by zobaczyć szczegóły)",
      currentTime: "Aktualny czas", scrollHint: "Przewiń w poziomie, aby zobaczyć cały dzień pracy",
      shiftDetails: "Szczegóły zaplanowanej zmiany", viewFullPlan: "Zobacz pełny plan sprzątania", close: "Zamknij",
      location: "Lokalizacja", roomsScheduled: "Zaplanowane pokoje", tasksScheduled: "Zaplanowane zadania",
      assignedTeam: "Przypisani członkowie zespołu", upcoming: "Nadchodzące", duration: "czas trwania",
    },
    shiftMonitoring: { shiftsCount: "zmiany" },
    workers: { employees: "pracowników" },\n`
  },
  uk: {
    blocks: `    roster: {
      title: "Розклад", dayView: "Вигляд дня", weekView: "Вигляд тижня", date: "Дата",
      dailyRoster: "Щоденний розклад", shifts: "зміни", scheduled: "заплановано", teamMember: "Член команди",
      noTeamScheduled: "На цю дату не заплановано жодного члена команди.", scheduledShift: "Запланована зміна (натисніть для деталей)",
      currentTime: "Поточний час", scrollHint: "Прокрутіть горизонтально, щоб переглянути весь робочий день",
      shiftDetails: "Деталі запланованої зміни", viewFullPlan: "Переглянути повний план прибирання", close: "Закрити",
      location: "Локація", roomsScheduled: "Заплановані кімнати", tasksScheduled: "Заплановані завдання",
      assignedTeam: "Призначені члени команди", upcoming: "Майбутні", duration: "тривалість",
    },
    shiftMonitoring: { shiftsCount: "зміни" },
    workers: { employees: "працівників" },\n`
  },
  pt: {
    blocks: `    roster: {
      title: "Escala", dayView: "Visão Diária", weekView: "Visão Semanal", date: "Data",
      dailyRoster: "Escala Diária", shifts: "turnos", scheduled: "agendado", teamMember: "Membro da Equipe",
      noTeamScheduled: "Nenhum membro da equipe agendado para esta data.", scheduledShift: "Turno agendado (clique para ver detalhes)",
      currentTime: "Hora atual", scrollHint: "Role horizontalmente para ver o dia de trabalho completo",
      shiftDetails: "Detalhes do Turno Agendado", viewFullPlan: "Ver Plano de Limpeza Completo", close: "Fechar",
      location: "Local", roomsScheduled: "Divisões Agendadas", tasksScheduled: "Tarefas Agendadas",
      assignedTeam: "Membros da Equipe Atribuídos", upcoming: "Próximos", duration: "duração",
    },
    shiftMonitoring: { shiftsCount: "turnos" },
    workers: { employees: "funcionários" },\n`
  },
  ar: {
    blocks: `    roster: {
      title: "الجدول", dayView: "عرض اليوم", weekView: "عرض الأسبوع", date: "التاريخ",
      dailyRoster: "القائمة اليومية", shifts: "ورديات", scheduled: "مجدول", teamMember: "عضو الفريق",
      noTeamScheduled: "لا يوجد أعضاء فريق مجدولين لهذا التاريخ.", scheduledShift: "وردية مجدولة (انقر لعرض التفاصيل)",
      currentTime: "الوقت الحالي", scrollHint: "قم بالتمرير أفقياً لعرض يوم العمل بالكامل",
      shiftDetails: "تفاصيل الوردية المجدولة", viewFullPlan: "عرض خطة التنظيف الكاملة", close: "إغلاق",
      location: "الموقع", roomsScheduled: "الغرف المجدولة", tasksScheduled: "المهام المجدولة",
      assignedTeam: "أعضاء الفريق المعينون", upcoming: "القادمة", duration: "المدة",
    },
    shiftMonitoring: { shiftsCount: "ورديات" },
    workers: { employees: "موظفين" },\n`
  },
  fr: {
    blocks: `    roster: {
      title: "Planning", dayView: "Vue Jour", weekView: "Vue Semaine", date: "Date",
      dailyRoster: "Planning quotidien", shifts: "shifts", scheduled: "planifié", teamMember: "Membre de l équipe",
      noTeamScheduled: "Aucun membre de l équipe n est prévu pour cette date.", scheduledShift: "Shift planifié (cliquez pour plus de détails)",
      currentTime: "Heure actuelle", scrollHint: "Faites défiler horizontalement pour voir toute la journée",
      shiftDetails: "Détails du Shift Planifié", viewFullPlan: "Voir le Plan de Nettoyage Complet", close: "Fermer",
      location: "Lieu", roomsScheduled: "Pièces Planifiées", tasksScheduled: "Tâches Planifiées",
      assignedTeam: "Membres de l Équipe Assignés", upcoming: "À venir", duration: "durée",
    },
    shiftMonitoring: { shiftsCount: "shifts" },
    workers: { employees: "employés" },\n`
  },
  es: {
    blocks: `    roster: {
      title: "Horario", dayView: "Vista Diaria", weekView: "Vista Semanal", date: "Fecha",
      dailyRoster: "Lista diaria", shifts: "turnos", scheduled: "programado", teamMember: "Miembro del equipo",
      noTeamScheduled: "No hay miembros del equipo programados para esta fecha.", scheduledShift: "Turno programado (haz clic para detalles)",
      currentTime: "Hora actual", scrollHint: "Desplázate horizontalmente para ver todo el día",
      shiftDetails: "Detalles del Turno Programado", viewFullPlan: "Ver Plan de Limpieza Completo", close: "Cerrar",
      location: "Ubicación", roomsScheduled: "Habitaciones Programadas", tasksScheduled: "Tareas Programadas",
      assignedTeam: "Miembros del Equipo Asignados", upcoming: "Próximos", duration: "duración",
    },
    shiftMonitoring: { shiftsCount: "turnos" },
    workers: { employees: "empleados" },\n`
  }
};

for (const [lang, data] of Object.entries(additions)) {
  const findStr = `actionFeedback: {`;
  // We need to find the actionFeedback block that belongs to the current language.
  // We know the structure is:
  // lang: {
  //   ...
  //   actionFeedback: { ... }
  // }
  // We can search for \`\n  \${lang}: {\` and then find the NEXT occurrence of \`actionFeedback:\`
  
  const startIdx = content.indexOf(\`\\n  \${lang}: {\`);
  if (startIdx !== -1) {
    const actionFeedbackIdx = content.indexOf(\`actionFeedback:\`, startIdx);
    if (actionFeedbackIdx !== -1) {
      const before = content.slice(0, actionFeedbackIdx);
      const after = content.slice(actionFeedbackIdx);
      content = before + data.blocks + "    " + after;
    }
  }
}

fs.writeFileSync("src/utils/translations.ts", content);
console.log("Blocks applied.");
