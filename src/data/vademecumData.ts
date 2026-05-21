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
  velocity?: string;
  utility?: string;
  properties?: string;
  lights?: string;
  marks?: string;
  maneuver?: string;
  buoyColor?: string;
  topMark?: string;
  lightRitmo?: string;
  isSpherical?: boolean; // Nueva bandera para la forma
  isStriped?: boolean;   // Nueva bandera para franjas verticales
  colorTop?: string;
  colorMiddle?: string;
  colorBottom?: string;
}

export const VADEMECUM_DATA: Record<string, VademecumItem[]> = {
  banderas: [
    { id: 'alfa', title: 'Alfa', category: 'banderas', description: 'Tengo buzo sumergido; manténgase alejado de mí y a poca velocidad.', morse: '• —', color: 'bg-gradient-to-r from-blue-600 via-blue-600 to-white to-50%', visual: 'Dividida verticalmente: Azul a la izquierda, Blanco a la derecha con corte en V.' },
    { id: 'bravo', title: 'Bravo', category: 'banderas', description: 'Estoy cargando, descargando o transportando mercancías peligrosas.', morse: '— • • •', color: 'bg-red-600', visual: 'Bandera totalmente Roja con corte de cola de golondrina (en V).' },
    { id: 'charlie', title: 'Charlie', category: 'banderas', description: 'Sí. Afirmativo.', morse: '— • — •', color: 'bg-gradient-to-b from-blue-600 via-white via-red-600 via-white to-blue-600', visual: 'Cinco franjas horizontales simétricas: Azul, Blanco, Rojo, Blanco, Azul.' },
    { id: 'delta', title: 'Delta', category: 'banderas', description: 'Manténgase alejado; maniobro con dificultad.', morse: '— • •', color: 'bg-gradient-to-b from-yellow-400 via-blue-600 to-yellow-400', visual: 'Tres franjas horizontales: Amarillo, Azul grueso central, Amarillo.' },
    { id: 'echo', title: 'Echo', category: 'banderas', description: 'Caigo a estribor.', morse: '•', color: 'bg-gradient-to-b from-blue-600 to-red-600 to-50%', visual: 'Dos franjas horizontales iguales: Azul arriba, Rojo abajo.' },
    { id: 'foxtrot', title: 'Foxtrot', category: 'banderas', description: 'Tengo avería; comuníquese conmigo.', morse: '• • — •', color: 'bg-white border-4 border-red-500', visual: 'Fondo Blanco con un rombo Rojo central que toca los extremos.' },
    { id: 'golf', title: 'Golf', category: 'banderas', description: 'Necesito práctico. (Pesqueros: Estoy cobrando redes).', morse: '— — •', color: 'bg-gradient-to-r from-yellow-400 via-blue-600 via-yellow-400 via-blue-600 to-yellow-400', visual: 'Seis franjas verticales alternas de color Amarillo y Azul.' },
    { id: 'hotel', title: 'Hotel', category: 'banderas', description: 'Tengo práctico a bordo.', morse: '• • • •', color: 'bg-gradient-to-r from-white via-white to-red-600 to-50%', visual: 'Dividida verticalmente: Blanco a la izquierda, Rojo a la derecha.' },
    { id: 'india', title: 'India', category: 'banderas', description: 'Caigo a babor.', morse: '• •', color: 'bg-yellow-400 relative after:absolute after:w-4 after:h-4 after:bg-black after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2', visual: 'Fondo Amarillo con un disco circular Negro en el centro.' },
    { id: 'juliett', title: 'Juliett', category: 'banderas', description: 'Tengo un incendio a bordo y llevo mercancías peligrosas; manténgase alejado.', morse: '• — — —', color: 'bg-gradient-to-b from-blue-600 via-white to-blue-600', visual: 'Tres franjas horizontales: Azul, Blanco, Azul.' },
    { id: 'kilo', title: 'Kilo', category: 'banderas', description: 'Deseo comunicarme con usted.', morse: '— • —', color: 'bg-gradient-to-r from-yellow-400 via-yellow-400 to-blue-600 to-50%', visual: 'Dividida verticalmente: Amarillo a la izquierda, Azul a la derecha.' },
    { id: 'lima', title: 'Lima', category: 'banderas', description: 'Pare su buque inmediatamente.', morse: '• — • •', color: 'bg-slate-950 grid grid-cols-2 gap-0.5 p-0.5 after:bg-yellow-400 before:bg-yellow-400', visual: 'Cuartelada en cruz: Dos cuadros Amarillos y dos Negros alternados.' },
    { id: 'mike', title: 'Mike', category: 'banderas', description: 'Mi buque está parado y sin arrancada.', morse: '— —', color: 'bg-blue-600 relative after:absolute after:inset-1 after:border-2 after:border-white after:rotate-45', visual: 'Fondo Azul con una cruz de San Andrés Blanca (aspas).' },
    { id: 'november', title: 'November', category: 'banderas', description: 'No. Negativo.', morse: '— •', color: 'bg-white grid grid-cols-4 grid-rows-4 gap-0.5 p-0.5', visual: 'Tablero de ajedrez con 16 escaques alternados Azules y Blancos.' },
    { id: 'oscar', title: 'Oscar', category: 'banderas', description: '¡Hombre al agua!', morse: '— — —', color: 'bg-gradient-to-br from-yellow-400 via-yellow-400 to-red-600 to-50%', visual: 'Dividida diagonalmente en dos triángulos: Amarillo arriba/izquierda, Rojo abajo/derecha.' },
    { id: 'papa', title: 'Papa', category: 'banderas', description: 'En puerto: Todo el personal a bordo, el buque va a salir. En la mar: Mis redes se han enganchado.', morse: '• — — •', color: 'bg-blue-600 p-2.5 flex items-center justify-center after:w-full after:h-full after:bg-white', visual: 'Fondo Azul con un cuadro Blanco más pequeño en el centro.' },
    { id: 'quebec', title: 'Quebec', category: 'banderas', description: 'Mi buque está sano y pido libre plática (despacho de aduana).', morse: '— — • —', color: 'bg-yellow-400', visual: 'Bandera totalmente Amarilla.' },
    { id: 'romeo', title: 'Romeo', category: 'banderas', description: 'Sin significado asignado de forma aislada.', morse: '• — •', color: 'bg-red-600 relative after:absolute after:w-full after:h-2 after:bg-yellow-400 after:top-1/2 after:-translate-y-1/2 before:absolute before:w-2 before:h-full before:bg-yellow-400 before:left-1/2 before:-translate-x-1/2', visual: 'Fondo Rojo con una cruz amarilla horizontal y vertical.' },
    { id: 'sierra', title: 'Sierra', category: 'banderas', description: 'Estoy dando atrás a toda fuerza.', morse: '• • •', color: 'bg-white p-2.5 flex items-center justify-center after:w-full after:h-full after:bg-blue-600', visual: 'Fondo Blanco con un cuadro Azul en el centro.' },
    { id: 'tango', title: 'Tango', category: 'banderas', description: 'Manténgase alejado; estoy pescando al arrastre en pareja.', morse: '—', color: 'bg-gradient-to-r from-red-600 via-white via-blue-600 to-blue-600', visual: 'Tres franjas verticales iguales: Roja a babor, Blanca al centro, Azul a estribor.' },
    { id: 'uniform', title: 'Uniform', category: 'banderas', description: 'Se dirige usted hacia un peligro.', morse: '• • —', color: 'bg-white grid grid-cols-2 gap-2 p-2 after:bg-red-600 before:bg-red-600', visual: 'Cuatro cuarteles simétricos: Dos Rojos y dos Blancos alternados.' },
    { id: 'victor', title: 'Victor', category: 'banderas', description: 'Necesito asistencia.', morse: '• • • —', color: 'bg-white relative after:absolute after:w-full after:h-1 after:bg-red-600 after:rotate-12', visual: 'Fondo Blanco con una cruz de San Andrés Roja en aspa.' },
    { id: 'whiskey', title: 'Whiskey', category: 'banderas', description: 'Necesito asistencia médica.', morse: '• — —', color: 'bg-blue-600 p-2 flex items-center justify-center after:w-full after:h-full after:bg-white after:p-2 after:flex after:items-center after:justify-center after:content-[""] before:w-4 before:h-4 before:bg-red-600 before:z-10', visual: 'Un cuadro Azul exterior, cuadro Blanco intermedio, cuadro Rojo central.' },
    { id: 'xray', title: 'Xray', category: 'banderas', description: 'Interrumpa sus señales y observe mis señales.', morse: '— • • —', color: 'bg-white relative after:absolute after:w-full after:h-2 after:bg-blue-600 after:top-1/2 after:-translate-y-1/2 before:absolute before:w-2 before:h-full before:bg-blue-600 before:left-1/2 before:-translate-x-1/2', visual: 'Fondo Blanco con una cruz Azul celeste.' },
    { id: 'yankee', title: 'Yankee', category: 'banderas', description: 'Estoy garreando (el ancla arrastra por el fondo).', morse: '— • — —', color: 'bg-gradient-to-tr from-yellow-400 via-red-600 via-yellow-400 via-red-600 to-yellow-400', visual: 'Franjas diagonales alternas Amarillas y Rojas.' },
    { id: 'zulu', title: 'Zulu', category: 'banderas', description: 'Necesito remolcador. (Pesqueros: Estoy calando redes).', morse: '— — • •', color: 'bg-slate-900', visual: 'Dividida en cuatro triángulos que convergen en el centro: Negro, Amarillo, Azul y Rojo.' }
  ],
  cabuyería: [
    { 
      id: 'as-de-guia', 
      title: 'As de Guía', 
      category: 'cabuyería', 
      description: 'El rey de los nudos marineros. Forma una gaza fija al final de un cabo que no se desliza ni se traba, y se deshace con extrema facilidad incluso bajo tensiones masivas.',
      steps: [
        'Pasa el chicote por el revés para formar una pequeña gaza o lazo base.',
        'Introduce el chicote de abajo hacia arriba a través de la gaza simulando "la serpiente que sale del pozo".',
        'Pasa el chicote por detrás del firme (el cuerpo principal del cabo).',
        'Introduce el chicote de vuelta en la gaza ("la serpiente vuelve a entrar al pozo") y azoca el nudo firmemente.'
      ],
      properties: 'Resistencia: Excelente // Aplicación: Amarre de drizas, amuras, salvamento de personas.'
    },
    { 
      id: 'ballestrinque', 
      title: 'Ballestrinque', 
      category: 'cabuyería', 
      description: 'Nudo de amarre rápido por excelencia. Ideal para sujetar defensas a las guardamancebos o encapillar cabos en un noray. Exige tensión continua para evitar deslices.',
      steps: [
        'Da una vuelta completa con el cabo alrededor del poste o tubo de acero.',
        'Cruza el chicote por encima de la primera vuelta formando una "X".',
        'Da una segunda vuelta y pasa el chicote por debajo de este último cruce.',
        'Tira de ambos extremos simultáneamente para bloquear el cabo bajo su propia presión.'
      ],
      properties: 'Resistencia: Media (Peligro si fluctúa la tensión) // Aplicación: Colocación de defensas, sujeción provisional.'
    },
    { 
      id: 'nudo-llano', 
      title: 'Nudo Llano o Rizo', 
      category: 'cabuyería', 
      description: 'Diseñado estrictamente para unir dos cabos de igual mena (grosor) y material. Históricamente usado para recoger los rizos de las velas mayores.',
      steps: [
        'Cruza el chicote de la izquierda sobre el de la derecha y realiza una vuelta simple.',
        'Toma el chicote derecho resultante y crúzalo sobre el izquierdo.',
        'Pásalo por dentro del bucle recién creado.',
        'Azoca el nudo. Si queda simétrico y plano, la ejecución táctica es correcta.'
      ],
      properties: 'Resistencia: Baja (Se deshace si los cabos son de diferente grosor) // Aplicación: Tomar rizos, paquetería ligera.'
    },
    { 
      id: 'nudo-en-ocho', 
      title: 'Nudo en Ocho o Lasca', 
      category: 'nudo-en-ocho', 
      description: 'Nudo de tope fundamental. Evita que las escotas, drizas o cabos de maniobra se escapen por las poleas, mordazas o guías del puente.',
      steps: [
        'Forma un seno o bucle con el chicote pasando por delante del firme.',
        'Da una vuelta completa por detrás del firme.',
        'Introduce el chicote desde arriba hacia abajo por el interior del primer bucle.',
        'Tira del firme y del chicote para conseguir la clásica forma simétrica del número 8.'
      ],
      properties: 'Resistencia: Muy Alta // Aplicación: Tope final en escotas de foque, mayor y drizas.'
    },
    { 
      id: 'vuelta-de-rezon', 
      title: 'Vuelta de Rezón', 
      category: 'cabuyería', 
      description: 'El amarre definitivo para elementos sometidos a tracción constante y humedad extrema, como el grillete de un ancla de fondeo o el cabo de un rezón.',
      steps: [
        'Da dos vueltas redondas completas alrededor de la argolla o grillete.',
        'Pasa el chicote por detrás del firme e introdúcelo por dentro de las dos vueltas iniciales.',
        'Realiza una segunda vuelta de seguridad idéntica justo por encima.',
        'Asegura el chicote sobrante al firme mediante una ligada para evitar movimientos por oleaje.'
      ],
      properties: 'Resistencia: Máxima // Aplicación: Fondeo pesado, remolques de larga duración.'
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
    { id: 'lateral-babor', title: 'Lateral Babor', category: 'balizamiento', description: 'Indica el channel navegable al entrar a puerto (dirección convencional del balizamiento) dejándolo a la banda de babor del barco.', colorTop: 'bg-green-600',  colorMiddle: 'bg-green-600',  colorBottom: 'bg-green-600', topMark: 'Cilindro Verde', buoyColor: 'Cuerpo Cilíndrico Verde', lightRitmo: 'Fl G (Destellos Verdes)' },
    { id: 'lateral-estribor', title: 'Lateral Estribor', category: 'balizamiento', description: 'Indica el channel navegable al entrar a puerto (dirección convencional del balizamiento) dejándolo a la banda de estribor del buque.', colorTop: 'bg-red-600', colorMiddle: 'bg-red-600', colorBottom: 'bg-red-600',topMark: 'Cono Rojo', buoyColor: 'Cuerpo Cónica Roja', lightRitmo: 'Fl R (Destellos Rojos)' },
    { id: 'cardinal-norte', title: 'Cardinal Norte', category: 'balizamiento', description: 'Indica que las aguas seguras y el paso profundo se encuentran al Norte de la boya. Peligro situado al Sur.', colorTop: 'bg-black', colorMiddle: 'bg-black', colorBottom: 'bg-yellow-400', topMark: '2 Conos Negros con vértices hacia ARRIBA', buoyColor: 'Negro arriba, Amarillo abajo', lightRitmo: 'Q o VQ continuo (Centelleo Blanco)' },
    { id: 'cardinal-sur', title: 'Cardinal Sur', category: 'balizamiento', description: 'Indica que las aguas transitables se encuentran al Sur de la boya. El peligro se ubica exactamente al Norte.', colorTop: 'bg-yellow-400', colorMiddle: 'bg-yellow-400', colorBottom: 'bg-black', topMark: '2 Conos Negros con vértices hacia ABAJO', buoyColor: 'Amarillo arriba, Negro abajo', lightRitmo: 'Q(6) + LFl 15s (6 centelleos + 1 destello largo)' },
    { id: 'cardinal-este', title: 'Cardinal Este', category: 'balizamiento', description: '...', colorTop: 'bg-black',  colorMiddle: 'bg-yellow-400',  colorBottom: 'bg-black', topMark: '...', },
    { id: 'cardinal-oeste', title: 'Cardinal Oeste', category: 'balizamiento', description: '...', colorTop: 'bg-yellow-400', colorMiddle: 'bg-black', colorBottom: 'bg-yellow-400', topMark: '...', },
    { id: 'peligro-aislado', title: 'Peligro Aislado', category: 'balizamiento', description: 'Se coloca directamente sobre un peligro de extensión limitada (bajo, roca, naufragio) rodeado de aguas totalmente navegables.', color: 'bg-gradient-to-b from-black via-red-600 to-black', topMark: '2 Esferas Negras en vertical 🔴/🔴', buoyColor: 'Cuerpo Negro con franjas horizontales Rojas', lightRitmo: 'Fl(2) W (Grupo de 2 destellos Blancos)' },
    { id: 'aguas-navegables',  title: 'Aguas Navegables', category: 'balizamiento', description: 'Indica que el agua alrededor es segura. Suele situarse en el centro de los canales de acceso.', isSpherical: true,   isStriped: true,  topMark: '1 Esfera Roja única 🔴', buoyColor: 'Franjas verticales Rojas y Blancas', lightRitmo: 'Iso / Occ / LFl 10s (Luz Blanca continua)' }
  ],
  beaufort: [
    { id: 'b0', title: 'Calma', category: 'beaufort', description: 'La mar está como un espejo, lisa y llana sin ningún tipo de ondulación.', symbol: '0', velocity: '0 - 1' },
    { id: 'b1', title: 'Ventolina', category: 'beaufort', description: 'El viento riza la superficie del agua ligeramente en zonas aisladas. No hay crestas.', symbol: '1', velocity: '1 - 3' },
    { id: 'b2', title: 'Flojito', category: 'beaufort', description: 'Olas pequeñas que no llegan a romper. Las crestas tienen un aspecto cristalino.', symbol: '2', velocity: '4 - 6' },
    { id: 'b3', title: 'Flojo', category: 'beaufort', description: 'Las olas empiezan a crecer. Aparecen los primeros borreguillos dispersos.', symbol: '3', velocity: '7 - 10' },
    { id: 'b4', title: 'Bonancible', category: 'beaufort', description: 'Olas ya alargadas. Los borreguillos blancos empiezan a ser bastante numerosos.', symbol: '4', velocity: '11 - 16' },
    { id: 'b5', title: 'Fresquito', category: 'beaufort', description: 'Olas moderadas con formas alargadas pronunciadas. Abundante espuma y borregos.', symbol: '5', velocity: '17 - 21' },
    { id: 'b6', title: 'Fresco', category: 'beaufort', description: 'Comienzan a formarse olas grandes. Las crestas de espuma blanca cubren extensiones amplias.', symbol: '6', velocity: '22 - 27' },
    { id: 'b7', title: 'Frescachón', category: 'beaufort', description: 'La mar ruge. La espuma empieza a ser arrastrada en hileras en la dirección del viento.', symbol: '7', velocity: '28 - 33' },
    { id: 'b8', title: 'Temporal', category: 'beaufort', description: 'Olas de gran altura. Las crestas se rompen en torbellinos y las ráfagas levantan rociones.', symbol: '8', velocity: '34 - 40' },
    { id: 'b9', title: 'Temporal Fuerte', category: 'beaufort', description: 'Olas gruesas con visibilidad mermada. El oleaje empieza a desplomarse en masas compactas.', symbol: '9', velocity: '41 - 47' },
    { id: 'b10', title: 'Temporal Duro', category: 'beaufort', description: 'Olas montañosas con largas crestas colgantes. La superficie del mar se ve completamente blanca.', symbol: '10', velocity: '48 - 55' },
    { id: 'b11', title: 'Temporal Muy Duro', category: 'beaufort', description: 'Olas excepcionalmente altas. Visibilidad severamente reducida, peligro de colapso de instrumentación.', symbol: '11', velocity: '56 - 63' },
    { id: 'b12', title: 'Temporal Huracanado', category: 'beaufort', description: 'El aire se llena de espuma y rociones. La mar está enteramente blanca y la visibilidad es nula.', symbol: '12', velocity: '64+' }
  ]
};