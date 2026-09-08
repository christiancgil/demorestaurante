# Cordillera del Sabor — Diseño del Sitio Web

## Resumen

Sitio web demo para el **Restaurante Cordillera del Sabor**, ubicado en Barrio Madelena, Bogotá. El objetivo es crear una experiencia visual de alto impacto con efecto parallax, usando el menú real del restaurante como fuente de contenido.

## Stack Tecnológico

- **Astro** — generador de sitios estáticos (HTML puro en producción, máxima velocidad)
- **GSAP + ScrollTrigger** — parallax y animaciones de scroll (estándar de industria)
- **Tailwind CSS** — estilos utilitarios sin CSS custom complejo
- Sin backend. Sin base de datos. Deploy estático.

## Información del Restaurante

| Campo | Valor |
|---|---|
| Nombre | Restaurante Cordillera del Sabor |
| Dirección | Carrera 65b #61-03 sur, Barrio Madelena |
| WhatsApp | 3103775506 |
| Servicio | Domicilios disponibles |

## Menú

### Menú del Día — $15.000
- **Entrada:** Sopa de cebada · Crema de zanahoria · Gelatina
- **Principio:** Frijol · Lenteja · Verdura fría
- **Proteína:** Carne asada o bistec · Lomo · Pollo dorado · Pechuga en salsa de tocineta
- **Bebida:** Jugo de mora · Limonada de panela

### A la Carta
- **Ejecutivos $18.000:** Carne asada · Lomo · Pechuga · Bistec a caballo · Costilla dorada a BBQ
- **Especiales $26.000:** Churrasco · Mojarra · Pechuga gratinada
- **Bandejas $31.000:** Bandeja Paisa · Bandeja 3 carnes

## Identidad Visual

### Paleta de Colores
| Token | Hex | Uso |
|---|---|---|
| `--color-bg` | `#F5EDD6` | Fondo principal beige/crema |
| `--color-primary` | `#1B4D1E` | Verde oscuro andino |
| `--color-accent` | `#C0392B` | Rojo acento |
| `--color-gold` | `#B8860B` | Dorado para precios/énfasis |
| `--color-dark` | `#2C1810` | Texto oscuro |
| `--color-white` | `#FDFAF4` | Blanco cálido |

### Tipografía
- **Dancing Script** (Google Fonts) — headings estilo script/handwriting
- **Lato** (Google Fonts) — cuerpo de texto, labels, precios

### Logo
Logo circular con montaña nevada, sombrero vueltiao, sol amarillo y círculo rojo/verde. Extraer del menú PDF o recrear como SVG.

## Secciones del Sitio

### 1. Hero (100vh)
- Fondo: imagen de paisaje andino/montañas colombianas
- Título: "Restaurante" (Lato) + "Cordillera del Sabor" (Dancing Script grande)
- Subtítulo: "Sabor de la Cordillera Colombiana — Barrio Madelena"
- CTAs: [Ver Menú] [Pedir Domicilio →]
- **Parallax:** fondo se mueve a 0.4x velocidad de scroll; elementos flotantes (especias, platos) a distintas profundidades

### 2. Menú del Día
- Tarjeta central con las 4 categorías (Entrada, Principio, Proteína, Bebida)
- Precio destacado: $15.000
- Animación: tarjeta sube desde abajo al hacer scroll

### 3. A la Carta
- 3 tarjetas: Ejecutivos · Especiales · Bandejas
- Entrada escalonada con GSAP stagger
- Hover: leve elevación/sombra

### 4. Nosotros
- Imagen a la izquierda con parallax de profundidad
- Texto a la derecha: historia del restaurante inspirada en el nombre
- Texto sugerido: "Desde las alturas de la Cordillera traemos los sabores más auténticos de Colombia a tu mesa. En el corazón del Barrio Madelena, cada plato es una celebración de nuestra cultura y tradición culinaria."

### 5. Testimonios
- Imagen grande de un plato colombiano (parallax flotante)
- 3 reseñas con avatar placeholder y nombre ficticio
- Fondo sección oscuro (`#2C1810`) para contraste

### 6. Contacto + Footer
- Dirección completa
- Botón WhatsApp (verde #25D366) con número 3103775506
- Google Maps embed (iframe) del Barrio Madelena
- Footer: logo pequeño + copyright + "Domicilios disponibles"

## Estructura de Archivos

```
demorestaurante/
  astro.config.mjs
  package.json
  tailwind.config.mjs
  tsconfig.json
  public/
    logo.png
    images/
      hero-bg.jpg
      nosotros.jpg
      food-1.jpg
      food-2.jpg
      food-3.jpg
  src/
    layouts/
      Layout.astro
    components/
      Nav.astro
      Hero.astro
      MenuDia.astro
      ALaCarta.astro
      Nosotros.astro
      Testimonios.astro
      Contacto.astro
      Footer.astro
    pages/
      index.astro
    styles/
      global.css
    scripts/
      parallax.js
```

## Criterios de Éxito

- Lighthouse Performance ≥ 90 en desktop
- Parallax fluido (60fps) en Chrome y Edge
- Responsive: mobile-first, breakpoints sm/md/lg
- WhatsApp CTA funcional con número correcto
- Todos los platos del menú visibles correctamente
