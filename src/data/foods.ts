import type { Food, FoodCategory, Unit } from '../types'

// Valores aproximados por 100 g (fuente de referencia: tablas tipo USDA).
// Las medidas caseras permiten registrar sin balanza.
type Row = [id: string, name: string, cat: FoodCategory, kcal: number, p: number, c: number, f: number, units: Unit[]]

const u = (label: string, grams: number): Unit => ({ label, grams })

const rows: Row[] = [
  // Proteínas
  ['pollo', 'Pechuga de pollo cocida', 'protein', 165, 31, 0, 3.6, [u('palma de la mano', 100), u('filete mediano', 130)]],
  ['muslo', 'Muslo de pollo sin piel cocido', 'protein', 209, 26, 0, 10.9, [u('muslo', 90)]],
  ['pollo-brasa', 'Pollo a la brasa con piel', 'protein', 239, 27, 0, 14, [u('1/4 de pollo', 250), u('presa pequeña', 120)]],
  ['huevo', 'Huevo entero', 'protein', 143, 12.6, 0.7, 9.5, [u('huevo', 50)]],
  ['clara', 'Clara de huevo', 'protein', 52, 10.9, 0.7, 0.2, [u('clara', 33)]],
  ['atun', 'Atún en agua (escurrido)', 'protein', 116, 25.5, 0, 0.8, [u('lata', 120), u('1/2 lata', 60)]],
  ['res', 'Carne de res magra cocida', 'protein', 217, 26, 0, 12, [u('palma de la mano', 100), u('bistec', 150)]],
  ['molida', 'Carne molida magra cocida', 'protein', 217, 26, 0, 11.8, [u('taza', 140), u('1/2 taza', 70)]],
  ['cerdo', 'Lomo de cerdo cocido', 'protein', 143, 26, 0, 3.5, [u('palma de la mano', 100), u('chuleta', 130)]],
  ['pescado', 'Pescado blanco cocido', 'protein', 128, 26, 0, 2.7, [u('filete', 120), u('palma de la mano', 100)]],
  ['salmon', 'Salmón cocido', 'protein', 206, 22, 0, 12.4, [u('filete', 120)]],
  ['camaron', 'Camarones cocidos', 'protein', 99, 24, 0.2, 0.3, [u('taza', 130), u('camarón grande', 15)]],
  ['pavo', 'Jamón de pavo', 'protein', 104, 17, 4, 2, [u('lonja', 20)]],
  ['tofu', 'Tofu firme', 'protein', 144, 17.3, 2.8, 8.7, [u('taza en cubos', 250), u('1/2 taza', 125)]],
  ['whey', 'Proteína en polvo (whey)', 'protein', 400, 80, 8, 6, [u('medida (scoop)', 30)]],
  // Lácteos
  ['yogur-griego', 'Yogur griego natural 0%', 'dairy', 59, 10.2, 3.6, 0.4, [u('pote', 170), u('taza', 245), u('cucharada', 15)]],
  ['yogur', 'Yogur natural entero', 'dairy', 61, 3.5, 4.7, 3.3, [u('taza', 245), u('vaso', 200)]],
  ['leche-desc', 'Leche descremada', 'dairy', 34, 3.4, 5, 0.1, [u('taza', 240), u('vaso', 250)]],
  ['leche', 'Leche entera', 'dairy', 61, 3.2, 4.8, 3.3, [u('taza', 240), u('vaso', 250)]],
  ['queso-fresco', 'Queso fresco', 'dairy', 264, 18, 3, 20, [u('tajada', 30)]],
  ['mozzarella', 'Queso mozzarella', 'dairy', 280, 28, 3, 17, [u('tajada', 25), u('1/4 taza rallado', 28)]],
  ['cottage', 'Queso cottage / requesón', 'dairy', 98, 11, 3.4, 4.3, [u('taza', 226), u('1/2 taza', 113), u('cucharada', 15)]],
  // Carbohidratos
  ['arroz', 'Arroz blanco cocido', 'carb', 130, 2.7, 28, 0.3, [u('taza', 160), u('1/2 taza', 80), u('cucharada', 12)]],
  ['arroz-int', 'Arroz integral cocido', 'carb', 123, 2.7, 25.6, 1, [u('taza', 160), u('1/2 taza', 80)]],
  ['avena', 'Avena en hojuelas (cruda)', 'carb', 389, 16.9, 66.3, 6.9, [u('taza', 80), u('1/2 taza', 40), u('cucharada', 10)]],
  ['pan-int', 'Pan integral', 'carb', 247, 13, 41, 3.4, [u('rebanada', 30)]],
  ['pan', 'Pan francés / blanco', 'carb', 265, 9, 49, 3.2, [u('pan', 40)]],
  ['tortilla-maiz', 'Tortilla de maíz', 'carb', 218, 5.7, 44.6, 2.9, [u('tortilla', 30)]],
  ['tortilla-trigo', 'Tortilla de trigo', 'carb', 310, 8, 52, 7.5, [u('tortilla', 45)]],
  ['arepa', 'Arepa de maíz', 'carb', 219, 4.5, 45, 2, [u('arepa mediana', 90)]],
  ['papa', 'Papa cocida', 'carb', 87, 1.9, 20, 0.1, [u('papa mediana', 150), u('papa pequeña', 90)]],
  ['camote', 'Camote / batata cocido', 'carb', 90, 2, 20.7, 0.2, [u('camote mediano', 130), u('1/2 taza', 100)]],
  ['yuca', 'Yuca cocida', 'carb', 125, 1, 30, 0.3, [u('trozo', 100)]],
  ['pasta', 'Fideos / pasta cocida', 'carb', 158, 5.8, 30.9, 0.9, [u('taza', 140), u('1/2 taza', 70)]],
  ['quinua', 'Quinua cocida', 'carb', 120, 4.4, 21.3, 1.9, [u('taza', 185), u('1/2 taza', 92)]],
  ['choclo', 'Choclo / maíz', 'carb', 96, 3.4, 21, 1.5, [u('taza de granos', 145), u('mazorca', 100)]],
  ['platano-verde', 'Plátano de cocinar cocido', 'carb', 116, 0.8, 31, 0.2, [u('1/2 plátano', 90)]],
  ['lentejas', 'Lentejas cocidas', 'carb', 116, 9, 20, 0.4, [u('taza', 200), u('1/2 taza', 100)]],
  ['frijoles', 'Frijoles / porotos cocidos', 'carb', 127, 8.7, 22.8, 0.5, [u('taza', 170), u('1/2 taza', 85)]],
  ['garbanzos', 'Garbanzos cocidos', 'carb', 164, 8.9, 27.4, 2.6, [u('taza', 165), u('1/2 taza', 82)]],
  ['galleta-arroz', 'Galleta de arroz', 'carb', 387, 8, 81, 2.8, [u('galleta', 9)]],
  ['granola', 'Granola', 'carb', 471, 10, 64, 20, [u('1/4 taza', 30)]],
  ['cereal', 'Cereal de maíz (corn flakes)', 'carb', 357, 7.5, 84, 0.4, [u('taza', 30)]],
  // Grasas
  ['aceite', 'Aceite de oliva', 'fat', 884, 0, 0, 100, [u('cucharadita', 4.5), u('cucharada', 13.5)]],
  ['palta', 'Palta / aguacate', 'fat', 160, 2, 8.5, 14.7, [u('palta', 140), u('1/4 palta', 35), u('1/2 palta', 70), u('cucharada', 15)]],
  ['mani-mant', 'Mantequilla de maní', 'fat', 588, 25, 20, 50, [u('cucharada', 16), u('cucharadita', 5)]],
  ['almendras', 'Almendras', 'fat', 579, 21, 21.6, 49.9, [u('puñado', 28), u('10 unidades', 12)]],
  ['nueces', 'Nueces', 'fat', 654, 15.2, 13.7, 65.2, [u('puñado', 28), u('mitad de nuez', 2)]],
  ['mani', 'Maní tostado', 'fat', 585, 24, 21, 50, [u('puñado', 28)]],
  ['chia', 'Semillas de chía', 'fat', 486, 16.5, 42, 30.7, [u('cucharada', 12)]],
  ['mantequilla', 'Mantequilla', 'fat', 717, 0.9, 0.1, 81, [u('cucharadita', 5), u('cucharada', 14)]],
  // Verduras
  ['ensalada', 'Ensalada (lechuga, tomate, pepino)', 'veg', 18, 1, 3.5, 0.2, [u('plato', 150), u('taza', 60)]],
  ['brocoli', 'Brócoli cocido', 'veg', 35, 2.4, 7.2, 0.4, [u('taza', 155), u('1/2 taza', 78)]],
  ['zanahoria', 'Zanahoria', 'veg', 41, 0.9, 9.6, 0.2, [u('zanahoria mediana', 60), u('taza rallada', 110)]],
  ['tomate', 'Tomate', 'veg', 18, 0.9, 3.9, 0.2, [u('tomate mediano', 120)]],
  ['lechuga', 'Lechuga', 'veg', 15, 1.4, 2.9, 0.2, [u('taza', 50)]],
  ['pepino', 'Pepino', 'veg', 15, 0.7, 3.6, 0.1, [u('1/2 pepino', 150)]],
  ['espinaca', 'Espinaca', 'veg', 23, 2.9, 3.6, 0.4, [u('taza cruda', 30), u('taza cocida', 180)]],
  ['zapallito', 'Zapallito / calabacín', 'veg', 17, 1.2, 3.1, 0.3, [u('unidad', 200), u('taza', 125)]],
  ['vainitas', 'Vainitas / judías verdes', 'veg', 31, 1.8, 7, 0.2, [u('taza', 100)]],
  ['champinones', 'Champiñones', 'veg', 22, 3.1, 3.3, 0.3, [u('taza', 70)]],
  ['salteado', 'Verduras salteadas', 'veg', 50, 2, 8, 1.5, [u('taza', 150)]],
  ['pimiento', 'Pimiento', 'veg', 31, 1, 6, 0.3, [u('unidad', 120)]],
  ['cebolla', 'Cebolla', 'veg', 40, 1.1, 9.3, 0.1, [u('1/2 cebolla', 55)]],
  // Frutas
  ['platano', 'Plátano / banano', 'fruit', 89, 1.1, 22.8, 0.3, [u('plátano mediano', 118)]],
  ['manzana', 'Manzana', 'fruit', 52, 0.3, 13.8, 0.2, [u('manzana mediana', 180)]],
  ['naranja', 'Naranja', 'fruit', 47, 0.9, 11.8, 0.1, [u('naranja mediana', 130)]],
  ['mandarina', 'Mandarina', 'fruit', 53, 0.8, 13.3, 0.3, [u('mandarina', 88)]],
  ['fresas', 'Fresas', 'fruit', 32, 0.7, 7.7, 0.3, [u('taza', 150)]],
  ['papaya', 'Papaya', 'fruit', 43, 0.5, 10.8, 0.3, [u('taza en cubos', 145)]],
  ['pina', 'Piña', 'fruit', 50, 0.5, 13.1, 0.1, [u('taza en cubos', 165), u('rodaja', 85)]],
  ['mango', 'Mango', 'fruit', 60, 0.8, 15, 0.4, [u('taza en cubos', 165)]],
  ['uvas', 'Uvas', 'fruit', 69, 0.7, 18, 0.2, [u('taza', 150)]],
  ['sandia', 'Sandía', 'fruit', 30, 0.6, 7.6, 0.2, [u('taza', 150)]],
  ['pera', 'Pera', 'fruit', 57, 0.4, 15.2, 0.1, [u('pera mediana', 180)]],
  ['arandanos', 'Arándanos', 'fruit', 57, 0.7, 14.5, 0.3, [u('taza', 148)]],
  // Otros
  ['cafe', 'Café negro', 'other', 2, 0.3, 0, 0, [u('taza', 240)]],
  ['azucar', 'Azúcar', 'other', 387, 0, 100, 0, [u('cucharadita', 4)]],
  ['miel', 'Miel', 'other', 304, 0.3, 82.4, 0, [u('cucharada', 21)]],
  ['mermelada', 'Mermelada', 'other', 278, 0.4, 69, 0.1, [u('cucharada', 20)]],
  ['jugo-naranja', 'Jugo de naranja', 'other', 45, 0.7, 10.4, 0.2, [u('vaso', 250)]],
  ['gaseosa', 'Gaseosa', 'other', 41, 0, 10.6, 0, [u('vaso', 250), u('lata', 355)]],
  ['cerveza', 'Cerveza', 'other', 43, 0.5, 3.6, 0, [u('lata', 355)]],
  ['pizza', 'Pizza', 'other', 266, 11, 33, 10, [u('porción', 107)]],
  ['hamburguesa', 'Hamburguesa con pan', 'other', 250, 13, 24, 11, [u('hamburguesa', 220)]],
  ['papas-fritas', 'Papas fritas', 'other', 312, 3.4, 41, 15, [u('porción mediana', 117)]],
  ['empanada', 'Empanada de carne', 'other', 300, 10, 30, 16, [u('empanada', 120)]],
  ['chocolate', 'Chocolate oscuro 70%', 'other', 598, 7.8, 46, 43, [u('cuadradito', 10)]],
  ['helado', 'Helado', 'other', 207, 3.5, 24, 11, [u('bola', 70)]],
  ['galletas', 'Galletas dulces', 'other', 480, 6, 68, 20, [u('galleta', 10)]],
  ['hummus', 'Hummus', 'other', 166, 7.9, 14.3, 9.6, [u('cucharada', 15)]],
  ['ketchup', 'Ketchup', 'other', 112, 1.7, 25.8, 0.1, [u('cucharada', 17)]],
  ['mayonesa', 'Mayonesa', 'other', 680, 1, 0.6, 75, [u('cucharada', 14)]],
]

export const FOODS: Food[] = rows.map(([id, name, category, kcal, p, c, f, units]) => ({
  id, name, category, kcal, p, c, f, units: [...units, u('gramos', 1)],
}))

export const FOOD_BY_ID: Record<string, Food> = Object.fromEntries(FOODS.map((x) => [x.id, x]))

const normalize = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

export function searchFoods(q: string): Food[] {
  const n = normalize(q.trim())
  if (!n) return FOODS
  return FOODS.filter((x) => normalize(x.name).includes(n))
}
