# Design Guidelines: Afterglow Academic Project Website

## Design Approach

**Selected Approach:** Reference-Based (Gaming/Interactive Media Aesthetic)
**Primary References:** Endfield Official Site, Arknights Official Site
**Key Principles:** Cinematic presentation, scroll-driven storytelling, sophisticated micro-interactions, immersive visual hierarchy

This academic project about ignorance and education will adopt a modern gaming website aesthetic to create an engaging, memorable experience while maintaining credibility and professionalism.

## Core Design Elements

### A. Typography System

**Font Families:**
- Primary: Roboto (body text, navigation) - clean, highly legible for Vietnamese characters
- Display: Roboto Condensed (headings, hero titles) - impactful, condensed for dramatic effect
- Accent: Noto Sans (supplementary Vietnamese text)

**Hierarchy:**
- Hero Title: 3.5rem to 4rem, bold, with gradient text effects
- Section Headings: 2.5rem to 3rem, bold
- Subsection Headings: 1.5rem to 2rem, semibold
- Body Text: 1.125rem, regular, line-height 1.7 for Vietnamese readability
- Captions/Labels: 0.875rem to 1rem, medium weight

**Special Typography Effects:**
- Gradient text on key headlines (blue-to-orange, blue-to-purple)
- Animated text reveal on scroll (character-by-character or word-by-word fade-in)
- Glitch effect on hover for section titles (subtle, gaming-inspired)

### B. Layout System

**Spacing Primitives:** Tailwind units of 4, 8, 12, 16, 20 (p-4, m-8, gap-12, py-16, mb-20)

**Container Strategy:**
- Full-width sections with inner max-w-7xl containers
- Generous vertical padding: py-20 to py-32 for desktop, py-12 to py-16 for mobile
- Asymmetric layouts for visual interest (60/40 splits, offset grids)

**Grid Patterns:**
- Hero: Single column, centered content with overlay effects
- About: 2-column alternating (text/image, image/text)
- Team Members: 3-column grid desktop, 2-column tablet, 1-column mobile
- Poster: 2-column (image/content split)
- Progress/Timeline: Full-width horizontal scroll or vertical reveal

### C. Visual Effects & Animations

**Scroll-Triggered Animations:**
- Parallax backgrounds with 3-5 depth layers (hero section, world-building sections)
- Fade-in-up on section entry (stagger child elements by 100-150ms)
- Scale-in effects for cards and images (0.95 to 1.0)
- Slide-in from left/right for alternating content blocks
- Number counter animations for statistics/progress metrics

**Hover & Interactive States:**
- 3D card tilt on team member cards (10-15 degree rotation on X/Y axis based on mouse position)
- Image zoom on hover (scale 1.05 with overflow hidden)
- Gradient shift animations on buttons and key elements
- Floating animation on hero elements (subtle vertical movement, 2-3 second cycles)
- Ripple effects on clickable elements

**Transition Specifications:**
- Standard transitions: 0.3s ease-out for most interactions
- Complex animations: 0.5-0.7s cubic-bezier(0.4, 0, 0.2, 1)
- Entrance animations: 0.8-1.2s with stagger delays
- Parallax: transform3d for GPU acceleration

**Loading Screen:**
- Full-screen overlay with animated progress bar
- Fade-out transition (1s) when content ready
- Minimal branding (Afterglow logo with blue-orange gradient)

**Hero Section Enhancements:**
- Animated gradient background (slow color shift between blue, purple, orange)
- Floating particle system (20-30 particles, subtle drift animation)
- Text appears with stagger: logo → title → description → CTAs
- Background image with parallax depth (if using image)
- Overlay gradient for text readability

**Poster Section Effects:**
- 3D perspective container (perspective: 1000px)
- Image rotates on Y-axis hover (5-10 degrees)
- Realistic reflection effect below poster (scaleY(-0.3), opacity 0.3, blur 2px)
- Gradient fade on reflection from semi-transparent to fully transparent
- Shadow intensifies on hover

### D. Component Library

**Navigation:**
- Sticky header with blur background (backdrop-filter: blur(10px))
- Smooth underline animation on hover
- Active section indicator with colored accent
- Mobile hamburger menu with slide-in drawer animation

**Hero Section:**
- Full viewport height (min-h-screen)
- Large hero image OR animated gradient background with particles
- Centered content with max-w-2xl
- Two CTA buttons: Primary (gradient background) + Secondary (outline with backdrop blur)
- Scroll indicator animation at bottom

**Cards:**
- Elevated with shadow-lg, increase to shadow-2xl on hover
- Border-radius: 1rem to 1.5rem
- Scale transform on hover (1.02 to 1.05)
- Icon containers with gradient backgrounds
- Smooth color transitions on hover

**Buttons:**
- Primary: Gradient background (blue-to-purple or blue-to-orange)
- Secondary: Outline with backdrop blur when on images
- Padding: px-8 py-4
- Border-radius: 0.5rem
- Transform: translateY(-2px) on hover with shadow increase
- No additional hover states needed beyond transform and shadow

**Images:**
- Border-radius: 1.5rem to 2rem for featured images
- Shadow-2xl with hover shadow-3xl
- Transform scale on hover within containers
- Lazy loading with fade-in on appearance

**Team Member Cards:**
- Avatar: Circular, 6rem diameter
- Background: Gradient from gray-50 to white
- Social icons: Circular, gradient backgrounds
- Hover: Scale 1.05, shadow intensifies, avatar scales 1.1

**Progress/Timeline:**
- Horizontal scroll container on mobile
- Vertical reveal with scroll position indicator on desktop
- Animated progress bars fill on scroll into view
- Milestone markers with pulse animation

## Images Strategy

**Required Images:**

1. **Hero Background:** Large, high-quality image (1920x1080+) depicting education, knowledge, or abstract concepts. Alternative: use animated gradient with particle effects if no suitable image available.

2. **About Section Image:** Professional photo related to research, education, or team collaboration (800x600)

3. **Poster Section:** Academic poster mockup (600x800 portrait orientation) with reflection effect

4. **Team Member Avatars:** Individual photos or placeholder circles with user icons (circular crop, 200x200)

5. **Section Dividers:** Optional abstract patterns or subtle textures for visual breaks between major sections

**Image Treatment:**
- All images have subtle overlay gradients for text readability
- Border-radius consistently applied (1.5rem)
- Lazy loading with intersection observer
- Hover scale effects within containers

## Accessibility & Performance

- Maintain WCAG AA contrast ratios despite gradient effects
- Provide reduced-motion alternatives via media query
- Optimize animations for 60fps (use transform and opacity only)
- Lazy load images and defer non-critical animations
- Ensure keyboard navigation works with all interactive elements
- Vietnamese text rendering optimization with Noto Sans/Roboto font stack

## Unique Distinguishing Features

- **Cinematic Scrolling:** Each section reveals like a scene in a story
- **Depth Perception:** Multiple parallax layers create 3D space illusion
- **Dynamic Gradients:** Colors shift and pulse throughout the experience
- **Gaming Aesthetic:** Modern, polished look borrowed from premium game sites
- **Academic Credibility:** Balanced with professional typography and structured content
- **Cultural Respect:** Vietnamese language prioritized with proper font support and readability

This design transforms a standard academic website into an immersive, memorable digital experience while respecting the serious nature of the research topic.
