import React, { Suspense } from 'react';
import { useGLTF, OrbitControls, Environment, Html, Center } from '@react-three/drei';

// EDIT THESE VALUES to perfectly align the glowing dots with your specific PC 3D model!
// [X (Depth from glass), Y (Up/Down), Z (Left/Right)]
export const HOTSPOT_POSITIONS = {
  cpu: [0.5, -0.1, -1.0],     // Deepcool AIO Pump
  gpu: [0.2, -1.2, -0.8],      // GEFORCE RTX Edge
  ram: [0.5, 0, -0.2],     // G.SKILL RAM sticks
  ssd: [0.8, -0.7, -1.1],     // Bottom shroud
  mobo: [0.5, -0.4, -1.35],    // Motherboard center/chipset
  psu: [-0.8, -2.6, -1.55]      // PSU basement
};

function Model() {
  const { scene } = useGLTF('/pc.glb');
  return (
    <Center position={[0, -1, 0]}>
      <primitive object={scene} scale={1} />
    </Center>
  );
}

function Loader() {
  return (
    <Html center>
      <div className="text-white text-sm tracking-widest uppercase">Loading System Core...</div>
    </Html>
  );
}

function Hotspot({ position, id, label, sub, onClick, lineClass, panelClass }) {
  // Map icons based on the new semantic meanings
  const getIcon = () => {
    switch (id) {
      case 'cpu': return 'person'; // About Me
      case 'mobo': return 'developer_board'; // Tech Stack
      case 'ssd': return 'workspace_premium'; // Certifications
      case 'ram': return 'fitness_center'; // Hobbies
      case 'gpu': return 'rocket_launch'; // Projects
      case 'psu': return 'bolt'; // Career Vision
      default: return 'memory';
    }
  };

  return (
    <Html position={position} center className="pointer-events-auto">
      <div className="relative w-0 h-0 group z-50">
        <div className="absolute top-[-4px] left-[-4px] w-2 h-2 bg-secondary rounded-full shadow-[0_0_10px_#00f1fe] z-10"></div>
        <button
          onClick={() => onClick(id)}
          className={`absolute glass-panel rainbow-hover px-4 py-3 rounded-lg flex items-center gap-3 transition-transform hover:-translate-y-1 w-48 ${panelClass}`}
        >
          <div className="w-8 h-8 rounded bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-sm flex items-center justify-center">
              {getIcon()}
            </span>
          </div>
          <div className="text-left overflow-hidden">
            <p className="text-[8px] uppercase tracking-widest text-zinc-500 leading-none mb-1">{label}</p>
            <p className="text-xs font-bold text-white leading-none truncate w-full">{sub}</p>
          </div>
        </button>
      </div>
    </Html>
  );
}

export default function PCModel({ setActiveNode }) {
  return (
    <>
      <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={true} makeDefault />

      {/* Base ambient lighting */}
      <ambientLight intensity={4} color="#ffffff" />
      
      {/* Intense Directional light coming straight from the top */}
      <directionalLight position={[0, 10, 0]} intensity={15} color="#ffffff" />
      
      {/* Intense Thematic ambient glow tightly surrounding the PC (Cyan/Purple) */}
      <pointLight position={[-2, 0, 2]} intensity={50} color="#00f1fe" distance={15} />
      <pointLight position={[2, -2, -2]} intensity={50} color="#ac89ff" distance={15} />

      <Environment preset="city" blur={1} />

      <Suspense fallback={<Loader />}>
        <Model />
        <Hotspot
          position={HOTSPOT_POSITIONS.cpu}
          id="cpu"
          label="CPU"
          sub="About Me"
          onClick={setActiveNode}
          lineClass="w-32 -rotate-[160deg] top-0 right-0"
          panelClass="-top-16 -left-[200px]"
        />
        <Hotspot
          position={HOTSPOT_POSITIONS.mobo}
          id="mobo"
          label="MOBO"
          sub="Tech Stack"
          onClick={setActiveNode}
          lineClass="w-24 -rotate-[180deg] top-0 right-0"
          panelClass="-top-6 -left-[160px]"
        />
        <Hotspot
          position={HOTSPOT_POSITIONS.gpu}
          id="gpu"
          label="GPU"
          sub="Projects"
          onClick={setActiveNode}
          lineClass="w-24 -rotate-[210deg] top-0 right-0"
          panelClass="-bottom-12 -left-[220px]"
        />
        <Hotspot
          position={HOTSPOT_POSITIONS.ssd}
          id="ssd"
          label="SSD"
          sub="Certifications"
          onClick={setActiveNode}
          lineClass="w-24 -rotate-[200deg] top-0 right-0"
          panelClass="-bottom-8 -left-[220px]"
        />
        <Hotspot
          position={HOTSPOT_POSITIONS.ram}
          id="ram"
          label="RAM"
          sub="Hobbies"
          onClick={setActiveNode}
          lineClass="w-32 -rotate-[30deg] top-0 left-0"
          panelClass="-top-16 left-32"
        />
        <Hotspot
          position={HOTSPOT_POSITIONS.psu}
          id="psu"
          label="PSU"
          sub="Career & Vision"
          onClick={setActiveNode}
          lineClass="w-32 -rotate-[0deg] top-0 left-0"
          panelClass="-bottom-4 left-32"
        />
      </Suspense>
    </>
  );
}

useGLTF.preload('/pc.glb');
