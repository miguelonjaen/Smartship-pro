export const VADEMECUM_SIGNALS = [
  { id: 's1', label: 'Una Pitada Corta', description: 'Caigo a Estribor', pattern: [1], type: 'Maniobra' },
  { id: 's2', label: 'Dos Pitadas Cortas', description: 'Caigo a Babor', pattern: [1, 1], type: 'Maniobra' },
  { id: 's3', label: 'Tres Pitadas Cortas', description: 'Dando Atrás', pattern: [1, 1, 1], type: 'Maniobra' },
  { id: 's4', label: 'Cinco Pitadas Cortas', description: 'Duda / Peligro', pattern: [1, 1, 1, 1, 1], type: 'Alerta' }
];

export const FLAGS = [
  { char: 'A', meaning: 'Buzo sumergido; manténgase alejado.', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Alpha_flag.svg/100px-Alpha_flag.svg.png' },
  { char: 'B', meaning: 'Carga peligrosa.', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Bravo_flag.svg/100px-Bravo_flag.svg.png' },
  { char: 'O', meaning: 'Hombre al agua.', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Oscar_flag.svg/100px-Oscar_flag.svg.png' }
];
