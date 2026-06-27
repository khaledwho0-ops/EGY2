// SOURCE OF TRUTH — Science Exercise Registry
//
// This registry contains the 33 real science exercises covering days 3–35.
// These are the ONLY built exercises; no content beyond day 35 exists yet.
//
// NOTE: Early product docs referenced a "days 57–98 science manifest" (a second
// science block inside Phase 2). That manifest has NOT been built. Do not add
// placeholder entries or invented content here. When the days-57–98 exercises are
// built they must be added as a separate, clearly-named export (e.g.
// SCIENCE_EXERCISES_PHASE2) so consumers can distinguish built from unbuilt content.
//
// Day numbering: days 3–35 map to the Phase-1 science track (30-day main phase
// plus a 5-day statistics capstone). They do NOT represent global curriculum days.
export interface ScienceExerciseMeta {
  id: string;
  file: string;
  day: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
}

// 33 built exercises — days 3–35 (Phase-1 science track only).
export const SCIENCE_EXERCISES: ScienceExerciseMeta[] = [
  { id: 'p_hacking_audit', file: 'p-hacking_audit_day3.json', day: 3, difficulty: 3 },
  { id: 'harking', file: 'harking_day4.json', day: 4, difficulty: 3 },
  { id: 'forking', file: 'forking_day5.json', day: 5, difficulty: 3 },
  { id: 'bonferroni', file: 'bonferroni_day6.json', day: 6, difficulty: 3 },
  { id: 'rtm', file: 'rtm_day7.json', day: 7, difficulty: 2 },
  { id: 'simpsons', file: 'simpsons_day8.json', day: 8, difficulty: 3 },
  { id: 'ecological', file: 'ecological_day9.json', day: 9, difficulty: 3 },
  { id: 'atomistic', file: 'atomistic_day10.json', day: 10, difficulty: 3 },
  { id: 'survivorship', file: 'survivorship_day11.json', day: 11, difficulty: 2 },
  { id: 'selection', file: 'selection_day12.json', day: 12, difficulty: 3 },
  { id: 'sampling', file: 'sampling_day13.json', day: 13, difficulty: 2 },
  { id: 'volunteer', file: 'volunteer_day14.json', day: 14, difficulty: 2 },
  { id: 'pubbias', file: 'pubbias_day15.json', day: 15, difficulty: 3 },
  { id: 'funnel', file: 'funnel_day16.json', day: 16, difficulty: 4 },
  { id: 'effectsize', file: 'effectsize_day17.json', day: 17, difficulty: 3 },
  { id: 'ci', file: 'ci_day18.json', day: 18, difficulty: 3 },
  { id: 'psig', file: 'psig_day19.json', day: 19, difficulty: 3 },
  { id: 'bayesfactor', file: 'bayesfactor_day20.json', day: 20, difficulty: 4 },
  { id: 'lr', file: 'lr_day21.json', day: 21, difficulty: 4 },
  { id: 'prior', file: 'prior_day22.json', day: 22, difficulty: 4 },
  { id: 'freqbayes', file: 'freqbayes_day23.json', day: 23, difficulty: 4 },
  { id: 'stopping', file: 'stopping_day24.json', day: 24, difficulty: 4 },
  { id: 'optstop', file: 'optstop_day25.json', day: 25, difficulty: 3 },
  { id: 'dof', file: 'dof_day26.json', day: 26, difficulty: 3 },
  { id: 'outlier', file: 'outlier_day27.json', day: 27, difficulty: 3 },
  { id: 'dredge', file: 'dredge_day28.json', day: 28, difficulty: 3 },
  { id: 'mi', file: 'mi_day29.json', day: 29, difficulty: 4 },
  { id: 'mar', file: 'mar_day30.json', day: 30, difficulty: 4 },
  { id: 'ittpp', file: 'ittpp_day31.json', day: 31, difficulty: 4 },
  { id: 'subgroup', file: 'subgroup_day32.json', day: 32, difficulty: 4 },
  { id: 'interaction', file: 'interaction_day33.json', day: 33, difficulty: 4 },
  { id: 'confound', file: 'confound_day34.json', day: 34, difficulty: 4 },
  { id: 'collider', file: 'collider_day35.json', day: 35, difficulty: 5 },
];

export const DIFFICULTY_LABELS: Record<number, string> = {
  1: 'Beginner',
  2: 'Beginner',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Expert',
};

export const DIFFICULTY_COLORS: Record<number, string> = {
  1: '#22c55e',
  2: '#84cc16',
  3: '#eab308',
  4: '#f97316',
  5: '#ef4444',
};
