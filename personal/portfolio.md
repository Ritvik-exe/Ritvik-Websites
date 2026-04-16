# Personal Portfolio Website Specification

## 1. Project Overview
Build a premium, high-end, 3D-interactive personal portfolio website. The vibe is "Premium Studio Dark Mode" (similar to Apple or high-end PC hardware websites). 
The centerpiece is a 3D model of a white, RGB-lit gaming PC floating in the center of the screen, surrounded by a sleek, frosted-glass (glassmorphism) UI.

## 2. Tech Stack
- React (Next.js or Vite)
- Tailwind CSS (for styling)
- Framer Motion (for UI animations)
- React Three Fiber (`@react-three/fiber`) & Drei (`@react-three/drei`) (for 3D rendering)

## 3. Global Styling & Theme
- **Background:** Solid, deep premium black (`bg-[#0a0a0a]`). No gradients, no stars. Clean studio look.
- **Font:** Clean, modern sans-serif (e.g., Inter or Geist), pure white text.
- **UI Elements:** Apple-style Glassmorphism. `backdrop-blur-md`, `bg-white/5`, very thin border `border-white/10`.
- **Hover Effects:** When buttons are hovered, the border should transition to a subtle animated rainbow/RGB gradient to match the PC's internal RGB fans.

## 4. The 3D Canvas (React Three Fiber)
Create a full-screen `<Canvas>` (`100vw`, `100vh`) as the base layer.
- **Model:** Use `useGLTF` to load `'/pc.glb'` from the public folder. Center it. (Add a Suspense fallback loader).
- **Controls:** Add `<OrbitControls>` with `autoRotate={true}` (slow, elegant spin speed) and `enableZoom={false}`.
- **Lighting (Crucial for the white case & glass):**
  - `<ambientLight intensity={0.8} />` (to illuminate dark internal motherboard parts).
  - `<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" />` (to beautifully highlight the white metal case).
  - `<Environment preset="city" blur={1} />` (to give the glass side-panel realistic studio reflections).

## 5. The 2D UI Overlay (Absolute Positioning)
Overlay the HTML/React UI on top of the 3D Canvas. The wrapper must have `pointer-events: none` so the user can still spin the 3D PC, but interactive elements must have `pointer-events: auto`.

### A. Header
- Top-left corner.
- Text: `[YOUR NAME] // SYSTEM_CORE`
- Style: Tracking-widest, uppercase, minimal pure white text.

### B. The 4 Floating Nodes (Navigation)
Arrange 4 buttons floating around the center screen (Top-Left, Top-Right, Bottom-Left, Bottom-Right). 
Text for the buttons:
1. `CPU // About Me`
2. `GPU // Skills`
3. `RAM // Ambition`
4. `SSD // Projects`
*Animation:* Buttons should have a gentle continuous floating animation (Framer Motion).

## 6. Interactivity & Slide-Out Panels
Add React state to track which of the 4 nodes is actively clicked.
When a node is clicked:
1. A sleek, frosted-glass panel slides in from the right edge of the screen (Framer Motion: `initial={{ x: '100%' }} animate={{ x: 0 }} transition={{ type: 'spring', damping: 20 }}`).
2. The panel takes up about 30% of the screen width on desktop (100% on mobile).
3. Include a minimal 'X' button in the top right of the panel to close it.

### Content to inject into the active panel:
- **If CPU:** 
  - Title: "Base Operations"
  - Text: "19-year-old Cloud Architecture student and tech enthusiast. When I am not spinning up AWS instances, I am gaming, studying cars, or building rigs."
- **If GPU:** 
  - Title: "Processing Power"
  - Text: "AWS Cloud Practitioner (Certified) | Python PCEP (Certified) | Currently studying for AWS Solutions Architect | Learning Modern Web Dev."
- **If RAM:** 
  - Title: "Future Memory"
  - Text: "Career: Cloud Engineer / DevOps Architect. Ultimate Dream: Porsche 911 992 GT3 Touring. Building the foundation today to fund the garage of tomorrow."
- **If SSD:** 
  - Title: "Stored Data"
  - Text: "Currently building this interactive 3D portfolio natively in React Three Fiber."
  - Action: Add two glowing minimal placeholder buttons for 'GitHub' and 'LinkedIn'.

## 7. Responsive Design (Mobile Rules)
- On screens smaller than `768px`:
  - The 3D Canvas should take up the top 50% of the screen.
  - The 4 floating nodes should lose their absolute positioning and stack in a 2x2 grid at the bottom 50% of the screen.
  - The slide-out panel should slide UP from the bottom (`y: '100%'` to `y: 0`) instead of from the right, taking up the bottom half of the screen.