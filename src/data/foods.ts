import type { Food, FoodCategory, Unit } from '../types'

// Valores APROXIMADOS por 100 g (o 100 ml en bebidas). Referencias: tablas tipo USDA
// y recetas caseras típicas. Las marcas varían por sabor y presentación: si el
// empaque trae la tabla nutricional, esa manda.
type Row = [id: string, name: string, cat: FoodCategory, kcal: number, p: number, c: number, f: number, units: Unit[], alias?: string]

const u = (label: string, grams: number): Unit => ({ label, grams })

// Medidas comunes de bebidas en Honduras (1 ml ≈ 1 g).
const VASO = u('vaso', 250)
const LATA = u('lata 355 ml', 355)
const BOTELLA_600 = u('botella 600 ml', 600)
const BOTELLA_VIDRIO = u('botella de vidrio 354 ml', 354)
const CAJITA = u('cajita 200 ml', 200)
const LITRO = u('litro', 1000)

const rows: Row[] = [
  // ── Típicos hondureños ───────────────────────────────────────────────
  ['baleada-sencilla', 'Baleada sencilla (frijoles, queso, mantequilla)', 'typical', 230, 8, 30, 9, [u('baleada', 170)], 'baleadas'],
  ['baleada-huevo', 'Baleada con huevo', 'typical', 230, 9.5, 25, 10.5, [u('baleada', 210)], 'baleadas'],
  ['baleada-todo', 'Baleada con todo (huevo, aguacate, carne)', 'typical', 235, 10.5, 22, 12, [u('baleada', 260)], 'baleadas especial'],
  ['frijoles-fritos', 'Frijoles fritos / volteados', 'typical', 150, 7, 18, 5.5, [u('cucharada', 20), u('porción', 100), u('taza', 240)], 'frijoles refritos'],
  ['sopa-frijoles', 'Sopa de frijoles', 'typical', 60, 3.5, 9, 1, [u('plato', 400), u('taza', 240)]],
  ['mantequilla-crema', 'Mantequilla crema (rala)', 'typical', 200, 3, 4, 19, [u('cucharada', 15)], 'crema acida mantequilla blanca'],
  ['queso-duro', 'Queso duro / seco', 'typical', 350, 25, 2, 27, [u('tajada', 30), u('cucharada rallado', 7)], 'queso seco'],
  ['quesillo', 'Quesillo', 'typical', 300, 22, 2, 23, [u('porción', 30)]],
  ['cuajada', 'Cuajada', 'typical', 180, 13, 3, 13, [u('tajada', 40)]],
  ['platano-maduro', 'Plátano maduro frito', 'typical', 230, 1.5, 38, 9, [u('tajada', 30), u('porción', 120)], 'platano frito tajadas maduras'],
  ['tajadas', 'Tajadas de plátano verde fritas', 'typical', 310, 1.5, 45, 15, [u('tajada', 8), u('porción', 80)], 'tajaditas chips platano'],
  ['guineo-verde', 'Guineo verde cocido', 'typical', 110, 1.3, 27, 0.4, [u('guineo', 100)], 'guineitos'],
  ['pollo-chuco', 'Pollo chuco (pollo frito con tajadas)', 'typical', 210, 11, 20, 10, [u('plato', 450)], 'pollo con tajadas'],
  ['pollo-frito', 'Pollo frito empanizado', 'typical', 260, 20, 9, 16, [u('pieza', 140)], 'campero pollo rey'],
  ['carne-asada', 'Carne asada (res)', 'typical', 250, 27, 0, 15, [u('porción', 120)]],
  ['chorizo', 'Chorizo frito', 'typical', 455, 24, 2, 38, [u('chorizo', 50)]],
  ['chicharron', 'Chicharrón de cerdo', 'typical', 450, 30, 0, 36, [u('trozo', 20), u('porción', 60)]],
  ['yuca-chicharron', 'Yuca con chicharrón', 'typical', 220, 8, 22, 11, [u('plato', 350)]],
  ['plato-tipico', 'Plato típico (carne, frijoles, plátano, queso, aguacate)', 'typical', 180, 8, 18, 8.5, [u('plato', 550)]],
  ['sopa-caracol', 'Sopa de caracol', 'typical', 100, 5, 7, 6, [u('plato', 400)]],
  ['sopa-res', 'Sopa de res', 'typical', 45, 3.5, 4, 1.8, [u('plato', 450)]],
  ['sopa-mondongo', 'Sopa de mondongo', 'typical', 60, 4.5, 4, 3, [u('plato', 450)]],
  ['nacatamal', 'Nacatamal', 'typical', 210, 7, 20, 11, [u('nacatamal', 250)], 'tamal'],
  ['tamalito-elote', 'Tamalito de elote', 'typical', 190, 4, 30, 6, [u('tamalito', 100)], 'tamal de elote'],
  ['pastelito', 'Pastelito de carne', 'typical', 300, 9, 30, 16, [u('pastelito', 80)], 'empanada pastelitos'],
  ['enchilada', 'Enchilada hondureña', 'typical', 220, 9, 18, 13, [u('enchilada', 120)]],
  ['taco-hn', 'Taco hondureño (frito)', 'typical', 260, 11, 22, 14, [u('taco', 80)], 'tacos fritos'],
  ['catracha', 'Catracha (tostada con frijoles y queso)', 'typical', 270, 9, 30, 13, [u('catracha', 60)]],
  ['pupusa', 'Pupusa (queso o revuelta)', 'typical', 220, 7.5, 27, 9.5, [u('pupusa', 120)], 'pupusas'],
  ['anafre', 'Anafre (frijoles con queso fundido)', 'typical', 200, 9, 15, 11, [u('porción', 150)]],
  ['arroz-frito', 'Arroz frito con verduras', 'typical', 170, 3, 28, 5, [u('taza', 160), u('cucharada', 12)], 'arroz hondureño'],
  ['arroz-pollo', 'Arroz con pollo', 'typical', 165, 8.5, 21, 5, [u('plato', 350)]],
  ['pescado-frito', 'Pescado frito entero (estilo Yojoa)', 'typical', 230, 24, 4, 13, [u('pescado (parte comestible)', 250)], 'tilapia frita'],
  ['huevo-frito', 'Huevo frito', 'typical', 196, 13.6, 0.9, 15, [u('huevo', 46)], 'huevos estrellados'],
  ['huevo-revuelto', 'Huevos revueltos con tomate y cebolla', 'typical', 150, 10, 2.5, 11, [u('porción de 2 huevos', 120)], 'huevos rancheros'],
  ['chismol', 'Chismol', 'typical', 20, 0.8, 4, 0.2, [u('porción', 60)], 'pico de gallo'],
  ['encurtido', 'Ensalada de repollo / encurtido', 'typical', 25, 1, 5, 0.1, [u('porción', 70)], 'curtido repollo'],
  ['espagueti', 'Espagueti con salsa', 'typical', 130, 4.5, 21, 3, [u('plato', 300)], 'pasta'],
  ['hot-dog', 'Hot dog', 'typical', 290, 10, 24, 17, [u('hot dog', 100)], 'perro caliente'],
  ['sandwich', 'Sándwich de jamón y queso', 'typical', 260, 13, 28, 11, [u('sándwich', 130)]],
  ['pan-coco', 'Pan de coco', 'typical', 350, 7, 50, 13, [u('pan', 70)]],
  ['semita', 'Semita', 'typical', 390, 7, 62, 13, [u('semita', 80)]],
  ['rosquillas', 'Rosquillas', 'typical', 430, 13, 55, 18, [u('rosquilla', 12)]],
  ['tustacas', 'Tustacas', 'typical', 430, 6, 66, 16, [u('tustaca', 30)]],
  ['pan-dulce', 'Pan dulce / concha', 'typical', 370, 8, 58, 12, [u('pan', 70)]],
  ['arroz-leche', 'Arroz con leche', 'typical', 130, 3, 23, 3, [u('taza', 250)]],
  ['atol-elote', 'Atol de elote', 'typical', 95, 2.5, 18, 1.8, [u('taza', 250)], 'atole'],
  ['mango-verde', 'Mango verde (con sal y limón)', 'typical', 60, 0.8, 15, 0.4, [u('mango', 200)]],

  // ── Proteínas ────────────────────────────────────────────────────────
  ['pollo', 'Pechuga de pollo cocida', 'protein', 165, 31, 0, 3.6, [u('palma de la mano', 100), u('filete mediano', 130)]],
  ['muslo', 'Muslo de pollo sin piel cocido', 'protein', 209, 26, 0, 10.9, [u('muslo', 90)]],
  ['pollo-brasa', 'Pollo asado con piel', 'protein', 239, 27, 0, 14, [u('1/4 de pollo', 250), u('presa pequeña', 120)], 'pollo a la brasa rostizado'],
  ['huevo', 'Huevo entero cocido', 'protein', 143, 12.6, 0.7, 9.5, [u('huevo', 50)], 'huevo duro'],
  ['clara', 'Clara de huevo', 'protein', 52, 10.9, 0.7, 0.2, [u('clara', 33)]],
  ['atun', 'Atún en agua (escurrido)', 'protein', 116, 25.5, 0, 0.8, [u('lata', 120), u('1/2 lata', 60)]],
  ['res', 'Carne de res magra cocida', 'protein', 217, 26, 0, 12, [u('palma de la mano', 100), u('bistec', 150)]],
  ['molida', 'Carne molida magra cocida', 'protein', 217, 26, 0, 11.8, [u('taza', 140), u('1/2 taza', 70)]],
  ['cerdo', 'Lomo de cerdo cocido', 'protein', 143, 26, 0, 3.5, [u('palma de la mano', 100), u('chuleta', 130)]],
  ['pescado', 'Pescado blanco cocido', 'protein', 128, 26, 0, 2.7, [u('filete', 120), u('palma de la mano', 100)], 'tilapia'],
  ['salmon', 'Salmón cocido', 'protein', 206, 22, 0, 12.4, [u('filete', 120)]],
  ['camaron', 'Camarones cocidos', 'protein', 99, 24, 0.2, 0.3, [u('taza', 130), u('camarón grande', 15)]],
  ['pavo', 'Jamón de pavo', 'protein', 104, 17, 4, 2, [u('lonja', 20)]],
  ['salchicha', 'Salchicha', 'protein', 290, 11, 3, 26, [u('salchicha', 45)], 'wiener'],
  ['tofu', 'Tofu firme', 'protein', 144, 17.3, 2.8, 8.7, [u('taza en cubos', 250), u('1/2 taza', 125)]],

  // ── Lácteos ──────────────────────────────────────────────────────────
  ['yogur-griego', 'Yogur griego natural 0%', 'dairy', 59, 10.2, 3.6, 0.4, [u('pote', 170), u('taza', 245), u('cucharada', 15)]],
  ['yogur', 'Yogur natural entero', 'dairy', 61, 3.5, 4.7, 3.3, [u('taza', 245), u('vaso', 200)]],
  ['yogur-bebible', 'Yogur bebible de sabores (Sula, Leyde)', 'dairy', 80, 2.8, 13, 1.8, [u('botellita 200 ml', 200)], 'yogurt'],
  ['leche-desc', 'Leche descremada (Sula, Leyde)', 'dairy', 34, 3.4, 5, 0.1, [u('taza', 240), VASO, LITRO]],
  ['leche', 'Leche entera (Sula, Leyde, Dos Pinos)', 'dairy', 61, 3.2, 4.8, 3.3, [u('taza', 240), VASO, LITRO]],
  ['leche-choco', 'Leche con chocolate (Sula, Leyde)', 'dairy', 75, 3, 11, 2, [CAJITA, VASO], 'chocolatada'],
  ['queso-fresco', 'Queso fresco', 'dairy', 264, 18, 3, 20, [u('tajada', 30)]],
  ['queso-crema', 'Queso crema', 'dairy', 340, 6, 4, 34, [u('cucharada', 15)]],
  ['mozzarella', 'Queso mozzarella', 'dairy', 280, 28, 3, 17, [u('tajada', 25), u('1/4 taza rallado', 28)]],
  ['cottage', 'Queso cottage / requesón', 'dairy', 98, 11, 3.4, 4.3, [u('taza', 226), u('1/2 taza', 113), u('cucharada', 15)]],

  // ── Carbohidratos ────────────────────────────────────────────────────
  ['arroz', 'Arroz blanco cocido', 'carb', 130, 2.7, 28, 0.3, [u('taza', 160), u('1/2 taza', 80), u('cucharada', 12)]],
  ['arroz-int', 'Arroz integral cocido', 'carb', 123, 2.7, 25.6, 1, [u('taza', 160), u('1/2 taza', 80)]],
  ['avena', 'Avena en hojuelas (cruda)', 'carb', 389, 16.9, 66.3, 6.9, [u('taza', 80), u('1/2 taza', 40), u('cucharada', 10)], 'mosh'],
  ['pan-int', 'Pan integral / de molde', 'carb', 247, 13, 41, 3.4, [u('rebanada', 30)]],
  ['pan', 'Pan blanco / francés', 'carb', 265, 9, 49, 3.2, [u('pan', 40)], 'pan de molde bimbo'],
  ['tortilla-maiz', 'Tortilla de maíz', 'carb', 218, 5.7, 44.6, 2.9, [u('tortilla', 30)]],
  ['tortilla-trigo', 'Tortilla de harina', 'carb', 310, 8, 52, 7.5, [u('tortilla', 45), u('tortilla de baleada', 70)], 'tortilla de trigo'],
  ['arepa', 'Arepa de maíz', 'carb', 219, 4.5, 45, 2, [u('arepa mediana', 90)]],
  ['papa', 'Papa cocida', 'carb', 87, 1.9, 20, 0.1, [u('papa mediana', 150), u('papa pequeña', 90)]],
  ['camote', 'Camote cocido', 'carb', 90, 2, 20.7, 0.2, [u('camote mediano', 130), u('1/2 taza', 100)], 'batata'],
  ['yuca', 'Yuca cocida', 'carb', 125, 1, 30, 0.3, [u('trozo', 100)]],
  ['pasta', 'Fideos / pasta cocida', 'carb', 158, 5.8, 30.9, 0.9, [u('taza', 140), u('1/2 taza', 70)], 'espagueti coditos'],
  ['quinua', 'Quinua cocida', 'carb', 120, 4.4, 21.3, 1.9, [u('taza', 185), u('1/2 taza', 92)]],
  ['choclo', 'Elote / maíz', 'carb', 96, 3.4, 21, 1.5, [u('taza de granos', 145), u('elote', 100)], 'choclo mazorca'],
  ['platano-verde', 'Plátano verde cocido', 'carb', 116, 0.8, 31, 0.2, [u('1/2 plátano', 90)]],
  ['lentejas', 'Lentejas cocidas', 'carb', 116, 9, 20, 0.4, [u('taza', 200), u('1/2 taza', 100)]],
  ['frijoles', 'Frijoles parados (cocidos)', 'carb', 127, 8.7, 22.8, 0.5, [u('taza', 170), u('1/2 taza', 85), u('cucharón', 150)], 'frijoles rojos negros porotos'],
  ['garbanzos', 'Garbanzos cocidos', 'carb', 164, 8.9, 27.4, 2.6, [u('taza', 165), u('1/2 taza', 82)]],
  ['galleta-arroz', 'Galleta de arroz', 'carb', 387, 8, 81, 2.8, [u('galleta', 9)]],
  ['granola', 'Granola', 'carb', 471, 10, 64, 20, [u('1/4 taza', 30)]],
  ['cereal', 'Cereal de maíz (corn flakes)', 'carb', 357, 7.5, 84, 0.4, [u('taza', 30)]],

  // ── Grasas ───────────────────────────────────────────────────────────
  ['aceite', 'Aceite', 'fat', 884, 0, 0, 100, [u('cucharadita', 4.5), u('cucharada', 13.5)], 'aceite de oliva manteca'],
  ['palta', 'Aguacate', 'fat', 160, 2, 8.5, 14.7, [u('aguacate', 140), u('1/4 aguacate', 35), u('1/2 aguacate', 70), u('cucharada', 15)], 'palta'],
  ['mani-mant', 'Mantequilla de maní', 'fat', 588, 25, 20, 50, [u('cucharada', 16), u('cucharadita', 5)]],
  ['almendras', 'Almendras', 'fat', 579, 21, 21.6, 49.9, [u('puñado', 28), u('10 unidades', 12)]],
  ['nueces', 'Nueces', 'fat', 654, 15.2, 13.7, 65.2, [u('puñado', 28), u('mitad de nuez', 2)]],
  ['mani', 'Maní tostado', 'fat', 585, 24, 21, 50, [u('puñado', 28)], 'cacahuate'],
  ['chia', 'Semillas de chía', 'fat', 486, 16.5, 42, 30.7, [u('cucharada', 12)]],
  ['mantequilla', 'Mantequilla (de barra)', 'fat', 717, 0.9, 0.1, 81, [u('cucharadita', 5), u('cucharada', 14)], 'margarina'],
  ['mayonesa', 'Mayonesa', 'fat', 680, 1, 0.6, 75, [u('cucharada', 14)]],

  // ── Verduras ─────────────────────────────────────────────────────────
  ['ensalada', 'Ensalada (lechuga, tomate, pepino)', 'veg', 18, 1, 3.5, 0.2, [u('plato', 150), u('taza', 60)]],
  ['brocoli', 'Brócoli cocido', 'veg', 35, 2.4, 7.2, 0.4, [u('taza', 155), u('1/2 taza', 78)]],
  ['zanahoria', 'Zanahoria', 'veg', 41, 0.9, 9.6, 0.2, [u('zanahoria mediana', 60), u('taza rallada', 110)]],
  ['tomate', 'Tomate', 'veg', 18, 0.9, 3.9, 0.2, [u('tomate mediano', 120)]],
  ['lechuga', 'Lechuga', 'veg', 15, 1.4, 2.9, 0.2, [u('taza', 50)]],
  ['repollo', 'Repollo', 'veg', 25, 1.3, 5.8, 0.1, [u('taza', 90)]],
  ['pepino', 'Pepino', 'veg', 15, 0.7, 3.6, 0.1, [u('1/2 pepino', 150)]],
  ['espinaca', 'Espinaca', 'veg', 23, 2.9, 3.6, 0.4, [u('taza cruda', 30), u('taza cocida', 180)]],
  ['zapallito', 'Pataste / güisquil', 'veg', 19, 0.8, 4.5, 0.1, [u('unidad', 200), u('taza', 130)], 'chayote'],
  ['ayote', 'Ayote / calabacín', 'veg', 17, 1.2, 3.1, 0.3, [u('taza', 125)], 'zucchini zapallito'],
  ['vainitas', 'Ejotes / vainitas', 'veg', 31, 1.8, 7, 0.2, [u('taza', 100)], 'judias verdes'],
  ['champinones', 'Hongos / champiñones', 'veg', 22, 3.1, 3.3, 0.3, [u('taza', 70)]],
  ['salteado', 'Verduras salteadas', 'veg', 50, 2, 8, 1.5, [u('taza', 150)]],
  ['pimiento', 'Chile dulce / pimiento', 'veg', 31, 1, 6, 0.3, [u('unidad', 120)]],
  ['cebolla', 'Cebolla', 'veg', 40, 1.1, 9.3, 0.1, [u('1/2 cebolla', 55)]],

  // ── Frutas ───────────────────────────────────────────────────────────
  ['platano', 'Banano / guineo maduro', 'fruit', 89, 1.1, 22.8, 0.3, [u('banano mediano', 118)], 'platano'],
  ['manzana', 'Manzana', 'fruit', 52, 0.3, 13.8, 0.2, [u('manzana mediana', 180)]],
  ['naranja', 'Naranja', 'fruit', 47, 0.9, 11.8, 0.1, [u('naranja mediana', 130)]],
  ['mandarina', 'Mandarina', 'fruit', 53, 0.8, 13.3, 0.3, [u('mandarina', 88)]],
  ['fresas', 'Fresas', 'fruit', 32, 0.7, 7.7, 0.3, [u('taza', 150)]],
  ['papaya', 'Papaya', 'fruit', 43, 0.5, 10.8, 0.3, [u('taza en cubos', 145)]],
  ['pina', 'Piña', 'fruit', 50, 0.5, 13.1, 0.1, [u('taza en cubos', 165), u('rodaja', 85)]],
  ['mango', 'Mango maduro', 'fruit', 60, 0.8, 15, 0.4, [u('taza en cubos', 165), u('mango', 200)]],
  ['uvas', 'Uvas', 'fruit', 69, 0.7, 18, 0.2, [u('taza', 150)]],
  ['sandia', 'Sandía', 'fruit', 30, 0.6, 7.6, 0.2, [u('taza', 150)]],
  ['melon', 'Melón', 'fruit', 34, 0.8, 8.2, 0.2, [u('taza', 160)]],
  ['pera', 'Pera', 'fruit', 57, 0.4, 15.2, 0.1, [u('pera mediana', 180)]],
  ['arandanos', 'Arándanos', 'fruit', 57, 0.7, 14.5, 0.3, [u('taza', 148)]],
  ['nance', 'Nance', 'fruit', 73, 0.7, 17, 1.2, [u('taza', 110)]],
  ['jocote', 'Jocote', 'fruit', 75, 0.5, 19, 0.1, [u('10 jocotes', 100)]],
  ['marañon', 'Marañón (fruta)', 'fruit', 50, 0.8, 11.6, 0.1, [u('marañón', 80)]],
  ['coco', 'Coco (pulpa)', 'fruit', 354, 3.3, 15, 33, [u('trozo', 45)]],

  // ── Bebidas: jugos y frescos ─────────────────────────────────────────
  ['jugo-naturas', "Jugo Natura's (néctar)", 'drink', 55, 0.2, 13.5, 0, [CAJITA, u('lata 330 ml', 330), VASO, LITRO], 'naturas nectar durazno manzana pera mango'],
  ['jugo-leyde', 'Jugo Leyde (naranja / frutas)', 'drink', 50, 0.3, 12.5, 0, [CAJITA, VASO, LITRO], 'leyde'],
  ['jugo-sula', 'Jugo Sula (naranja / frutas)', 'drink', 48, 0.5, 11.5, 0, [CAJITA, VASO, LITRO], 'sula'],
  ['tampico', 'Tampico', 'drink', 45, 0, 11, 0, [VASO, u('botella 500 ml', 500), LITRO], 'jugo citrus'],
  ['del-valle', 'Jugo Del Valle', 'drink', 50, 0, 12.5, 0, [CAJITA, VASO, LITRO], 'nectar'],
  ['jugo-naranja', 'Jugo de naranja natural', 'drink', 45, 0.7, 10.4, 0.2, [VASO]],
  ['fresco-natural', 'Fresco natural de fruta (con azúcar)', 'drink', 45, 0.3, 11, 0, [VASO, u('pichel', 1500)], 'refresco natural limonada maracuya'],
  ['fresco-jamaica', 'Fresco de rosa de Jamaica', 'drink', 40, 0, 10, 0, [VASO], 'jamaica'],
  ['fresco-tamarindo', 'Fresco de tamarindo', 'drink', 50, 0.2, 12.5, 0, [VASO], 'tamarindo'],
  ['horchata', 'Horchata', 'drink', 55, 0.4, 12, 0.8, [VASO]],
  ['licuado', 'Licuado de banano con leche', 'drink', 75, 3, 12, 1.8, [VASO], 'batido'],
  ['agua-coco', 'Agua de coco', 'drink', 19, 0.7, 3.7, 0.2, [VASO, u('coco', 300)]],
  ['cafe', 'Café negro sin azúcar', 'drink', 2, 0.3, 0, 0, [u('taza', 240)]],
  ['cafe-azucar', 'Café con azúcar', 'drink', 13, 0.1, 3.4, 0, [u('taza', 240)], 'cafe con azucar'],
  ['cafe-leche', 'Café con leche y azúcar', 'drink', 45, 1.6, 7, 1.3, [u('taza', 240)]],
  ['agua', 'Agua', 'drink', 0, 0, 0, 0, [VASO, BOTELLA_600, LITRO]],

  // ── Bebidas: refrescos y otras ───────────────────────────────────────
  ['coca-cola', 'Coca-Cola', 'drink', 42, 0, 10.6, 0, [LATA, BOTELLA_VIDRIO, BOTELLA_600, VASO, u('litro', 1000)], 'coca refresco gaseosa soda'],
  ['coca-zero', 'Coca-Cola sin azúcar', 'drink', 0.3, 0, 0, 0, [LATA, BOTELLA_600, VASO], 'coca zero light refresco'],
  ['sprite', 'Sprite', 'drink', 38, 0, 9.6, 0, [LATA, BOTELLA_600, VASO], 'refresco gaseosa soda'],
  ['fanta', 'Fanta (naranja / uva)', 'drink', 48, 0, 12, 0, [LATA, BOTELLA_600, VASO], 'refresco gaseosa soda'],
  ['pepsi', 'Pepsi', 'drink', 43, 0, 11, 0, [LATA, BOTELLA_600, VASO], 'refresco gaseosa soda'],
  ['7up', '7Up', 'drink', 40, 0, 10, 0, [LATA, BOTELLA_600, VASO], 'seven up refresco gaseosa'],
  ['tropical', 'Tropical (uva, banana, naranja…)', 'drink', 48, 0, 12, 0, [BOTELLA_VIDRIO, BOTELLA_600, VASO], 'refresco gaseosa soda'],
  ['canada-dry', 'Canada Dry (ginger ale)', 'drink', 35, 0, 9, 0, [LATA, VASO], 'refresco'],
  ['big-cola', 'Big Cola', 'drink', 42, 0, 10.5, 0, [VASO, u('botella 3 litros', 3000)], 'refresco'],
  ['gatorade', 'Gatorade / Powerade', 'drink', 24, 0, 6, 0, [BOTELLA_600], 'bebida deportiva'],
  ['energizante', 'Bebida energizante (Red Bull, Raptor…)', 'drink', 45, 0, 11, 0, [u('lata 250 ml', 250), u('lata 473 ml', 473)], 'energy'],
  ['cerveza', 'Cerveza (Salva Vida, Imperial, Port Royal, Barena)', 'drink', 43, 0.4, 3.5, 0, [BOTELLA_VIDRIO, LATA], 'birra'],
  ['cerveza-light', 'Cerveza light', 'drink', 29, 0.2, 1.3, 0, [BOTELLA_VIDRIO, LATA]],

  // ── Suplementos ──────────────────────────────────────────────────────
  // Valores típicos de etiqueta; cada marca cambia, revisa la tuya.
  ['whey', 'Proteína whey (concentrado)', 'supplement', 400, 80, 8, 6, [u('medida (scoop)', 30)], 'proteina en polvo batido'],
  ['whey-iso', 'Proteína whey isolate', 'supplement', 370, 90, 2, 1, [u('medida (scoop)', 30)], 'proteina aislada isolatada'],
  ['proteina-vegetal', 'Proteína vegetal (arveja / soya)', 'supplement', 380, 75, 10, 6, [u('medida (scoop)', 33)], 'proteina vegana'],
  ['caseina', 'Caseína', 'supplement', 360, 80, 8, 2, [u('medida (scoop)', 33)], 'proteina nocturna'],
  ['gainer', 'Ganador de peso (mass gainer)', 'supplement', 380, 15, 75, 3, [u('medida (scoop)', 50)], 'gainer hipercalorico'],
  ['batido-rtd', 'Batido de proteína listo para tomar', 'supplement', 60, 10, 3, 1, [u('botella 330 ml', 330)], 'proteina liquida shake'],
  ['barra-proteina', 'Barra de proteína', 'supplement', 360, 30, 38, 11, [u('barra', 60)], 'protein bar'],
  ['creatina', 'Creatina monohidratada', 'supplement', 0, 0, 0, 0, [u('medida (5 g)', 5), u('cucharadita', 5)], 'creatine'],
  ['colageno', 'Colágeno hidrolizado', 'supplement', 360, 90, 0, 0, [u('medida (10 g)', 10)], 'colageno'],
  ['bcaa', 'Aminoácidos BCAA', 'supplement', 100, 25, 0, 0, [u('medida (7 g)', 7)], 'aminoacidos'],
  ['preentreno', 'Pre-entreno', 'supplement', 40, 0, 10, 0, [u('medida (scoop)', 10)], 'pre workout preentreno'],
  ['electrolitos', 'Electrolitos sin azúcar', 'supplement', 0, 0, 0, 0, [u('sobre', 5)], 'suero hidratante'],
  ['omega3', 'Omega 3 (cápsula)', 'supplement', 900, 0, 0, 100, [u('cápsula', 1.2)], 'aceite de pescado'],
  ['multivitaminico', 'Multivitamínico', 'supplement', 0, 0, 0, 0, [u('tableta', 1.5)], 'vitaminas'],
  ['vitamina-d', 'Vitamina D', 'supplement', 0, 0, 0, 0, [u('cápsula', 0.5)], 'vitaminas'],

  // ── Otros ────────────────────────────────────────────────────────────
  ['azucar', 'Azúcar', 'other', 387, 0, 100, 0, [u('cucharadita', 4)]],
  ['miel', 'Miel', 'other', 304, 0.3, 82.4, 0, [u('cucharada', 21)]],
  ['mermelada', 'Mermelada', 'other', 278, 0.4, 69, 0.1, [u('cucharada', 20)]],
  ['pizza', 'Pizza', 'other', 266, 11, 33, 10, [u('porción', 107)]],
  ['hamburguesa', 'Hamburguesa con pan', 'other', 250, 13, 24, 11, [u('hamburguesa', 220)]],
  ['papas-fritas', 'Papas fritas', 'other', 312, 3.4, 41, 15, [u('porción mediana', 117)]],
  ['chocolate', 'Chocolate oscuro 70%', 'other', 598, 7.8, 46, 43, [u('cuadradito', 10)]],
  ['helado', 'Helado', 'other', 207, 3.5, 24, 11, [u('bola', 70)], 'sorbete'],
  ['galletas', 'Galletas dulces', 'other', 480, 6, 68, 20, [u('galleta', 10)]],
  ['churros', 'Churros / bolsita de boquitas', 'other', 520, 6, 58, 30, [u('bolsita', 40)], 'boquitas snacks yummies'],
  ['hummus', 'Hummus', 'other', 166, 7.9, 14.3, 9.6, [u('cucharada', 15)]],
  ['ketchup', 'Salsa de tomate / ketchup', 'other', 112, 1.7, 25.8, 0.1, [u('cucharada', 17)]],
]

export const FOODS: Food[] = rows.map(([id, name, category, kcal, p, c, f, units, alias]) => ({
  id, name, category, kcal, p, c, f, alias, units: [...units, u('gramos / ml', 1)],
}))

export const FOOD_BY_ID: Record<string, Food> = Object.fromEntries(FOODS.map((x) => [x.id, x]))

/** Grupos para filtrar la búsqueda. */
export const FOOD_GROUPS: { key: string; label: string; cats: FoodCategory[] }[] = [
  { key: 'all', label: 'Todo', cats: [] },
  { key: 'typical', label: 'Típicos', cats: ['typical'] },
  { key: 'drink', label: 'Bebidas', cats: ['drink'] },
  { key: 'supplement', label: 'Suplementos', cats: ['supplement'] },
  { key: 'protein', label: 'Proteínas', cats: ['protein', 'dairy'] },
  { key: 'carb', label: 'Carbohidratos', cats: ['carb'] },
  { key: 'plants', label: 'Frutas y verduras', cats: ['fruit', 'veg'] },
]

// Quita tildes, apóstrofes y signos: "Natura's" se encuentra escribiendo "naturas".
const normalize = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ ]/g, '')

export function searchFoods(q: string, group = 'all'): Food[] {
  const cats = FOOD_GROUPS.find((g) => g.key === group)?.cats ?? []
  const pool = cats.length ? FOODS.filter((x) => cats.includes(x.category)) : FOODS
  const words = normalize(q.trim()).split(/\s+/).filter(Boolean)
  if (!words.length) return pool
  const matches = pool.filter((x) => {
    const hay = normalize(`${x.name} ${x.alias ?? ''}`)
    return words.every((w) => hay.includes(w))
  })
  // Cuanto antes aparece lo buscado en el nombre, más arriba: "Jugo Leyde" antes que "Leche (Sula, Leyde)".
  const rank = (x: Food) => {
    const i = normalize(x.name).indexOf(words[0])
    return i === -1 ? 999 : i
  }
  return matches.sort((a, b) => rank(a) - rank(b))
}
