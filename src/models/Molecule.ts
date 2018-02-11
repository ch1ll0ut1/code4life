const Molecule = Object.freeze({
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
});

export type MoleculeType = keyof typeof Molecule;

export default Molecule;
