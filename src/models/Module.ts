const Module = Object.freeze({
  DIAGNOSIS: 'DIAGNOSIS',
  LABORATORY: 'LABORATORY',
  MOLECULES: 'MOLECULES',
  SAMPLES: 'SAMPLES',
  START_POS: 'START_POS',
});

export type ModuleType = keyof typeof Module;

export default Module;
