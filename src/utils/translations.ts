export interface TranslationDict {
  auth?: {
    welcome: string; portalSubtitle: string; email: string; password: string;
    rememberMe: string; forgotPassword: string; signIn: string; signingIn: string;
    emailRequired: string; passwordRequired: string; forgotTitle: string;
    forgotDescription: string; sendOtp: string; sending: string; rememberQuestion: string;
    setPasswordTitle: string; setPasswordDescription: string; newPassword: string;
    confirmPassword: string; resetPassword: string; resetting: string;
    passwordMismatch: string; passwordLength: string; sessionExpired: string;
    resetSuccess: string; otpTitle: string; otpDescription: string; emailFallback: string;
    completeOtp: string; restartReset: string; otpSent: string; verifyCode: string;
    resendCode: string;
    visualPanel?: {
      badge: string; title: string; description: string;
      bullet1: string; bullet2: string; bullet3: string;
      cardTitle: string; cardStatus: string; cardLocation: string; cardTime: string;
      footer: string;
    };
  };
  sidebar: {
    dashboard: string; locations: string; rooms: string; schedule: string; cleaningPlan: string; notes: string;
    services: string; feedback: string; chat: string; profile: string;
    settings: string; signOut: string;
  };
  titles: {
    dashboard: string; locations: string; rooms: string; schedule: string; cleaningPlan: string; notes: string;
    services: string; feedback: string; chat: string; profile: string;
    settings: string; notifications: string;
  };
  cleaningPlan: {
    duration: string; photos: string; tasks: string; rooms: string; location: string;
    showing: string; of: string; planNotFound: string; roomsAndTasks: string;
  };
  liveStatus: {
    complete: string; roomsDone: string; shiftTime: string; assignedWorkers: string;
    inTime: string; outTime: string; done: string; inProgress: string; pending: string;
    refresh: string; tasks: string; location: string; date: string;
  };
  serviceCards: {
    submitted: string; planId: string; duration: string; photo: string; time: string;
    photoRequired: string; photoTitle: string; selectPlan: string; taskName: string;
    dateTime: string; plansAvailable: string; completed: string; approved: string; pending: string;
    yes: string; no: string;
  };
  notificationsPage: {
    backTo: string; delete: string; read: string; notFound: string; backToNotifications: string;
    settingsSaved: string;
  };
  topbar: {
    noNotifications: string; viewAllNotifications: string; profile: string;
  };
  dashboard: {
    welcomeTitle: string; welcomeSub: string; activeCleaning: string;
    liveCleaners: string; nextVisit: string; acknowledgedNotes: string;
    quickActions: string; extraServiceReq: string; leaveFeedback: string;
    chatCleanOnes: string; recentSchedule: string; acknowledged: string;
    pending: string; hours: string; rooms: string; lastCompleted: string;
    teamOnSite: string; active: string; noTeamOnSite: string; viewSchedule: string;
    contactSupport: string; nextVisitors: string; specialists: string;
    all: string; noServiceToday: string; roomTrackingNote: string;
    noUpcomingVisits: string; noSpecialistsOnSite: string; noCompletedVisits: string;
    noScheduledVisits: string; completed: string; remaining: string;
    allShiftsOnSchedule?: string; onTime?: string;
    scopeOverview?: string; scopeOverviewDesc?: string; deliveryOverview?: string; deliveryOverviewDesc?: string;
    cleaningPlans?: string; cleaningPlansSub?: string; managedLocations?: string; managedLocationsSub?: string;
    totalRoomsScope?: string; totalRoomsScopeSub?: string; totalTasksScope?: string; totalTasksScopeSub?: string;
    completedTasksTitle?: string; completedTasksSub?: string; completedRoomsTitle?: string; completedRoomsSub?: string;
    hoursDeliveredTitle?: string; hoursDeliveredSub?: string;
    shiftDeliveryPerformance?: string; shiftDeliveryDesc?: string;
    completionRate?: string; optimal?: string; paced?: string; activeShiftsDone?: string;
    totalShiftsCard?: string; scheduledShiftsInWindow?: string;
    completedShiftsCard?: string; donePill?: string; successfullyDelivered?: string;
    pendingShiftsCard?: string; inQueue?: string; upcomingInProgress?: string;
    plansCount?: string; sitesCount?: string; scopePill?: string; checklistPill?: string;
  };
  actionFeedback: {
    loading: string; success: string; error: string;
    saved: string; deleted: string; sent: string; loginSuccess: string; loginFailed: string;
  };
  common: {
    hours: string; rooms: string; search: string; filter: string;
    cancel: string; save: string; submit: string; status: string;
    loading: string; active: string; inactive: string; edit: string; delete: string;
  };
  locations: {
    title: string; subtitle: string; searchPlaceholder: string; address: string; roomsCount: string;
    viewDetails: string; backToLocations: string; noLocations: string; locationDetails: string;
    addressUnavailable: string; status: string; online: string; offline: string; location: string;
    rooms: string; noLocationsMatch: string; loadingLocation: string; description: string;
  };
  rooms: {
    title: string; liveSubtitle: string; searchPlaceholder: string; allStatuses: string; clean: string;
    cleaning: string; dirty: string; inspect: string; noRooms: string; roomDetails: string;
    tasks: string; floor: string; size: string; lastCleaned: string;
    noLiveSession: string; noLiveSessionDesc: string; checkAgain: string;
    selectRoom: string; noRoomsMatch: string; room: string; standard: string;
    recurringTasks: string; noRecurringTasks: string; requiredPhotos: string;
    daily: string; weekly: string; monthly: string; min: string;
  };
  schedule: {
    title: string; subtitle: string; searchPlaceholder: string; shiftDate: string; cleaner: string;
    room: string; time: string; status: string; completed: string; inProgress: string;
    pending: string; noSchedule: string; thisMonth: string; today: string; thisWeek: string;
    cleaningVisits: string; noVisitsFound: string; noVisitsMatching: string; upcoming: string;
  };
  notes: {
    title: string; addNote: string; titlePlaceholder: string; notePlaceholder: string;
    priority: string; low: string; medium: string; high: string; urgent: string;
    createNote: string; clientNotes: string; supervisorNotes: string; acknowledged: string;
    acknowledge: string; noNotes: string;
  };
  services: {
    title: string; subtitle: string; requestService: string; serviceTitle: string; description: string;
    priority: string; preferredDate: string; selectLocation: string; selectRoom: string;
    submitRequest: string; requests: string; noRequests: string; priorityLow: string;
    priorityNormal: string; priorityHigh: string; statusUnderReview: string;
    statusApproved: string; statusInProgress: string; statusCompleted: string;
    statusRejected: string; requestStatusFlow: string; stepPending: string;
    stepUnderReview: string; stepApprovedRejected: string; stepCompleted: string;
    allStatuses: string; allPriorities: string; noRequestsTitle: string; noRequestsSubtitle: string;
  };
  feedback: {
    title: string; submitFeedback: string; rating: string; ratingPrompt: string;
    commentsPlaceholder: string; category: string; general: string; quality: string;
    timeliness: string; staff: string; submitBtn: string; recentFeedback: string;
    noFeedback: string; fiveStarReviews: string;
    ratingLabels: [string, string, string, string, string];
  };
  chat: {
    title: string; typeMessage: string; send: string; activeConversations: string;
    supervisor: string; online: string; offline: string; noMessages: string;
    conversation: string; participants: string; selectConversation: string; selectConversationDesc: string;
    pageTitle: string; subtitle: string;
  };
  profile: {
    title: string; personalInfo: string; name: string; email: string; phone: string;
    company: string; address: string; changePassword: string; currentPassword: string;
    newPassword: string; confirmPassword: string; updateProfile: string; saveChanges: string;
    contactInfo: string; contactPerson: string; companyName: string; accountDetails: string;
    clientId: string; memberSince: string; contractType: string; accountStatus: string;
    lastPasswordChanged: string;
  };
  settings: {
    title: string; language: string; theme: string; notifications: string;
    emailAlerts: string; pushNotifications: string; smsAlerts: string; saveSettings: string;
    notificationAlerts: string; emailDesc: string; smsDesc: string; portalPreferences: string;
  };
  notifications: {
    title: string; markAllRead: string; noNotifications: string; unread: string;
  };
  roster?: {
    title: string; dayView: string; weekView: string; date: string;
    dailyRoster: string; shifts: string; scheduled: string; teamMember: string;
    noTeamScheduled: string; scheduledShift: string; currentTime: string;
    scrollHint: string; shiftDetails: string; viewFullPlan: string; close: string;
    location: string; roomsScheduled: string; tasksScheduled: string;
    assignedTeam: string; upcoming: string; duration: string;
    cleaningShift?: string; specialist?: string;
    monthView?: string; shiftRoster?: string; weeklyRoster?: string; monthlyRoster?: string;
    cleaningPlanCol?: string; noPlansScheduled?: string; shiftToday?: string; shiftsToday?: string;
    shiftsThisWeek?: string; available?: string; weekScrollHint?: string; monthFooter?: string;
    weekendHint?: string; teamMembers?: string; plans?: string; durationLabel?: string;
    scheduledHours?: string; projected?: string; progress?: string; noWorkersAssigned?: string;
    loadError?: string; prev?: string; next?: string;
  };
  shiftMonitoring?: { shiftsCount: string; };
  workers?: { employees: string; };
}

export const placeholderTranslations = {
  en: { email: "you@company.com", password: "••••••••", taskName: "Task name", number: "e.g. 10", photo: "Photo label", searchRooms: "Search rooms...", message: "Type your message..." },
  nl: { email: "u@bedrijf.com", password: "••••••••", taskName: "Naam van taak", number: "bijv. 10", photo: "Fotolabel", searchRooms: "Kamers zoeken...", message: "Typ uw bericht..." },
  fr: { email: "vous@entreprise.com", password: "••••••••", taskName: "Nom de la tâche", number: "ex. 10", photo: "Libellé de photo", searchRooms: "Rechercher des pièces...", message: "Saisissez votre message..." },
  es: { email: "usted@empresa.com", password: "••••••••", taskName: "Nombre de la tarea", number: "ej. 10", photo: "Etiqueta de foto", searchRooms: "Buscar habitaciones...", message: "Escriba su mensaje..." },
  pl: { email: "ty@firma.com", password: "••••••••", taskName: "Nazwa zadania", number: "np. 10", photo: "Etykieta zdjęcia", searchRooms: "Szukaj pokoi...", message: "Wpisz wiadomość..." },
  uk: { email: "ви@компанія.com", password: "••••••••", taskName: "Назва завдання", number: "напр. 10", photo: "Мітка фото", searchRooms: "Пошук кімнат...", message: "Введіть повідомлення..." },
  pt: { email: "voce@empresa.com", password: "••••••••", taskName: "Nome da tarefa", number: "ex.: 10", photo: "Etiqueta da foto", searchRooms: "Pesquisar divisões...", message: "Escreva a sua mensagem..." },
  ar: { email: "you@company.com", password: "••••••••", taskName: "اسم المهمة", number: "مثلاً 10", photo: "تسمية الصورة", searchRooms: "البحث في الغرف...", message: "اكتب رسالتك..." },
} as const;

export const getPlaceholderTranslation = (locale: string | string[] | undefined) => {
  const code = typeof locale === "string" ? locale : "en";
  return placeholderTranslations[code as keyof typeof placeholderTranslations] || placeholderTranslations.en;
};

export const translations: Record<string, TranslationDict> = {
  en: {
    sidebar: {
      dashboard: "Dashboard", locations: "Locations", rooms: "Live Status", schedule: "Schedule", cleaningPlan: "Cleaning Plan", notes: "Client Notes",
      services: "Extra Services", feedback: "Feedback", chat: "Chat", profile: "Profile",
      settings: "Settings", signOut: "Sign Out",
    },
    titles: {
      dashboard: "Dashboard", locations: "Locations", rooms: "Live Status", schedule: "Schedule", cleaningPlan: "Cleaning Plan", notes: "Client Notes",
      services: "Extra Services", feedback: "Feedback", chat: "Chat", profile: "Profile",
      settings: "Settings", notifications: "Notifications",
    },
    dashboard: {
      welcomeTitle: "Welcome back", welcomeSub: "Here is your cleaning summary for today.",
      activeCleaning: "Active Room Progress", liveCleaners: "Live Cleaners", nextVisit: "Next Visit",
      acknowledgedNotes: "Acknowledged Notes", quickActions: "Quick Actions",
      extraServiceReq: "Request Extra Service", leaveFeedback: "Leave Feedback",
      chatCleanOnes: "Chat with CleanOnes", recentSchedule: "Recent Schedule",
      acknowledged: "Acknowledged", pending: "Pending", hours: "Hours", rooms: "Rooms",
      lastCompleted: "Last completed", teamOnSite: "Your team on site", active: "active",
      noTeamOnSite: "No team members are on site.", viewSchedule: "View full schedule",
      contactSupport: "Contact CleanOnes", nextVisitors: "Next visitors", specialists: "specialists",
      all: "All", noServiceToday: "No Service Today",
      roomTrackingNote: "Room progress is available because this location uses room tracking.",
      noUpcomingVisits: "No upcoming visits scheduled", noSpecialistsOnSite: "No specialists on site",
      noCompletedVisits: "No completed visits yet", noScheduledVisits: "No scheduled visits",
      completed: "completed", remaining: "remaining",
      allShiftsOnSchedule: "All shifts on schedule", onTime: "On time",
      scopeOverview: "Service Scope & Inventory", scopeOverviewDesc: "Total facilities, rooms, and tasks configured under your service plan",
      deliveryOverview: "Work Delivered & Completion", deliveryOverviewDesc: "Cumulative progress of cleaned rooms, finished tasks, and delivered hours",
      cleaningPlans: "Cleaning Plans", cleaningPlansSub: "Active service plans",
      managedLocations: "Managed Locations", managedLocationsSub: "Active facility sites",
      totalRoomsScope: "Total Rooms", totalRoomsScopeSub: "Designated facility rooms",
      totalTasksScope: "Total Tasks", totalTasksScopeSub: "Scheduled checklist tasks",
      completedTasksTitle: "Completed Tasks", completedTasksSub: "tasks finished",
      completedRoomsTitle: "Cleaned Rooms", completedRoomsSub: "rooms completed",
      hoursDeliveredTitle: "Hours Delivered", hoursDeliveredSub: "Total service hours completed",
      shiftDeliveryPerformance: "Shift Delivery Performance",
      shiftDeliveryDesc: "Overview of scheduled, completed, and pending service shifts",
      completionRate: "Completion Rate", optimal: "Optimal", paced: "Paced",
      activeShiftsDone: "{completed} of {active} active shifts done",
      totalShiftsCard: "Total Shifts", scheduledShiftsInWindow: "Scheduled shifts in window",
      completedShiftsCard: "Completed Shifts", donePill: "Done", successfullyDelivered: "Successfully delivered",
      pendingShiftsCard: "Pending Shifts", inQueue: "In Queue", upcomingInProgress: "Upcoming & in progress",
      plansCount: "{count} Plans", sitesCount: "{count} Sites", scopePill: "Scope", checklistPill: "Checklist",
    },
    actionFeedback: { loading: "Loading...", success: "Success!", error: "An error occurred", saved: "Saved successfully", deleted: "Deleted successfully", sent: "Sent successfully", loginSuccess: "Logged in successfully", loginFailed: "Login failed" },
    common: {
      hours: "Hours", rooms: "Rooms", search: "Search", filter: "Filter",
      cancel: "Cancel", save: "Save", submit: "Submit", status: "Status",
      loading: "Loading...", active: "Active", inactive: "Inactive", edit: "Edit", delete: "Delete",
    },
    locations: {
      title: "Locations", subtitle: "View your facilities and the rooms registered under each location.", searchPlaceholder: "Search locations...", address: "Address", roomsCount: "Rooms",
      viewDetails: "View Details", backToLocations: "Back to Locations", noLocations: "No locations found.", locationDetails: "Location Details",
      addressUnavailable: "Address unavailable", status: "Status", online: "Online", offline: "Offline", location: "Location",
      rooms: "Rooms", noLocationsMatch: "No locations match your search.", loadingLocation: "Loading location…", description: "Description",
    },
    rooms: {
      title: "Live Room Status", liveSubtitle: "Real-time view of your current cleaning session.", searchPlaceholder: "Search rooms...", allStatuses: "All Statuses", clean: "Clean",
      cleaning: "Cleaning In Progress", dirty: "Needs Cleaning", inspect: "Needs Inspection", noRooms: "No rooms found",
      roomDetails: "Room Details", tasks: "Cleaning Tasks", floor: "Floor", size: "Size", lastCleaned: "Last Cleaned",
      noLiveSession: "No live cleaning session", noLiveSessionDesc: "There is no active or recent cleaning session available right now. Live progress will appear here when a scheduled shift starts.", checkAgain: "Check again",
      selectRoom: "Select a room to view its tasks and required photos.", noRoomsMatch: "No rooms match your search.", room: "Room", standard: "Standard",
      recurringTasks: "Recurring Cleaning Tasks", noRecurringTasks: "No recurring tasks configured for this room", requiredPhotos: "📷 Required Photos:",
      daily: "Daily", weekly: "Weekly", monthly: "Monthly", min: "Min",
    },
    schedule: {
      title: "Cleaning Schedule", subtitle: "Upcoming and past cleaning visits for your locations.", searchPlaceholder: "Search schedule...", shiftDate: "Date", cleaner: "Cleaner",
      room: "Room", time: "Time", status: "Status", completed: "Completed", inProgress: "In Progress",
      pending: "Scheduled", noSchedule: "No shifts scheduled for this period", thisMonth: "This Month", today: "Today", thisWeek: "This Week",
      cleaningVisits: "Cleaning Visits", noVisitsFound: "No cleaning visits found", noVisitsMatching: "There are no visits matching the selected filters.", upcoming: "Upcoming",
    },
    notes: {
      title: "Client Notes", addNote: "+ Add Note", titlePlaceholder: "Note title...", notePlaceholder: "Write your note or instructions for the cleaning staff...",
      priority: "Priority", low: "Low", medium: "Medium", high: "High", urgent: "Urgent",
      createNote: "Create Note", clientNotes: "Your Notes", supervisorNotes: "Supervisor Notes", acknowledged: "Acknowledged",
      acknowledge: "Acknowledge", noNotes: "No notes created yet",
    },
    services: {
      title: "Extra Service Requests", subtitle: "Request additional cleaning services beyond your regular schedule.", requestService: "Request Extra Service", serviceTitle: "Service Title", description: "Description",
      priority: "Priority", preferredDate: "Preferred Date", selectLocation: "Select Location", selectRoom: "Select Room",
      submitRequest: "Submit Request", requests: "Your Requests", noRequests: "No extra service requests submitted yet", priorityLow: "Low",
      priorityNormal: "Normal", priorityHigh: "High", statusUnderReview: "Under Review",
      statusApproved: "Approved", statusInProgress: "In Progress", statusCompleted: "Completed",
      statusRejected: "Rejected", requestStatusFlow: "REQUEST STATUS FLOW", stepPending: "Pending",
      stepUnderReview: "Under Review", stepApprovedRejected: "Approved / Rejected", stepCompleted: "Completed",
      allStatuses: "All statuses", allPriorities: "All priorities", noRequestsTitle: "No extra service requests", noRequestsSubtitle: "Create a request whenever you need additional cleaning services.",
    },
    feedback: {
      title: "CleanOnes Feedback", submitFeedback: "Submit Feedback", rating: "Overall Rating", ratingPrompt: "How satisfied are you with our service?",
      commentsPlaceholder: "Tell us what went well or how we can improve...", category: "Feedback Category", general: "General", quality: "Cleaning Quality",
      timeliness: "Punctuality & Timeliness", staff: "Staff Behavior", submitBtn: "Send Feedback", recentFeedback: "Your Past Feedback",
      noFeedback: "No feedback submitted yet", fiveStarReviews: "5-Star Reviews",
      ratingLabels: ["Poor", "Fair", "Good", "Very Good", "Excellent"],
    },
    chat: {
      title: "CleanOnes", typeMessage: "Type your message here...", send: "Send", activeConversations: "CleanOnes",
      supervisor: "Operations Supervisor", online: "Online", offline: "Offline", noMessages: "Start a conversation with your supervisor",
      conversation: "Conversation", participants: "PARTICIPANTS", selectConversation: "Select a conversation", selectConversationDesc: "Choose a conversation to view messages.",
      pageTitle: "Conversations & Team Chat", subtitle: "Realtime messaging with CleanOnes managers and cleaning teams.",
    },
    profile: {
      title: "User Profile", personalInfo: "Personal Information", name: "Full Name", email: "Email Address", phone: "Phone Number",
      company: "Company / Organization", address: "Billing Address", changePassword: "Change Password", currentPassword: "Current Password",
      newPassword: "New Password", confirmPassword: "Confirm New Password", updateProfile: "Update Profile", saveChanges: "Save Changes",
      contactInfo: "CONTACT INFORMATION", contactPerson: "CONTACT PERSON", companyName: "COMPANY NAME", accountDetails: "ACCOUNT DETAILS",
      clientId: "CLIENT ID", memberSince: "MEMBER SINCE", contractType: "CONTRACT TYPE", accountStatus: "ACCOUNT STATUS",
      lastPasswordChanged: "Last changed: Password set at registration",
    },
    settings: {
      title: "Portal Settings", language: "Language", theme: "Theme", notifications: "Notification Preferences",
      emailAlerts: "Email Notifications", pushNotifications: "Push Notifications", smsAlerts: "SMS Cleaning Alerts", saveSettings: "Save Settings",
      notificationAlerts: "NOTIFICATION ALERTS", emailDesc: "Receive summary reports after visits", smsDesc: "Get texts when cleaning sessions start", portalPreferences: "PORTAL PREFERENCES",
    },
    notifications: {
      title: "Notifications", markAllRead: "Mark all as read", noNotifications: "No new notifications", unread: "Unread",
    },
    cleaningPlan: {
      duration: "Duration", photos: "Photos", tasks: "Tasks", rooms: "Rooms", location: "Location",
      showing: "Showing", of: "of", planNotFound: "Cleaning plan details not found.", roomsAndTasks: "Rooms & Tasks",
    },
    liveStatus: {
      complete: "Complete", roomsDone: "rooms done", shiftTime: "Shift Time", assignedWorkers: "Assigned Workers",
      inTime: "In", outTime: "Out", done: "Done", inProgress: "In Progress", pending: "Pending",
      refresh: "Refresh", tasks: "Tasks", location: "Location", date: "Date",
    },
    serviceCards: {
      submitted: "Submitted", planId: "Plan ID", duration: "Duration", photo: "Photo", time: "Time",
      photoRequired: "Photo Required", photoTitle: "Photo Title", selectPlan: "Select Cleaning Plan",
      taskName: "Task Name", dateTime: "Date & Time", plansAvailable: "plan(s) available",
      completed: "Completed", approved: "Approved", pending: "Pending", yes: "Yes", no: "No",
    },
    notificationsPage: {
      backTo: "Back to notifications", delete: "Delete", read: "Read", notFound: "Notification not found",
      backToNotifications: "Back to Notifications", settingsSaved: "Settings saved successfully",
    },
    topbar: {
      noNotifications: "No notifications", viewAllNotifications: "View all notifications", profile: "Profile",
    },
    roster: {
      title: "Schedule", dayView: "Day View", weekView: "Week View", monthView: "Month View", date: "Date",
      shiftRoster: "Shift Roster", dailyRoster: "Daily Roster", weeklyRoster: "Weekly Roster", monthlyRoster: "Monthly Roster",
      shifts: "shifts", scheduled: "scheduled", teamMember: "Worker", cleaningPlanCol: "Cleaning Plan",
      noTeamScheduled: "No team members scheduled for this date.", noPlansScheduled: "No cleaning plans scheduled for this period.",
      scheduledShift: "Scheduled shift", currentTime: "Current time",
      scrollHint: "Scroll horizontally to view the full working day", weekScrollHint: "Scroll horizontally to compare the full working week.",
      monthFooter: "Horizontal monthly staffing overview", weekendHint: "Weekends are lightly highlighted.",
      shiftDetails: "Scheduled Shift Details", viewFullPlan: "View Full Cleaning Plan", close: "Close",
      location: "Location", roomsScheduled: "Rooms Scheduled", tasksScheduled: "Tasks Scheduled",
      assignedTeam: "Assigned Team Members", upcoming: "Upcoming", duration: "Duration", durationLabel: "duration",
      cleaningShift: "Cleaning Shift", specialist: "Specialist",
      shiftToday: "shift today", shiftsToday: "shifts today", shiftsThisWeek: "shifts this week",
      available: "Available", teamMembers: "team members", plans: "plans", scheduledHours: "scheduled hours",
      projected: "Projected", progress: "Progress", noWorkersAssigned: "No workers assigned yet",
      loadError: "Could not load roster. Please try again.", prev: "Previous", next: "Next",
    },
    shiftMonitoring: { shiftsCount: "shifts" },
    workers: { employees: "employees" },
  },
  nl: {
    sidebar: {
      dashboard: "Dashboard", locations: "Locaties", rooms: "Live Status", schedule: "Planning", cleaningPlan: "Schoonmaakplan", notes: "Klantnotities",
      services: "Extra Services", feedback: "Feedback", chat: "Chat", profile: "Profiel",
      settings: "Instellingen", signOut: "Uitloggen",
    },
    titles: {
      dashboard: "Dashboard", locations: "Locaties", rooms: "Live Status", schedule: "Planning", cleaningPlan: "Schoonmaakplan", notes: "Klantnotities",
      services: "Extra Services", feedback: "Feedback", chat: "Chat", profile: "Profiel",
      settings: "Instellingen", notifications: "Meldingen",
    },
    dashboard: {
      welcomeTitle: "Welkom terug", welcomeSub: "Hier is uw schoonmaakoverzicht voor vandaag.",
      activeCleaning: "Actieve Kamervoortgang", liveCleaners: "Live Schoonmakers", nextVisit: "Volgende Bezoek",
      acknowledgedNotes: "Bevestigde Notities", quickActions: "Snelle Acties",
      extraServiceReq: "Extra Service Aanvragen", leaveFeedback: "Feedback Achterlaten",
      chatCleanOnes: "Chat met CleanOnes", recentSchedule: "Recente Planning",
      acknowledged: "Bevestigd", pending: "In behandeling", hours: "Uren", rooms: "Kamers",
      lastCompleted: "Laatst voltooid", teamOnSite: "Uw team op locatie", active: "actief",
      noTeamOnSite: "Geen teamleden op locatie.", viewSchedule: "Bekijk volledige planning",
      contactSupport: "Neem contact op met CleanOnes", nextVisitors: "Volgende bezoekers", specialists: "specialisten",
      all: "Alle", noServiceToday: "Geen service vandaag",
      roomTrackingNote: "Kamervoortgang is beschikbaar omdat deze locatie kamertracking gebruikt.",
      noUpcomingVisits: "Geen komende bezoeken gepland", noSpecialistsOnSite: "Geen specialisten op locatie",
      noCompletedVisits: "Nog geen voltooide bezoeken", noScheduledVisits: "Geen geplande bezoeken",
      completed: "voltooid", remaining: "resterend", allShiftsOnSchedule: "Alle diensten op schema",
      scopeOverview: "Dienstomvang & Inventaris", scopeOverviewDesc: "Totaal aantal faciliteiten, kamers en taken binnen uw plan",
      deliveryOverview: "Uitgevoerd Werk & Voortgang", deliveryOverviewDesc: "Cumulatieve voortgang van schoongemaakte kamers, taken en gewerkte uren",
      cleaningPlans: "Schoonmaakplannen", cleaningPlansSub: "Actieve schoonmaakplannen",
      managedLocations: "Beheerde Locaties", managedLocationsSub: "Actieve faciliteiten",
      totalRoomsScope: "Totaal Kamers", totalRoomsScopeSub: "Geregistreerde kamers",
      totalTasksScope: "Totaal Taken", totalTasksScopeSub: "Geplande taken",
      completedTasksTitle: "Voltooide Taken", completedTasksSub: "taken voltooid",
      completedRoomsTitle: "Schone Kamers", completedRoomsSub: "kamers gereed",
      hoursDeliveredTitle: "Geleverde Uren", hoursDeliveredSub: "Totale schoonmaakuren afgerond",
      shiftDeliveryPerformance: "Shiftleveringsprestaties",
      shiftDeliveryDesc: "Overzicht van geplande, voltooide en openstaande diensten",
      completionRate: "Voltooiingspercentage", optimal: "Optimaal", paced: "Op tempo",
      activeShiftsDone: "{completed} van {active} actieve diensten voltooid",
      totalShiftsCard: "Totaal diensten", scheduledShiftsInWindow: "Geplande diensten in periode",
      completedShiftsCard: "Voltooide diensten", donePill: "Klaar", successfullyDelivered: "Succesvol geleverd",
      pendingShiftsCard: "Openstaande diensten", inQueue: "In wachtrij", upcomingInProgress: "Aankomend & bezig",
      plansCount: "{count} Plannen", sitesCount: "{count} Locaties", scopePill: "Bereik", checklistPill: "Checklist",
    },
    actionFeedback: { loading: "Laden...", success: "Succes!", error: "Er is een fout opgetreden", saved: "Succesvol opgeslagen", deleted: "Succesvol verwijderd", sent: "Succesvol verzonden", loginSuccess: "Succesvol ingelogd", loginFailed: "Inloggen mislukt" },
    common: {
      hours: "Uren", rooms: "Kamers", search: "Zoeken", filter: "Filter",
      cancel: "Annuleren", save: "Opslaan", submit: "Versturen", status: "Status",
      loading: "Laden...", active: "Actief", inactive: "Inactief", edit: "Bewerken", delete: "Verwijderen",
    },
    locations: {
      title: "Locaties", subtitle: "Bekijk uw faciliteiten en de geregistreerde kamers onder elke locatie.", searchPlaceholder: "Zoek locaties...", address: "Adres", roomsCount: "Kamers",
      viewDetails: "Bekijk details", backToLocations: "Terug naar locaties", noLocations: "Geen locaties gevonden.", locationDetails: "Locatiedetails",
      addressUnavailable: "Adres niet beschikbaar", status: "Status", online: "Online", offline: "Offline", location: "Locatie",
      rooms: "Kamers", noLocationsMatch: "Geen locaties komen overeen met uw zoekopdracht.", loadingLocation: "Locatie laden…", description: "Omschrijving",
    },
    rooms: {
      title: "Live Kamerstatus", liveSubtitle: "Realtime overzicht van uw huidige schoonmaaksessie.", searchPlaceholder: "Zoek kamers...", allStatuses: "Alle statussen", clean: "Schoon",
      cleaning: "Schoonmaak in uitvoering", dirty: "Moet worden schoongemaakt", inspect: "Moet worden geïnspecteerd", noRooms: "Geen kamers gevonden",
      roomDetails: "Kamerdetails", tasks: "Schoonmaaktaken", floor: "Verdieping", size: "Grootte", lastCleaned: "Laatst schoongemaakt",
      noLiveSession: "Geen live schoonmaaksessie", noLiveSessionDesc: "Er is momenteel geen actieve of recente schoonmaaksessie beschikbaar. Live voortgang verschijnt hier zodra een geplande dienst begint.", checkAgain: "Opnieuw controleren",
      selectRoom: "Selecteer een kamer om taken en vereiste foto's te bekijken.", noRoomsMatch: "Geen kamers komen overeen met uw zoekopdracht.", room: "Kamer", standard: "Standaard",
      recurringTasks: "Terugkerende Schoonmaaktaken", noRecurringTasks: "Geen terugkerende taken geconfigureerd voor deze kamer", requiredPhotos: "📷 Vereiste foto's:",
      daily: "Dagelijks", weekly: "Wekelijks", monthly: "Maandelijks", min: "Min",
    },
    schedule: {
      title: "Schoonmaakplanning", subtitle: "Aankomende en eerdere schoonmaakbezoeken voor uw locaties.", searchPlaceholder: "Zoek planning...", shiftDate: "Datum", cleaner: "Schoonmaker",
      room: "Kamer", time: "Tijd", status: "Status", completed: "Voltooid", inProgress: "In uitvoering",
      pending: "Gepland", noSchedule: "Geen diensten gepland voor deze periode", thisMonth: "Deze maand", today: "Vandaag", thisWeek: "Deze week",
      cleaningVisits: "Schoonmaakbezoeken", noVisitsFound: "Geen schoonmaakbezoeken gevonden", noVisitsMatching: "Er zijn geen bezoeken die overeenkomen met de geselecteerde filters.", upcoming: "Aankomend",
    },
    notes: {
      title: "Klantnotities", addNote: "+ Notitie toevoegen", titlePlaceholder: "Notitietitel...", notePlaceholder: "Schrijf uw notitie of instructies voor het schoonmaakpersoneel...",
      priority: "Prioriteit", low: "Laag", medium: "Gemiddeld", high: "Hoog", urgent: "Dringend",
      createNote: "Notitie maken", clientNotes: "Uw notities", supervisorNotes: "Notities leidinggevende", acknowledged: "Bevestigd",
      acknowledge: "Bevestigen", noNotes: "Nog geen notities aangemaakt",
    },
    services: {
      title: "Extra Serviceaanvragen", subtitle: "Vraag extra schoonmaakservices aan buiten uw reguliere rooster.", requestService: "+ Extra Service Aanvragen", serviceTitle: "Servicetitel", description: "Beschrijving",
      priority: "Prioriteit", preferredDate: "Voorkeursdatum", selectLocation: "Selecteer locatie", selectRoom: "Selecteer kamer",
      submitRequest: "Aanvraag versturen", requests: "Uw aanvragen", noRequests: "Nog geen extra serviceaanvragen ingediend", priorityLow: "Laag",
      priorityNormal: "Normaal", priorityHigh: "Hoog", statusUnderReview: "In behandeling",
      statusApproved: "Goedgekeurd", statusInProgress: "In uitvoering", statusCompleted: "Voltooid",
      statusRejected: "Afgewezen", requestStatusFlow: "AANVRAAG STATUSVERLOOP", stepPending: "In afwachting",
      stepUnderReview: "In behandeling", stepApprovedRejected: "Goedgekeurd / Afgewezen", stepCompleted: "Voltooid",
      allStatuses: "Alle statussen", allPriorities: "Alle prioriteiten", noRequestsTitle: "Geen extra serviceaanvragen", noRequestsSubtitle: "Maak een aanvraag aan wanneer u extra schoonmaakservices nodig heeft.",
    },
    feedback: {
      title: "CleanOnes Feedback", submitFeedback: "Feedback versturen", rating: "Algemene beoordeling", ratingPrompt: "Hoe tevreden bent u met onze service?",
      commentsPlaceholder: "Vertel ons wat er goed ging of hoe we kunnen verbeteren...", category: "Feedbackcategorie", general: "Algemeen", quality: "Schoonmaakkwaliteit",
      timeliness: "Punctualiteit & Tijdijdigheid", staff: "Gedrag personeel", submitBtn: "Feedback versturen", recentFeedback: "Uw eerdere feedback",
      noFeedback: "Nog geen feedback ingediend", fiveStarReviews: "5-Sterren Beoordelingen",
      ratingLabels: ["Slecht", "Matig", "Goed", "Zeer goed", "Uitstekend"],
    },
    chat: {
      title: "CleanOnes", typeMessage: "Typ hier uw bericht...", send: "Versturen", activeConversations: "CleanOnes",
      supervisor: "Operationeel Leidinggevende", online: "Online", offline: "Offline", noMessages: "Start een gesprek met uw leidinggevende",
      conversation: "Gesprek", participants: "DEELNEMERS", selectConversation: "Selecteer een gesprek", selectConversationDesc: "Kies een gesprek om berichten te bekijken.",
      pageTitle: "Gesprekken & Teamchat", subtitle: "Realtime berichten met CleanOnes managers en schoonmaakteams.",
    },
    profile: {
      title: "Gebruikersprofiel", personalInfo: "Persoonlijke informatie", name: "Volledige naam", email: "E-mailadres", phone: "Telefoonnummer",
      company: "Bedrijf / Organisatie", address: "Facturatieadres", changePassword: "Wachtwoord wijzigen", currentPassword: "Huidig wachtwoord",
      newPassword: "Nieuw wachtwoord", confirmPassword: "Bevestig nieuw wachtwoord", updateProfile: "Profiel bijwerken", saveChanges: "Wijzigingen opslaan",
      contactInfo: "CONTACTINFORMATIE", contactPerson: "CONTACTPERSOON", companyName: "BEDRIJFSNAAM", accountDetails: "ACCOUNTDETAILS",
      clientId: "KLANT ID", memberSince: "LID SINDS", contractType: "CONTRACTTYPE", accountStatus: "ACCOUNTSTATUS",
      lastPasswordChanged: "Laatst gewijzigd: Wachtwoord ingesteld bij registratie",
    },
    settings: {
      title: "Portaalinstellingen", language: "Taal", theme: "Thema", notifications: "Meldingenvoorkeuren",
      emailAlerts: "E-mailmeldingen", pushNotifications: "Push-meldingen", smsAlerts: "SMS-schoonmaakmeldingen", saveSettings: "Instellingen opslaan",
      notificationAlerts: "MELDINGSALERTS", emailDesc: "Ontvang samenvattende rapporten na bezoeken", smsDesc: "Ontvang sms-berichten wanneer schoonmaaksessies starten", portalPreferences: "PORTAALVOORKEUREN",
    },
    notifications: {
      title: "Meldingen", markAllRead: "Alles als gelezen markeren", noNotifications: "Geen nieuwe meldingen", unread: "Ongelezen",
    },
    cleaningPlan: {
      duration: "Duur", photos: "Foto's", tasks: "Taken", rooms: "Kamers", location: "Locatie",
      showing: "Tonen", of: "van", planNotFound: "Schoonmaakplan details niet gevonden.", roomsAndTasks: "Kamers & Taken",
    },
    liveStatus: {
      complete: "Voltooid", roomsDone: "kamers gedaan", shiftTime: "Diensttijd", assignedWorkers: "Toegewezen Medewerkers",
      inTime: "In", outTime: "Uit", done: "Gedaan", inProgress: "In uitvoering", pending: "In afwachting",
      refresh: "Vernieuwen", tasks: "Taken", location: "Locatie", date: "Datum",
    },
    serviceCards: {
      submitted: "Ingediend", planId: "Plan ID", duration: "Duur", photo: "Foto", time: "Tijd",
      photoRequired: "Foto Vereist", photoTitle: "Fototitel", selectPlan: "Selecteer Schoonmaakplan",
      taskName: "Taaknaam", dateTime: "Datum & Tijd", plansAvailable: "plan(nen) beschikbaar",
      completed: "Voltooid", approved: "Goedgekeurd", pending: "In afwachting", yes: "Ja", no: "Nee",
    },
    notificationsPage: {
      backTo: "Terug naar meldingen", delete: "Verwijderen", read: "Gelezen", notFound: "Melding niet gevonden",
      backToNotifications: "Terug naar Meldingen", settingsSaved: "Instellingen succesvol opgeslagen",
    },
    topbar: {
      noNotifications: "Geen meldingen", viewAllNotifications: "Alle meldingen bekijken", profile: "Profiel",
    },
    roster: {
      title: "Planning", dayView: "Dagoverzicht", weekView: "Weekoverzicht", monthView: "Maandoverzicht", date: "Datum",
      shiftRoster: "Dienstrooster", dailyRoster: "Dagelijks Rooster", weeklyRoster: "Wekelijks Rooster", monthlyRoster: "Maandelijks Rooster",
      shifts: "diensten", scheduled: "gepland", teamMember: "Werknemer", cleaningPlanCol: "Schoonmaakplan",
      noTeamScheduled: "Geen teamleden gepland voor deze datum.", noPlansScheduled: "Geen schoonmaakplannen gepland voor deze periode.",
      scheduledShift: "Geplande dienst", currentTime: "Huidige tijd",
      scrollHint: "Scroll horizontaal om de volledige werkdag te bekijken", weekScrollHint: "Scroll horizontaal om de hele week te vergelijken.",
      monthFooter: "Maandelijks overzicht van de planning", weekendHint: "Weekenden zijn licht gemarkeerd.",
      shiftDetails: "Details Geplande Dienst", viewFullPlan: "Bekijk Volledig Schoonmaakplan", close: "Sluiten",
      location: "Locatie", roomsScheduled: "Kamers Gepland", tasksScheduled: "Taken Gepland",
      assignedTeam: "Toegewezen Teamleden", upcoming: "Aankomend", duration: "Duur", durationLabel: "duur",
      cleaningShift: "Schoonmaakdienst", specialist: "Specialist",
      shiftToday: "dienst vandaag", shiftsToday: "diensten vandaag", shiftsThisWeek: "diensten deze week",
      available: "Beschikbaar", plans: "plannen", scheduledHours: "geplande uren",
      projected: "Geprojecteerd", progress: "Voortgang", noWorkersAssigned: "Nog geen medewerkers toegewezen",
      loadError: "Rooster kon niet worden geladen. Probeer opnieuw.", prev: "Vorige", next: "Volgende",
    },
  },
  pl: {
    sidebar: {
      dashboard: "Pulpit", locations: "Lokalizacje", rooms: "Stan na żywo", schedule: "Harmonogram", cleaningPlan: "Plan sprzątania", notes: "Notatki Klienta",
      services: "Usługi Dodatkowe", feedback: "Opinie", chat: "Czat", profile: "Profil",
      settings: "Ustawienia", signOut: "Wyloguj się",
    },
    titles: {
      dashboard: "Pulpit", locations: "Lokalizacje", rooms: "Stan na żywo", schedule: "Harmonogram", cleaningPlan: "Plan sprzątania", notes: "Notatki Klienta",
      services: "Usługi Dodatkowe", feedback: "Opinie", chat: "Czat", profile: "Profil",
      settings: "Ustawienia", notifications: "Powiadomienia",
    },
    dashboard: {
      welcomeTitle: "Witaj z powrotem", welcomeSub: "Oto Twoje podsumowanie sprzątania na dziś.",
      activeCleaning: "Postęp Sprzątania Pokoi", liveCleaners: "Sprzątacze na żywo", nextVisit: "Następna Wizyta",
      acknowledgedNotes: "Potwierdzone Notatki", quickActions: "Szybkie Akcje",
      extraServiceReq: "Zamów Dodatkową Usługę", leaveFeedback: "Zostaw Opinię",
      chatCleanOnes: "Czat z CleanOnes", recentSchedule: "Ostatni Harmonogram",
      acknowledged: "Potwierdzono", pending: "Oczekujący", hours: "Godziny", rooms: "Pokoje",
      lastCompleted: "Ostatnio ukończono", teamOnSite: "Twój zespół na miejscu", active: "aktywni",
      noTeamOnSite: "Brak członków zespołu na miejscu.", viewSchedule: "Zobacz pełny harmonogram",
      contactSupport: "Skontaktuj się z CleanOnes", nextVisitors: "Następni goście", specialists: "specjaliści",
      all: "Wszystkie", noServiceToday: "Brak usług dzisiaj",
      roomTrackingNote: "Postęp w pokojach jest dostępny, ponieważ ta lokalizacja używa śledzenia pokoi.",
      noUpcomingVisits: "Brak zaplanowanych nadchodzących wizyt", noSpecialistsOnSite: "Brak specjalistów na miejscu",
      noCompletedVisits: "Brak ukończonych wizyt", noScheduledVisits: "Brak zaplanowanych wizyt",
      completed: "ukończono", remaining: "pozostało", allShiftsOnSchedule: "Wszystkie zmiany zgodnie z harmonogramem",
      scopeOverview: "Zakres usług i zasoby", scopeOverviewDesc: "Łączna liczba obiektów, pomieszczeń i zadań w planie",
      deliveryOverview: "Wykonana praca i postęp", deliveryOverviewDesc: "Podsumowanie posprzątanych pomieszczeń, ukończonych zadań i zrealizowanych godzin",
      cleaningPlans: "Plany sprzątania", cleaningPlansSub: "Aktywne plany usług",
      managedLocations: "Lokalizacje", managedLocationsSub: "Aktywne obiekty",
      totalRoomsScope: "Łącznie pomieszczeń", totalRoomsScopeSub: "Zarejestrowane pomieszczenia",
      totalTasksScope: "Łącznie zadań", totalTasksScopeSub: "Zaplanowane zadania",
      completedTasksTitle: "Ukończone zadania", completedTasksSub: "zadań ukończonych",
      completedRoomsTitle: "Posprzątane pomieszczenia", completedRoomsSub: "pomieszczeń ukończonych",
      hoursDeliveredTitle: "Zrealizowane godziny", hoursDeliveredSub: "Łączny czas ukończonego sprzątania",
      shiftDeliveryPerformance: "Wydajność realizacji zmian",
      shiftDeliveryDesc: "Przegląd zaplanowanych, ukończonych i oczekujących zmian",
      completionRate: "Wskaźnik ukończenia", optimal: "Optymalny", paced: "W tempie",
      activeShiftsDone: "{completed} z {active} aktywnych zmian ukończonych",
      totalShiftsCard: "Łącznie zmian", scheduledShiftsInWindow: "Zaplanowane zmiany w okresie",
      completedShiftsCard: "Ukończone zmiany", donePill: "Gotowe", successfullyDelivered: "Pomyślnie zrealizowane",
      pendingShiftsCard: "Oczekujące zmiany", inQueue: "W kolejce", upcomingInProgress: "Nadchodzące i w toku",
      plansCount: "{count} Plany", sitesCount: "{count} Obiekty", scopePill: "Zakres", checklistPill: "Lista zadań",
    },
    actionFeedback: { loading: "Ładowanie...", success: "Sukces!", error: "Wystąpił błąd", saved: "Zapisano pomyślnie", deleted: "Usunięto pomyślnie", sent: "Wysłano pomyślnie", loginSuccess: "Zalogowano pomyślnie", loginFailed: "Logowanie nie powiodło się" },
    common: {
      hours: "Godziny", rooms: "Pokoje", search: "Szukaj", filter: "Filtr",
      cancel: "Anuluj", save: "Zapisz", submit: "Wyślij", status: "Status",
      loading: "Ładowanie...", active: "Aktywny", inactive: "Nieaktywny", edit: "Edytuj", delete: "Usuń",
    },
    locations: {
      title: "Lokalizacje", subtitle: "Zobacz swoje obiekty i zarejestrowane pokoje w każdej lokalizacji.", searchPlaceholder: "Szukaj lokalizacji...", address: "Adres", roomsCount: "Pokoje",
      viewDetails: "Zobacz szczegóły", backToLocations: "Powrót do lokalizacji", noLocations: "Nie znaleziono lokalizacji.", locationDetails: "Szczegóły lokalizacji",
      addressUnavailable: "Adres niedostępny", status: "Status", online: "Online", offline: "Offline", location: "Lokalizacja",
      rooms: "Pokoje", noLocationsMatch: "Brak lokalizacji pasujących do wyszukiwania.", loadingLocation: "Ładowanie lokalizacji…", description: "Opis",
    },
    rooms: {
      title: "Stan Pokoi na Żywo", liveSubtitle: "Widok na żywo bieżącej sesji sprzątania.", searchPlaceholder: "Szukaj pokoi...", allStatuses: "Wszystkie statusy", clean: "Czysto",
      cleaning: "Sprzątanie w trakcie", dirty: "Wymaga sprzątania", inspect: "Wymaga inspekcji", noRooms: "Nie znaleziono pokoi",
      roomDetails: "Szczegóły pokoju", tasks: "Zadania sprzątania", floor: "Piętro", size: "Rozmiar", lastCleaned: "Ostatnio sprzątane",
      noLiveSession: "Brak aktywnej sesji sprzątania", noLiveSessionDesc: "W tej chwili brak aktywnej lub niedawnej sesji sprzątania. Postęp na żywo pojawi się tutaj, gdy rozpoczęcie zaplanowanej zmiany.", checkAgain: "Sprawdź ponownie",
      selectRoom: "Wybierz pokój, aby zobaczyć jego zadania i wymagane zdjęcia.", noRoomsMatch: "Brak pokoi pasujących do wyszukiwania.", room: "Pokój", standard: "Standard",
      recurringTasks: "Powtarzające się zadania sprzątania", noRecurringTasks: "Brak powtarzających się zadań skonfigurowanych dla tego pokoju", requiredPhotos: "📷 Wymagane zdjęcia:",
      daily: "Codziennie", weekly: "Co tydzień", monthly: "Co miesiąc", min: "Min",
    },
    schedule: {
      title: "Harmonogram Sprzątania", subtitle: "Nadchodzące i przeszłe wizyty sprzątania dla Twoich lokalizacji.", searchPlaceholder: "Szukaj w harmonogramie...", shiftDate: "Data", cleaner: "Sprzątacz",
      room: "Pokój", time: "Czas", status: "Status", completed: "Ukończono", inProgress: "W trakcie",
      pending: "Zaplanowano", noSchedule: "Brak zaplanowanych zmian w tym okresie", thisMonth: "W tym miesiącu", today: "Dzisiaj", thisWeek: "W tym tygodniu",
      cleaningVisits: "Wizyty Sprzątania", noVisitsFound: "Nie znaleziono wizyt sprzątania", noVisitsMatching: "Brak wizyt spełniających wybrane filtry.", upcoming: "Nadchodzące",
    },
    notes: {
      title: "Notatki Klienta", addNote: "+ Dodaj notatkę", titlePlaceholder: "Tytuł notatki...", notePlaceholder: "Wpisz swoją notatkę lub instrukcje dla personelu...",
      priority: "Priorytet", low: "Niski", medium: "Średni", high: "Wysoki", urgent: "Pilny",
      createNote: "Utwórz notatkę", clientNotes: "Twoje notatki", supervisorNotes: "Notatki nadzorcy", acknowledged: "Potwierdzono",
      acknowledge: "Potwierdź", noNotes: "Brak utworzonych notatek",
    },
    services: {
      title: "Zamówienia Usług Dodatkowych", subtitle: "Zamów dodatkowe usługi sprzątania poza swoim regularnym harmonogramem.", requestService: "+ Zamów Usługę Dodatkową", serviceTitle: "Tytuł usługi", description: "Opis",
      priority: "Priorytet", preferredDate: "Preferowana data", selectLocation: "Wybierz lokalizację", selectRoom: "Wybierz pokój",
      submitRequest: "Wyślij zamówienie", requests: "Twoje zamówienia", noRequests: "Brak złożonych zamówień usług dodatkowych", priorityLow: "Niski",
      priorityNormal: "Normalny", priorityHigh: "Wysoki", statusUnderReview: "W trakcie weryfikacji",
      statusApproved: "Zatwierdzono", statusInProgress: "W trakcie realizacji", statusCompleted: "Ukończono",
      statusRejected: "Odrzucono", requestStatusFlow: "PRZEPŁYW STATUSU ZAMÓWIENIA", stepPending: "Oczekujące",
      stepUnderReview: "W weryfikacji", stepApprovedRejected: "Zatwierdzone / Odrzucone", stepCompleted: "Ukończone",
      allStatuses: "Wszystkie statusy", allPriorities: "Wszystkie priorytety", noRequestsTitle: "Brak zamówień usług dodatkowych", noRequestsSubtitle: "Utwórz zamówienie, gdy potrzebujesz dodatkowych usług sprzątania.",
    },
    feedback: {
      title: "Opinia CleanOnes", submitFeedback: "Wyślij opinię", rating: "Ogólna ocena", ratingPrompt: "Jak bardzo jesteś zadowolony z naszych usług?",
      commentsPlaceholder: "Napisz nam, co poszło dobrze lub jak możemy się poprawić...", category: "Kategoria opinii", general: "Ogólne", quality: "Jakość sprzątania",
      timeliness: "Punktualność", staff: "Zachowanie personelu", submitBtn: "Wyślij opinię", recentFeedback: "Twoje poprzednie opinie",
      noFeedback: "Nie przesłano jeszcze opinii", fiveStarReviews: "Oceny 5-gwiazdkowe",
      ratingLabels: ["Słaba", "Przeciętna", "Dobra", "Bardzo dobra", "Doskonała"],
    },
    chat: {
      title: "CleanOnes", typeMessage: "Wpisz tutaj swoją wiadomość...", send: "Wyślij", activeConversations: "CleanOnes",
      supervisor: "Nadzorca Operacyjny", online: "Online", offline: "Offline", noMessages: "Rozpocznij rozmowę z nadzorcą",
      conversation: "Rozmowa", participants: "UCZESTNICY", selectConversation: "Wybierz rozmowę", selectConversationDesc: "Wybierz rozmowę, aby zobaczyć wiadomości.",
      pageTitle: "Rozmowy i czat zespołowy", subtitle: "Wiadomości w czasie rzeczywistym z menedżerami CleanOnes i zespołami sprzątającymi.",
    },
    profile: {
      title: "Profil Użytkownika", personalInfo: "Informacje osobiste", name: "Imię i nazwisko", email: "Adres e-mail", phone: "Numer telefonu",
      company: "Firma / Organizacja", address: "Adres rozliczeniowy", changePassword: "Zmień hasło", currentPassword: "Obecne hasło",
      newPassword: "Nowe hasło", confirmPassword: "Potwierdź nowe hasło", updateProfile: "Aktualizuj profil", saveChanges: "Zapisz zmiany",
      contactInfo: "INFORMACJE KONTAKTOWE", contactPerson: "OSOBA KONTAKTOWA", companyName: "NAZWA FIRMY", accountDetails: "SZCZEGÓŁY KONTA",
      clientId: "ID KLIENTA", memberSince: "CZŁONEK OD", contractType: "TYP UMOWY", accountStatus: "STATUS KONTA",
      lastPasswordChanged: "Ostatnia zmiana: Hasło ustawione podczas rejestracji",
    },
    settings: {
      title: "Ustawienia Portalu", language: "Język", theme: "Motyw", notifications: "Preferencje powiadomień",
      emailAlerts: "Powiadomienia E-mail", pushNotifications: "Powiadomienia push", smsAlerts: "Alerty SMS o Sprzątaniu", saveSettings: "Zapisz ustawienia",
      notificationAlerts: "ALERTY POWIADOMIEŃ", emailDesc: "Otrzymuj podsumowania po wizytach", smsDesc: "Otrzymuj SMS-y po rozpoczęciu sesji sprzątania", portalPreferences: "PREFERENCJE PORTALU",
    },
    notifications: {
      title: "Powiadomienia", markAllRead: "Oznacz wszystkie jako przeczytane", noNotifications: "Brak nowych powiadomień", unread: "Nieprzeczytane",
    },
    cleaningPlan: {
      duration: "Czas trwania", photos: "Zdjęcia", tasks: "Zadania", rooms: "Pokoje", location: "Lokalizacja",
      showing: "Wyświetlanie", of: "z", planNotFound: "Szczegóły planu sprzątania nie zostały znalezione.", roomsAndTasks: "Pokoje i Zadania",
    },
    liveStatus: {
      complete: "Ukończono", roomsDone: "pokoje ukończone", shiftTime: "Czas zmiany", assignedWorkers: "Przypisani Pracownicy",
      inTime: "Wejście", outTime: "Wyjście", done: "Gotowe", inProgress: "W trakcie", pending: "Oczekujące",
      refresh: "Odśwież", tasks: "Zadania", location: "Lokalizacja", date: "Data",
    },
    serviceCards: {
      submitted: "Zgłoszono", planId: "ID Planu", duration: "Czas trwania", photo: "Zdjęcie", time: "Czas",
      photoRequired: "Zdjęcie Wymagane", photoTitle: "Tytuł Zdjęcia", selectPlan: "Wybierz Plan Sprzątania",
      taskName: "Nazwa Zadania", dateTime: "Data i Godzina", plansAvailable: "plan(y) dostępne",
      completed: "Ukończono", approved: "Zatwierdzono", pending: "Oczekujące", yes: "Tak", no: "Nie",
    },
    notificationsPage: {
      backTo: "Powrót do powiadomień", delete: "Usuń", read: "Przeczytane", notFound: "Nie znaleziono powiadomienia",
      backToNotifications: "Powrót do Powiadomień", settingsSaved: "Ustawienia zapisano pomyślnie",
    },
    topbar: {
      noNotifications: "Brak powiadomień", viewAllNotifications: "Zobacz wszystkie powiadomienia", profile: "Profil",
    },
    roster: {
      title: "Harmonogram", dayView: "Widok Dnia", weekView: "Widok Tygodnia", monthView: "Widok Miesiąca", date: "Data",
      shiftRoster: "Harmonogram zmian", dailyRoster: "Codzienny Harmonogram", weeklyRoster: "Tygodniowy Harmonogram", monthlyRoster: "Miesięczny Harmonogram",
      shifts: "zmiany", scheduled: "zaplanowano", teamMember: "Pracownik", cleaningPlanCol: "Plan sprzątania",
      noTeamScheduled: "Brak zaplanowanych członków zespołu na tę datę.", noPlansScheduled: "Brak planów sprzątania w tym okresie.",
      scheduledShift: "Zaplanowana zmiana", currentTime: "Obecny czas",
      scrollHint: "Przewiń w poziomie, aby zobaczyć cały dzień pracy", weekScrollHint: "Przewiń w poziomie, aby porównać cały tydzień.",
      monthFooter: "Miesięczny przegląd obsady", weekendHint: "Weekendy są lekko podświetlone.",
      shiftDetails: "Szczegóły Zaplanowanej Zmiany", viewFullPlan: "Zobacz Pełny Plan Sprzątania", close: "Zamknij",
      location: "Lokalizacja", roomsScheduled: "Zaplanowane Pokoje", tasksScheduled: "Zaplanowane Zadania",
      assignedTeam: "Przypisani Członkowie Zespołu", upcoming: "Nadchodzące", duration: "Czas trwania", durationLabel: "czas trwania",
      cleaningShift: "Zmiana Sprzątania", specialist: "Specjalista",
      shiftToday: "zmiana dziś", shiftsToday: "zmiany dziś", shiftsThisWeek: "zmiany w tym tygodniu",
      available: "Dostępny", plans: "plany", scheduledHours: "zaplanowane godziny",
      projected: "Prognozowane", progress: "Postęp", noWorkersAssigned: "Brak przypisanych pracowników",
      loadError: "Nie udało się wczytać harmonogramu. Spróbuj ponownie.", prev: "Poprzedni", next: "Następny",
    },
  },
  uk: {
    sidebar: {
      dashboard: "Панель управління", locations: "Локації", rooms: "Онлайн-статус", schedule: "Розклад", cleaningPlan: "План прибирання", notes: "Нотатки клієнта",
      services: "Додаткові послуги", feedback: "Відгуки", chat: "Чат", profile: "Профіль",
      settings: "Налаштування", signOut: "Вийти",
    },
    titles: {
      dashboard: "Панель управління", locations: "Локації", rooms: "Онлайн-статус", schedule: "Розклад", cleaningPlan: "План прибирання", notes: "Нотатки клієнта",
      services: "Додаткові послуги", feedback: "Відгуки", chat: "Чат", profile: "Профіль",
      settings: "Налаштування", notifications: "Сповіщення",
    },
    dashboard: {
      welcomeTitle: "З поверненням", welcomeSub: "Ось ваш звіт з прибирання на сьогодні.",
      activeCleaning: "Прогрес прибирання кімнат", liveCleaners: "Прибиральники на зміні", nextVisit: "Наступний візит",
      acknowledgedNotes: "Підтверджені нотатки", quickActions: "Швидкі дії",
      extraServiceReq: "Замовити додаткову послугу", leaveFeedback: "Залишити відгук",
      chatCleanOnes: "Чат з CleanOnes", recentSchedule: "Останній розклад",
      acknowledged: "Підтверджено", pending: "В очікуванні", hours: "Години", rooms: "Кімнати",
      lastCompleted: "Останнє завершене", teamOnSite: "Ваша команда на об'єкті", active: "активні",
      noTeamOnSite: "Немає працівників на об'єкті.", viewSchedule: "Переглянути повний розклад",
      contactSupport: "Зв'язатися з CleanOnes", nextVisitors: "Наступні візитери", specialists: "фахівці",
      all: "Усі", noServiceToday: "Сьогодні прибирання відсутнє",
      roomTrackingNote: "Прогрес по кімнатах доступний, оскільки для цієї локації використовується відстеження кімнат.",
      noUpcomingVisits: "Немає запланованих майбутніх візитів", noSpecialistsOnSite: "Немає фахівців на об'єкті",
      noCompletedVisits: "Ще немає завершених візитів", noScheduledVisits: "Немає запланованих візитів",
      completed: "завершено", remaining: "залишилось", allShiftsOnSchedule: "Всі зміни за розкладом",
      scopeOverview: "Обсяг послуг та інвентар", scopeOverviewDesc: "Всього об'єктів, приміщень та завдань у плані",
      deliveryOverview: "Виконана робота та прогрес", deliveryOverviewDesc: "Прогрес прибраних приміщень, завдань та виконаних годин",
      cleaningPlans: "Плани прибирання", cleaningPlansSub: "Активні плани",
      managedLocations: "Локації", managedLocationsSub: "Активні об'єкти",
      totalRoomsScope: "Всього приміщень", totalRoomsScopeSub: "Зареєстровані приміщення",
      totalTasksScope: "Всього завдань", totalTasksScopeSub: "Заплановані завдання",
      completedTasksTitle: "Виконані завдання", completedTasksSub: "завдань завершено",
      completedRoomsTitle: "Прибрані приміщення", completedRoomsSub: "приміщень прибрано",
      hoursDeliveredTitle: "Виконані години", hoursDeliveredSub: "Всього відпрацьованих годин",
      shiftDeliveryPerformance: "Ефективність виконання змін",
      shiftDeliveryDesc: "Огляд запланованих, завершених і очікуваних змін",
      completionRate: "Рівень завершення", optimal: "Оптимально", paced: "У темпі",
      activeShiftsDone: "{completed} з {active} активних змін виконано",
      totalShiftsCard: "Всього змін", scheduledShiftsInWindow: "Заплановані зміни за період",
      completedShiftsCard: "Завершені зміни", donePill: "Готово", successfullyDelivered: "Успішно виконано",
      pendingShiftsCard: "Очікувані зміни", inQueue: "У черзі", upcomingInProgress: "Майбутні та в процесі",
      plansCount: "{count} Плани", sitesCount: "{count} Об'єкти", scopePill: "Обсяг", checklistPill: "Чекліст",
    },
    actionFeedback: { loading: "Завантаження...", success: "Успіх!", error: "Сталася помилка", saved: "Успішно збережено", deleted: "Успішно видалено", sent: "Успішно надіслано", loginSuccess: "Успішний вхід", loginFailed: "Помилка входу" },
    common: {
      hours: "Години", rooms: "Кімнати", search: "Пошук", filter: "Фільтр",
      cancel: "Скасувати", save: "Зберегти", submit: "Надіслати", status: "Статус",
      loading: "Завантаження...", active: "Активний", inactive: "Неактивний", edit: "Редагувати", delete: "Видалити",
    },
    locations: {
      title: "Локації", subtitle: "Перегляд ваших об'єктів та зареєстрованих кімнат для кожної локації.", searchPlaceholder: "Пошук локацій...", address: "Адреса", roomsCount: "Кімнати",
      viewDetails: "Детальніше", backToLocations: "Назад до локацій", noLocations: "Локацій не знайдено.", locationDetails: "Деталі локації",
      addressUnavailable: "Адреса недоступна", status: "Статус", online: "В мережі", offline: "Не в мережі", location: "Локація",
      rooms: "Кімнати", noLocationsMatch: "Немає локацій, що відповідають вашому запиту.", loadingLocation: "Завантаження локації…", description: "Опис",
    },
    rooms: {
      title: "Онлайн-статус кімнат", liveSubtitle: "Перегляд вашої поточної сесії прибирання в режимі реального часу.", searchPlaceholder: "Пошук кімнат...", allStatuses: "Усі статуси", clean: "Чисто",
      cleaning: "Прибирання триває", dirty: "Потребує прибирання", inspect: "Потребує інспекції", noRooms: "Кімнат не знайдено",
      roomDetails: "Деталі кімнати", tasks: "Завдання прибирання", floor: "Поверх", size: "Розмір", lastCleaned: "Останнє прибирання",
      noLiveSession: "Немає активної сесії прибирання", noLiveSessionDesc: "Наразі немає активної або нещодавньої сесії прибирання. Прогрес з'явиться тут, коли розпочнеться запланована зміна.", checkAgain: "Перевірити знову",
      selectRoom: "Виберіть кімнату, щоб переглянути її завдання та необхідні фотографії.", noRoomsMatch: "Немає кімнат, що відповідають вашому запиту.", room: "Кімната", standard: "Стандарт",
      recurringTasks: "Повторювані завдання з прибирання", noRecurringTasks: "Для цієї кімнати не налаштовано повторюваних завдань", requiredPhotos: "📷 Необхідні фотографії:",
      daily: "Щодня", weekly: "Щотижня", monthly: "Щомісяця", min: "Хв",
    },
    schedule: {
      title: "Розклад Прибирання", subtitle: "Майбутні та минулі візити прибирання для ваших локацій.", searchPlaceholder: "Пошук розкладу...", shiftDate: "Дата", cleaner: "Прибиральник",
      room: "Кімната", time: "Час", status: "Статус", completed: "Завершено", inProgress: "В процесі",
      pending: "Заплановано", noSchedule: "На цей період змін не заплановано", thisMonth: "Цього місяця", today: "Сьогодні", thisWeek: "Цього тижня",
      cleaningVisits: "Візити Прибирання", noVisitsFound: "Візитів прибирання не знайдено", noVisitsMatching: "Немає візитів, що відповідають обраним фільтрам.", upcoming: "Майбутні",
    },
    notes: {
      title: "Нотатки Клієнта", addNote: "+ Додати нотатку", titlePlaceholder: "Заголовок нотатки...", notePlaceholder: "Напишіть нотатку або інструкції для персоналу...",
      priority: "Пріоритет", low: "Низький", medium: "Середній", high: "Високий", urgent: "Терміновий",
      createNote: "Створити нотатку", clientNotes: "Ваші нотатки", supervisorNotes: "Нотатки супервайзера", acknowledged: "Підтверджено",
      acknowledge: "Підтвердити", noNotes: "Нотаток ще не створено",
    },
    services: {
      title: "Запити на Додаткові Послуги", subtitle: "Замовити додаткові послуги прибирання поза звичайним розкладом.", requestService: "+ Замовити Додаткову Послугу", serviceTitle: "Назва послуги", description: "Опис",
      priority: "Пріоритет", preferredDate: "Бажана дата", selectLocation: "Оберіть локацію", selectRoom: "Оберіть кімнату",
      submitRequest: "Надіслати запит", requests: "Ваші запити", noRequests: "Запитів на додаткові послуги ще не подано", priorityLow: "Низький",
      priorityNormal: "Звичайний", priorityHigh: "Високий", statusUnderReview: "На розгляді",
      statusApproved: "Схвалено", statusInProgress: "В процесі", statusCompleted: "Завершено",
      statusRejected: "Відхилено", requestStatusFlow: "ПРОЦЕС СТАТУСУ ЗАПИТУ", stepPending: "В очікуванні",
      stepUnderReview: "На розгляді", stepApprovedRejected: "Схвалено / Відхилено", stepCompleted: "Завершено",
      allStatuses: "Усі статуси", allPriorities: "Усі пріоритети", noRequestsTitle: "Немає запитів на додаткові послуги", noRequestsSubtitle: "Створіть запит щоразу, коли вам потрібні додаткові послуги прибирання.",
    },
    feedback: {
      title: "Відгук про CleanOnes", submitFeedback: "Надіслати відгук", rating: "Загальна оцінка", ratingPrompt: "Наскільки ви задоволені нашими послугами?",
      commentsPlaceholder: "Розкажіть нам, що пройшло добре або що ми можемо покращити...", category: "Категорія відгуку", general: "Загальне", quality: "Якість прибирання",
      timeliness: "Пунктуальність", staff: "Поведінка персоналу", submitBtn: "Надіслати відгук", recentFeedback: "Ваші попередні відгуки",
      noFeedback: "Відгуків ще не надано", fiveStarReviews: "5-зіркові Відгуки",
      ratingLabels: ["Погано", "Задовільно", "Добре", "Дуже добре", "Відмінно"],
    },
    chat: {
      title: "CleanOnes", typeMessage: "Введіть ваше повідомлення...", send: "Надіслати", activeConversations: "CleanOnes",
      supervisor: "Операційний Супервайзер", online: "В мережі", offline: "Поза мережею", noMessages: "Розпочніть розмову з супервайзером",
      conversation: "Розмова", participants: "УЧАСНИКИ", selectConversation: "Оберіть розмову", selectConversationDesc: "Оберіть розмову для перегляду повідомлень.",
      pageTitle: "Розмови та командний чат", subtitle: "Повідомлення в реальному часі з менеджерами CleanOnes та командами прибирання.",
    },
    profile: {
      title: "Профіль Користувача", personalInfo: "Особиста інформація", name: "Повне ім'я", email: "Email адреса", phone: "Номер телефону",
      company: "Компанія / Організація", address: "Адреса оплати", changePassword: "Змінити пароль", currentPassword: "Поточний пароль",
      newPassword: "Новий пароль", confirmPassword: "Підтвердіть новий пароль", updateProfile: "Оновити профіль", saveChanges: "Зберегти зміни",
      contactInfo: "КОНТАКТНА ІНФОРМАЦІЯ", contactPerson: "КОНТАКТНА ОСОБА", companyName: "НАЗВА КОМПАНІЇ", accountDetails: "ДЕТАЛІ АКАУНТУ",
      clientId: "ID КЛІЄНТА", memberSince: "УЧАСНИК З", contractType: "ТИП КОНТРАКТУ", accountStatus: "СТАТУС АКАУНТУ",
      lastPasswordChanged: "Останній раз змінено: Пароль встановлено при реєстрації",
    },
    settings: {
      title: "Налаштування Порталу", language: "Мова", theme: "Тема", notifications: "Налаштування сповіщень",
      emailAlerts: "Email сповіщення", pushNotifications: "Push сповіщення", smsAlerts: "SMS сповіщення", saveSettings: "Зберегти налаштування",
      notificationAlerts: "СПОВІЩЕННЯ ТА СПОВІЩЕННЯ", emailDesc: "Отримувати підсумкові звіти після візитів", smsDesc: "Отримувати SMS при початку сесій прибирання", portalPreferences: "НАЛАШТУВАННЯ ПОРТАЛУ",
    },
    notifications: {
      title: "Сповіщення", markAllRead: "Позначити всі як прочитані", noNotifications: "Немає нових сповіщень", unread: "Непрочитані",
    },
    cleaningPlan: {
      duration: "Тривалість", photos: "Фото", tasks: "Завдання", rooms: "Кімнати", location: "Локація",
      showing: "Показується", of: "з", planNotFound: "Деталі плану прибирання не знайдено.", roomsAndTasks: "Кімнати та Завдання",
    },
    liveStatus: {
      complete: "Завершено", roomsDone: "кімнат виконано", shiftTime: "Час зміни", assignedWorkers: "Призначені Працівники",
      inTime: "Вхід", outTime: "Вихід", done: "Виконано", inProgress: "В процесі", pending: "Очікує",
      refresh: "Оновити", tasks: "Завдання", location: "Локація", date: "Дата",
    },
    serviceCards: {
      submitted: "Подано", planId: "ID Плану", duration: "Тривалість", photo: "Фото", time: "Час",
      photoRequired: "Фото Обов'язкове", photoTitle: "Назва Фото", selectPlan: "Обрати План Прибирання",
      taskName: "Назва Завдання", dateTime: "Дата та Час", plansAvailable: "план(и) доступні",
      completed: "Завершено", approved: "Схвалено", pending: "Очікує", yes: "Так", no: "Ні",
    },
    notificationsPage: {
      backTo: "Назад до сповіщень", delete: "Видалити", read: "Прочитано", notFound: "Сповіщення не знайдено",
      backToNotifications: "Назад до Сповіщень", settingsSaved: "Налаштування збережено успішно",
    },
    topbar: {
      noNotifications: "Немає сповіщень", viewAllNotifications: "Переглянути всі сповіщення", profile: "Профіль",
    },
    roster: {
      title: "Розклад", dayView: "Перегляд на день", weekView: "Перегляд на тиждень", monthView: "Перегляд на місяць", date: "Дата",
      shiftRoster: "Розклад змін", dailyRoster: "Щоденний розклад", weeklyRoster: "Тижневий розклад", monthlyRoster: "Місячний розклад",
      shifts: "зміни", scheduled: "заплановано", teamMember: "Працівник", cleaningPlanCol: "План прибирання",
      noTeamScheduled: "На цю дату не заплановано працівників.", noPlansScheduled: "Немає планів прибирання за цей період.",
      scheduledShift: "Запланована зміна", currentTime: "Поточний час",
      scrollHint: "Прокрутіть горизонтально, щоб побачити весь робочий день", weekScrollHint: "Прокрутіть горизонтально, щоб порівняти весь тиждень.",
      monthFooter: "Місячний огляд планування", weekendHint: "Вихідні злегка виділені.",
      shiftDetails: "Деталі запланованої зміни", viewFullPlan: "Переглянути повний план прибирання", close: "Закрити",
      location: "Локація", roomsScheduled: "Заплановані кімнати", tasksScheduled: "Заплановані завдання",
      assignedTeam: "Призначені працівники", upcoming: "Майбутні", duration: "Тривалість", durationLabel: "тривалість",
      cleaningShift: "Зміна прибирання", specialist: "Спеціаліст",
      shiftToday: "зміна сьогодні", shiftsToday: "зміни сьогодні", shiftsThisWeek: "зміни цього тижня",
      available: "Доступно", plans: "плани", scheduledHours: "заплановані години",
      projected: "Прогнозовано", progress: "Прогрес", noWorkersAssigned: "Працівників ще не призначено",
      loadError: "Не вдалося завантажити розклад. Спробуйте ще раз.", prev: "Назад", next: "Далі",
    },
  },
  pt: {
    sidebar: {
      dashboard: "Painel", locations: "Localizações", rooms: "Estado em Direto", schedule: "Horário", cleaningPlan: "Plano de Limpeza", notes: "Notas do Cliente",
      services: "Serviços Extra", feedback: "Comentários", chat: "Chat", profile: "Perfil",
      settings: "Definições", signOut: "Sair",
    },
    titles: {
      dashboard: "Painel", locations: "Localizações", rooms: "Estado em Direto", schedule: "Horário", cleaningPlan: "Plano de Limpeza", notes: "Notas do Cliente",
      services: "Serviços Extra", feedback: "Comentários", chat: "Chat", profile: "Perfil",
      settings: "Definições", notifications: "Notificações",
    },
    dashboard: {
      welcomeTitle: "Bem-vindo de volta", welcomeSub: "Aqui está o seu resumo de limpeza para hoje.",
      activeCleaning: "Progresso das Divisões", liveCleaners: "Limpadores em Direto", nextVisit: "Próxima Visita",
      acknowledgedNotes: "Notas Confirmadas", quickActions: "Ações Rápidas",
      extraServiceReq: "Solicitar Serviço Extra", leaveFeedback: "Deixar Comentário",
      chatCleanOnes: "Falar com a CleanOnes", recentSchedule: "Horário Recente",
      acknowledged: "Confirmado", pending: "Pendente", hours: "Horas", rooms: "Divisões",
      lastCompleted: "Último concluído", teamOnSite: "A sua equipa no local", active: "ativos",
      noTeamOnSite: "Nenhum membro da equipa no local.", viewSchedule: "Ver horário completo",
      contactSupport: "Contactar a CleanOnes", nextVisitors: "Próximos visitantes", specialists: "especialistas",
      all: "Todos", noServiceToday: "Sem serviço hoje",
      roomTrackingNote: "O progresso das divisões está disponível porque este local utiliza rastreio de divisões.",
      noUpcomingVisits: "Sem visitas agendadas", noSpecialistsOnSite: "Sem especialistas no local",
      noCompletedVisits: "Sem visitas concluídas ainda", noScheduledVisits: "Sem visitas agendadas",
      completed: "concluído", remaining: "restante", allShiftsOnSchedule: "Todos os turnos no horário",
      scopeOverview: "Âmbito do Serviço e Inventário", scopeOverviewDesc: "Total de instalações, divisões e tarefas no seu plano",
      deliveryOverview: "Trabalho Realizado e Progresso", deliveryOverviewDesc: "Progresso acumulado de divisões limpas, tarefas concluídas e horas",
      cleaningPlans: "Planos de Limpeza", cleaningPlansSub: "Planos de serviço ativos",
      managedLocations: "Localizações", managedLocationsSub: "Instalações ativas",
      totalRoomsScope: "Total de Divisões", totalRoomsScopeSub: "Divisões registadas",
      totalTasksScope: "Total de Tarefas", totalTasksScopeSub: "Tarefas agendadas",
      completedTasksTitle: "Tarefas Concluídas", completedTasksSub: "tarefas finalizadas",
      completedRoomsTitle: "Divisões Limpas", completedRoomsSub: "divisões concluídas",
      hoursDeliveredTitle: "Horas Entregues", hoursDeliveredSub: "Total de horas de limpeza realizadas",
      shiftDeliveryPerformance: "Desempenho de Entrega de Turnos",
      shiftDeliveryDesc: "Resumo de turnos agendados, concluídos e pendentes",
      completionRate: "Taxa de Conclusão", optimal: "Ótimo", paced: "No ritmo",
      activeShiftsDone: "{completed} de {active} turnos ativos concluídos",
      totalShiftsCard: "Total de Turnos", scheduledShiftsInWindow: "Turnos agendados no período",
      completedShiftsCard: "Turnos Concluídos", donePill: "Concluído", successfullyDelivered: "Entregue com sucesso",
      pendingShiftsCard: "Turnos Pendentes", inQueue: "Na fila", upcomingInProgress: "Próximos e em andamento",
      plansCount: "{count} Planos", sitesCount: "{count} Locais", scopePill: "Âmbito", checklistPill: "Checklist",
    },
    actionFeedback: { loading: "A carregar...", success: "Sucesso!", error: "Ocorreu um erro", saved: "Guardado com sucesso", deleted: "Eliminado com sucesso", sent: "Enviado com sucesso", loginSuccess: "Sessão iniciada com sucesso", loginFailed: "Falha ao iniciar sessão" },
    common: {
      hours: "Horas", rooms: "Divisões", search: "Pesquisar", filter: "Filtro",
      cancel: "Cancelar", save: "Guardar", submit: "Enviar", status: "Estado",
      loading: "A carregar...", active: "Ativo", inactive: "Inativo", edit: "Editar", delete: "Eliminar",
    },
    locations: {
      title: "Localizações", subtitle: "Veja as suas instalações e as divisões registadas em cada localização.", searchPlaceholder: "Pesquisar localizações...", address: "Endereço", roomsCount: "Divisões",
      viewDetails: "Ver detalhes", backToLocations: "Voltar às localizações", noLocations: "Nenhuma localização encontrada.", locationDetails: "Detalhes da localização",
      addressUnavailable: "Endereço indisponível", status: "Estado", online: "Online", offline: "Offline", location: "Localização",
      rooms: "Quartos", noLocationsMatch: "Nenhuma localização corresponde à sua pesquisa.", loadingLocation: "Carregando localização…", description: "Descrição",
    },
    rooms: {
      title: "Estado das Divisões em Direto", liveSubtitle: "Visão em tempo real da sua sessão de limpeza atual.", searchPlaceholder: "Pesquisar divisões...", allStatuses: "Todos os estados", clean: "Limpo",
      cleaning: "Limpeza em curso", dirty: "Precisa de limpeza", inspect: "Precisa de inspeção", noRooms: "Nenhuma divisão encontrada",
      roomDetails: "Detalhes da divisão", tasks: "Tarefas de limpeza", floor: "Piso", size: "Tamanho", lastCleaned: "Última limpeza",
      noLiveSession: "Sem sessão de limpeza ativa", noLiveSessionDesc: "Não há sessão de limpeza ativa ou recente no momento. O progresso em direto aparecerá aqui quando um turno agendado começar.", checkAgain: "Verificar novamente",
      selectRoom: "Selecione uma sala para visualizar suas tarefas e fotos obrigatórias.", noRoomsMatch: "Nenhum quarto corresponde à sua pesquisa.", room: "Quarto", standard: "Padrão",
      recurringTasks: "Tarefas de Limpeza Recorrentes", noRecurringTasks: "Não há tarefas recorrentes configuradas para esta sala", requiredPhotos: "📷 Fotos Obrigatórias:",
      daily: "Diário", weekly: "Semanal", monthly: "Mensal", min: "Min",
    },
    schedule: {
      title: "Horário de Limpeza", subtitle: "Visitas de limpeza futuras e passadas para os seus locais.", searchPlaceholder: "Pesquisar horário...", shiftDate: "Data", cleaner: "Limpador",
      room: "Divisão", time: "Hora", status: "Estado", completed: "Concluído", inProgress: "Em curso",
      pending: "Agendado", noSchedule: "Nenhum turno agendado para este período", thisMonth: "Este Mês", today: "Hoje", thisWeek: "Esta Semana",
      cleaningVisits: "Visitas de Limpeza", noVisitsFound: "Nenhuma visita de limpeza encontrada", noVisitsMatching: "Não existem visitas correspondentes aos filtros selecionados.", upcoming: "Próximas",
    },
    notes: {
      title: "Notas do Cliente", addNote: "+ Adicionar nota", titlePlaceholder: "Título da nota...", notePlaceholder: "Escreva a sua nota ou instruções para a equipa de limpeza...",
      priority: "Prioridade", low: "Baixa", medium: "Média", high: "Alta", urgent: "Urgente",
      createNote: "Criar nota", clientNotes: "As suas notas", supervisorNotes: "Notas do supervisor", acknowledged: "Confirmado",
      acknowledge: "Confirmar", noNotes: "Nenhuma nota criada ainda",
    },
    services: {
      title: "Pedidos de Serviços Extra", subtitle: "Solicite serviços de limpeza adicionais além do seu horário normal.", requestService: "+ Solicitar Serviço Extra", serviceTitle: "Título do serviço", description: "Descrição",
      priority: "Prioridade", preferredDate: "Data preferencial", selectLocation: "Selecionar localização", selectRoom: "Selecionar divisão",
      submitRequest: "Submeter pedido", requests: "Os seus pedidos", noRequests: "Nenhum pedido de serviço extra submetido", priorityLow: "Baixa",
      priorityNormal: "Normal", priorityHigh: "Alta", statusUnderReview: "Em análise",
      statusApproved: "Aprovado", statusInProgress: "Em curso", statusCompleted: "Concluído",
      statusRejected: "Rejeitado", requestStatusFlow: "FLUXO DE ESTADO DO PEDIDO", stepPending: "Pendente",
      stepUnderReview: "Em Análise", stepApprovedRejected: "Aprovado / Rejeitado", stepCompleted: "Concluído",
      allStatuses: "Todos os estados", allPriorities: "Todas as prioridades", noRequestsTitle: "Sem pedidos de serviços extra", noRequestsSubtitle: "Crie um pedido sempre que precisar de serviços de limpeza adicionais.",
    },
    feedback: {
      title: "Comentários CleanOnes", submitFeedback: "Submeter comentário", rating: "Avaliação geral", ratingPrompt: "Quão satisfeito está com os nossos serviços?",
      commentsPlaceholder: "Conte-nos o que correu bem ou como podemos melhorar...", category: "Categoria", general: "Geral", quality: "Qualidade de limpeza",
      timeliness: "Pontualidade", staff: "Comportamento da equipa", submitBtn: "Enviar comentário", recentFeedback: "Os seus comentários anteriores",
      noFeedback: "Nenhum comentário submetido ainda", fiveStarReviews: "Avaliações 5 Estrelas",
      ratingLabels: ["Mau", "Razoável", "Bom", "Muito Bom", "Excelente"],
    },
    chat: {
      title: "CleanOnes", typeMessage: "Escreva a sua mensagem aqui...", send: "Enviar", activeConversations: "CleanOnes",
      supervisor: "Supervisor de Operações", online: "Online", offline: "Offline", noMessages: "Inicie uma conversa com o seu supervisor",
      conversation: "Conversa", participants: "PARTICIPANTES", selectConversation: "Selecionar uma conversa", selectConversationDesc: "Escolha uma conversa para ver as mensagens.",
      pageTitle: "Conversas e Chat da Equipa", subtitle: "Mensagens em tempo real com gestores CleanOnes e equipas de limpeza.",
    },
    profile: {
      title: "Perfil do Utilizador", personalInfo: "Informações pessoais", name: "Nome completo", email: "Endereço de email", phone: "Número de telefone",
      company: "Empresa / Organização", address: "Endereço de faturação", changePassword: "Alterar palavra-passe", currentPassword: "Palavra-passe atual",
      newPassword: "Nova palavra-passe", confirmPassword: "Confirmar nova palavra-passe", updateProfile: "Atualizar perfil", saveChanges: "Guardar alterações",
      contactInfo: "INFORMAÇÕES DE CONTACTO", contactPerson: "PESSOA DE CONTACTO", companyName: "NOME DA EMPRESA", accountDetails: "DETALHES DA CONTA",
      clientId: "ID DO CLIENTE", memberSince: "MEMBRO DESDE", contractType: "TIPO DE CONTRATO", accountStatus: "ESTADO DA CONTA",
      lastPasswordChanged: "Última alteração: Palavra-passe definida no registo",
    },
    settings: {
      title: "Definições do Portal", language: "Idioma", theme: "Tema", notifications: "Preferências de notificação",
      emailAlerts: "Notificações por Email", pushNotifications: "Notificações push", smsAlerts: "Alertas de Limpeza por SMS", saveSettings: "Guardar definições",
      notificationAlerts: "ALERTAS DE NOTIFICAÇÃO", emailDesc: "Receba relatórios resumidos após as visitas", smsDesc: "Receba SMS quando as sessões de limpeza começarem", portalPreferences: "PREFERÊNCIAS DO PORTAL",
    },
    notifications: {
      title: "Notificações", markAllRead: "Marcar todas como lidas", noNotifications: "Sem novas notificações", unread: "Não lidas",
    },
    cleaningPlan: {
      duration: "Duração", photos: "Fotos", tasks: "Tarefas", rooms: "Divisões", location: "Localização",
      showing: "A mostrar", of: "de", planNotFound: "Detalhes do plano de limpeza não encontrados.", roomsAndTasks: "Divisões e Tarefas",
    },
    liveStatus: {
      complete: "Concluído", roomsDone: "divisões concluídas", shiftTime: "Horário do Turno", assignedWorkers: "Trabalhadores Atribuídos",
      inTime: "Entrada", outTime: "Saída", done: "Feito", inProgress: "Em Curso", pending: "Pendente",
      refresh: "Atualizar", tasks: "Tarefas", location: "Localização", date: "Data",
    },
    serviceCards: {
      submitted: "Submetido", planId: "ID do Plano", duration: "Duração", photo: "Foto", time: "Hora",
      photoRequired: "Foto Obrigatória", photoTitle: "Título da Foto", selectPlan: "Selecionar Plano de Limpeza",
      taskName: "Nome da Tarefa", dateTime: "Data e Hora", plansAvailable: "plano(s) disponível(is)",
      completed: "Concluído", approved: "Aprovado", pending: "Pendente", yes: "Sim", no: "Não",
    },
    notificationsPage: {
      backTo: "Voltar às notificações", delete: "Eliminar", read: "Lida", notFound: "Notificação não encontrada",
      backToNotifications: "Voltar às Notificações", settingsSaved: "Definições guardadas com sucesso",
    },
    topbar: {
      noNotifications: "Sem notificações", viewAllNotifications: "Ver todas as notificações", profile: "Perfil",
    },
    roster: {
      title: "Horário", dayView: "Vista Diária", weekView: "Vista Semanal", monthView: "Vista Mensal", date: "Data",
      shiftRoster: "Escala de Turnos", dailyRoster: "Escala Diária", weeklyRoster: "Escala Semanal", monthlyRoster: "Escala Mensal",
      shifts: "turnos", scheduled: "agendado", teamMember: "Trabalhador", cleaningPlanCol: "Plano de Limpeza",
      noTeamScheduled: "Nenhum membro da equipa agendado para esta data.", noPlansScheduled: "Nenhum plano de limpeza agendado para este período.",
      scheduledShift: "Turno agendado", currentTime: "Hora atual",
      scrollHint: "Desloque horizontalmente para ver todo o dia de trabalho", weekScrollHint: "Desloque horizontalmente para comparar a semana completa.",
      monthFooter: "Visão mensal da equipa", weekendHint: "Fins de semana estão ligeiramente destacados.",
      shiftDetails: "Detalhes do Turno Agendado", viewFullPlan: "Ver Plano de Limpeza Completo", close: "Fechar",
      location: "Localização", roomsScheduled: "Salas Agendadas", tasksScheduled: "Tarefas Agendadas",
      assignedTeam: "Membros da Equipa Atribuídos", upcoming: "Próximos", duration: "Duração", durationLabel: "duração",
      cleaningShift: "Turno de Limpeza", specialist: "Especialista",
      shiftToday: "turno hoje", shiftsToday: "turnos hoje", shiftsThisWeek: "turnos esta semana",
      available: "Disponível", plans: "planos", scheduledHours: "horas agendadas",
      projected: "Projetado", progress: "Progresso", noWorkersAssigned: "Nenhum trabalhador atribuído ainda",
      loadError: "Não foi possível carregar a escala. Tente novamente.", prev: "Anterior", next: "Seguinte",
    },
  },
  ar: {
    sidebar: {
      dashboard: "لوحة التحكم", locations: "المواقع", rooms: "الحالة المباشرة", schedule: "الجدول", cleaningPlan: "خطة التنظيف", notes: "ملاحظات العميل",
      services: "خدمات إضافية", feedback: "الآراء والتوافق", chat: "المحادثة", profile: "الملف الشخصي",
      settings: "الإعدادات", signOut: "تسجيل الخروج",
    },
    titles: {
      dashboard: "لوحة التحكم", locations: "المواقع", rooms: "الحالة المباشرة", schedule: "الجدول", cleaningPlan: "خطة التنظيف", notes: "ملاحظات العميل",
      services: "خدمات إضافية", feedback: "الآراء والتوافق", chat: "المحادثة", profile: "الملف الشخصي",
      settings: "الإعدادات", notifications: "الإشعارات",
    },
    dashboard: {
      welcomeTitle: "مرحباً بعودتك", welcomeSub: "إليك ملخص التنظيف اليومي الخاص بك.",
      activeCleaning: "تقدم تنظيف الغرف", liveCleaners: "عمال التنظيف الحاليين", nextVisit: "الزيارة القادمة",
      acknowledgedNotes: "الملاحظات المؤكدة", quickActions: "إجراءات سريعة",
      extraServiceReq: "طلب خدمة إضافية", leaveFeedback: "إضافة تقييم",
      chatCleanOnes: "التحدث مع CleanOnes", recentSchedule: "الجدول الحديث",
      acknowledged: "تم التأكيد", pending: "قيد الانتظار", hours: "الساعات", rooms: "الغرف",
      lastCompleted: "آخر عملية مكتملة", teamOnSite: "فريقك في الموقع", active: "نشط",
      noTeamOnSite: "لا يوجد أعضاء من الفريق في الموقع حالياً.", viewSchedule: "عرض الجدول الكامل",
      contactSupport: "التواصل مع كليم أونس", nextVisitors: "الزوار القادمون", specialists: "متخصصين",
      all: "الكل", noServiceToday: "لا يوجد خدمة اليوم",
      roomTrackingNote: "يتوفر تقدم الغرفة لأن هذا الموقع يستخدم تتبع الغرف.",
      noUpcomingVisits: "لا توجد زيارات قادمة مجدولة", noSpecialistsOnSite: "لا يوجد متخصصون في الموقع",
      noCompletedVisits: "لا توجد زيارات مكتملة بعد", noScheduledVisits: "لا توجد زيارات مجدولة",
      completed: "مكتمل", remaining: "متبقي", allShiftsOnSchedule: "جميع الورديات في موعدها",
      scopeOverview: "نطاق الخدمة والمرافق", scopeOverviewDesc: "إجمالي المرافق والغرف والمهام المحددة في الخطة",
      deliveryOverview: "العمل المنجز والتقدم", deliveryOverviewDesc: "التقدم التراكمي للغرف المنظفة والمهام المكتملة وساعات العمل",
      cleaningPlans: "خطط التنظيف", cleaningPlansSub: "خطط الخدمة النشطة",
      managedLocations: "المواقع", managedLocationsSub: "المرافق النشطة",
      totalRoomsScope: "إجمالي الغرف", totalRoomsScopeSub: "الغرف المسجلة",
      totalTasksScope: "إجمالي المهام", totalTasksScopeSub: "المهام المجدولة",
      completedTasksTitle: "المهام المكتملة", completedTasksSub: "مهام منجزة",
      completedRoomsTitle: "الغرف المنظفة", completedRoomsSub: "غرف مكتملة",
      hoursDeliveredTitle: "الساعات المنجزة", hoursDeliveredSub: "إجمالي ساعات التنظيف المكتملة",
      shiftDeliveryPerformance: "أداء تسليم الورديات",
      shiftDeliveryDesc: "نظرة عامة على الورديات المجدولة والمكتملة والمعلقة",
      completionRate: "معدل الإنجاز", optimal: "مثالي", paced: "منتظم",
      activeShiftsDone: "{completed} من {active} ورديات نشطة مكتملة",
      totalShiftsCard: "إجمالي الورديات", scheduledShiftsInWindow: "الورديات المجدولة في الفترة",
      completedShiftsCard: "الورديات المكتملة", donePill: "تم", successfullyDelivered: "تم التسليم بنجاح",
      pendingShiftsCard: "الورديات المعلقة", inQueue: "في الانتظار", upcomingInProgress: "قادمة وقيد التنفيذ",
      plansCount: "{count} خطط", sitesCount: "{count} مواقع", scopePill: "النطاق", checklistPill: "قائمة المهام",
    },
    actionFeedback: { loading: "جارٍ التحميل...", success: "نجاح!", error: "حدث خطأ", saved: "تم الحفظ بنجاح", deleted: "تم الحذف بنجاح", sent: "تم الإرسال بنجاح", loginSuccess: "تم تسجيل الدخول بنجاح", loginFailed: "فشل تسجيل الدخول" },
    common: {
      hours: "الساعات", rooms: "الغرف", search: "بحث", filter: "تصفية",
      cancel: "إلغاء", save: "حفظ", submit: "إرسال", status: "الحالة",
      loading: "جاري التحميل...", active: "نشط", inactive: "غير نشط", edit: "تعديل", delete: "حذف",
    },
    locations: {
      title: "المواقع", subtitle: "عرض المرافق والغرف المسجلة تحت كل موقع.", searchPlaceholder: "البحث في المواقع...", address: "العنوان", roomsCount: "الغرف",
      viewDetails: "عرض التفاصيل", backToLocations: "العودة إلى المواقع", noLocations: "لم يتم العثور على مواقع.", locationDetails: "تفاصيل الموقع",
      addressUnavailable: "العنوان غير متوفر", status: "الحالة", online: "متصل", offline: "غير متصل", location: "الموقع",
      rooms: "الغرف", noLocationsMatch: "لا توجد مواقع تطابق بحثك.", loadingLocation: "جاري تحميل الموقع…", description: "الوصف",
    },
    rooms: {
      title: "حالة الغرف المباشرة", liveSubtitle: "عرض مباشر لسيشن التنظيف الحالي الخاص بك.", searchPlaceholder: "البحث في الغرف...", allStatuses: "جميع الحالات", clean: "نظيف",
      cleaning: "جاري التنظيف", dirty: "يحتاج تنظيف", inspect: "يحتاج فحص", noRooms: "لم يتم العثور على غرف",
      roomDetails: "تفاصيل الغرفة", tasks: "مهام التنظيف", floor: "الطابق", size: "المساحة", lastCleaned: "آخر تنظيف",
      noLiveSession: "لا توجد جلسة تنظيف مباشرة", noLiveSessionDesc: "لا توجد جلسة تنظيف نشطة أو حديثة متاحة الآن. سيظهر التقدم المباشر هنا عندما تبدأ وردية مجدولة.", checkAgain: "التحقق مرة أخرى",
      selectRoom: "حدد غرفة لعرض مهامها والصور المطلوبة.", noRoomsMatch: "لا توجد غرف تطابق بحثك.", room: "غرفة", standard: "قياسي",
      recurringTasks: "مهام التنظيف المتكررة", noRecurringTasks: "لم يتم تكوين مهام متكررة لهذه الغرفة", requiredPhotos: "📷 الصور المطلوبة:",
      daily: "يوميا", weekly: "أسبوعيا", monthly: "شهريا", min: "دقيقة",
    },
    schedule: {
      title: "جدول التنظيف", subtitle: "زيارات التنظيف القادمة والسابقة لمواقعك.", searchPlaceholder: "البحث في الجدول...", shiftDate: "التاريخ", cleaner: "عامل التنظيف",
      room: "الغرفة", time: "الوقت", status: "الحالة", completed: "مكتمل", inProgress: "قيد التنفيذ",
      pending: "مجدول", noSchedule: "لا توجد ورديات مجدولة لهذه الفترة", thisMonth: "هذا الشهر", today: "اليوم", thisWeek: "هذا الأسبوع",
      cleaningVisits: "زيارات التنظيف", noVisitsFound: "لم يتم العثور على زيارات تنظيف", noVisitsMatching: "لا توجد زيارات تطابق الفلاتر المحددة.", upcoming: "قادم",
    },
    notes: {
      title: "ملاحظات العميل", addNote: "+ إضافة ملاحظة", titlePlaceholder: "عنوان الملاحظة...", notePlaceholder: "اكتب ملاحظتك أو تعليماتك لفريق التنظيف...",
      priority: "الأولوية", low: "منخفضة", medium: "متوسطة", high: "عالية", urgent: "عاجلة",
      createNote: "إنشاء ملاحظة", clientNotes: "ملاحظاتك", supervisorNotes: "ملاحظات المشرف", acknowledged: "تم التأكيد",
      acknowledge: "تأكيد", noNotes: "لم يتم إنشاء ملاحظات بعد",
    },
    services: {
      title: "طلبات الخدمات الإضافية", subtitle: "طلب خدمات تنظيف إضافية خارج جدولك الاعتيادي.", requestService: "+ طلب خدمة إضافية", serviceTitle: "عنوان الخدمة", description: "الوصف",
      priority: "الأولوية", preferredDate: "التاريخ المفضل", selectLocation: "اختر الموقع", selectRoom: "اختر الغرفة",
      submitRequest: "تقديم الطلب", requests: "طلباتك", noRequests: "لم يتم تقديم طلبات خدمات إضافية بعد", priorityLow: "منخفضة",
      priorityNormal: "عادية", priorityHigh: "عالية", statusUnderReview: "قيد المراجعة",
      statusApproved: "مقبول", statusInProgress: "قيد التنفيذ", statusCompleted: "مكتمل",
      statusRejected: "مرفوض", requestStatusFlow: "مسار حالة الطلب", stepPending: "قيد الانتظار",
      stepUnderReview: "قيد المراجعة", stepApprovedRejected: "مقبول / مرفوض", stepCompleted: "مكتمل",
      allStatuses: "جميع الحالات", allPriorities: "جميع الأولويات", noRequestsTitle: "لا توجد طلبات خدمات إضافية", noRequestsSubtitle: "قم بإنشاء طلب كلما احتجت إلى خدمات تنظيف إضافية.",
    },
    feedback: {
      title: "تقييم كليم أونس", submitFeedback: "إرسال التقييم", rating: "التقييم العام", ratingPrompt: "ما مدى رضاك عن خدماتنا؟",
      commentsPlaceholder: "أخبرنا بما سار بشكل جيد أو كيف يمكننا التحسين...", category: "فئة التقييم", general: "عام", quality: "جودة التنظيف",
      timeliness: "الالتزام بالمواعيد", staff: "سلوك العمال", submitBtn: "إرسال التقييم", recentFeedback: "تقييماتك السابقة",
      noFeedback: "لم يتم تقديم تقييمات بعد", fiveStarReviews: "تقييمات 5 نجوم",
      ratingLabels: ["ضعيف", "مقبول", "جيد", "جيد جداً", "ممتاز"],
    },
    chat: {
      title: "CleanOnes", typeMessage: "اكتب رسالتك هنا...", send: "إرسال", activeConversations: "CleanOnes",
      supervisor: "مشرف العمليات", online: "متصل", offline: "غير متصل", noMessages: "ابدأ محادثة مع مشرفك",
      conversation: "المحادثة", participants: "المشاركون", selectConversation: "حدد محادثة", selectConversationDesc: "اختر محادثة لعرض الرسائل.",
      pageTitle: "المحادثات ودردشة الفريق", subtitle: "مراسلة فورية مع مديري CleanOnes وفرق التنظيف.",
    },
    profile: {
      title: "الملف الشخصي للمستخدم", personalInfo: "المعلومات الشخصية", name: "الاسم الكامل", email: "البريد الإلكتروني", phone: "رقم الهاتف",
      company: "الشركة / المؤسسة", address: "عنوان الفواتير", changePassword: "تغيير كلمة المرور", currentPassword: "كلمة المرور الحالية",
      newPassword: "كلمة المرور الجديدة", confirmPassword: "تأكيد كلمة المرور الجديدة", updateProfile: "تحديث الملف الشخصي", saveChanges: "حفظ التغييرات",
      contactInfo: "معلومات الاتصال", contactPerson: "شخص الاتصال", companyName: "اسم الشركة", accountDetails: "تفاصيل الحساب",
      clientId: "معرف العميل", memberSince: "عضو منذ", contractType: "نوع العقد", accountStatus: "حالة الحساب",
      lastPasswordChanged: "تم آخر تغيير: تم تعيين كلمة المرور عند التسجيل",
    },
    settings: {
      title: "إعدادات البوابة", language: "اللغة", theme: "المظهر", notifications: "تفضيلات الإشعارات",
      emailAlerts: "إشعارات البريد الإلكتروني", pushNotifications: "إشعارات الهاتف", smsAlerts: "تنبيهات التنظيف عبر SMS", saveSettings: "حفظ الإعدادات",
      notificationAlerts: "تنبيهات الإشعارات", emailDesc: "تلقي تقارير ملخصة بعد الزيارات", smsDesc: "تلقي رسائل نصية عند بدء جلسات التنظيف", portalPreferences: "تفضيلات البوابة",
    },
    notifications: {
      title: "الإشعارات", markAllRead: "تحديد الكل كمقروء", noNotifications: "لا توجد إشعارات جديدة", unread: "غير مقروء",
    },
    cleaningPlan: {
      duration: "المدة", photos: "الصور", tasks: "المهام", rooms: "الغرف", location: "الموقع",
      showing: "عرض", of: "من", planNotFound: "تفاصيل خطة التنظيف غير موجودة.", roomsAndTasks: "الغرف والمهام",
    },
    liveStatus: {
      complete: "مكتمل", roomsDone: "غرف منجزة", shiftTime: "وقت الوردية", assignedWorkers: "العمال المعينون",
      inTime: "الدخول", outTime: "الخروج", done: "منجز", inProgress: "قيد التنفيذ", pending: "قيد الانتظار",
      refresh: "تحديث", tasks: "المهام", location: "الموقع", date: "التاريخ",
    },
    serviceCards: {
      submitted: "مُقدَّم", planId: "معرف الخطة", duration: "المدة", photo: "صورة", time: "الوقت",
      photoRequired: "صورة مطلوبة", photoTitle: "عنوان الصورة", selectPlan: "اختر خطة التنظيف",
      taskName: "اسم المهمة", dateTime: "التاريخ والوقت", plansAvailable: "خطة/خطط متاحة",
      completed: "مكتمل", approved: "مقبول", pending: "قيد الانتظار", yes: "نعم", no: "لا",
    },
    notificationsPage: {
      backTo: "العودة إلى الإشعارات", delete: "حذف", read: "مقروء", notFound: "لم يتم العثور على الإشعار",
      backToNotifications: "العودة إلى الإشعارات", settingsSaved: "تم حفظ الإعدادات بنجاح",
    },
    topbar: {
      noNotifications: "لا توجد إشعارات", viewAllNotifications: "عرض جميع الإشعارات", profile: "الملف الشخصي",
    },
    roster: {
      title: "الجدول", dayView: "عرض اليوم", weekView: "عرض الأسبوع", monthView: "عرض الشهر", date: "التاريخ",
      shiftRoster: "جدول المناوبات", dailyRoster: "الجدول اليومي", weeklyRoster: "الجدول الأسبوعي", monthlyRoster: "الجدول الشهري",
      shifts: "مناوبات", scheduled: "مجدول", teamMember: "عامل", cleaningPlanCol: "خطة التنظيف",
      noTeamScheduled: "لا يوجد أعضاء فريق مجدولين لهذا التاريخ.", noPlansScheduled: "لا توجد خطط تنظيف مجدولة لهذه الفترة.",
      scheduledShift: "مناوبة مجدولة", currentTime: "الوقت الحالي",
      scrollHint: "مرر أفقيًا لعرض يوم العمل بالكامل", weekScrollHint: "مرر أفقيًا لمقارنة الأسبوع بالكامل.",
      monthFooter: "نظرة عامة شهرية على الجدولة", weekendHint: "يتم تمييز عطلات نهاية الأسبوع بشكل خفيف.",
      shiftDetails: "تفاصيل المناوبة المجدولة", viewFullPlan: "عرض خطة التنظيف الكاملة", close: "إغلاق",
      location: "الموقع", roomsScheduled: "الغرف المجدولة", tasksScheduled: "المهام المجدولة",
      assignedTeam: "أعضاء الفريق المعينين", upcoming: "القادمة", duration: "المدة", durationLabel: "المدة",
      cleaningShift: "مناوبة تنظيف", specialist: "أخصائي",
      shiftToday: "مناوبة اليوم", shiftsToday: "مناوبات اليوم", shiftsThisWeek: "مناوبات هذا الأسبوع",
      available: "متاح", plans: "خطط", scheduledHours: "ساعات مجدولة",
      projected: "متوقع", progress: "التقدم", noWorkersAssigned: "لم يتم تعيين عمال بعد",
      loadError: "تعذر تحميل الجدول. حاول مرة أخرى.", prev: "السابق", next: "التالي",
    },
  },
  fr: {
    sidebar: {
      dashboard: "Tableau de Bord", locations: "Emplacements", rooms: "Statut En Direct", schedule: "Calendrier", cleaningPlan: "Plan de nettoyage", notes: "Notes Client",
      services: "Services Extras", feedback: "Commentaires", chat: "Discussion", profile: "Profil",
      settings: "Paramètres", signOut: "Se Déconnecter",
    },
    titles: {
      dashboard: "Tableau de Bord", locations: "Emplacements", rooms: "Statut En Direct", schedule: "Calendrier", cleaningPlan: "Plan de nettoyage", notes: "Notes Client",
      services: "Services Extras", feedback: "Commentaires", chat: "Discussion", profile: "Profil",
      settings: "Paramètres", notifications: "Notifications",
    },
    dashboard: {
      welcomeTitle: "Bon retour", welcomeSub: "Voici le résumé de votre nettoyage pour aujourd'hui.",
      activeCleaning: "Progression des Pièces", liveCleaners: "Nettoyeurs En Direct", nextVisit: "Prochaine Visite",
      acknowledgedNotes: "Notes Agréées", quickActions: "Actions Rapides",
      extraServiceReq: "Demander Service Extra", leaveFeedback: "Laisser un Commentaire",
      chatCleanOnes: "Parler avec CleanOnes", recentSchedule: "Calendrier Récent",
      acknowledged: "Confirmé", pending: "En attente", hours: "Heures", rooms: "Pièces",
      lastCompleted: "Dernier effectué", teamOnSite: "Votre équipe sur place", active: "actifs",
      noTeamOnSite: "Aucun membre de l'équipe sur place.", viewSchedule: "Voir tout le calendrier",
      contactSupport: "Contacter CleanOnes", nextVisitors: "Prochains visiteurs", specialists: "spécialistes",
      all: "Tous", noServiceToday: "Pas de service aujourd'hui",
      roomTrackingNote: "La progression des pièces est disponible car cet emplacement utilise le suivi des pièces.",
      noUpcomingVisits: "Aucune visite à venir planifiée", noSpecialistsOnSite: "Aucun spécialiste sur place",
      noCompletedVisits: "Aucune visite terminée pour le moment", noScheduledVisits: "Aucune visite planifiée",
      completed: "terminé", remaining: "restant", allShiftsOnSchedule: "Tous les shifts sont prévus",
      scopeOverview: "Périmètre de Service & Inventaire", scopeOverviewDesc: "Total des installations, pièces et tâches configurées",
      deliveryOverview: "Travail Réalisé & Progression", deliveryOverviewDesc: "Progression cumulée des pièces nettoyées, tâches et heures",
      cleaningPlans: "Plans de Nettoyage", cleaningPlansSub: "Plans de service actifs",
      managedLocations: "Sites & Emplacements", managedLocationsSub: "Installations actives",
      totalRoomsScope: "Total des Pièces", totalRoomsScopeSub: "Pièces enregistrées",
      totalTasksScope: "Total des Tâches", totalTasksScopeSub: "Tâches programmées",
      completedTasksTitle: "Tâches Terminées", completedTasksSub: "tâches finalisées",
      completedRoomsTitle: "Pièces Nettoyées", completedRoomsSub: "pièces nettoyées",
      hoursDeliveredTitle: "Heures Réalisées", hoursDeliveredSub: "Total des heures de nettoyage effectuées",
      shiftDeliveryPerformance: "Performance de Livraison des Shifts",
      shiftDeliveryDesc: "Aperçu des shifts planifiés, terminés et en attente",
      completionRate: "Taux de Complétion", optimal: "Optimal", paced: "En rythme",
      activeShiftsDone: "{completed} sur {active} shifts actifs terminés",
      totalShiftsCard: "Total des Shifts", scheduledShiftsInWindow: "Shifts planifiés sur la période",
      completedShiftsCard: "Shifts Terminés", donePill: "Terminé", successfullyDelivered: "Livré avec succès",
      pendingShiftsCard: "Shifts en Attente", inQueue: "En file", upcomingInProgress: "À venir et en cours",
      plansCount: "{count} Plans", sitesCount: "{count} Sites", scopePill: "Périmètre", checklistPill: "Checklist",
    },
    actionFeedback: { loading: "Chargement...", success: "Succès !", error: "Une erreur est survenue", saved: "Enregistré avec succès", deleted: "Supprimé avec succès", sent: "Envoyé avec succès", loginSuccess: "Connexion réussie", loginFailed: "Échec de la connexion" },
    common: {
      hours: "Heures", rooms: "Pièces", search: "Rechercher", filter: "Filtrer",
      cancel: "Annuler", save: "Enregistrer", submit: "Soumettre", status: "Statut",
      loading: "Chargement...", active: "Actif", inactive: "Inactif", edit: "Modifier", delete: "Supprimer",
    },
    locations: {
      title: "Emplacements", subtitle: "Consultez vos installations et les pièces enregistrées pour chaque emplacement.", searchPlaceholder: "Rechercher des emplacements...", address: "Adresse", roomsCount: "Pièces",
      viewDetails: "Voir les détails", backToLocations: "Retour aux emplacements", noLocations: "Aucun emplacement trouvé.", locationDetails: "Détails de l'emplacement",
      addressUnavailable: "Adresse indisponible", status: "Statut", online: "En ligne", offline: "Hors ligne", location: "Emplacement",
      rooms: "Chambres", noLocationsMatch: "Aucun emplacement ne correspond à votre recherche.", loadingLocation: "Chargement de l'emplacement…", description: "Description",
    },
    rooms: {
      title: "Statut des Pièces en Direct", liveSubtitle: "Vue en temps réel de votre session de nettoyage actuelle.", searchPlaceholder: "Rechercher des pièces...", allStatuses: "Tous les statuts", clean: "Propre",
      cleaning: "Nettoyage en cours", dirty: "À nettoyer", inspect: "À inspecter", noRooms: "Aucune pièce trouvée",
      roomDetails: "Détails de la pièce", tasks: "Tâches de nettoyage", floor: "Étage", size: "Taille", lastCleaned: "Dernier nettoyage",
      noLiveSession: "Aucune session de nettoyage en direct", noLiveSessionDesc: "Il n'y a pas de session de nettoyage active ou récente disponible pour le moment. La progression en direct apparaîtra ici lorsqu'un shift planifié commencera.", checkAgain: "Vérifier à nouveau",
      selectRoom: "Sélectionnez une pièce pour voir ses tâches et photos requises.", noRoomsMatch: "Aucune chambre ne correspond à votre recherche.", room: "Chambre", standard: "Standard",
      recurringTasks: "Tâches de nettoyage récurrentes", noRecurringTasks: "Aucune tâche récurrente configurée pour cette chambre", requiredPhotos: "📷 Photos requises:",
      daily: "Quotidien", weekly: "Hebdomadaire", monthly: "Mensuel", min: "Min",
    },
    schedule: {
      title: "Calendrier de Nettoyage", subtitle: "Visites de nettoyage à venir et passées pour vos emplacements.", searchPlaceholder: "Rechercher dans le calendrier...", shiftDate: "Date", cleaner: "Nettoyeur",
      room: "Pièce", time: "Heure", status: "Statut", completed: "Terminé", inProgress: "En cours",
      pending: "Planifié", noSchedule: "Aucun shift planifié pour cette période", thisMonth: "Ce mois-ci", today: "Aujourd'hui", thisWeek: "Cette semaine",
      cleaningVisits: "Visites de Nettoyage", noVisitsFound: "Aucune visite de nettoyage trouvée", noVisitsMatching: "Il n'y a aucune visite correspondant aux filtres sélectionnés.", upcoming: "À venir",
    },
    notes: {
      title: "Notes Client", addNote: "+ Ajouter une note", titlePlaceholder: "Titre de la note...", notePlaceholder: "Rédigez votre note ou instructions pour le personnel de nettoyage...",
      priority: "Priorité", low: "Basse", medium: "Moyenne", high: "Haute", urgent: "Urgente",
      createNote: "Créer une note", clientNotes: "Vos notes", supervisorNotes: "Notes du superviseur", acknowledged: "Confirmé",
      acknowledge: "Confirmer", noNotes: "Aucune note créée pour le moment",
    },
    services: {
      title: "Demandes de Services Extras", subtitle: "Demandez des services de nettoyage supplémentaires au-delà de votre calendrier habituel.", requestService: "+ Demander un Service Extra", serviceTitle: "Titre du service", description: "Description",
      priority: "Priorité", preferredDate: "Date souhaitée", selectLocation: "Sélectionner un emplacement", selectRoom: "Sélectionner une pièce",
      submitRequest: "Soumettre la demande", requests: "Vos demandes", noRequests: "Aucune demande de service extra soumise", priorityLow: "Basse",
      priorityNormal: "Normale", priorityHigh: "Haute", statusUnderReview: "En révision",
      statusApproved: "Approuvé", statusInProgress: "En cours", statusCompleted: "Terminé",
      statusRejected: "Rejeté", requestStatusFlow: "FLUX DE STATUT DE LA DEMANDE", stepPending: "En attente",
      stepUnderReview: "En révision", stepApprovedRejected: "Approuvé / Rejeté", stepCompleted: "Terminé",
      allStatuses: "Tous les statuts", allPriorities: "Toutes les priorités", noRequestsTitle: "Aucune demande de service extra", noRequestsSubtitle: "Créez une demande chaque fois que vous avez besoin de services de nettoyage supplémentaires.",
    },
    feedback: {
      title: "Avis CleanOnes", submitFeedback: "Envoyer l'avis", rating: "Évaluation globale", ratingPrompt: "À quel point êtes-vous satisfait de nos services ?",
      commentsPlaceholder: "Dites-nous ce qui s'est bien passé ou comment nous pouvons nous améliorer...", category: "Catégorie", general: "Général", quality: "Qualité du nettoyage",
      timeliness: "Ponctualité", staff: "Comportement du personnel", submitBtn: "Envoyer l'avis", recentFeedback: "Vos avis précédents",
      noFeedback: "Aucun avis soumis pour le moment", fiveStarReviews: "Avis 5 Étoiles",
      ratingLabels: ["Mauvais", "Passable", "Bien", "Très bien", "Excellent"],
    },
    chat: {
      title: "CleanOnes", typeMessage: "Écrivez votre message ici...", send: "Envoyer", activeConversations: "CleanOnes",
      supervisor: "Superviseur des Opérations", online: "En ligne", offline: "Hors ligne", noMessages: "Démarrez une conversation avec votre superviseur",
      conversation: "Conversation", participants: "PARTICIPANTS", selectConversation: "Sélectionner une conversation", selectConversationDesc: "Choisissez une conversation pour voir les messages.",
      pageTitle: "Conversations & Chat d'équipe", subtitle: "Messagerie en temps réel avec les managers CleanOnes et les équipes de nettoyage.",
    },
    profile: {
      title: "Profil Utilisateur", personalInfo: "Informations personnelles", name: "Nom complet", email: "Adresse email", phone: "Numéro de téléphone",
      company: "Entreprise / Organisation", address: "Adresse de facturation", changePassword: "Changer le mot de passe", currentPassword: "Mot de passe actuel",
      newPassword: "Nouveau mot de passe", confirmPassword: "Confirmer le nouveau mot de passe", updateProfile: "Mettre à jour le profil", saveChanges: "Enregistrer les modifications",
      contactInfo: "INFORMATIONS DE CONTACT", contactPerson: "PERSONNE DE CONTACT", companyName: "NOM DE L'ENTREPRISE", accountDetails: "DÉTAILS DU COMPTE",
      clientId: "ID CLIENT", memberSince: "MEMBRE DEPUIS", contractType: "TYPE DE CONTRAT", accountStatus: "STATUT DU COMPTE",
      lastPasswordChanged: "Dernière modification: Mot de passe défini lors de l'inscription",
    },
    settings: {
      title: "Paramètres du Portail", language: "Langue", theme: "Thème", notifications: "Préférences de notifications",
      emailAlerts: "Notifications Email", pushNotifications: "Notifications push", smsAlerts: "Alertes de Nettoyage SMS", saveSettings: "Enregistrer les paramètres",
      notificationAlerts: "ALERTES DE NOTIFICATION", emailDesc: "Recevoir des rapports résumés après les visites", smsDesc: "Recevoir des SMS lorsque les sessions de nettoyage commencent", portalPreferences: "PRÉFÉRENCES DU PORTAIL",
    },
    notifications: {
      title: "Notifications", markAllRead: "Tout marquer comme lu", noNotifications: "Aucune nouvelle notification", unread: "Non lu",
    },
    cleaningPlan: {
      duration: "Durée", photos: "Photos", tasks: "Tâches", rooms: "Pièces", location: "Emplacement",
      showing: "Affichage", of: "sur", planNotFound: "Détails du plan de nettoyage introuvables.", roomsAndTasks: "Pièces & Tâches",
    },
    liveStatus: {
      complete: "Terminé", roomsDone: "pièces terminées", shiftTime: "Heure du Shift", assignedWorkers: "Travailleurs Assignés",
      inTime: "Entrée", outTime: "Sortie", done: "Fait", inProgress: "En cours", pending: "En attente",
      refresh: "Actualiser", tasks: "Tâches", location: "Emplacement", date: "Date",
    },
    serviceCards: {
      submitted: "Soumis", planId: "ID Plan", duration: "Durée", photo: "Photo", time: "Heure",
      photoRequired: "Photo Requise", photoTitle: "Titre de la Photo", selectPlan: "Sélectionner le Plan de Nettoyage",
      taskName: "Nom de la Tâche", dateTime: "Date et Heure", plansAvailable: "plan(s) disponible(s)",
      completed: "Terminé", approved: "Approuvé", pending: "En attente", yes: "Oui", no: "Non",
    },
    notificationsPage: {
      backTo: "Retour aux notifications", delete: "Supprimer", read: "Lu", notFound: "Notification introuvable",
      backToNotifications: "Retour aux Notifications", settingsSaved: "Paramètres enregistrés avec succès",
    },
    topbar: {
      noNotifications: "Aucune notification", viewAllNotifications: "Voir toutes les notifications", profile: "Profil",
    },
    roster: {
      title: "Emploi du temps", dayView: "Vue journalière", weekView: "Vue hebdomadaire", monthView: "Vue mensuelle", date: "Date",
      shiftRoster: "Planning des shifts", dailyRoster: "Planning quotidien", weeklyRoster: "Planning hebdomadaire", monthlyRoster: "Planning mensuel",
      shifts: "services", scheduled: "planifiés", teamMember: "Travailleur", cleaningPlanCol: "Plan de nettoyage",
      noTeamScheduled: "Aucun membre de l'équipe planifié pour cette date.", noPlansScheduled: "Aucun plan de nettoyage prévu pour cette période.",
      scheduledShift: "Service planifié", currentTime: "Heure actuelle",
      scrollHint: "Faites défiler horizontalement pour voir toute la journée", weekScrollHint: "Faites défiler horizontalement pour comparer toute la semaine.",
      monthFooter: "Aperçu mensuel de la planification", weekendHint: "Les week-ends sont légèrement mis en évidence.",
      shiftDetails: "Détails du service planifié", viewFullPlan: "Voir le plan de nettoyage complet", close: "Fermer",
      location: "Emplacement", roomsScheduled: "Salles planifiées", tasksScheduled: "Tâches planifiées",
      assignedTeam: "Membres de l'équipe assignés", upcoming: "À venir", duration: "Durée", durationLabel: "durée",
      cleaningShift: "Service de nettoyage", specialist: "Spécialiste",
      shiftToday: "service aujourd'hui", shiftsToday: "services aujourd'hui", shiftsThisWeek: "services cette semaine",
      available: "Disponible", plans: "plans", scheduledHours: "heures planifiées",
      projected: "Projeté", progress: "Progression", noWorkersAssigned: "Aucun agent assigné pour le moment",
      loadError: "Impossible de charger le planning. Réessayez.", prev: "Précédent", next: "Suivant",
    },
  },
  es: {
    sidebar: {
      dashboard: "Tablero", locations: "Ubicaciones", rooms: "Estado en Vivo", schedule: "Calendario", cleaningPlan: "Plan de limpieza", notes: "Notas del Cliente",
      services: "Servicios Extras", feedback: "Comentarios", chat: "Chat", profile: "Perfil",
      settings: "Ajustes", signOut: "Cerrar Sesión",
    },
    titles: {
      dashboard: "Tablero", locations: "Ubicaciones", rooms: "Estado en Vivo", schedule: "Calendario", cleaningPlan: "Plan de limpieza", notes: "Notas del Cliente",
      services: "Servicios Extras", feedback: "Comentarios", chat: "Chat", profile: "Perfil",
      settings: "Ajustes", notifications: "Notificaciones",
    },
    dashboard: {
      welcomeTitle: "Bienvenido de nuevo", welcomeSub: "Aquí está su resumen de limpieza para hoy.",
      activeCleaning: "Progreso de Habitaciones", liveCleaners: "Limpiadores en Vivo", nextVisit: "Próxima Visita",
      acknowledgedNotes: "Notas Aceptadas", quickActions: "Acciones Rápidas",
      extraServiceReq: "Solicitar Servicio Extra", leaveFeedback: "Dejar Comentario",
      chatCleanOnes: "Chat con CleanOnes", recentSchedule: "Calendario Reciente",
      acknowledged: "Confirmado", pending: "Pendiente", hours: "Horas", rooms: "Habitaciones",
      lastCompleted: "Último completado", teamOnSite: "Su equipo en el lugar", active: "activos",
      noTeamOnSite: "No hay miembros del equipo en el lugar.", viewSchedule: "Ver calendario completo",
      contactSupport: "Contactar a CleanOnes", nextVisitors: "Próximos visitantes", specialists: "especialistas",
      all: "Todos", noServiceToday: "Sin servicio hoy",
      roomTrackingNote: "El progreso de habitaciones está disponible porque esta ubicación utiliza seguimiento de habitaciones.",
      noUpcomingVisits: "No hay visitas programadas", noSpecialistsOnSite: "Sin especialistas en el lugar",
      noCompletedVisits: "Aún no hay visitas completadas", noScheduledVisits: "Sin visitas programadas",
      completed: "completado", remaining: "restante", allShiftsOnSchedule: "Todos los turnos a tiempo",
      scopeOverview: "Alcance de Servicio e Inventario", scopeOverviewDesc: "Instalaciones, salas y tareas configuradas en su plan",
      deliveryOverview: "Trabajo Realizado y Progreso", deliveryOverviewDesc: "Progreso acumulado de salas limpiadas, tareas terminadas y horas",
      cleaningPlans: "Planes de Limpieza", cleaningPlansSub: "Planes de servicio activos",
      managedLocations: "Ubicaciones", managedLocationsSub: "Instalaciones activas",
      totalRoomsScope: "Total de Salas", totalRoomsScopeSub: "Salas registradas",
      totalTasksScope: "Total de Tareas", totalTasksScopeSub: "Tareas programadas",
      completedTasksTitle: "Tareas Completadas", completedTasksSub: "tareas finalizadas",
      completedRoomsTitle: "Salas Limpiadas", completedRoomsSub: "salas completadas",
      hoursDeliveredTitle: "Horas Entregadas", hoursDeliveredSub: "Horas totales de limpieza completadas",
      shiftDeliveryPerformance: "Rendimiento de Entrega de Turnos",
      shiftDeliveryDesc: "Resumen de turnos programados, completados y pendientes",
      completionRate: "Tasa de Finalización", optimal: "Óptimo", paced: "Al ritmo",
      activeShiftsDone: "{completed} de {active} turnos activos completados",
      totalShiftsCard: "Total de Turnos", scheduledShiftsInWindow: "Turnos programados en el período",
      completedShiftsCard: "Turnos Completados", donePill: "Hecho", successfullyDelivered: "Entregado con éxito",
      pendingShiftsCard: "Turnos Pendientes", inQueue: "En cola", upcomingInProgress: "Próximos y en curso",
      plansCount: "{count} Planes", sitesCount: "{count} Sitios", scopePill: "Alcance", checklistPill: "Checklist",
    },
    actionFeedback: { loading: "Cargando...", success: "¡Éxito!", error: "Ocurrió un error", saved: "Guardado exitosamente", deleted: "Eliminado exitosamente", sent: "Enviado exitosamente", loginSuccess: "Inicio de sesión exitoso", loginFailed: "Error al iniciar sesión" },
    common: {
      hours: "Horas", rooms: "Habitaciones", search: "Buscar", filter: "Filtrar",
      cancel: "Cancelar", save: "Guardar", submit: "Enviar", status: "Estado",
      loading: "Cargando...", active: "Activo", inactive: "Inactivo", edit: "Editar", delete: "Eliminar",
    },
    locations: {
      title: "Ubicaciones", subtitle: "Vea sus instalaciones y las habitaciones registradas en cada ubicación.", searchPlaceholder: "Buscar ubicaciones...", address: "Dirección", roomsCount: "Habitaciones",
      viewDetails: "Ver detalles", backToLocations: "Volver a ubicaciones", noLocations: "No se encontraron ubicaciones.", locationDetails: "Detalles de ubicación",
      addressUnavailable: "Dirección no disponible", status: "Estado", online: "En línea", offline: "Desconectado", location: "Ubicación",
      rooms: "Habitaciones", noLocationsMatch: "Ninguna ubicación coincide con su búsqueda.", loadingLocation: "Cargando ubicación…", description: "Descripción",
    },
    rooms: {
      title: "Estado de Habitaciones en Vivo", liveSubtitle: "Vista en tiempo real de su sesión de limpieza actual.", searchPlaceholder: "Buscar habitaciones...", allStatuses: "Todos los estados", clean: "Limpio",
      cleaning: "Limpieza en progreso", dirty: "Necesita limpieza", inspect: "Necesita inspección", noRooms: "No se encontraron habitaciones",
      roomDetails: "Detalles de habitación", tasks: "Tareas de limpieza", floor: "Piso", size: "Tamaño", lastCleaned: "Última limpieza",
      noLiveSession: "Sin sesión de limpieza activa", noLiveSessionDesc: "No hay sesión de limpieza activa o reciente disponible en este momento. El progreso en vivo aparecerá aquí cuando comience un turno programado.", checkAgain: "Verificar de nuevo",
      selectRoom: "Seleccione una habitación para ver sus tareas y fotos requeridas.", noRoomsMatch: "Ninguna habitación coincide con su búsqueda.", room: "Habitación", standard: "Estándar",
      recurringTasks: "Tareas de limpieza recurrentes", noRecurringTasks: "No se han configurado tareas recurrentes para esta habitación", requiredPhotos: "📷 Fotos requeridas:",
      daily: "Diario", weekly: "Semanal", monthly: "Mensual", min: "Min",
    },
    schedule: {
      title: "Calendario de Limpieza", subtitle: "Visitas de limpieza futuras y pasadas para sus ubicaciones.", searchPlaceholder: "Buscar en calendario...", shiftDate: "Fecha", cleaner: "Limpiador",
      room: "Habitación", time: "Hora", status: "Estado", completed: "Completado", inProgress: "En progreso",
      pending: "Programado", noSchedule: "Sin turnos programados para este período", thisMonth: "Este Mes", today: "Hoy", thisWeek: "Esta Semana",
      cleaningVisits: "Visitas de Limpieza", noVisitsFound: "No se encontraron visitas de limpieza", noVisitsMatching: "No hay visitas que coincidan con los filtros seleccionados.", upcoming: "Próximas",
    },
    notes: {
      title: "Notas del Cliente", addNote: "+ Agregar nota", titlePlaceholder: "Título de nota...", notePlaceholder: "Escriba su nota o instrucciones para el equipo de limpieza...",
      priority: "Prioridad", low: "Baja", medium: "Media", high: "Alta", urgent: "Urgente",
      createNote: "Crear nota", clientNotes: "Sus notas", supervisorNotes: "Notas del supervisor", acknowledged: "Confirmado",
      acknowledge: "Confirmar", noNotes: "Aún no se han creado notas",
    },
    services: {
      title: "Solicitudes de Servicios Extras", subtitle: "Solicite servicios de limpieza adicionales más allá de su calendario habitual.", requestService: "+ Solicitar Servicio Extra", serviceTitle: "Título del servicio", description: "Descripción",
      priority: "Prioridad", preferredDate: "Fecha preferida", selectLocation: "Seleccionar ubicación", selectRoom: "Seleccionar habitación",
      submitRequest: "Enviar solicitud", requests: "Sus solicitudes", noRequests: "Aún no se han enviado solicitudes de servicio extra", priorityLow: "Baja",
      priorityNormal: "Normal", priorityHigh: "Alta", statusUnderReview: "En revisión",
      statusApproved: "Aprobado", statusInProgress: "En progreso", statusCompleted: "Completado",
      statusRejected: "Rechazado", requestStatusFlow: "FLUJO DE ESTADO DE SOLICITUD", stepPending: "Pendiente",
      stepUnderReview: "En revisión", stepApprovedRejected: "Aprobado / Rechazado", stepCompleted: "Completado",
      allStatuses: "Todos los estados", allPriorities: "Todas las prioridades", noRequestsTitle: "Sin solicitudes de servicios extras", noRequestsSubtitle: "Cree una solicitud cada vez que necesite servicios de limpieza adicionales.",
    },
    feedback: {
      title: "Comentarios de CleanOnes", submitFeedback: "Enviar comentarios", rating: "Calificación general", ratingPrompt: "¿Qué tan satisfecho está con nuestros servicios?",
      commentsPlaceholder: "Cuéntenos qué salió bien o cómo podemos mejorar...", category: "Categoría de comentarios", general: "General", quality: "Calidad de limpieza",
      timeliness: "Puntualidad", staff: "Comportamiento del personal", submitBtn: "Enviar comentarios", recentFeedback: "Sus comentarios anteriores",
      noFeedback: "Aún no se han enviado comentarios", fiveStarReviews: "Reseñas 5 Estrellas",
      ratingLabels: ["Deficiente", "Regular", "Bueno", "Muy bueno", "Excelente"],
    },
    chat: {
      title: "CleanOnes", typeMessage: "Escriba su mensaje aquí...", send: "Enviar", activeConversations: "CleanOnes",
      supervisor: "Supervisor de Operaciones", online: "En línea", offline: "Fuera de línea", noMessages: "Inicie una conversación con su supervisor",
      conversation: "Conversación", participants: "PARTICIPANTES", selectConversation: "Seleccionar una conversación", selectConversationDesc: "Elija una conversación para ver los mensajes.",
      pageTitle: "Conversaciones y chat del equipo", subtitle: "Mensajería en tiempo real con gerentes de CleanOnes y equipos de limpieza.",
    },
    profile: {
      title: "Perfil de Usuario", personalInfo: "Información personal", name: "Nombre completo", email: "Correo electrónico", phone: "Número de teléfono",
      company: "Empresa / Organización", address: "Dirección de facturación", changePassword: "Cambiar contraseña", currentPassword: "Contraseña actual",
      newPassword: "Nueva contraseña", confirmPassword: "Confirmar nueva contraseña", updateProfile: "Actualizar perfil", saveChanges: "Guardar cambios",
      contactInfo: "INFORMACIÓN DE CONTACTO", contactPerson: "PERSONA DE CONTACTO", companyName: "NOMBRE DE EMPRESA", accountDetails: "DETALLES DE LA CUENTA",
      clientId: "ID DE CLIENTE", memberSince: "MIEMBRO DESDE", contractType: "TIPO DE CONTRATO", accountStatus: "ESTADO DE LA CUENTA",
      lastPasswordChanged: "Última modificación: Contraseña establecida al registrarse",
    },
    settings: {
      title: "Ajustes del Portal", language: "Idioma", theme: "Tema", notifications: "Preferencias de notificación",
      emailAlerts: "Notificaciones por Email", pushNotifications: "Notificaciones push", smsAlerts: "Alertas de Limpieza por SMS", saveSettings: "Guardar ajustes",
      notificationAlerts: "ALERTAS DE NOTIFICACIÓN", emailDesc: "Reciba informes resumidos después de las visitas", smsDesc: "Reciba SMS cuando comiencen las sesiones de limpieza", portalPreferences: "PREFERENCIAS DEL PORTAL",
    },
    notifications: {
      title: "Notificaciones", markAllRead: "Marcar todas como leídas", noNotifications: "Sin notificaciones nuevas", unread: "Sin leer",
    },
    cleaningPlan: {
      duration: "Duración", photos: "Fotos", tasks: "Tareas", rooms: "Habitaciones", location: "Ubicación",
      showing: "Mostrando", of: "de", planNotFound: "Detalles del plan de limpieza no encontrados.", roomsAndTasks: "Habitaciones y Tareas",
    },
    liveStatus: {
      complete: "Completado", roomsDone: "habitaciones listas", shiftTime: "Hora del Turno", assignedWorkers: "Trabajadores Asignados",
      inTime: "Entrada", outTime: "Salida", done: "Listo", inProgress: "En Progreso", pending: "Pendiente",
      refresh: "Actualizar", tasks: "Tareas", location: "Ubicación", date: "Fecha",
    },
    serviceCards: {
      submitted: "Enviado", planId: "ID del Plan", duration: "Duración", photo: "Foto", time: "Hora",
      photoRequired: "Foto Requerida", photoTitle: "Título de la Foto", selectPlan: "Seleccionar Plan de Limpieza",
      taskName: "Nombre de la Tarea", dateTime: "Fecha y Hora", plansAvailable: "plan(es) disponible(s)",
      completed: "Completado", approved: "Aprobado", pending: "Pendiente", yes: "Sí", no: "No",
    },
    notificationsPage: {
      backTo: "Volver a notificaciones", delete: "Eliminar", read: "Leído", notFound: "Notificación no encontrada",
      backToNotifications: "Volver a Notificaciones", settingsSaved: "Configuración guardada exitosamente",
    },
    topbar: {
      noNotifications: "Sin notificaciones", viewAllNotifications: "Ver todas las notificaciones", profile: "Perfil",
    },
    roster: {
      title: "Horario", dayView: "Vista Diaria", weekView: "Vista Semanal", monthView: "Vista Mensual", date: "Fecha",
      shiftRoster: "Lista de turnos", dailyRoster: "Lista Diaria", weeklyRoster: "Lista Semanal", monthlyRoster: "Lista Mensual",
      shifts: "turnos", scheduled: "programado", teamMember: "Trabajador", cleaningPlanCol: "Plan de limpieza",
      noTeamScheduled: "No hay miembros del equipo programados para esta fecha.", noPlansScheduled: "No hay planes de limpieza programados para este período.",
      scheduledShift: "Turno programado", currentTime: "Hora actual",
      scrollHint: "Desplázate horizontalmente para ver el día laboral completo", weekScrollHint: "Desplázate horizontalmente para comparar toda la semana.",
      monthFooter: "Resumen mensual de la plantilla", weekendHint: "Los fines de semana están ligeramente resaltados.",
      shiftDetails: "Detalles del turno programado", viewFullPlan: "Ver Plan de Limpieza Completo", close: "Cerrar",
      location: "Ubicación", roomsScheduled: "Habitaciones programadas", tasksScheduled: "Tareas programadas",
      assignedTeam: "Miembros del equipo asignados", upcoming: "Próximos", duration: "Duración", durationLabel: "duración",
      cleaningShift: "Turno de Limpieza", specialist: "Especialista",
      shiftToday: "turno hoy", shiftsToday: "turnos hoy", shiftsThisWeek: "turnos esta semana",
      available: "Disponible", plans: "planes", scheduledHours: "horas programadas",
      projected: "Proyectado", progress: "Progreso", noWorkersAssigned: "Aún no hay trabajadores asignados",
      loadError: "No se pudo cargar la lista. Inténtalo de nuevo.", prev: "Anterior", next: "Siguiente",
    },
  },
};

export const authTranslations: Record<string, NonNullable<TranslationDict["auth"]>> = {
  en: {
    welcome: "Welcome back", portalSubtitle: "Sign in to your Client Portal", email: "Email Address", password: "Password",
    rememberMe: "Remember me", forgotPassword: "Forgot password?", signIn: "Sign In", signingIn: "Signing in...",
    emailRequired: "Email is required", passwordRequired: "Password is required", forgotTitle: "Forgot password?",
    forgotDescription: "Enter your email address and we will send you a 6-digit OTP code to reset your password.", sendOtp: "Send OTP", sending: "Sending...", rememberQuestion: "Remember your password?",
    setPasswordTitle: "Set New Password", setPasswordDescription: "Choose a secure password. Make sure it is at least 6 characters long.", newPassword: "New Password", confirmPassword: "Confirm New Password", resetPassword: "Reset Password", resetting: "Resetting...",
    passwordMismatch: "Passwords do not match", passwordLength: "Password must be at least 6 characters long", sessionExpired: "Reset session expired. Please request a new OTP.", resetSuccess: "Password reset successfully!",
    otpTitle: "Enter OTP Code", otpDescription: "We sent a verification code to", emailFallback: "your email", completeOtp: "Please enter the complete 6-digit code", restartReset: "Please start the reset process again", otpSent: "OTP sent again to your email.", verifyCode: "Verify Code", resendCode: "Resend Code",
    visualPanel: {
      badge: "Exclusive Client Access", title: "Your facility's cleaning data at your fingertips.", description: "Access your live cleaning schedules, review service history, and seamlessly communicate with your dedicated support team.",
      bullet1: "View your upcoming cleaning schedules", bullet2: "Track real-time room statuses", bullet3: "Provide feedback and request services",
      cardTitle: "Next Scheduled Clean", cardStatus: "Upcoming", cardLocation: "Main Office Building", cardTime: "Tomorrow, 08:00 AM", footer: "Secure, encrypted connection · Trusted by 200+ businesses"
    }
  },
  nl: {
    welcome: "Welkom terug", portalSubtitle: "Log in op uw klantenportaal", email: "E-mailadres", password: "Wachtwoord", rememberMe: "Onthoud mij", forgotPassword: "Wachtwoord vergeten?", signIn: "Inloggen", signingIn: "Bezig met inloggen...", emailRequired: "E-mail is vereist", passwordRequired: "Wachtwoord is vereist", forgotTitle: "Wachtwoord vergeten?", forgotDescription: "Voer uw e-mailadres in. We sturen u een 6-cijferige OTP-code om uw wachtwoord opnieuw in te stellen.", sendOtp: "OTP versturen", sending: "Bezig met versturen...", rememberQuestion: "Weet u uw wachtwoord nog?", setPasswordTitle: "Nieuw wachtwoord instellen", setPasswordDescription: "Kies een veilig wachtwoord van minimaal 6 tekens.", newPassword: "Nieuw wachtwoord", confirmPassword: "Nieuw wachtwoord bevestigen", resetPassword: "Wachtwoord resetten", resetting: "Bezig met resetten...", passwordMismatch: "Wachtwoorden komen niet overeen", passwordLength: "Wachtwoord moet minimaal 6 tekens bevatten", sessionExpired: "Sessie verlopen. Vraag een nieuwe OTP aan.", resetSuccess: "Wachtwoord succesvol gereset!", otpTitle: "OTP-code invoeren", otpDescription: "We hebben een verificatiecode gestuurd naar", emailFallback: "uw e-mail", completeOtp: "Voer de volledige 6-cijferige code in", restartReset: "Start het resetproces opnieuw", otpSent: "OTP opnieuw naar uw e-mail gestuurd.", verifyCode: "Code verifiëren", resendCode: "Code opnieuw versturen",
    visualPanel: {
      badge: "Exclusieve Klantentoegang", title: "De schoonmaakgegevens van uw faciliteit binnen handbereik.", description: "Krijg toegang tot uw actieve schoonmaakschema's, bekijk de servicegeschiedenis en communiceer naadloos met uw toegewijde ondersteuningsteam.",
      bullet1: "Bekijk uw aankomende schoonmaakschema's", bullet2: "Volg realtime kamerstatussen", bullet3: "Geef feedback en vraag services aan",
      cardTitle: "Volgende Geplande Schoonmaak", cardStatus: "Aankomend", cardLocation: "Hoofdkantoor", cardTime: "Morgen, 08:00", footer: "Beveiligde, gecodeerde verbinding · Vertrouwd door 200+ bedrijven"
    }
  },
  fr: {
    welcome: "Bon retour", portalSubtitle: "Connectez-vous à votre portail client", email: "Adresse e-mail", password: "Mot de passe", rememberMe: "Se souvenir de moi", forgotPassword: "Mot de passe oublié ?", signIn: "Se connecter", signingIn: "Connexion...", emailRequired: "L’e-mail est requis", passwordRequired: "Le mot de passe est requis", forgotTitle: "Mot de passe oublié ?", forgotDescription: "Saisissez votre adresse e-mail pour recevoir un code OTP à 6 chiffres et réinitialiser votre mot de passe.", sendOtp: "Envoyer l’OTP", sending: "Envoi...", rememberQuestion: "Vous vous souvenez de votre mot de passe ?", setPasswordTitle: "Définir un nouveau mot de passe", setPasswordDescription: "Choisissez un mot de passe sécurisé d’au moins 6 caractères.", newPassword: "Nouveau mot de passe", confirmPassword: "Confirmer le nouveau mot de passe", resetPassword: "Réinitialiser", resetting: "Réinitialisation...", passwordMismatch: "Les mots de passe ne correspondent pas", passwordLength: "Le mot de passe doit contenir au moins 6 caractères", sessionExpired: "Session expirée. Demandez un nouvel OTP.", resetSuccess: "Mot de passe réinitialisé !", otpTitle: "Saisir le code OTP", otpDescription: "Nous avons envoyé un code de vérification à", emailFallback: "votre e-mail", completeOtp: "Saisissez le code complet à 6 chiffres", restartReset: "Veuillez recommencer la réinitialisation", otpSent: "OTP renvoyé à votre e-mail.", verifyCode: "Vérifier le code", resendCode: "Renvoyer le code",
    visualPanel: {
      badge: "Accès Client Exclusif", title: "Les données de nettoyage de votre installation à portée de main.", description: "Accédez à vos plannings de nettoyage en direct, consultez l'historique des services et communiquez avec votre équipe de support dédiée.",
      bullet1: "Consultez vos plannings de nettoyage à venir", bullet2: "Suivez le statut des pièces en temps réel", bullet3: "Donnez votre avis et demandez des services",
      cardTitle: "Prochain Nettoyage Prévu", cardStatus: "À venir", cardLocation: "Bâtiment Principal", cardTime: "Demain, 08:00", footer: "Connexion sécurisée et cryptée · Approuvé par plus de 200 entreprises"
    }
  },
  es: {
    welcome: "Bienvenido de nuevo", portalSubtitle: "Inicie sesión en su portal de cliente", email: "Correo electrónico", password: "Contraseña", rememberMe: "Recordarme", forgotPassword: "¿Olvidó su contraseña?", signIn: "Iniciar sesión", signingIn: "Iniciando sesión...", emailRequired: "El correo es obligatorio", passwordRequired: "La contraseña es obligatoria", forgotTitle: "¿Olvidó su contraseña?", forgotDescription: "Introduzca su correo y le enviaremos un código OTP de 6 dígitos para restablecer su contraseña.", sendOtp: "Enviar OTP", sending: "Enviando...", rememberQuestion: "¿Recuerda su contraseña?", setPasswordTitle: "Establecer nueva contraseña", setPasswordDescription: "Elija una contraseña segura de al menos 6 caracteres.", newPassword: "Nueva contraseña", confirmPassword: "Confirmar nueva contraseña", resetPassword: "Restablecer contraseña", resetting: "Restableciendo...", passwordMismatch: "Las contraseñas no coinciden", passwordLength: "La contraseña debe tener al menos 6 caracteres", sessionExpired: "La sesión de restablecimiento expiró. Solicite un nuevo OTP.", resetSuccess: "¡Contraseña restablecida correctamente!", otpTitle: "Introduzca el código OTP", otpDescription: "Enviamos un código de verificación a", emailFallback: "su correo", completeOtp: "Introduzca el código completo de 6 dígitos", restartReset: "Vuelva a iniciar el proceso de restablecimiento", otpSent: "OTP enviado de nuevo a su correo.", verifyCode: "Verificar código", resendCode: "Reenviar código",
    visualPanel: {
      badge: "Acceso Exclusivo para Clientes", title: "Los datos de limpieza de sus instalaciones al alcance de su mano.", description: "Acceda a sus horarios de limpieza en vivo, revise el historial de servicios y comuníquese con su equipo de soporte dedicado.",
      bullet1: "Vea sus próximos horarios de limpieza", bullet2: "Siga el estado de las habitaciones en tiempo real", bullet3: "Envíe comentarios y solicite servicios",
      cardTitle: "Próxima Limpieza Programada", cardStatus: "Próximo", cardLocation: "Edificio Principal", cardTime: "Mañana, 08:00", footer: "Conexión segura y encriptada · Confiado por más de 200 empresas"
    }
  },
  pl: {
    welcome: "Witamy ponownie", portalSubtitle: "Zaloguj się do portalu klienta", email: "Adres e-mail", password: "Hasło", rememberMe: "Zapamiętaj mnie", forgotPassword: "Nie pamiętasz hasła?", signIn: "Zaloguj się", signingIn: "Logowanie...", emailRequired: "E-mail jest wymagany", passwordRequired: "Hasło jest wymagane", forgotTitle: "Nie pamiętasz hasła?", forgotDescription: "Podaj adres e-mail, a wyślemy 6-cyfrowy kod OTP do zresetowania hasła.", sendOtp: "Wyślij OTP", sending: "Wysyłanie...", rememberQuestion: "Pamiętasz hasło?", setPasswordTitle: "Ustaw nowe hasło", setPasswordDescription: "Wybierz bezpieczne hasło o długości co najmniej 6 znaków.", newPassword: "Nowe hasło", confirmPassword: "Potwierdź nowe hasło", resetPassword: "Zresetuj hasło", resetting: "Resetowanie...", passwordMismatch: "Hasła nie są zgodne", passwordLength: "Hasło musi mieć co najmniej 6 znaków", sessionExpired: "Sesja resetowania wygasła. Poproś o nowy OTP.", resetSuccess: "Hasło zostało zresetowane!", otpTitle: "Wpisz kod OTP", otpDescription: "Wysłaliśmy kod weryfikacyjny na adres", emailFallback: "Twój e-mail", completeOtp: "Wpisz pełny 6-cyfrowy kod", restartReset: "Rozpocznij proces resetowania ponownie", otpSent: "OTP wysłano ponownie na Twój e-mail.", verifyCode: "Zweryfikuj kod", resendCode: "Wyślij kod ponownie",
    visualPanel: {
      badge: "Ekskluzywny Dostęp dla Klientów", title: "Dane dotyczące sprzątania Twojego obiektu na wyciągnięcie ręki.", description: "Uzyskaj dostęp do aktualnych harmonogramów sprzątania, sprawdzaj historię usług i komunikuj się z dedykowanym zespołem wsparcia.",
      bullet1: "Przeglądaj nadchodzące harmonogramy sprzątania", bullet2: "Śledź statusy pokoi w czasie rzeczywistym", bullet3: "Przekazuj opinie i zamawiaj usługi",
      cardTitle: "Następne Zaplanowane Sprzątanie", cardStatus: "Nadchodzące", cardLocation: "Główny Budynek", cardTime: "Jutro, 08:00", footer: "Bezpieczne, szyfrowane połączenie · Zaufanie ponad 200 firm"
    }
  },
  uk: {
    welcome: "З поверненням", portalSubtitle: "Увійдіть до порталу клієнта", email: "Електронна пошта", password: "Пароль", rememberMe: "Запам’ятати мене", forgotPassword: "Забули пароль?", signIn: "Увійти", signingIn: "Вхід...", emailRequired: "Потрібна електронна пошта", passwordRequired: "Потрібен пароль", forgotTitle: "Забули пароль?", forgotDescription: "Введіть електронну пошту, і ми надішлемо 6-значний OTP-код для скидання пароля.", sendOtp: "Надіслати OTP", sending: "Надсилання...", rememberQuestion: "Пам’ятаєте пароль?", setPasswordTitle: "Встановіть новий пароль", setPasswordDescription: "Оберіть безпечний пароль довжиною щонайменше 6 символів.", newPassword: "Новий пароль", confirmPassword: "Підтвердьте новий пароль", resetPassword: "Скинути пароль", resetting: "Скидання...", passwordMismatch: "Паролі не збігаються", passwordLength: "Пароль має містити щонайменше 6 символів", sessionExpired: "Сеанс скидання завершено. Запросіть новий OTP.", resetSuccess: "Пароль успішно скинуто!", otpTitle: "Введіть OTP-код", otpDescription: "Ми надіслали код підтвердження на", emailFallback: "вашу пошту", completeOtp: "Введіть повний 6-значний код", restartReset: "Почніть процес скидання знову", otpSent: "OTP повторно надіслано на вашу пошту.", verifyCode: "Підтвердити код", resendCode: "Надіслати код повторно",
    visualPanel: {
      badge: "Ексклюзивний доступ клієнта", title: "Дані про прибирання вашого об'єкта під рукою.", description: "Отримайте доступ до поточних графіків прибирання, історії послуг та легко спілкуйтеся зі своєю командою підтримки.",
      bullet1: "Переглядайте майбутні графіки прибирання", bullet2: "Відстежуйте статуси кімнат у реальному часі", bullet3: "Залишайте відгуки та замовляйте послуги",
      cardTitle: "Наступне заплановане прибирання", cardStatus: "Майбутнє", cardLocation: "Головна будівля", cardTime: "Завтра, 08:00", footer: "Безпечне, зашифроване з'єднання · Довіряють понад 200 компаній"
    }
  },
  pt: {
    welcome: "Bem-vindo novamente", portalSubtitle: "Entre no seu portal do cliente", email: "Endereço de e-mail", password: "Palavra-passe", rememberMe: "Lembrar-me", forgotPassword: "Esqueceu-se da palavra-passe?", signIn: "Entrar", signingIn: "A entrar...", emailRequired: "O e-mail é obrigatório", passwordRequired: "A palavra-passe é obrigatória", forgotTitle: "Esqueceu-se da palavra-passe?", forgotDescription: "Introduza o seu e-mail e enviaremos um código OTP de 6 dígitos para repor a palavra-passe.", sendOtp: "Enviar OTP", sending: "A enviar...", rememberQuestion: "Lembra-se da palavra-passe?", setPasswordTitle: "Definir nova palavra-passe", setPasswordDescription: "Escolha uma palavra-passe segura com pelo menos 6 caracteres.", newPassword: "Nova palavra-passe", confirmPassword: "Confirmar nova palavra-passe", resetPassword: "Repor palavra-passe", resetting: "A repor...", passwordMismatch: "As palavras-passe não coincidem", passwordLength: "A palavra-passe deve ter pelo menos 6 caracteres", sessionExpired: "A sessão expirou. Solicite um novo OTP.", resetSuccess: "Palavra-passe reposta com sucesso!", otpTitle: "Introduza o código OTP", otpDescription: "Enviámos um código de verificação para", emailFallback: "o seu e-mail", completeOtp: "Introduza o código completo de 6 dígitos", restartReset: "Recomece o processo de reposição", otpSent: "OTP enviado novamente para o seu e-mail.", verifyCode: "Verificar código", resendCode: "Reenviar código",
    visualPanel: {
      badge: "Acesso Exclusivo para Clientes", title: "Dados de limpeza da sua instalação na ponta dos dedos.", description: "Aceda aos seus horários de limpeza ao vivo, reveja o histórico de serviços e comunique-se com a sua equipa de suporte.",
      bullet1: "Veja os seus próximos horários de limpeza", bullet2: "Acompanhe os status dos quartos em tempo real", bullet3: "Dê feedback e solicite serviços",
      cardTitle: "Próxima Limpeza Agendada", cardStatus: "Próximo", cardLocation: "Edifício Principal", cardTime: "Amanhã, 08:00", footer: "Ligação segura e encriptada · Confiado por mais de 200 empresas"
    }
  },
  ar: {
    welcome: "مرحبًا بعودتك", portalSubtitle: "سجّل الدخول إلى بوابة العميل", email: "البريد الإلكتروني", password: "كلمة المرور", rememberMe: "تذكرني", forgotPassword: "هل نسيت كلمة المرور؟", signIn: "تسجيل الدخول", signingIn: "جارٍ تسجيل الدخول...", emailRequired: "البريد الإلكتروني مطلوب", passwordRequired: "كلمة المرور مطلوبة", forgotTitle: "هل نسيت كلمة المرور؟", forgotDescription: "أدخل بريدك الإلكتروني وسنرسل رمز OTP من 6 أرقام لإعادة تعيين كلمة المرور.", sendOtp: "إرسال OTP", sending: "جارٍ الإرسال...", rememberQuestion: "هل تتذكر كلمة المرور؟", setPasswordTitle: "تعيين كلمة مرور جديدة", setPasswordDescription: "اختر كلمة مرور آمنة لا تقل عن 6 أحرف.", newPassword: "كلمة المرور الجديدة", confirmPassword: "تأكيد كلمة المرور الجديدة", resetPassword: "إعادة تعيين كلمة المرور", resetting: "جارٍ إعادة التعيين...", passwordMismatch: "كلمتا المرور غير متطابقتين", passwordLength: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل", sessionExpired: "انتهت جلسة إعادة التعيين. يرجى طلب OTP جديد.", resetSuccess: "تمت إعادة تعيين كلمة المرور بنجاح!", otpTitle: "أدخل رمز OTP", otpDescription: "أرسلنا رمز التحقق إلى", emailFallback: "بريدك الإلكتروني", completeOtp: "أدخل الرمز الكامل المكون من 6 أرقام", restartReset: "يرجى بدء عملية إعادة التعيين من جديد", otpSent: "تم إرسال OTP مرة أخرى إلى بريدك الإلكتروني.", verifyCode: "تحقق من الرمز", resendCode: "إعادة إرسال الرمز",
    visualPanel: {
      badge: "وصول حصري للعملاء", title: "بيانات التنظيف لمرافقك في متناول يدك.", description: "الوصول إلى جداول التنظيف المباشرة، ومراجعة سجل الخدمات، والتواصل بسهولة مع فريق الدعم المخصص لك.",
      bullet1: "عرض جداول التنظيف القادمة", bullet2: "تتبع حالة الغرف في الوقت الفعلي", bullet3: "تقديم ملاحظات وطلب خدمات",
      cardTitle: "التنظيف المجدول التالي", cardStatus: "قادم", cardLocation: "المبنى الرئيسي", cardTime: "غدًا، 08:00 صباحًا", footer: "اتصال آمن ومشفّر · موثوق به من قبل أكثر من 200 شركة"
    }
  },
};

export const getAuthTranslation = (locale: string | string[] | undefined): NonNullable<TranslationDict["auth"]> => {
  const code = typeof locale === "string" ? locale : "en";
  return authTranslations[code] || authTranslations.en;
};

export const getTranslation = (locale: string | string[] | undefined): TranslationDict => {
  const code = typeof locale === "string" ? locale : "en";
  const target = translations[code] || translations.en;

  if (code === "en") return target;

  const deepMerge = (base: any, override: any) => {
    const result = { ...base };
    for (const key in override) {
      if (typeof override[key] === 'object' && override[key] !== null && !Array.isArray(override[key])) {
        result[key] = deepMerge(base[key] || {}, override[key]);
      } else {
        result[key] = override[key] !== undefined ? override[key] : base[key];
      }
    }
    return result;
  };

  return deepMerge(translations.en, target) as TranslationDict;
};
