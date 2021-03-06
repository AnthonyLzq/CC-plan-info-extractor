import fs from 'fs'
import colors from 'colors'

interface ICleanProps {
  positionEndSlice? : number
  positionStartSlice: number
  text              : string
}

const replacer = (str: string): string => ` ${str} `

const replacerYBegin = (str: string): string => `${str[0]} ${str.slice(1)}`

const cleaner = (str: string): string => str
  .replace(/:/g, '')
  .replace(/comooptimizar/g, 'cómo optimizar')
  .replace(/SistemasOperativo/g, 'Sistemas Operativos')
  .replace(/paracrear/g, 'para crear')
  .replace(/elegirun/g, 'elegir un')
  .replace(/deresultados/g, 'de resultados')
  .replace(/unsistema/g, 'un sistema')
  .replace(/estadísticay/g, 'estadística y')
  .replace(/dealtas/g, 'de altas')
  .replace(/altadisponibilidad/g, 'alta disponibilidad')
  .replace(/basadosen/g, 'basados en')
  .replace(/oprocesamiento/g, 'o procesamiento')
  .replace(/accesoa/g, 'acceso a')
  .replace(/búsquedaavanzada/g, 'búsqueda avanzada')
  .replace(/delconocimiento/g, 'del conocimiento')
  .replace(/matemáticasapropiadas/g, 'matemáticas apropiadas')
  .replace(/ladisciplina/g, 'la disciplina')
  .replace(/tiemporeal/g, 'tiempo real')
  .replace(/personaordenador/g, 'persona ordenador')
  .replace(/ensu/g, 'en su')
  .replace(/deluso/g, 'del uso')
  .replace(/díade/g, 'día de')
  .replace(/deprocesamiento/g, 'de procesamiento')
  .replace(/automáticade/g, 'automática de')
  .replace(/tareade/g, 'tarea de')
  .replace(/basadoen/g, 'basado en')
  .replace(/usarpara/g, 'usar para')
  .replace(/lainformática/g, 'la informática')
  .replace(/arquitecturasubyacente/g, 'arquitectura subyacente')
  .replace(/orientadoa/g, 'orientado a')
  .replace(/\by[a-zA-ZÁ-ÿ\u00f1\u00d1]+/g, replacerYBegin)
  .replace(
    /programación|estándares|herramientas|aspectos|programas|aplicaciones|algoritmos|Estructuras|estructuras|permitan|problemas|objetos|digitales|Comunicación|comunicación|estudiantes|datos|básicos|nivel|representaciones|herramienta|como|técnicas|implementar|principios|estudio|métodos|computacional|serán|cualquier|optimización|grandes|áreas|diseño|enfoque|natural|recursos|interconectadas|informáticos|usuario\b|otro|está|fundamentos|profesional|temática|implementación|Computación|computación|servidor|lenguajes|computadoras|tanto|implementan|información|conocer|ensamblador|BIOS|imágenes|dirigir|mejores|análisis|internacionales|sostenibilidad|convolucionales|fundamentales|aseguramiento|cotidiana\b|básicas|máquinas|intercambiando|interrupciones|claves|existir|definiendo|utilización|identificando|asociadas|influencia|Algorítmica|diversos|ingeniería|comprometiéndose|conlleve|crítica|confiabilidad|funcionamiento|predefinidas|organizadores|necesarias|sistemas|Sistemas|Sistema|operativos|Operativos|software|desarrollo|mecanismos|gestión|administración|formulación|definición|computabilidad|árboles|construcción|creativamente|resolución|tridimensionales|involucrados|arquitecturas|más|ataques|características|estudiarán|distribuidos|personas|interactivos|relación|accesibilidad|lugares|perspectivas|diferentes|prestaciones|Cloud|respectivos|algunos|archivos|costes|patrones|útiles\)|utilizar|resultaría|evolutiva|metaheurísticas|soluciones|abordar|utilizando|flexibilidad|puedan|dinámicas|excepciones|Java|distribución|almacenamiento|entradas|circulares|apuntadores|Ethernet|identificación|Enrutamiento|enrutamiento|Conexiones|Transporte|redes|nombres|Correo|correo|registros|Flujo|Simétrica|Digitales|privadas|Autentificación|Grafos|Regulares|Ecuaciones|Sumador|Determinísticos|transición|Derivación|Eliminación|Recurrencia|Análisis|Algoritmos|Casos|Etapas|Procesos|instalación|optimalidad|condiciones|variables|diferenciales|Internet|PHP|seguimiento|simples|Iluminación|subdivisión|Críticas|virtuales|Recursos|localización|Aprendizaje|jerarquías|Big Data|paramétrico|necesidades|Lambdoop|analytics|Lambda|Swarm|organización|Fingerprinting|CLUSTAL|Neighbor|proteínas|Certificación|organizativos|Progresiva|Evaluación|evaluación|scripts|metodologías|independientes|léxicos|Familia|interrupción|80x86|programable|tuplas|binarias|decibilidad|Science|Learning|Programming|Peruana|Functional|Annual|Symposium|CRC|Arpaci|fundamentals|Reverté|Morgan|Datos|Publishing|Computers|edición|Edición|Prentice|Administration|Linux|Jeff|Analysis|Zaragoza|Structures|Hall|Servicio”|Introduction|“Elements|International|MIT|Complutense|edition|Edition|Approach|Patterns|Wiley|Optimization|Applications|Users’|University|Portable|Professional|Artech|Barcelona|Wires|Worlds|Company|Controlling|Penetración|síntesis|Interamericana|Beale|Interaction|Practical|Models|Designing|Usability|usability|Investigación|Síntesis|Mexicana|Rajkimar|Development|Mahmood|Bunch|Ramachandran|minería|Concepts|printing|ISBN|Data-Intensive|prácticas|Gobierno|Institute|INSTITUTE|ONGEI|Contraloría|Laboratory|Enfoque|Capability|Principios|Thomson|Iberoamericana|Implementación|Elements|Springer|convolutional|visual|confidence|losses/g,
    replacer
  )
  .replace(/tipo \d/g, (v: string): string => `${v}:`)
  .replace(/(\by a\b)/g, 'ya')
  .replace(/servidor es/g, 'servidores')
  .replace(/funcionalen/g, 'funcional en')
  .replace(/Nacionalde/g, 'Nacional de')
  .replace(/“CS231nConvolutional/g, '“CS231n: Convolutional')
  .replace(/Generalde/g, 'General de')
  .replace(/laauditoría/g, 'la auditoría')
  .replace(/deEstadística/g, 'de Estadística')
  .replace(/decurso/g, 'de curso')
  .replace(/HumanElement/g, 'Human Element')
  .replace(/unrobot/g, 'un robot')
  .replace(/inData/g, 'in Data')
  .replace(/deuna/g, 'de una')
  .replace(/&Sons/g, '& Sons')
  .replace(/Hill1994/g, 'Hill 1994')
  .replace(/deMéxico/g, 'de México')
  .replace(/andPractice/g, 'and Practice')
  .replace(/ALA MINERÍA/g, 'A LA MINERÍA')
  .replace(/Politécnicade/g, 'Politécnica de')
  .replace(/- Wiley /g, '- Wiley')
  .replace(/toGUI/g, 'to GUI')
  .replace(/Hall \/ CRC/g, 'Hall/CRC')
  .replace(/\/ Prentice/g, '/Prentice')
  .replace(/ MIT NICK, K\./g, 'MIT NICK, K.')
  .replace(/synthesis \/ MichaelF./g, 'synthesis/Michael F.')
  .replace(/Publicadopor/g, 'Publicado por')
  .replace(/porMcGraw/g, 'por McGraw')
  .replace(/porOsborne/g, 'por Osborne')
  .replace(/Architecture\(/g, 'Architecture (')
  .replace(/cual utilizar á/g, 'cual utilizará')
  .replace(/deCMMI/g, 'de CMMI')
  .replace(/ade lantada/g, 'adelantada')
  .replace(/deentrenamiento/g, ' de entrenamiento')
  .replace(/Propiedadesinvarianza/g, 'Propiedades: invarianza')
  .replace(/\( análisis/g, '(análisis')
  .replace(/enmicroprocesador/g, 'en microprocesador')
  .replace(/mínimoy/g, 'mínimo y')
  .replace(/Re construcción/g, 'Reconstrucción')
  .replace(/alineamientode/g, 'alineamiento de')
  .replace(/combinarprocesamientoen/g, 'combinar procesamiento en')
  .replace(/pérdida\(/g, 'pérdida (')
  .replace(/Povrayy/g, 'Povray y')
  .replace(/lo como ción/g, 'locomoción')
  .replace(/laNube/g, 'la Nube')
  .replace(/concurrentey/g, 'concurrente y')
  .replace(/deconcurrencia/g, 'de concurrencia')
  .replace(/ejemploel/g, 'ejemplo el')
  .replace(/cliente- servidor/g, 'cliente-servidor')
  .replace(/algoque/g, 'algo que')
  .replace(/dependendeltiempo/g, 'dependen del tiempo')
  .replace(/dePDEs/g, 'de PDEs')
  .replace(/está ticas/g, 'estáticas')
  .replace(/temática s/g, 'temáticas')
  .replace(/Ma temáticas/g, 'Matemáticas')
  .replace(/cabode/g, 'cabo de')
  .replace(/proyectofinal/g, 'proyecto final')
  .replace(/tienea/g, 'tiene a')
  .replace(/Administradorde/g, 'Administrador de')
  .replace(/deInternet/g, 'de Internet')
  .replace(/lasestrategias/g, 'las estrategias')
  .replace(/contextoasí/g, 'contexto así')
  .replace(/particularuna/g, 'particular una')
  .replace(/lamatemática/g, 'la matemática')
  .replace(/nivel esde/g, 'niveles de')
  .replace(/estaciencia/g, 'la ciencia')
  .replace(/puedarealizar/g, 'pueda realizar')
  .replace(/implementan do/g, 'implementando')
  .replace(/estudiany/g, 'estudian y')
  .replace(/demedio/g, 'de medio')
  .replace(/estrategiasde/g, 'estrategias de')
  .replace(/delsubsistema/g, 'del subsistema')
  .replace(/enla/g, 'en la')
  .replace(/dedispositivo/g, 'de dispositivo')
  .replace(/complementacon/g, 'complementa con')
  .replace(/busese/g, 'buses e')
  .replace(/deeplearning/g, 'deep learning')
  .replace(/dedominios/g, 'de dominios')
  .replace(/quees/g, 'que es')
  .replace(/redesneuronales/g, 'redes neuronales')
  .replace(/partirde/g, 'partir de')
  .replace(/pararesolver/g, 'para resolver')
  .replace(/dealto/g, 'de alto')
  .replace(/Elaprendizajeprofundo/g, 'El aprendizaje profundo')
  .replace(/laspropiedades/g, 'las propiedades')
  .replace(/nosupervisados/g, 'no supervisados')
  .replace(/elproceso/g, 'el proceso')
  .replace(/talleren/g, 'taller en')
  .replace(/trabajoe/g, 'trabajo e')
  .replace(/larotación/g, 'la rotación')
  .replace(/completarsu/g, 'completar su')
  .replace(/contextocientífico/g, 'contexto científico')
  .replace(/trataránlos/g, 'tratarán los')
  .replace(/laCalidad/g, 'la Calidad')
  .replace(/ofreceuna/g, 'ofrece una')
  .replace(/secuenciasde/g, 'secuencias de')
  .replace(/deauditoría/g, 'de auditoría')
  .replace(/continúacon/g, 'continúa con')
  .replace(/posteriormenteen/g, 'posteriormente en')
  .replace(/enfenómenos/g, 'en fenómenos')
  .replace(/secentra/g, 'se centra')
  .replace(/resultadosy/g, 'resultados y')
  .replace(/haráprincipalmente/g, 'hará principalmente')
  .replace(/principalde/g, 'principal de')
  .replace(/ellosse/g, 'ello se')
  .replace(/tecnologías/g, ' tecnologías ')
  .replace(/tecnologías hardware/g, 'tecnologías, hardware')
  .replace(/conel/g, 'con el')
  .replace(/nospermita/g, 'nos permita')
  .replace(/hanexperimentado/g, 'han experimentado')
  .replace(/laInteligencia/g, 'la Inteligencia')
  .replace(/entrarmucho/g, 'entrar mucho')
  .replace(/parala/g, 'para la')
  .replace(/porDarwin/g, 'por Darwin')
  .replace(/estoscientíficos/g, 'estos científicos')
  .replace(/mencionarbrevemente/g, 'mencionar brevemente')
  .replace(/”y/g, '” y')
  .replace(/bioinspirados/g, 'bio inspirados')
  .replace(/deenjambres/g, 'de enjambres')
  .replace(/asignaturasde/g, 'asignaturas de')
  .replace(/parael/g, 'para el')
  .replace(/nuevascorrelaciones/g, 'nuevas correlaciones')
  .replace(/dedata/g, 'de data')
  .replace(/incluyendoaquellos/g, 'incluyendo aquellos')
  .replace(/BigData/g, 'Big Data')
  .replace(/ruedasautónomos/g, 'ruedas autónomos')
  .replace(/compuestospor/g, 'compuestos por')
  .replace(/organizacionesindependientes/g, 'organizaciones independientes')
  .replace(/Durantela/g, 'Durante la')
  .replace(/Gridha/g, 'Grid ha')
  .replace(/posiblemuchas/g, 'posible muchas')
  .replace(/tiposde/g, 'tipos de')
  .replace(/deberánpercibir/g, 'deberán percibir')
  .replace(/\)en/g, ') en')
  .replace(/conseguirdebido/g, 'conseguir debido')
  .replace(/laextracción/g, 'la extracción')
  .replace(/conjuntosde/g, 'conjuntos de')
  .replace(/términosde/g, 'términos de')
  .replace(/centrosde/g, 'centros de')
  .replace(/auna/g, 'a una')
  .replace(/novedosoque/g, 'novedoso que')
  .replace(/FogComputing/g, 'Fog Computing')
  .replace(/sensoreso/g, 'sensores o')
  .replace(/balancearlos/g, 'balancear los')
  .replace(/investigadoraen/g, 'investigadora en')
  .replace(/Cienciade/g, 'Ciencia de')
  .replace(/investigacióny/g, 'investigación y')
  .replace(/doctoralesen/g, 'doctorales en')
  .replace(/losinvestigadores/g, 'los investigadores')
  .replace(/entidadesacadémicas/g, 'entidades académicas')
  .replace(/necesidadde/g, 'necesidad de')
  .replace(/escritos\(/g, 'escritos (')
  .replace(/otalleres/g, 'o talleres')
  .replace(/lausabilidad/g, 'la usabilidad')
  .replace(/creaciónde/g, 'creación de')
  .replace(/satisfaganal/g, 'satisfagan al')
  .replace(/profundizaren/g, 'profundizar en')
  .replace(/extensiónfundamental/g, 'extensión fundamental')
  .replace(/alumnodesarrollará/g, 'alumno desarrollará')
  .replace(/previastales/g, 'previas tales')
  .replace(/subdivideen/g, 'subdivide en')
  .replace(/Porun/g, 'Por un')
  .replace(/alos/g, 'a los')
  .replace(/sincronizacióny/g, 'sincronización y')
  .replace(/comportamientointeligente/g, 'comportamiento inteligente')
  .replace(/tópicosrelacionados/g, 'tópicos relacionados')
  .replace(/complejosen/g, 'complejos en')
  .replace(/agentesinteligentes/g, 'agentes inteligente')
  .replace(/dedecisión/g, 'de decisión')
  .replace(/operacionesdel/g, 'operaciones del')
  .replace(/setrabajarán/g, 'se trabajarán')
  .replace(/tecnologíade/g, 'tecnología de')
  .replace(/tipode/g, 'tipo de')
  .replace(/modernos\(/g, 'modernos (')
  .replace(/en2D/g, 'en 2D')
  .replace(/experienciapráctica/g, 'experiencia práctica')
  .replace(/delas/g, 'de las')
  .replace(/laempresa/g, 'la empresa')
  .replace(/operativade/g, 'operativa de')
  .replace(/minimizandoriesgos/g, 'minimizando riesgos')
  .replace(/conocimientosprevios/g, 'conocimientos previos')
  .replace(/seguridadde/g, 'seguridad de')
  .replace(/proporcionarálos/g, 'proporcionará los')
  .replace(/loscampos/g, 'los campos')
  .replace(/suscapacidades/g, 'sus capacidades')
  .replace(/deemprendimiento/g, 'de emprendimiento')
  .replace(/lepondrá/g, 'le pondrá')
  .replace(/productosmultimedia/g, 'productos multimedia')
  .replace(/licenciadotiene/g, 'licenciado tiene')
  .replace(/orientadaa/g, 'orientada a')
  .replace(/problemapermite/g, 'problema permite')
  .replace(/dela/g, 'de la')
  .replace(/adecuadadivisión/g, 'adecuada división')
  .replace(/unamisma/g, 'una misma')
  .replace(/actualesson/g, 'actuales son')
  .replace(/paralelos plataformasde/g, 'paralelos: plataformas de')
  .replace(/utilicentoda/g, 'utilicen toda')
  .replace(/enpocas/g, 'en pocas')
  .replace(/cumplacuatro/g, 'cumpla cuatro')
  .replace(/propiedadesExactitud/g, 'propiedades: Exactitud')
  .replace(/resultadonumérico/g, 'resultado numérico')
  .replace(/escapaz/g, 'es capaz')
  .replace(/problemamatemáticocon/g, 'problema matemático con')
  .replace(/computacionalesrazonables/g, 'computacionales razonables')
  .replace(/entradasx\)/g, 'entradas x)')
  .replace(/precisoes/g, 'preciso es')
  .replace(/imaginartodasesta/g, 'imaginar todas estas')
  .replace(/maneraque/g, 'manera que')
  .replace(/existeuna/g, 'existe una')
  .replace(/pudiendoser/g, 'pudiendo ser')
  .replace(/usuarioscomunicándose/g, 'usuarios comunicándose')
  .replace(/\( ensamblador/g, '(ensamblador')
  .replace(/querequieren/g, 'que requieren')
  .replace(/elHardware/g, 'el Hardware')
  .replace(/deformasegura/g, 'de forma segura')
  .replace(/centralycrítico/g, 'central y crítico')
  .replace(/ciclode/g, 'ciclo de')
  .replace(/lasmétricas/g, 'las métricas')
  .replace(/deidentificar/g, 'de identificar')
  .replace(/funcionalesde/g, 'funcionales de')
  .replace(/elmode lamiento/g, 'el modelamiento')
  .replace(/seleccionary/g, 'seleccionar y')
  .replace(/apropiadosen/g, 'apropiados en')
  .replace(/capacidadde/g, 'capacidad de')
  .replace(/ofreceráuna/g, 'ofrecerá una')
  .replace(/ámbitode/g, 'ámbito de')
  .replace(/Enparticular/g, 'En particular')
  .replace(/acomplejidad/g, 'a complejidad')
  .replace(/establecela/g, 'establece la')
  .replace(/seencuentran/g, 'se encuentran')
  .replace(/usanen/g, 'usan en')
  .replace(/esun/g, 'es un')
  .replace(/definede/g, 'define de')
  .replace(/elmecanismo/g, 'el mecanismo')
  .replace(/entendiblepor/g, 'entendible por')
  .replace(/esprecisamente/g, 'es precisamente')
  .replace(/quese/g, 'que se')
  .replace(/unarama/g, 'una rama')
  .replace(/loscomputadores/g, 'los computadores')
  .replace(/habilitadopor/g, 'habilitado por')
  .replace(/enespecial/g, 'en especial')
  .replace(/paradigmade/g, 'paradigma de')
  .replace(/incorporarlosa/g, 'incorporarlos a')
  .replace(/laoperación/g, 'la operación')
  .replace(/Aplicacióny/g, 'Aplicación y')
  .replace(/delsistema/g, 'del sistema')
  .replace(/cabosesiones/g, 'cabo sesiones')
  .replace(/laaplicación/g, 'la aplicación')
  .replace(/conla/g, 'con la')
  .replace(/sinlas/g, 'sin las')
  .replace(/elalcance/g, 'el alcance')
  .replace(/hanalcanzado/g, 'han alcanzado')
  .replace(/gestionaradecuadamente/g, 'gestionar adecuadamente')
  .replace(/estructurabásica/g, 'estructura básica')
  .replace(/lafutura/g, 'la futura')
  .replace(/laevolución/g, 'la evolución')
  .replace(/esuna/g, 'es una')
  .replace(/esimportante/g, 'es importante')
  .replace(/losparadigmas/g, 'los paradigmas')
  .replace(/elestudiante/g, 'el estudiante')
  .replace(/lepermitirán/g, 'le permitirán')
  .replace(/gráficasde/g, 'gráficas de')
  .replace(/lenguajede/g, 'lenguaje de')
  .replace(/asignaturaque/g, 'asignatura que')
  .replace(/laque/g, 'la que')
  .replace(/uncientífico/g, 'un científico')
  .replace(/participantesen/g, 'participantes en')
  .replace(/decontrol/g, 'de control')
  .replace(/lamecánica/g, 'la mecánica')
  .replace(/mode lar/g, 'modelar')
  .replace(/mode la/g, 'modela')
  .replace(/diseñarformulando/g, 'diseñar formulando')
  .replace(/larealidad/g, 'la realidad')
  .replace(/clasesabstractas/g, 'clases abstractas')
  .replace(/lascolecciones/g, 'las colecciones')
  .replace(/unprograma/g, 'un programa')
  .replace(/profundidadprimero/g, 'profundidad primero')
  .replace(/interrumpenel/g, 'interrumpen el')
  .replace(/trescapas/g, 'tres capas')
  .replace(/\( backtracking/g, '(backtracking')
  .replace(/\(GUI\)/g, ' (GUI)')
  .replace(/lasbases/g, 'las bases')
  .replace(/infra estructuras/g, 'infraestructuras')
  .replace(/estudio s/g, 'estudios')
  .replace(/otro s\./g, 'otros. ')
  .replace(/ma temática/g, 'matemática')
  .replace(/otro s tipos/g, 'otros tipos')
  .replace(/otro s Fundamentos/g, 'otros Fundamentos')
  .replace(/queeres/g, 'que eres')
  .replace(/computacional mente/g, 'computacionalmente')
  .replace(/herramienta s/g, 'herramientas')
  .replace(/\/ servidor/g, '/servidor')
  .replace(/está ndares/g, 'estándares')
  .replace(/está n/g, 'están')
  .replace(/natural es/g, 'naturales')
  .replace(/natural ezaes/g, 'naturaleza es')
  .replace(/delPC/g, 'del PC')
  .replace(/explicarmatemática mente/g, 'explicar matemáticamente')
  .replace(/devisión/g, 'de visión')
  .replace(/Trabajar en equipo Participar/g, 'Trabajar en equipo: participar')
  .replace(/proyectode/g, 'proyecto de')
  .replace(/enel/g, 'en el')
  .replace(/devida/g, 'de vida')
  .replace(/paraalmacenar/g, 'para almacenar')
  .replace(/Ed /g, ' Ed: ')
  .replace(/,/g, ', ')
  .replace(/;/g, '; ')
  .replace(/ ,/g, ',')
  .replace(/ ;/g, ';')
  .replace(/\./g, '. ')
  .replace(/ \./g, '.')
  .replace(/ ”/g, '”')
  .replace(/ \)/g, ')')
  .replace(/\. \. \./g, '...')
  .replace(/  +/g, ' ')
  .replace(/matemáticas computacional es/g, 'matemáticas computacionales')
  .replace(/computacional esrazonables/g, 'computacionales razonables')
  .replace(/aspectos computacional es de/g, 'aspectos computacionales de')
  .replace(/computacional es apropiados/g, 'computacionales apropiados')
  .replace(/computacionalmente\(/g, 'computacionalmente (')
  .replace(/\(re\) utilización/g, '(re)utilización')
  .replace(/de ladministrador/g, 'del administrador')
  .replace(/cómola Web 2. 0/g, 'cómo la Web 2.0')
  .replace(/cloud computing software/g, 'cloud computing: software')
  .replace(/métodos computacional es/g, 'métodos computacionales')
  .replace(/encontradosen la natural eza/g, 'encontrados en la naturaleza')
  .replace(/entraday/g, 'entrada y')
  .replace(/en lazadas/g, 'enlazadas')
  .replace(/Mode /g, 'Mode')
  .replace(/re utilización/g, 'reutilización')
  .replace(/entreclases/g, 'entre clases')
  .replace(/Clasesabstractas/g, 'Clases abstractas')
  .replace(/datos \?/g, 'datos?')
  .replace(/cálculode/g, 'cálculo de')
  .replace(/esquemaRelacional/g, 'esquema Relacional')
  .replace(
    /El modelo relacional Conversión de E\/R/g,
    'El modelo relacional: Conversión de E/R'
  )
  .replace(
    /Normalización Dependencias de múltiple valores/g,
    'Normalización: Dependencias de múltiple valores'
  )
  .replace(/Organización de archivos 1/g, 'Organización de archivos')
  .replace(/en lazada/g, 'enlazada')
  .replace(/ejemplo\(/g, 'ejemplo (')
  .replace(/Capa de Enlace de Datos/g, 'Capa de Enlace de Datos:')
  .replace(/delospuentes/g, 'de los puentes')
  .replace(/delos servicios/g, 'de los servicios')
  .replace(/informáticay/g, 'informática y')
  .replace(/internosy/g, 'internos y')
  .replace(/permiteel/g, 'permite el')
  .replace(/calidadde/g, 'calidad de')
  .replace(/deAcceso/g, 'de Acceso')
  .replace(/\( Enrutamiento/g, '(Enrutamiento')
  .replace(/deRed/g, 'de Red')
  .replace(/controldeerrores/g, 'control de errores')
  .replace(/deprocedimiento/g, 'de procedimiento')
  .replace(/con gestión/g, 'congestión')
  .replace(/Con gestión/g, 'Congestión')
  .replace(/al retardo/g, 'al retardo:')
  .replace(
    /La Capa de Transporte El servicio del transporte/g,
    'La Capa de Transporte: El servicio del transporte'
  )
  .replace(
    /La Capa de Aplicación DNS/g,
    'La Capa de Aplicación: DNS'
  )
  .replace(
    /Introducción a la Seguridad de Redes Criptografía/g,
    'Introducción a la Seguridad de Redes: Criptografía'
  )
  .replace(/y otro s algoritmos/g, 'y otros algoritmos')
  .replace(/lamáquina/g, 'la máquina')
  .replace(/entiempo/g, 'en tiempo')
  .replace(/deRequisito/g, 'de Requisito')
  .replace(/casosprácticos/g, 'casos prácticos')
  .replace(
    /ProcesoUnificado deDesarrollo\(RUP\)/g,
    'Proceso Unificado de Desarrollo (RUP)'
  )
  .replace(
    /Desarrollo de Sistemas Orientados a Objetos/g,
    'Desarrollo de Sistemas Orientados a Objetos:'
  )
  .replace(/Luz y Color/g, 'Luz y Color:')
  .replace(/de lalineamiento/g, 'del alineamiento')
  .replace(/ya técnicas/g, 'y a técnicas')
  .replace(/JoyanesAguilar/g, 'Joyanes Aguilar')
  .replace(
    /2001http\/\/www\. brpreiss\. com\/books\/opus5\/html\/book\. htmlThompson/g,
    '2001 http//www.brpreiss.com/books/opus5/html/book.html Thompson'
  )
  .replace(/Computerarchitecture a/g, 'Computer architecture: a')
  .replace(
    /Diseño de Computadores Lainterfaz/g,
    'Diseño de Computadores La: interfaz'
  )
  .replace(/Estructuray/g, 'Estructura y')
  .replace(/architecturea/g, 'architecture a')
  .replace(/theMessage- Passing/g, 'the Message-Passing')
  .replace(/\. ,/g, '.,')
  .replace(/\. ;/g, '.;')
  .replace(/1y/g, '1 y')
  .replace(/inXML/g, 'in XML')
  .replace(/Universidadde/g, 'Universidad de')
  .replace(/2a edición /g, '2a edición')
  .replace(
    /The Art of Computer Programming /g,
    'The Art of Computer Programming'
  )
  .replace(/Versión 2\. 1/g, 'Versión 2.1')
  .replace(
    /Exposed Web 2\. 0 Web 2\. 0 SecuritySecrets and Solutions/g,
    'Exposed Web 2.0: Web 2.0 Security Secrets and Solutions'
  )
  .replace(/andConejo/g, 'and Conejo')
  .replace(/ Optimization in Engineering/g, 'Optimization in Engineering')
  .replace(
    /USA Wiley Publishing /g,
    'USA Wiley Publishing'
  )
  .replace(
    /Inteligencia Artificial Una nueva visión/g,
    'Inteligencia Artificial: Una nueva visión'
  )
  .replace(
    /Inteligencia ArtificialUn enfoque moderno/g,
    'Inteligencia Artificial: Un enfoque moderno'
  )
  .replace(
    /Artificial IntelligenceA Modern Approach Editorial Upper Saddle River, N\. J\./g,
    'Artificial Intelligence: A Modern Approach Editorial: Upper Saddle River, N. J.:'
  )
  .replace(
    /No me hagas pensar una aproximacióna la usabilidad/g,
    'No me hagas pensar: una aproximación a la usabilidad'
  )
  .replace(
    /http\/\/library\. gnome\. org\/devel\/hig-book\/stable/g,
    'http//library.gnome.org/devel/hig-book/stable'
  )
  .replace(
    /http\/\/delta\. cs\. cinvestav\. mx\/~ccoello\/compevol\/apuntes\. pdf/g,
    'http//delta.cs.cinvestav.mx/~ccoello/compevol/apuntes.pdf'
  )
  .replace(/supercomputing/g, 'supercomputing:')
  .replace(/ersion 1\. /g, 'ersion 1.')
  .replace(/17th2008/g, '17th 2008')
  .replace(/“ /g, '“')
  .trim()

const cleanGeneralInfo = ({
  text,
  positionStartSlice,
  positionEndSlice
}: ICleanProps): string => {
  if (positionEndSlice)
    text = text.slice(positionStartSlice, positionEndSlice)
  else
    text = text.slice(positionStartSlice)

  return cleaner(text)
}

const writeFile = (
  data    : string,
  filename: string
): Promise<string> => new Promise((resolve, reject) => {
  fs.writeFile(filename, data, (error: unknown): void => {
    if (error) reject(error)
    resolve('Saved successfully')
  })
})

const writeJson = (
  path   : string,
  json   : string,
  encrypt: string
): Promise<unknown> => new Promise((resolve, reject) => {
    fs.writeFile(path, json, encrypt, error => {
      if (error) reject(error)
      else resolve('Success')
    })
  })

// eslint-disable-next-line max-len
const deleteFile = (path: string): Promise<unknown> => new Promise((resolve, reject) => {
  fs.unlink(path, error => {
    if (error) reject(error)
    else resolve('Success')
  })
})

interface CliOptions {
  format           : string
  hideCursor       : boolean
  synchronousUpdate: boolean
}

const cliOptions: CliOptions = {
  format: `${colors.bold('Upload electoral roll process')} ${colors.cyan(
    '[{bar}]'
  )} ${colors.blue('{percentage}%')} | ${colors.bold(
    'Current user:'
  )} ${colors.yellow('{value}')} | ${colors.bold('Duration:')} ${colors.green(
    '{duration_formatted}'
  )}`,
  hideCursor       : true,
  synchronousUpdate: true
}

export { cleanGeneralInfo, deleteFile, writeFile, writeJson, cliOptions }
