export interface VademecumItem {
  id: string;
  title: string;
  description: string;
  symbol?: string;
  color?: string;
  category: string;
  protocol?: string;
  // Extended fields
  morse?: string;
  medical?: string;
  visual?: string;
  steps?: string[];
  utility?: string;
  properties?: string;
  lights?: string;
  marks?: string;
  maneuver?: string;
  buoyColor?: string;
  topMark?: string;
  lightRitmo?: string;
}

export const VADEMECUM_DATA: Record<string, VademecumItem[]> = {
  banderas: [
    { 
      id: 'b-a', 
      title: 'Alpha', 
      symbol: '🤿',
      description: 'Tengo buzo sumergido; manténgase bien alejado de mí y a poca velocidad.', 
      visual: 'Dos franjas verticales, blanca al mástil y azul al batiente, terminada en cola de milano.',
      medical: 'Tengo buzo sumergido.',
      morse: '● ▬',
      category: 'CIS',
      color: 'bg-gradient-to-r from-white to-blue-600'
    },
    { 
      id: 'b-b', 
      title: 'Bravo', 
      symbol: '🔥',
      description: 'Estoy cargando, descargando o transportando mercancías peligrosas.', 
      visual: 'Bandera roja terminada en cola de milano.',
      medical: 'Carga explosiva/inflamable.',
      morse: '▬ ● ● ●',
      category: 'CIS',
      color: 'bg-red-600'
    },
    { 
      id: 'b-c', 
      title: 'Charlie', 
      symbol: '✅',
      description: 'Sí (Afirmativo).', 
      visual: 'Cinco franjas horizontales de igual anchura: azul, blanca, roja, blanca y azul.',
      medical: 'Respuesta afirmativa.',
      morse: '▬ ● ▬ ●',
      category: 'CIS',
      color: 'bg-blue-600'
    },
    { 
      id: 'b-d', 
      title: 'Delta', 
      symbol: '⚠️',
      description: 'Manténgase alejado de mí; estoy maniobrando con dificultad.', 
      visual: 'Tres franjas horizontales: amarilla, azul y amarilla.',
      medical: 'Maniobra con dificultad.',
      morse: '▬ ● ●',
      category: 'CIS',
      color: 'bg-yellow-400'
    },
    { 
      id: 'b-o', 
      title: 'Oscar', 
      symbol: '🏊',
      description: '¡Hombre al agua!', 
      visual: 'Dividida diagonalmente en dos triángulos: amarillo y rojo.',
      medical: 'HOMBRE AL AGUA.',
      morse: '▬ ▬ ▬',
      category: 'CIS',
      color: 'bg-gradient-to-br from-yellow-400 to-red-600'
    }
  ],
  cabuyería: [
    {
      id: 'k1',
      title: 'As de Guía',
      symbol: '➰',
      description: 'El nudo "rey" de la mar. Forma una gaza que no se corre ni se aprieta.',
      utility: 'Formar una gaza fija en el extremo de un cabo para encapillar o sujetar.',
      steps: [
        'Haz un pequeño seno (el lago) en el firme.',
        'La punta del cabo (la serpiente) sale del lago.',
        'Pasa por detrás del árbol (el firme).',
        'Vuelve a entrar en el lago.'
      ],
      properties: 'No se escurre. Fácil de deshacer incluso bajo tensión extrema.',
      category: 'Nudos'
    },
    {
      id: 'k2',
      title: 'Ballestrinque',
      symbol: '⚔️',
      description: 'Nudo de amarre rápido y eficaz sobre perchas o defensas.',
      utility: 'Sujetar defensas al guardamancebos o amarrarse a una bita.',
      steps: [
        'Da una vuelta al objeto con el cabo.',
        'Cruza la punta sobre el firme.',
        'Da otra vuelta y pasa la punta por debajo.'
      ],
      properties: 'Rápido. Pero puede deslizar si hay sacudidas.',
      category: 'Nudos'
    }
  ],
  prioridades: [
    {
      id: 'p1',
      title: 'Sin Gobierno (NUC)',
      symbol: '🔴\n🔴',
      description: 'Sin gobierno por circunstancias excepcionales (avería, etc).',
      marks: 'Diurna: Dos bolas negras. Luces: Dos rojas en vertical.',
      maneuver: 'PREFERENCIA ABSOLUTA. El resto se apartan.',
      category: 'Prioridad 1'
    },
    {
      id: 'p2',
      title: 'Maniobra Restringida (RAM)',
      symbol: '🔴\n⚪\n🔴',
      description: 'Dedicado a trabajos (cables, dragado, etc) que limitan su capacidad de maniobrar.',
      marks: 'Diurna: Bola-Rombo-Bola. Luces: Roja-Blanca-Roja en vertical.',
      maneuver: 'Preferencia sobre Pesca, Vela y Motor.',
      category: 'Prioridad 2'
    },
    {
      id: 'p3',
      title: 'Condicionado por Calado (CBD)',
      symbol: '⬛',
      description: 'Debido a su gran calado solo puede navegar por un canal angosto.',
      marks: 'Diurna: Un cilindro negro. Luces: Tres rojas en vertical (🔴🔴🔴).',
      maneuver: 'Prioridad sobre Pesca, Vela y Motor.',
      category: 'Prioridad 3'
    },
    {
      id: 'p4',
      title: 'Pesca',
      symbol: '▼\n▲',
      description: 'Buque dedicado a la pesca que restringe su maniobra (no curricán).',
      marks: 'Diurna: Dos conos por sus vértices superpuestos. Luces: Blanca sobre Roja.',
      maneuver: 'Preferencia sobre Vela y Motor.',
      category: 'Prioridad 4'
    },
    {
      id: 'p5',
      title: 'Vela',
      symbol: '⛵',
      description: 'Buque navegando exclusivamente a vela.',
      marks: 'Diurna: Cono hacia abajo. Luces: Costados y Alcance.',
      maneuver: 'Preferencia sobre Motor.',
      category: 'Prioridad 5'
    },
    {
      id: 'p6',
      title: 'Propulsión Mecánica',
      symbol: '🚢',
      description: 'Cualquier buque movido por máquinas.',
      marks: 'Diurna: Ninguna. Luces: Topes, Costados y Alcance.',
      maneuver: 'Se mantendrá apartado de todos los anteriores.',
      category: 'Prioridad 6'
    }
  ],
  balizamiento: [
    {
      id: 'ia1',
      title: 'Lateral Estribor',
      symbol: '🟢',
      description: 'Marca el límite de estribor del canal (entrando).',
      buoyColor: 'Verde 🟢',
      topMark: 'Cilindro verde',
      lightRitmo: 'Cualquier ritmo excepto Gp(2+1)',
      category: 'Sistema IALA A'
    },
    {
      id: 'ia2',
      title: 'Lateral Babor',
      symbol: '🔴',
      description: 'Marca el límite de babor del canal (entrando).',
      buoyColor: 'Rojo 🔴',
      topMark: 'Cono rojo',
      lightRitmo: 'Cualquier ritmo excepto Gp(2+1)',
      category: 'Sistema IALA A'
    },
    {
      id: 'ia2-1',
      title: 'Canal Principal a Estribor',
      symbol: '🟢\n🔴\n🟢',
      description: 'Canal preferido por estribor (Región A).',
      buoyColor: 'Verde con franja ancha Roja.',
      topMark: 'Cilindro verde',
      lightRitmo: 'Luz Verde: Gp(2+1)',
      category: 'Sistema IALA A'
    },
    {
      id: 'ia2-2',
      title: 'Canal Principal a Babor',
      symbol: '🔴\n🟢\n🔴',
      description: 'Canal preferido por babor (Región A).',
      buoyColor: 'Rojo con franja ancha Verde.',
      topMark: 'Cono rojo',
      lightRitmo: 'Luz Roja: Gp(2+1)',
      category: 'Sistema IALA A'
    },
    {
      id: 'ia3',
      title: 'Cardinal Norte',
      symbol: '▲\n▲',
      description: 'Aguas navegables al Norte de la marca.',
      buoyColor: 'Negro sobre Amarillo.',
      topMark: 'Dos conos negros hacia arriba.',
      lightRitmo: 'Centelleo Rápido Continuo (Q)',
      category: 'Sistema IALA A'
    },
    {
      id: 'ia4',
      title: 'Cardinal Sur',
      symbol: '▼\n▼',
      description: 'Aguas navegables al Sur de la marca.',
      buoyColor: 'Amarillo sobre Negro.',
      topMark: 'Dos conos negros hacia abajo.',
      lightRitmo: '6 centelleos + 1 largo (Q(6)+LFl)',
      category: 'Sistema IALA A'
    },
    {
      id: 'ia5',
      title: 'Cardinal Este',
      symbol: '▲\n▼',
      description: 'Aguas navegables al Este de la marca.',
      buoyColor: 'Negro con franja amarilla.',
      topMark: 'Conos opuestos por la base (Rombo).',
      lightRitmo: '3 centelleos (Q(3))',
      category: 'Sistema IALA A'
    },
    {
      id: 'ia6',
      title: 'Cardinal Oeste',
      symbol: '▼\n▲',
      description: 'Aguas navegables al Oeste de la marca.',
      buoyColor: 'Amarillo con franja negra.',
      topMark: 'Conos opuestos por el vértice (Copa).',
      lightRitmo: '9 centelleos (Q(9))',
      category: 'Sistema IALA A'
    },
    {
      id: 'ia7',
      title: 'Peligro Aislado',
      symbol: '●\n●',
      description: 'Peligro de extensión limitada rodeado de aguas navegables.',
      buoyColor: 'Negro con franjas horizontales rojas.',
      topMark: 'Dos esferas negras superpuestas.',
      lightRitmo: 'Blanca: Gp(2) destellos.',
      category: 'Sistema IALA A'
    },
    {
      id: 'ia8',
      title: 'Aguas Navegables',
      symbol: '🔴\n⚪',
      description: 'Aguas libres a su alrededor (eje del canal).',
      buoyColor: 'Franjas verticales Rojas y Blancas.',
      topMark: 'Esfera roja.',
      lightRitmo: 'Blanca: Isofásica, Ocultaciones o Morse "A".',
      category: 'Sistema IALA A'
    },
    {
      id: 'ia9',
      title: 'Marcas Especiales',
      symbol: '✖️',
      description: 'Zonas especiales (ODAS, militares, cables).',
      buoyColor: 'Totalmente Amarilla.',
      topMark: 'Marca en forma de "X" amarilla.',
      lightRitmo: 'Amarilla: Cualquier ritmo no usado.',
      category: 'Sistema IALA A'
    }
  ],
  beaufort: [
    { id: 'be0', symbol: '🌅', title: '0 - Calma', description: '0-1 nudos. Mar como un espejo.', category: 'Escala' }
  ]
};
