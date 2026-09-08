# Cordillera del Sabor — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir un sitio web estático demo para el Restaurante Cordillera del Sabor con efecto parallax usando Astro, GSAP ScrollTrigger y Tailwind CSS.

**Architecture:** Astro genera HTML/CSS estático en build time. GSAP ScrollTrigger se inicializa en el cliente vía `<script>` tags en cada componente Astro que lo requiera. Tailwind procesa clases en build. Sin SSR, sin API routes.

**Tech Stack:** Astro 4.x · GSAP 3.x (ScrollTrigger) · Tailwind CSS 3.x · Google Fonts (Dancing Script, Lato)

**Spec:** `docs/superpowers/specs/2026-09-07-cordillera-del-sabor-design.md`

## Global Constraints

- Node.js ≥ 18 requerido
- Astro en modo estático (`output: 'static'`)
- GSAP se carga solo en cliente (`is:inline` o `client:load`)
- Colores exactos: bg `#F5EDD6`, primary `#1B4D1E`, accent `#C0392B`, gold `#B8860B`, dark `#2C1810`, white `#FDFAF4`
- Fuentes: Dancing Script (headings), Lato (body) vía Google Fonts
- WhatsApp number: `3103775506`
- Dirección: `Carrera 65b #61-03 sur, Barrio Madelena`
- Precios: Menú del Día $15.000 · Ejecutivos $18.000 · Especiales $26.000 · Bandejas $31.000
- Mobile-first, responsive con breakpoints `sm` `md` `lg` de Tailwind
- Sin backend, sin base de datos, sin autenticación

---

## Task 1: Scaffold del Proyecto Astro

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `tsconfig.json`
- Create: `src/env.d.ts`

**Interfaces:**
- Produces: proyecto Astro funcional con Tailwind integrado, GSAP disponible como dependencia

- [ ] **Step 1: Inicializar proyecto Astro en el directorio actual**

```bash
npm create astro@latest . -- --template minimal --no-git --install --typescript strict
```

Cuando pregunte si quiere usar el directorio existente: responder `y`.

- [ ] **Step 2: Instalar dependencias adicionales**

```bash
npm install gsap @astrojs/tailwind tailwindcss
```

- [ ] **Step 3: Crear `tailwind.config.mjs`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: '#F5EDD6',
        primary: '#1B4D1E',
        accent: '#C0392B',
        gold: '#B8860B',
        dark: '#2C1810',
        'off-white': '#FDFAF4',
      },
      fontFamily: {
        script: ['"Dancing Script"', 'cursive'],
        body: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 4: Actualizar `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
})
```

- [ ] **Step 5: Verificar que el proyecto compila sin errores**

```bash
npm run build
```

Esperado: `✓ Completed in X.XXs` sin errores.

- [ ] **Step 6: Verificar dev server**

```bash
npm run dev
```

Esperado: servidor en `http://localhost:4321` con página en blanco (sin componentes aún).

- [ ] **Step 7: Commit**

```bash
git add package.json astro.config.mjs tailwind.config.mjs tsconfig.json src/
git commit -m "feat: scaffold Astro project with Tailwind and GSAP"
```

---

## Task 2: Layout Base y Estilos Globales

**Files:**
- Create: `src/layouts/Layout.astro`
- Create: `src/styles/global.css`

**Interfaces:**
- Consumes: nada (tarea inicial)
- Produces: `Layout` component con props `{ title: string }`, importable en pages

- [ ] **Step 1: Crear `src/styles/global.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-bg: #F5EDD6;
  --color-primary: #1B4D1E;
  --color-accent: #C0392B;
  --color-gold: #B8860B;
  --color-dark: #2C1810;
  --color-white: #FDFAF4;
}

html {
  scroll-behavior: smooth;
  background-color: var(--color-bg);
}

body {
  font-family: 'Lato', sans-serif;
  color: var(--color-dark);
  overflow-x: hidden;
}

h1, h2, h3 {
  font-family: 'Dancing Script', cursive;
}

::selection {
  background-color: var(--color-primary);
  color: var(--color-white);
}
```

- [ ] **Step 2: Crear `src/layouts/Layout.astro`**

```astro
---
interface Props {
  title: string
}
const { title } = Astro.props
---
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Restaurante Cordillera del Sabor — Sabor de la Cordillera Colombiana, Barrio Madelena" />
    <title>{title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&family=Lato:wght@300;400;700&display=swap" rel="stylesheet" />
    <link rel="icon" type="image/png" href="/logo.png" />
  </head>
  <body class="bg-bg text-dark">
    <slot />
  </body>
</html>
```

- [ ] **Step 3: Crear `src/pages/index.astro` temporal para verificar**

```astro
---
import Layout from '../layouts/Layout.astro'
---
<Layout title="Cordillera del Sabor">
  <h1 class="font-script text-4xl text-primary p-8">Cordillera del Sabor</h1>
  <p class="font-body text-dark p-8">Fuentes y colores funcionando.</p>
</Layout>
```

- [ ] **Step 4: Verificar en browser**

```bash
npm run dev
```

Abrir `http://localhost:4321`. Verificar:
- Fondo beige `#F5EDD6` visible
- "Cordillera del Sabor" en Dancing Script verde
- "Fuentes y colores funcionando." en Lato oscuro

- [ ] **Step 5: Commit**

```bash
git add src/layouts/Layout.astro src/styles/global.css src/pages/index.astro
git commit -m "feat: add base layout and global styles with Tailwind colors"
```

---

## Task 3: Assets — Logo e Imágenes

**Files:**
- Create: `public/logo.png`
- Create: `public/images/hero-bg.jpg`
- Create: `public/images/nosotros.jpg`
- Create: `public/images/food-1.jpg`
- Create: `public/images/food-2.jpg`
- Create: `public/images/food-3.jpg`

**Interfaces:**
- Produces: assets disponibles en URLs `/logo.png`, `/images/*.jpg`

- [ ] **Step 1: Extraer el logo del menú**

El menú está en la raíz como imagen. Usar ImageMagick para recortar la zona del logo (esquina superior izquierda, aprox 280x280px del menú 828x1080):

```bash
magick "d:\Repositorios\demorestaurante\large-thumbnail20250214-318275-1d0s7oz.mp4" -ss 0 -frames:v 1 /tmp/menu_frame.png
```

Si el menú fue compartido como imagen PNG en la conversación, guardarlo como `public/logo-source.png` y recortar:

```bash
magick "public/logo-source.png" -crop 280x280+40+40 +repage "public/logo.png"
```

**Alternativa si no hay acceso a la imagen original:** Crear un SVG placeholder del logo y guardarlo en `public/logo.svg`, referenciar ese archivo en el Layout.

- [ ] **Step 2: Obtener imágenes de food colombiana para el demo**

Descargar imágenes de Unsplash (uso libre):

```bash
# Hero background: montañas colombianas/andinas
curl -L "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1920&q=80" -o "public/images/hero-bg.jpg"

# Nosotros: restaurante/comida colombiana
curl -L "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80" -o "public/images/nosotros.jpg"

# Food items
curl -L "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80" -o "public/images/food-1.jpg"
curl -L "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80" -o "public/images/food-2.jpg"
curl -L "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80" -o "public/images/food-3.jpg"
```

- [ ] **Step 3: Verificar assets accesibles**

```bash
npm run dev
```

Navegar a `http://localhost:4321/images/hero-bg.jpg` — debe mostrar imagen.

- [ ] **Step 4: Commit**

```bash
git add public/
git commit -m "feat: add logo and placeholder food images for demo"
```

---

## Task 4: Navegación

**Files:**
- Create: `src/components/Nav.astro`

**Interfaces:**
- Produces: `<Nav />` componente sin props, sticky, con scroll suave a secciones

- [ ] **Step 1: Crear `src/components/Nav.astro`**

```astro
---
---
<nav id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 flex items-center justify-between">
  <a href="#hero" class="flex items-center gap-3 group">
    <img src="/logo.png" alt="Cordillera del Sabor" class="w-10 h-10 rounded-full object-cover" />
    <span class="font-script text-xl text-off-white group-hover:text-gold transition-colors">
      Cordillera del Sabor
    </span>
  </a>

  <ul class="hidden md:flex items-center gap-8 font-body text-sm text-off-white">
    <li><a href="#menu-dia" class="hover:text-gold transition-colors uppercase tracking-wider">Menú del Día</a></li>
    <li><a href="#a-la-carta" class="hover:text-gold transition-colors uppercase tracking-wider">A la Carta</a></li>
    <li><a href="#nosotros" class="hover:text-gold transition-colors uppercase tracking-wider">Nosotros</a></li>
    <li><a href="#contacto" class="hover:text-gold transition-colors uppercase tracking-wider">Contacto</a></li>
  </ul>

  <a
    href="https://wa.me/573103775506?text=Hola,%20quiero%20hacer%20un%20pedido"
    target="_blank"
    rel="noopener"
    class="hidden md:flex items-center gap-2 bg-accent hover:bg-red-700 text-white font-body text-sm px-4 py-2 rounded-full transition-colors"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
    Domicilios
  </a>
</nav>

<script is:inline>
  const navbar = document.getElementById('navbar')
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('bg-dark', 'shadow-lg')
      navbar.classList.remove('py-4')
      navbar.classList.add('py-2')
    } else {
      navbar.classList.remove('bg-dark', 'shadow-lg')
      navbar.classList.remove('py-2')
      navbar.classList.add('py-4')
    }
  })
</script>
```

- [ ] **Step 2: Añadir Nav a `index.astro` y verificar**

```astro
---
import Layout from '../layouts/Layout.astro'
import Nav from '../components/Nav.astro'
---
<Layout title="Cordillera del Sabor">
  <Nav />
  <div style="height: 200vh; background: linear-gradient(to bottom, #1B4D1E, #F5EDD6);">
    <p class="p-32 text-white font-script text-4xl">Scroll para probar navbar</p>
  </div>
</Layout>
```

Verificar: navbar transparente arriba, oscura al hacer scroll.

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.astro src/pages/index.astro
git commit -m "feat: add sticky navigation with scroll behavior"
```

---

## Task 5: Hero Section con Parallax

**Files:**
- Create: `src/components/Hero.astro`

**Interfaces:**
- Consumes: `/images/hero-bg.jpg`, `/logo.png`
- Produces: `<Hero />` sin props, sección `id="hero"` de 100vh

- [ ] **Step 1: Crear `src/components/Hero.astro`**

```astro
---
---
<section id="hero" class="relative h-screen overflow-hidden flex items-center justify-center">

  <!-- Fondo parallax -->
  <div
    id="hero-bg"
    class="absolute inset-0 bg-cover bg-center scale-110"
    style="background-image: url('/images/hero-bg.jpg')"
  ></div>

  <!-- Overlay oscuro para legibilidad -->
  <div class="absolute inset-0 bg-dark/60"></div>

  <!-- Elemento flotante 1: círculo dorado decorativo -->
  <div id="float-1" class="absolute top-20 right-16 w-32 h-32 rounded-full border-2 border-gold/40 opacity-60"></div>

  <!-- Elemento flotante 2: círculo rojo pequeño -->
  <div id="float-2" class="absolute bottom-32 left-24 w-16 h-16 rounded-full bg-accent/20 border border-accent/40"></div>

  <!-- Elemento flotante 3: línea decorativa -->
  <div id="float-3" class="absolute top-1/3 left-8 w-1 h-32 bg-gold/30"></div>

  <!-- Contenido principal -->
  <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
    <img
      src="/logo.png"
      alt="Logo Cordillera del Sabor"
      id="hero-logo"
      class="w-28 h-28 rounded-full object-cover mx-auto mb-6 border-4 border-gold shadow-2xl"
    />

    <p class="font-body text-gold uppercase tracking-[0.3em] text-sm mb-2">Bienvenidos al</p>

    <h1 id="hero-title" class="font-script text-6xl md:text-8xl text-off-white mb-4 leading-tight">
      Cordillera del Sabor
    </h1>

    <p class="font-body text-off-white/80 text-lg mb-10 max-w-xl mx-auto">
      Sabor auténtico de la Cordillera Colombiana · Barrio Madelena
    </p>

    <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
      <a
        href="#menu-dia"
        class="px-8 py-3 bg-primary hover:bg-green-800 text-off-white font-body uppercase tracking-wider text-sm rounded-full transition-all duration-300 hover:scale-105"
      >
        Ver Menú
      </a>
      <a
        href="https://wa.me/573103775506?text=Hola,%20quiero%20hacer%20un%20pedido"
        target="_blank"
        rel="noopener"
        class="px-8 py-3 bg-accent hover:bg-red-700 text-white font-body uppercase tracking-wider text-sm rounded-full transition-all duration-300 hover:scale-105"
      >
        Pedir Domicilio →
      </a>
    </div>
  </div>

  <!-- Flecha scroll abajo -->
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
    <svg class="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</section>

<script>
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  gsap.registerPlugin(ScrollTrigger)

  // Parallax de fondo: se mueve más lento que el scroll
  gsap.to('#hero-bg', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  })

  // Elementos flotantes a distintas velocidades
  gsap.to('#float-1', {
    y: -80,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    },
  })

  gsap.to('#float-2', {
    y: -120,
    x: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 2,
    },
  })

  gsap.to('#float-3', {
    y: -60,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  })

  // Entrada del contenido al cargar
  gsap.from('#hero-logo', { opacity: 0, y: -30, duration: 1, delay: 0.3 })
  gsap.from('#hero-title', { opacity: 0, y: 40, duration: 1.2, delay: 0.6 })
</script>
```

- [ ] **Step 2: Actualizar `index.astro` con Hero**

```astro
---
import Layout from '../layouts/Layout.astro'
import Nav from '../components/Nav.astro'
import Hero from '../components/Hero.astro'
---
<Layout title="Cordillera del Sabor">
  <Nav />
  <Hero />
  <div style="height: 100vh; background: var(--color-bg)"></div>
</Layout>
```

- [ ] **Step 3: Verificar parallax**

```bash
npm run dev
```

Abrir `http://localhost:4321` y hacer scroll. Verificar:
- Fondo se mueve más lento que el contenido
- Elementos flotantes se mueven a velocidades distintas
- Texto hero visible con contraste correcto

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro src/pages/index.astro
git commit -m "feat: add hero section with GSAP ScrollTrigger parallax"
```

---

## Task 6: Sección Menú del Día

**Files:**
- Create: `src/components/MenuDia.astro`

**Interfaces:**
- Produces: `<MenuDia />` sin props, sección `id="menu-dia"`

- [ ] **Step 1: Crear `src/components/MenuDia.astro`**

```astro
---
---
<section id="menu-dia" class="py-24 px-6 bg-bg relative overflow-hidden">

  <!-- Elemento decorativo de fondo -->
  <div class="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary/5"></div>
  <div class="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-accent/5"></div>

  <div class="max-w-5xl mx-auto">
    <!-- Encabezado -->
    <div class="text-center mb-16">
      <p class="font-body text-gold uppercase tracking-[0.3em] text-sm mb-2">Almuerzo completo</p>
      <h2 class="font-script text-5xl md:text-6xl text-primary mb-4">Menú del Día</h2>
      <div class="w-24 h-0.5 bg-gold mx-auto"></div>
    </div>

    <!-- Tarjeta del menú -->
    <div
      id="menu-card"
      class="bg-off-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl mx-auto border border-gold/20"
    >
      <!-- Header precio -->
      <div class="bg-primary text-off-white text-center py-6">
        <p class="font-body uppercase tracking-widest text-sm text-gold mb-1">Precio</p>
        <p class="font-script text-5xl">$15.000</p>
      </div>

      <!-- Categorías -->
      <div class="divide-y divide-gold/20">

        <div class="p-6 flex gap-6 items-start">
          <div class="text-2xl">🍵</div>
          <div>
            <h3 class="font-body font-bold text-primary uppercase tracking-wider text-sm mb-2">Entrada</h3>
            <ul class="font-body text-dark/80 space-y-1 text-sm">
              <li>Sopa de cebada</li>
              <li>Crema de zanahoria</li>
              <li>Gelatina</li>
            </ul>
          </div>
        </div>

        <div class="p-6 flex gap-6 items-start">
          <div class="text-2xl">🫘</div>
          <div>
            <h3 class="font-body font-bold text-primary uppercase tracking-wider text-sm mb-2">Principio</h3>
            <ul class="font-body text-dark/80 space-y-1 text-sm">
              <li>Frijol</li>
              <li>Lenteja</li>
              <li>Verdura fría</li>
            </ul>
          </div>
        </div>

        <div class="p-6 flex gap-6 items-start">
          <div class="text-2xl">🥩</div>
          <div>
            <h3 class="font-body font-bold text-primary uppercase tracking-wider text-sm mb-2">Proteína</h3>
            <ul class="font-body text-dark/80 space-y-1 text-sm">
              <li>Carne asada o bistec</li>
              <li>Lomo</li>
              <li>Pollo dorado</li>
              <li>Pechuga en salsa de tocineta</li>
            </ul>
          </div>
        </div>

        <div class="p-6 flex gap-6 items-start">
          <div class="text-2xl">🥤</div>
          <div>
            <h3 class="font-body font-bold text-primary uppercase tracking-wider text-sm mb-2">Bebida</h3>
            <ul class="font-body text-dark/80 space-y-1 text-sm">
              <li>Jugo de mora</li>
              <li>Limonada de panela</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Footer CTA -->
      <div class="bg-gold/10 text-center py-5 border-t border-gold/20">
        <p class="font-body text-sm text-dark/60 mb-3">¿Lo pedimos a tu puerta?</p>
        <a
          href="https://wa.me/573103775506?text=Hola,%20quiero%20pedir%20el%20Men%C3%BA%20del%20D%C3%ADa"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 bg-primary text-off-white font-body text-sm px-6 py-2 rounded-full hover:bg-green-800 transition-colors"
        >
          Pedir por WhatsApp
        </a>
      </div>
    </div>
  </div>
</section>

<script>
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  gsap.registerPlugin(ScrollTrigger)

  gsap.from('#menu-card', {
    opacity: 0,
    y: 60,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#menu-dia',
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
  })
</script>
```

- [ ] **Step 2: Añadir a `index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro'
import Nav from '../components/Nav.astro'
import Hero from '../components/Hero.astro'
import MenuDia from '../components/MenuDia.astro'
---
<Layout title="Cordillera del Sabor">
  <Nav />
  <Hero />
  <MenuDia />
  <div style="height: 50vh"></div>
</Layout>
```

- [ ] **Step 3: Verificar sección**

Scroll hasta la sección. Verificar que la tarjeta sube animada al entrar en viewport. Verificar todos los platos del menú presentes.

- [ ] **Step 4: Commit**

```bash
git add src/components/MenuDia.astro src/pages/index.astro
git commit -m "feat: add Menú del Día section with scroll animation"
```

---

## Task 7: Sección A la Carta

**Files:**
- Create: `src/components/ALaCarta.astro`

**Interfaces:**
- Produces: `<ALaCarta />` sin props, sección `id="a-la-carta"`

- [ ] **Step 1: Crear `src/components/ALaCarta.astro`**

```astro
---
const platos = [
  {
    categoria: 'Ejecutivos',
    emoji: '⭐',
    precio: '$18.000',
    items: ['Carne asada 🌶️', 'Lomo', 'Pechuga', 'Bistec a caballo', 'Costilla dorada a BBQ'],
    color: 'border-primary',
    badge: 'bg-primary',
  },
  {
    categoria: 'Especiales',
    emoji: '🏆',
    precio: '$26.000',
    items: ['Churrasco', 'Mojarra', 'Pechuga gratinada'],
    color: 'border-accent',
    badge: 'bg-accent',
  },
  {
    categoria: 'Bandejas',
    emoji: '🍽️',
    precio: '$31.000',
    items: ['Bandeja Paisa', 'Bandeja 3 carnes'],
    color: 'border-gold',
    badge: 'bg-gold',
  },
]
---
<section id="a-la-carta" class="py-24 px-6 bg-dark relative overflow-hidden">

  <!-- Textura de fondo sutil -->
  <div class="absolute inset-0 opacity-5"
    style="background-image: repeating-linear-gradient(45deg, #F5EDD6 0, #F5EDD6 1px, transparent 0, transparent 50%); background-size: 20px 20px;">
  </div>

  <div class="max-w-6xl mx-auto relative z-10">
    <div class="text-center mb-16">
      <p class="font-body text-gold uppercase tracking-[0.3em] text-sm mb-2">Para todos los gustos</p>
      <h2 class="font-script text-5xl md:text-6xl text-off-white mb-4">A la Carta</h2>
      <div class="w-24 h-0.5 bg-gold mx-auto"></div>
    </div>

    <div id="cartas-grid" class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {platos.map((plato, i) => (
        <div
          class={`carta-card bg-off-white/5 border-2 ${plato.color} rounded-2xl overflow-hidden backdrop-blur-sm hover:scale-105 transition-transform duration-300`}
        >
          <div class={`${plato.badge} text-off-white text-center py-4`}>
            <span class="text-3xl">{plato.emoji}</span>
            <h3 class="font-body font-bold uppercase tracking-wider text-sm mt-1">{plato.categoria}</h3>
          </div>

          <div class="p-6">
            <ul class="font-body text-off-white/80 space-y-2 text-sm mb-6">
              {plato.items.map(item => (
                <li class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div class="border-t border-gold/20 p-4 text-center">
            <p class="font-script text-3xl text-gold">{plato.precio}</p>
          </div>
        </div>
      ))}
    </div>

    <div class="text-center mt-12">
      <a
        href="https://wa.me/573103775506?text=Hola,%20quiero%20ver%20el%20men%C3%BA%20a%20la%20carta"
        target="_blank"
        rel="noopener"
        class="inline-flex items-center gap-2 border-2 border-gold text-gold hover:bg-gold hover:text-dark font-body uppercase tracking-wider text-sm px-8 py-3 rounded-full transition-all duration-300"
      >
        Consultar por WhatsApp
      </a>
    </div>
  </div>
</section>

<script>
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  gsap.registerPlugin(ScrollTrigger)

  gsap.from('.carta-card', {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#a-la-carta',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  })
</script>
```

- [ ] **Step 2: Añadir a `index.astro`**

Importar y añadir `<ALaCarta />` después de `<MenuDia />`.

- [ ] **Step 3: Verificar sección**

Verificar: 3 cards en grid, entrada escalonada al scroll, hover eleva la card, precios en dorado.

- [ ] **Step 4: Commit**

```bash
git add src/components/ALaCarta.astro src/pages/index.astro
git commit -m "feat: add A la Carta section with staggered card animations"
```

---

## Task 8: Sección Nosotros

**Files:**
- Create: `src/components/Nosotros.astro`

**Interfaces:**
- Consumes: `/images/nosotros.jpg`
- Produces: `<Nosotros />` sin props, sección `id="nosotros"`

- [ ] **Step 1: Crear `src/components/Nosotros.astro`**

```astro
---
---
<section id="nosotros" class="py-24 px-6 bg-bg relative overflow-hidden">

  <div class="max-w-6xl mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

      <!-- Imagen con parallax -->
      <div class="relative" id="nosotros-img-wrap">
        <div class="absolute -inset-4 border-2 border-gold/30 rounded-2xl"></div>
        <img
          id="nosotros-img"
          src="/images/nosotros.jpg"
          alt="Restaurante Cordillera del Sabor"
          class="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl relative z-10"
        />
        <!-- Badge flotante -->
        <div class="absolute -bottom-6 -right-6 bg-primary text-off-white rounded-2xl p-4 z-20 shadow-xl">
          <p class="font-script text-2xl">Tradición</p>
          <p class="font-body text-xs text-gold uppercase tracking-wider">Colombiana</p>
        </div>
      </div>

      <!-- Texto -->
      <div id="nosotros-text">
        <p class="font-body text-gold uppercase tracking-[0.3em] text-sm mb-2">Quiénes somos</p>
        <h2 class="font-script text-5xl md:text-6xl text-primary mb-6">Nuestra Historia</h2>
        <div class="w-16 h-0.5 bg-gold mb-8"></div>

        <p class="font-body text-dark/80 text-base leading-relaxed mb-6">
          Desde las alturas de la Cordillera traemos los sabores más auténticos de Colombia a tu mesa.
          En el corazón del Barrio Madelena, cada plato es una celebración de nuestra cultura
          y tradición culinaria.
        </p>

        <p class="font-body text-dark/80 text-base leading-relaxed mb-8">
          Nuestros ingredientes son frescos, nuestras recetas son heredadas y nuestra pasión por
          la cocina colombiana es lo que hace que cada visita sea una experiencia inolvidable.
          Desde la sopa de cebada hasta la Bandeja Paisa, cada bocado cuenta una historia.
        </p>

        <div class="grid grid-cols-2 gap-6">
          <div class="text-center p-4 bg-primary/5 rounded-xl border border-primary/20">
            <p class="font-script text-4xl text-primary">100%</p>
            <p class="font-body text-xs text-dark/60 uppercase tracking-wider mt-1">Ingredientes frescos</p>
          </div>
          <div class="text-center p-4 bg-accent/5 rounded-xl border border-accent/20">
            <p class="font-script text-4xl text-accent">♥</p>
            <p class="font-body text-xs text-dark/60 uppercase tracking-wider mt-1">Hecho con amor</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<script>
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  gsap.registerPlugin(ScrollTrigger)

  // Parallax de imagen
  gsap.to('#nosotros-img', {
    yPercent: -10,
    ease: 'none',
    scrollTrigger: {
      trigger: '#nosotros',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })

  // Entrada de texto
  gsap.from('#nosotros-text', {
    opacity: 0,
    x: 50,
    duration: 0.9,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#nosotros',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  })

  gsap.from('#nosotros-img-wrap', {
    opacity: 0,
    x: -50,
    duration: 0.9,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#nosotros',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  })
</script>
```

- [ ] **Step 2: Añadir a `index.astro`**

Importar y añadir `<Nosotros />` después de `<ALaCarta />`.

- [ ] **Step 3: Verificar**

Scroll hasta sección. Verificar: imagen con parallax sutil, texto con entrada desde la derecha, badge "Tradición Colombiana" visible.

- [ ] **Step 4: Commit**

```bash
git add src/components/Nosotros.astro src/pages/index.astro
git commit -m "feat: add Nosotros section with image parallax"
```

---

## Task 9: Sección Testimonios

**Files:**
- Create: `src/components/Testimonios.astro`

**Interfaces:**
- Consumes: `/images/food-1.jpg`
- Produces: `<Testimonios />` sin props, sección `id="testimonios"`

- [ ] **Step 1: Crear `src/components/Testimonios.astro`**

```astro
---
const testimonios = [
  {
    nombre: 'María Rodríguez',
    texto: 'El menú del día es una delicia. La sopa de cebada me recuerda a la comida de mi abuela. ¡Siempre vuelvo!',
    avatar: 'MR',
    color: 'bg-primary',
  },
  {
    nombre: 'Carlos Gómez',
    texto: 'La Bandeja Paisa es impresionante, abundante y deliciosa. El mejor restaurante del barrio sin duda.',
    avatar: 'CG',
    color: 'bg-accent',
  },
  {
    nombre: 'Luisa Martínez',
    texto: 'El churrasco especial es espectacular. Los domicilios son rápidos y la comida llega perfecta. 10/10.',
    avatar: 'LM',
    color: 'bg-gold',
  },
]
---
<section id="testimonios" class="py-24 px-6 bg-dark relative overflow-hidden">

  <!-- Imagen grande con parallax (estilo del video de referencia) -->
  <div id="test-food-wrap" class="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden hidden lg:block opacity-20">
    <img
      id="test-food-img"
      src="/images/food-1.jpg"
      alt=""
      class="w-full h-full object-cover scale-110"
    />
  </div>

  <div class="max-w-6xl mx-auto relative z-10">
    <div class="lg:max-w-xl">
      <p class="font-body text-gold uppercase tracking-[0.3em] text-sm mb-2">Lo que dicen</p>
      <h2 class="font-script text-5xl md:text-6xl text-off-white mb-4">Nuestros Clientes</h2>
      <div class="w-24 h-0.5 bg-gold mb-16"></div>

      <div class="space-y-8">
        {testimonios.map((t, i) => (
          <div class={`testimonio-card bg-off-white/5 border border-off-white/10 rounded-2xl p-6 backdrop-blur-sm`}>
            <p class="font-body text-off-white/80 text-base leading-relaxed mb-6 italic">
              "{t.texto}"
            </p>
            <div class="flex items-center gap-3">
              <div class={`${t.color} w-10 h-10 rounded-full flex items-center justify-center font-body font-bold text-white text-sm flex-shrink-0`}>
                {t.avatar}
              </div>
              <div>
                <p class="font-body font-bold text-off-white text-sm">{t.nombre}</p>
                <div class="flex gap-0.5 mt-0.5">
                  {[1,2,3,4,5].map(() => (
                    <span class="text-gold text-xs">★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

<script>
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  gsap.registerPlugin(ScrollTrigger)

  // Parallax imagen de fondo
  gsap.to('#test-food-img', {
    yPercent: 15,
    ease: 'none',
    scrollTrigger: {
      trigger: '#testimonios',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })

  // Cards testimonios entrada escalonada
  gsap.from('.testimonio-card', {
    opacity: 0,
    x: -40,
    stagger: 0.25,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#testimonios',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  })
</script>
```

- [ ] **Step 2: Añadir a `index.astro`**

Importar y añadir `<Testimonios />` después de `<Nosotros />`.

- [ ] **Step 3: Verificar**

Verificar: 3 testimonios con entrada desde la izquierda, imagen de fondo con parallax sutil en desktop.

- [ ] **Step 4: Commit**

```bash
git add src/components/Testimonios.astro src/pages/index.astro
git commit -m "feat: add Testimonios section with parallax food image"
```

---

## Task 10: Contacto y Footer

**Files:**
- Create: `src/components/Contacto.astro`
- Create: `src/components/Footer.astro`

**Interfaces:**
- Produces: `<Contacto />` sección `id="contacto"`, `<Footer />` al final de página

- [ ] **Step 1: Crear `src/components/Contacto.astro`**

```astro
---
---
<section id="contacto" class="py-24 px-6 bg-bg">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-16">
      <p class="font-body text-gold uppercase tracking-[0.3em] text-sm mb-2">Encuéntranos</p>
      <h2 class="font-script text-5xl md:text-6xl text-primary mb-4">Visítanos</h2>
      <div class="w-24 h-0.5 bg-gold mx-auto"></div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

      <!-- Info de contacto -->
      <div class="space-y-8">
        <div class="flex items-start gap-4 p-6 bg-off-white rounded-2xl shadow-sm border border-gold/20">
          <div class="text-3xl flex-shrink-0">📍</div>
          <div>
            <h3 class="font-body font-bold text-primary uppercase tracking-wider text-sm mb-1">Dirección</h3>
            <p class="font-body text-dark/80">Carrera 65b #61-03 sur</p>
            <p class="font-body text-dark/80">Barrio Madelena, Bogotá</p>
          </div>
        </div>

        <div class="flex items-start gap-4 p-6 bg-off-white rounded-2xl shadow-sm border border-gold/20">
          <div class="text-3xl flex-shrink-0">📞</div>
          <div>
            <h3 class="font-body font-bold text-primary uppercase tracking-wider text-sm mb-1">Teléfono / WhatsApp</h3>
            <p class="font-body text-dark/80">310 377 5506</p>
          </div>
        </div>

        <div class="flex items-start gap-4 p-6 bg-off-white rounded-2xl shadow-sm border border-gold/20">
          <div class="text-3xl flex-shrink-0">🛵</div>
          <div>
            <h3 class="font-body font-bold text-primary uppercase tracking-wider text-sm mb-1">Domicilios</h3>
            <p class="font-body text-dark/80 mb-3">Pedidos a domicilio disponibles</p>
            <a
              href="https://wa.me/573103775506?text=Hola,%20quiero%20hacer%20un%20pedido%20a%20domicilio"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 bg-[#25D366] hover:bg-green-600 text-white font-body text-sm px-6 py-3 rounded-full transition-colors shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Pedir por WhatsApp
            </a>
          </div>
        </div>
      </div>

      <!-- Mapa embed -->
      <div class="rounded-2xl overflow-hidden shadow-2xl border-4 border-gold/20 h-80 lg:h-full min-h-80">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.0!2d-74.155!3d4.571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMzQnMTUuNiJOIDc0wrAwOScxOC4wIlc!5e0!3m2!1ses!2sco!4v1620000000000!5m2!1ses!2sco"
          width="100%"
          height="100%"
          style="border:0; min-height: 320px;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Ubicación Restaurante Cordillera del Sabor"
        ></iframe>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Crear `src/components/Footer.astro`**

```astro
---
---
<footer class="bg-dark py-10 px-6 border-t border-off-white/10">
  <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
    <div class="flex items-center gap-3">
      <img src="/logo.png" alt="Cordillera del Sabor" class="w-10 h-10 rounded-full object-cover" />
      <div>
        <p class="font-script text-xl text-off-white">Cordillera del Sabor</p>
        <p class="font-body text-xs text-off-white/50">Barrio Madelena · Bogotá</p>
      </div>
    </div>

    <p class="font-body text-xs text-off-white/40 text-center">
      © 2026 Restaurante Cordillera del Sabor · Domicilios: 310 377 5506
    </p>

    <a
      href="https://wa.me/573103775506"
      target="_blank"
      rel="noopener"
      class="font-body text-sm text-gold hover:text-off-white transition-colors uppercase tracking-wider"
    >
      🛵 Domicilios
    </a>
  </div>
</footer>
```

- [ ] **Step 3: Añadir a `index.astro`**

Importar y añadir `<Contacto />` y `<Footer />` al final.

- [ ] **Step 4: Verificar sección**

Verificar: info de contacto visible, botón WhatsApp verde funcional, footer con logo.

- [ ] **Step 5: Commit**

```bash
git add src/components/Contacto.astro src/components/Footer.astro src/pages/index.astro
git commit -m "feat: add Contacto and Footer sections with WhatsApp CTA"
```

---

## Task 11: Composición Final de index.astro

**Files:**
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: todos los componentes anteriores
- Produces: página completa `index.astro`

- [ ] **Step 1: Reemplazar `src/pages/index.astro` con versión final**

```astro
---
import Layout from '../layouts/Layout.astro'
import Nav from '../components/Nav.astro'
import Hero from '../components/Hero.astro'
import MenuDia from '../components/MenuDia.astro'
import ALaCarta from '../components/ALaCarta.astro'
import Nosotros from '../components/Nosotros.astro'
import Testimonios from '../components/Testimonios.astro'
import Contacto from '../components/Contacto.astro'
import Footer from '../components/Footer.astro'
---
<Layout title="Restaurante Cordillera del Sabor — Barrio Madelena">
  <Nav />
  <Hero />
  <MenuDia />
  <ALaCarta />
  <Nosotros />
  <Testimonios />
  <Contacto />
  <Footer />
</Layout>
```

- [ ] **Step 2: Build de producción y verificar sin errores**

```bash
npm run build
```

Esperado: `✓ Completed` sin errores ni warnings críticos.

- [ ] **Step 3: Preview del build**

```bash
npm run preview
```

Navegar a `http://localhost:4321` y verificar el sitio completo con scroll.

- [ ] **Step 4: Checklist visual completo**

Verificar cada punto:
- [ ] Hero con parallax de fondo visible
- [ ] Elementos flotantes del hero se mueven en scroll
- [ ] Navbar se oscurece al bajar
- [ ] Links del navbar llevan a sus secciones (scroll suave)
- [ ] Menú del Día muestra todos los platos ($15.000)
- [ ] A la Carta: 3 cards con precios correctos ($18k/$26k/$31k)
- [ ] Nosotros: imagen con parallax sutil
- [ ] Testimonios: 3 reseñas visibles
- [ ] Contacto: dirección correcta, WhatsApp 3103775506
- [ ] Footer visible con logo

- [ ] **Step 5: Commit final**

```bash
git add src/pages/index.astro
git commit -m "feat: wire up complete index page with all sections"
```

---

## Task 12: Polish — Responsividad y Accesibilidad

**Files:**
- Modify: `src/components/Nav.astro` (menú mobile hamburger)
- Modify: `src/styles/global.css` (ajustes finales)

**Interfaces:**
- Consumes: todos los componentes finales

- [ ] **Step 1: Añadir menú hamburger mobile en Nav.astro**

Agregar dentro del `<nav>` el botón mobile y lógica:

```astro
<!-- Botón hamburger (solo mobile) -->
<button id="menu-btn" class="md:hidden text-off-white focus:outline-none" aria-label="Abrir menú">
  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
</button>

<!-- Menú mobile desplegable -->
<div id="mobile-menu" class="hidden md:hidden absolute top-full left-0 right-0 bg-dark/95 backdrop-blur-sm py-4 px-6 flex flex-col gap-4">
  <a href="#menu-dia" class="font-body text-off-white hover:text-gold py-2 border-b border-off-white/10 uppercase tracking-wider text-sm">Menú del Día</a>
  <a href="#a-la-carta" class="font-body text-off-white hover:text-gold py-2 border-b border-off-white/10 uppercase tracking-wider text-sm">A la Carta</a>
  <a href="#nosotros" class="font-body text-off-white hover:text-gold py-2 border-b border-off-white/10 uppercase tracking-wider text-sm">Nosotros</a>
  <a href="#contacto" class="font-body text-off-white hover:text-gold py-2 uppercase tracking-wider text-sm">Contacto</a>
</div>
```

Agregar al `<script is:inline>` existente del Nav:
```js
const menuBtn = document.getElementById('menu-btn')
const mobileMenu = document.getElementById('mobile-menu')
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden')
})
// Cerrar al hacer click en un link
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.add('hidden'))
})
```

- [ ] **Step 2: Verificar responsividad en mobile**

En DevTools (Chrome), activar modo responsive con iPhone SE (375px). Verificar:
- Navbar muestra hamburger en mobile
- Menú desplegable funciona
- Hero texto legible en mobile
- Cards de A la Carta en columna única
- Sección Nosotros en columna única

- [ ] **Step 3: Build final de producción**

```bash
npm run build && npm run preview
```

Verificar en `http://localhost:4321` que todo funciona en desktop y mobile.

- [ ] **Step 4: Commit final**

```bash
git add -A
git commit -m "feat: add mobile hamburger menu and responsive polish"
```

---

## Resumen de commits esperados

```
feat: scaffold Astro project with Tailwind and GSAP
feat: add base layout and global styles with Tailwind colors
feat: add logo and placeholder food images for demo
feat: add sticky navigation with scroll behavior
feat: add hero section with GSAP ScrollTrigger parallax
feat: add Menú del Día section with scroll animation
feat: add A la Carta section with staggered card animations
feat: add Nosotros section with image parallax
feat: add Testimonios section with parallax food image
feat: add Contacto and Footer sections with WhatsApp CTA
feat: wire up complete index page with all sections
feat: add mobile hamburger menu and responsive polish
```
