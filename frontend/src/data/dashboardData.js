export const dashboardLevels = [
  { id: 'codir', label: 'Comité de direction' },
  { id: 'uap', label: 'UAP' },
  { id: 'ligne', label: 'Ligne' },
];

const monthDays = Array.from({ length: 31 }, (_, i) => ({
  day: `2026-03-${String(i + 1).padStart(2, '0')}`,
  complaints: [
    2, 1, 3, 4, 2, 5, 4, 2, 1, 3,
    2, 2, 1, 0, 2, 3, 4, 3, 2, 2,
    1, 2, 3, 4, 2, 1, 2, 3, 2, 1, 1,
  ][i],
  revenue: [
    78, 83, 81, 85, 84, 86, 82, 79, 87, 88,
    84, 86, 89, 90, 88, 87, 91, 92, 89, 90,
    93, 92, 91, 94, 95, 93, 96, 94, 95, 97, 98,
  ][i],
  revenueTarget: Array(31).fill(85)[i],
  oee: [
    71, 72, 74, 73, 75, 76, 74, 72, 73, 77,
    78, 76, 75, 79, 80, 78, 77, 81, 82, 80,
    79, 83, 82, 84, 85, 83, 84, 86, 85, 87, 88,
  ][i],
  absences: [
    3, 2, 4, 3, 5, 4, 4, 3, 2, 2,
    3, 5, 4, 3, 3, 2, 4, 5, 3, 2,
    1, 2, 3, 4, 3, 2, 2, 3, 4, 3, 2,
  ][i],
}));

const weekDetails = {
  S1: {
    weekLabel: 'Semaine 1',
    produced: 4800,
    target: 5000,
    days: [
      {
        id: '2026-03-02',
        produced: 930,
        target: 1000,
        lines: [
          { line: 'Ligne 1', produced: 300, target: 320 },
          { line: 'Ligne 2', produced: 315, target: 330 },
          { line: 'Ligne 3', produced: 315, target: 350 },
        ],
      },
      {
        id: '2026-03-03',
        produced: 980,
        target: 1000,
        lines: [
          { line: 'Ligne 1', produced: 320, target: 320 },
          { line: 'Ligne 2', produced: 330, target: 330 },
          { line: 'Ligne 3', produced: 330, target: 350 },
        ],
      },
      {
        id: '2026-03-04',
        produced: 940,
        target: 1000,
        lines: [
          { line: 'Ligne 1', produced: 310, target: 320 },
          { line: 'Ligne 2', produced: 320, target: 330 },
          { line: 'Ligne 3', produced: 310, target: 350 },
        ],
      },
      {
        id: '2026-03-05',
        produced: 960,
        target: 1000,
        lines: [
          { line: 'Ligne 1', produced: 315, target: 320 },
          { line: 'Ligne 2', produced: 325, target: 330 },
          { line: 'Ligne 3', produced: 320, target: 350 },
        ],
      },
      {
        id: '2026-03-06',
        produced: 990,
        target: 1000,
        lines: [
          { line: 'Ligne 1', produced: 325, target: 320 },
          { line: 'Ligne 2', produced: 335, target: 330 },
          { line: 'Ligne 3', produced: 330, target: 350 },
        ],
      },
    ],
  },

  S2: {
    weekLabel: 'Semaine 2',
    produced: 5050,
    target: 5000,
    days: [
      {
        id: '2026-03-09',
        produced: 1010,
        target: 1000,
        lines: [
          { line: 'Ligne 1', produced: 330, target: 320 },
          { line: 'Ligne 2', produced: 340, target: 330 },
          { line: 'Ligne 3', produced: 340, target: 350 },
        ],
      },
      {
        id: '2026-03-10',
        produced: 1000,
        target: 1000,
        lines: [
          { line: 'Ligne 1', produced: 320, target: 320 },
          { line: 'Ligne 2', produced: 330, target: 330 },
          { line: 'Ligne 3', produced: 350, target: 350 },
        ],
      },
      {
        id: '2026-03-11',
        produced: 995,
        target: 1000,
        lines: [
          { line: 'Ligne 1', produced: 325, target: 320 },
          { line: 'Ligne 2', produced: 330, target: 330 },
          { line: 'Ligne 3', produced: 340, target: 350 },
        ],
      },
      {
        id: '2026-03-12',
        produced: 1020,
        target: 1000,
        lines: [
          { line: 'Ligne 1', produced: 340, target: 320 },
          { line: 'Ligne 2', produced: 335, target: 330 },
          { line: 'Ligne 3', produced: 345, target: 350 },
        ],
      },
      {
        id: '2026-03-13',
        produced: 1025,
        target: 1000,
        lines: [
          { line: 'Ligne 1', produced: 335, target: 320 },
          { line: 'Ligne 2', produced: 345, target: 330 },
          { line: 'Ligne 3', produced: 345, target: 350 },
        ],
      },
    ],
  },

  S3: {
    weekLabel: 'Semaine 3',
    produced: 4920,
    target: 5000,
    days: [
      {
        id: '2026-03-16',
        produced: 980,
        target: 1000,
        lines: [
          { line: 'Ligne 1', produced: 320, target: 320 },
          { line: 'Ligne 2', produced: 325, target: 330 },
          { line: 'Ligne 3', produced: 335, target: 350 },
        ],
      },
      {
        id: '2026-03-17',
        produced: 965,
        target: 1000,
        lines: [
          { line: 'Ligne 1', produced: 315, target: 320 },
          { line: 'Ligne 2', produced: 320, target: 330 },
          { line: 'Ligne 3', produced: 330, target: 350 },
        ],
      },
      {
        id: '2026-03-18',
        produced: 990,
        target: 1000,
        lines: [
          { line: 'Ligne 1', produced: 325, target: 320 },
          { line: 'Ligne 2', produced: 330, target: 330 },
          { line: 'Ligne 3', produced: 335, target: 350 },
        ],
      },
      {
        id: '2026-03-19',
        produced: 975,
        target: 1000,
        lines: [
          { line: 'Ligne 1', produced: 315, target: 320 },
          { line: 'Ligne 2', produced: 325, target: 330 },
          { line: 'Ligne 3', produced: 335, target: 350 },
        ],
      },
      {
        id: '2026-03-20',
        produced: 1010,
        target: 1000,
        lines: [
          { line: 'Ligne 1', produced: 330, target: 320 },
          { line: 'Ligne 2', produced: 335, target: 330 },
          { line: 'Ligne 3', produced: 345, target: 350 },
        ],
      },
    ],
  },

  S4: {
    weekLabel: 'Semaine 4',
    produced: 5120,
    target: 5000,
    days: [
      {
        id: '2026-03-23',
        produced: 1005,
        target: 1000,
        lines: [
          { line: 'Ligne 1', produced: 325, target: 320 },
          { line: 'Ligne 2', produced: 335, target: 330 },
          { line: 'Ligne 3', produced: 345, target: 350 },
        ],
      },
      {
        id: '2026-03-24',
        produced: 1015,
        target: 1000,
        lines: [
          { line: 'Ligne 1', produced: 330, target: 320 },
          { line: 'Ligne 2', produced: 335, target: 330 },
          { line: 'Ligne 3', produced: 350, target: 350 },
        ],
      },
      {
        id: '2026-03-25',
        produced: 1030,
        target: 1000,
        lines: [
          { line: 'Ligne 1', produced: 335, target: 320 },
          { line: 'Ligne 2', produced: 345, target: 330 },
          { line: 'Ligne 3', produced: 350, target: 350 },
        ],
      },
      {
        id: '2026-03-26',
        produced: 1040,
        target: 1000,
        lines: [
          { line: 'Ligne 1', produced: 340, target: 320 },
          { line: 'Ligne 2', produced: 345, target: 330 },
          { line: 'Ligne 3', produced: 355, target: 350 },
        ],
      },
      {
        id: '2026-03-27',
        produced: 1030,
        target: 1000,
        lines: [
          { line: 'Ligne 1', produced: 335, target: 320 },
          { line: 'Ligne 2', produced: 340, target: 330 },
          { line: 'Ligne 3', produced: 355, target: 350 },
        ],
      },
    ],
  },

  S5: {
    weekLabel: 'Semaine 5',
    produced: 2980,
    target: 3000,
    days: [
      {
        id: '2026-03-30',
        produced: 980,
        target: 1000,
        lines: [
          { line: 'Ligne 1', produced: 320, target: 320 },
          { line: 'Ligne 2', produced: 330, target: 330 },
          { line: 'Ligne 3', produced: 330, target: 350 },
        ],
      },
      {
        id: '2026-03-31',
        produced: 1010,
        target: 1000,
        lines: [
          { line: 'Ligne 1', produced: 330, target: 320 },
          { line: 'Ligne 2', produced: 335, target: 330 },
          { line: 'Ligne 3', produced: 345, target: 350 },
        ],
      },
      {
        id: '2026-04-01',
        produced: 990,
        target: 1000,
        lines: [
          { line: 'Ligne 1', produced: 325, target: 320 },
          { line: 'Ligne 2', produced: 325, target: 330 },
          { line: 'Ligne 3', produced: 340, target: 350 },
        ],
      },
      {
        id: '2026-04-02',
        produced: 0,
        target: 0,
        lines: [],
      },
      {
        id: '2026-04-03',
        produced: 0,
        target: 0,
        lines: [],
      },
    ],
  },
};

const commonDashboard = {
  meta: {
    plant: 'Site Amboise',
    month: 'Mars 2026',
    currentWeek: 'S5',
  },

  safety: {
    kpis: {
      daysWithoutLostTimeAccident: 143,
      daysWithoutDeclaredAccident: 58,
      daysWithoutEnvironmentalIncident: 211,
    },
    vcsAgenda: [
      {
        pilote: 'A. Martin',
        copilote: 'S. Leroy',
        datePrevue: '2026-03-08',
        statut: 'Fait',
        compteRendu: 'Oui',
      },
      {
        pilote: 'N. Petit',
        copilote: 'C. Roche',
        datePrevue: '2026-03-11',
        statut: 'En cours',
        compteRendu: 'En cours',
      },
      {
        pilote: 'L. Moreau',
        copilote: 'T. Simon',
        datePrevue: '2026-03-14',
        statut: 'À faire',
        compteRendu: 'Non',
      },
    ],
  },

  quality: {
    kpis: {
      deviationsOpenClosed: '24 / 18',
      deviationsInProgress: 6,
      complaintsAndPfPending: '11 / 4',
    },
    complaintsByDay: monthDays.map((d) => ({
      day: d.day,
      value: d.complaints,
    })),
  },

  delivery: {
    kpis: {
      otifWeeklyTurnover: 96.2,
      mgh: 91.4,
    },
    revenueByDay: monthDays.map((d) => ({
      day: d.day,
      revenue: d.revenue,
      target: d.revenueTarget,
    })),
    weeklyProduction: weekDetails,
    otifList: [
      {
        client: 'Client A',
        pf: 'PF-001',
        designation: 'Crème jour 50ml',
        dueDate: '2026-03-07',
        max: 1200,
        comment: 'Retard appro emballage',
      },
      {
        client: 'Client B',
        pf: 'PF-014',
        designation: 'Lotion 200ml',
        dueDate: '2026-03-09',
        max: 2400,
        comment: 'Manque personnel équipe nuit',
      },
      {
        client: 'Client C',
        pf: 'PF-009',
        designation: 'Gel douche 250ml',
        dueDate: '2026-03-12',
        max: 1800,
        comment: 'Panne courte ligne 2',
      },
    ],
  },

  cost: {
    kpis: {
      dailyOee: 87.3,
      wasteCost: 1280,
    },
    oeeTrend: monthDays.map((d) => ({
      day: d.day,
      value: d.oee,
    })),
  },

  people: {
    absencesByDay: monthDays.map((d) => ({
      day: d.day,
      value: d.absences,
    })),
  },
};

export const dashboardsByLevel = {
  codir: structuredClone(commonDashboard),
  uap: structuredClone(commonDashboard),
  ligne: structuredClone(commonDashboard),
};

export const defaultLayout = [
  'safety',
  'quality',
  'delivery',
  'cost',
  'people',
];