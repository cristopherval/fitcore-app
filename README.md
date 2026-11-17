# Fitcore App

App web (PWA) de nutrición estilo Fitia: metas de calorías y macros, diario de comidas, plan de comidas automático y progreso de peso y agua. Pensada para usar sin balanza: todo en medidas caseras. 100 % gratis, sin servicios de pago.

## Cómo correrla

```bash
npm install
npm run dev
```

Abre la URL que aparece (`http://localhost:5173`). Para usarla en el celular, conéctalo a la misma red Wi-Fi y abre la URL de **Network** que muestra Vite.

Para instalarla como app: `npm run build` y publica la carpeta `dist/` en un hosting con HTTPS (Netlify, Vercel, Cloudflare Pages). Desde el celular, abre el sitio y elige "Agregar a la pantalla de inicio".

## Funciones

- **Perfil y metas**: calorías con Mifflin-St Jeor × nivel de actividad, ajustadas según el objetivo (−20 % para perder grasa, +10 % para ganar músculo). Proteína de 1,6–2 g/kg, grasas al 27 %, el resto en carbohidratos. Se pueden editar a mano en Ajustes.
- **Diario**: busca en ~95 alimentos con medidas caseras (taza, cucharada, palma de la mano, unidad) o registra a mano.
- **Plan de comidas**: arma desayuno, almuerzo, cena y snack que cumplen tus macros (normalmente con un error de 1–5 %) y expresa las porciones en medidas caseras.
- **Progreso**: gráficos de peso, calorías y agua.

## Estructura

| Archivo | Qué hace |
|---|---|
| `src/data/foods.ts` | Base de alimentos (valores por 100 g + medidas caseras) |
| `src/lib/nutrition.ts` | Cálculo de metas, macros y medidas caseras |
| `src/lib/planner.ts` | Generador de planes (mínimos cuadrados no negativos) |
| `src/store.ts` | Estado y guardado en el dispositivo (localStorage) |
| `src/screens/` | Pantallas |

