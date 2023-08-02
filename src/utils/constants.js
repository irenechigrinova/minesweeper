export const MODES = {
  beginner: {
    value: 'beginner',
    name: 'Beginner',
    rows: 9,
    columns: 9,
    mines: 10,
  },
  intermediate: {
    value: 'intermediate',
    name: 'Intermediate',
    rows: 16,
    columns: 16,
    mines: 40,
  },
  expert: {
    value: 'expert',
    name: 'Expert',
    rows: 16,
    columns: 30,
    mines: 99,
  },
  custom: {
    value: 'custom',
    name: 'Custom',
    rows: 16,
    columns: 30,
    mines: 99,
  },
};

export const STATUSES = {
  success: 'success',
  setting: 'setting',
  failed: 'failed',
  playing: 'playing',
  pending: 'pending',
};
