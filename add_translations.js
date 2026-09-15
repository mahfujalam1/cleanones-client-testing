const fs = require('fs');

const file = '/home/siyam/Desktop/project/cleanones-client-portal/src/utils/translations.ts';
let content = fs.readFileSync(file, 'utf8');

const rosters = {
  nl: `    roster: {
      title: "Planning", dayView: "Dagoverzicht", weekView: "Weekoverzicht", date: "Datum",
      dailyRoster: "Dagelijks Rooster", shifts: "diensten", scheduled: "gepland", teamMember: "Werknemer",
      noTeamScheduled: "Geen teamleden gepland voor deze datum.", scheduledShift: "Geplande dienst (klik voor details)",
      currentTime: "Huidige tijd", scrollHint: "Scroll horizontaal om de volledige werkdag te bekijken",
      shiftDetails: "Details Geplande Dienst", viewFullPlan: "Bekijk Volledig Schoonmaakplan", close: "Sluiten",
      location: "Locatie", roomsScheduled: "Kamers Gepland", tasksScheduled: "Taken Gepland",
      assignedTeam: "Toegewezen Teamleden", upcoming: "Aankomend", duration: "duur",
      cleaningShift: "Schoonmaakdienst", specialist: "Specialist",
    },`,
  pl: `    roster: {
      title: "Harmonogram", dayView: "Widok Dnia", weekView: "Widok Tygodnia", date: "Data",
      dailyRoster: "Codzienny Harmonogram", shifts: "zmiany", scheduled: "zaplanowano", teamMember: "Pracownik",
      noTeamScheduled: "Brak zaplanowanych członków zespołu na tę datę.", scheduledShift: "Zaplanowana zmiana (kliknij, aby zobaczyć szczegóły)",
      currentTime: "Obecny czas", scrollHint: "Przewiń w poziomie, aby zobaczyć cały dzień pracy",
      shiftDetails: "Szczegóły Zaplanowanej Zmiany", viewFullPlan: "Zobacz Pełny Plan Sprzątania", close: "Zamknij",
      location: "Lokalizacja", roomsScheduled: "Zaplanowane Pokoje", tasksScheduled: "Zaplanowane Zadania",
      assignedTeam: "Przypisani Członkowie Zespołu", upcoming: "Nadchodzące", duration: "czas trwania",
      cleaningShift: "Zmiana Sprzątania", specialist: "Specjalista",
    },`,
  uk: `    roster: {
      title: "Розклад", dayView: "Перегляд на день", weekView: "Перегляд на тиждень", date: "Дата",
      dailyRoster: "Щоденний розклад", shifts: "зміни", scheduled: "заплановано", teamMember: "Працівник",
      noTeamScheduled: "На цю дату не заплановано працівників.", scheduledShift: "Запланована зміна (натисніть для деталей)",
      currentTime: "Поточний час", scrollHint: "Прокрутіть горизонтально, щоб побачити весь робочий день",
      shiftDetails: "Деталі запланованої зміни", viewFullPlan: "Переглянути повний план прибирання", close: "Закрити",
      location: "Локація", roomsScheduled: "Заплановані кімнати", tasksScheduled: "Заплановані завдання",
      assignedTeam: "Призначені працівники", upcoming: "Майбутні", duration: "тривалість",
      cleaningShift: "Зміна прибирання", specialist: "Спеціаліст",
    },`,
  pt: `    roster: {
      title: "Horário", dayView: "Vista Diária", weekView: "Vista Semanal", date: "Data",
      dailyRoster: "Escala Diária", shifts: "turnos", scheduled: "agendado", teamMember: "Trabalhador",
      noTeamScheduled: "Nenhum membro da equipa agendado para esta data.", scheduledShift: "Turno agendado (clique para ver detalhes)",
      currentTime: "Hora atual", scrollHint: "Desloque horizontalmente para ver todo o dia de trabalho",
      shiftDetails: "Detalhes do Turno Agendado", viewFullPlan: "Ver Plano de Limpeza Completo", close: "Fechar",
      location: "Localização", roomsScheduled: "Salas Agendadas", tasksScheduled: "Tarefas Agendadas",
      assignedTeam: "Membros da Equipa Atribuídos", upcoming: "Próximos", duration: "duração",
      cleaningShift: "Turno de Limpeza", specialist: "Especialista",
    },`,
  ar: `    roster: {
      title: "الجدول", dayView: "عرض اليوم", weekView: "عرض الأسبوع", date: "التاريخ",
      dailyRoster: "الجدول اليومي", shifts: "مناوبات", scheduled: "مجدول", teamMember: "عامل",
      noTeamScheduled: "لا يوجد أعضاء فريق مجدولين لهذا التاريخ.", scheduledShift: "مناوبة مجدولة (انقر لعرض التفاصيل)",
      currentTime: "الوقت الحالي", scrollHint: "مرر أفقيًا لعرض يوم العمل بالكامل",
      shiftDetails: "تفاصيل المناوبة المجدولة", viewFullPlan: "عرض خطة التنظيف الكاملة", close: "إغلاق",
      location: "الموقع", roomsScheduled: "الغرف المجدولة", tasksScheduled: "المهام المجدولة",
      assignedTeam: "أعضاء الفريق المعينين", upcoming: "القادمة", duration: "المدة",
      cleaningShift: "مناوبة تنظيف", specialist: "أخصائي",
    },`,
  fr: `    roster: {
      title: "Emploi du temps", dayView: "Vue journalière", weekView: "Vue hebdomadaire", date: "Date",
      dailyRoster: "Planning quotidien", shifts: "services", scheduled: "planifiés", teamMember: "Travailleur",
      noTeamScheduled: "Aucun membre de l'équipe planifié pour cette date.", scheduledShift: "Service planifié (cliquez pour les détails)",
      currentTime: "Heure actuelle", scrollHint: "Faites défiler horizontalement pour voir toute la journée",
      shiftDetails: "Détails du service planifié", viewFullPlan: "Voir le plan de nettoyage complet", close: "Fermer",
      location: "Emplacement", roomsScheduled: "Salles planifiées", tasksScheduled: "Tâches planifiées",
      assignedTeam: "Membres de l'équipe assignés", upcoming: "À venir", duration: "durée",
      cleaningShift: "Service de nettoyage", specialist: "Spécialiste",
    },`,
  es: `    roster: {
      title: "Horario", dayView: "Vista Diaria", weekView: "Vista Semanal", date: "Fecha",
      dailyRoster: "Lista Diaria", shifts: "turnos", scheduled: "programado", teamMember: "Trabajador",
      noTeamScheduled: "No hay miembros del equipo programados para esta fecha.", scheduledShift: "Turno programado (haz clic para ver detalles)",
      currentTime: "Hora actual", scrollHint: "Desplázate horizontalmente para ver el día laboral completo",
      shiftDetails: "Detalles del turno programado", viewFullPlan: "Ver Plan de Limpieza Completo", close: "Cerrar",
      location: "Ubicación", roomsScheduled: "Habitaciones programadas", tasksScheduled: "Tareas programadas",
      assignedTeam: "Miembros del equipo asignados", upcoming: "Próximos", duration: "duración",
      cleaningShift: "Turno de Limpieza", specialist: "Especialista",
    },`
};

for (const [lang, rosterBlock] of Object.entries(rosters)) {
  const regex = new RegExp(\`  \${lang}: \\{[\\\\s\\\\S]*?    topbar: \\{[\\\\s\\\\S]*?\\},\\n\`);
  content = content.replace(regex, (match) => {
    return match + rosterBlock + '\\n';
  });
}

fs.writeFileSync(file, content, 'utf8');
console.log('Translations updated.');
