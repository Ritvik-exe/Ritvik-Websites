import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Linkedin, MapPin, GraduationCap, Code } from 'lucide-react';

const NODE_CONTENT = {
  cpu: {
    title: "About Me",
    subtitle: "The Core",
    text1: "I am a 20-year-old Cloud Architecture student based in Isleworth, London. I am rooted in the discipline of the Bhagavad Gita and driven by a 'voluntary hardship' mindset inspired by David Goggins.",
    text2: "I judge myself by my daily task-book, not my feelings. My ultimate goal is total freedom—building systems that work for me so I can work by choice, not necessity.",
    stats: [
      { icon: MapPin, text: "London, UK" },
      { icon: GraduationCap, text: "BTEC Level 3 ICT" }
    ],
    links: []
  },
  mobo: {
    title: "Tech Stack",
    subtitle: "The Foundation",
    text1: "I enjoy the strict logic of Python and the infinite scale of the Cloud, making massive systems work efficiently.",
    text2: "My tech foundation encompasses AWS architecture, Python development, and bringing extreme automation to the forefront of cloud engineering.",
    stats: [
      { icon: Code, text: "Python / AWS" }
    ],
    links: []
  },
  gpu: {
    title: "Projects",
    subtitle: "Heavy Rendering",
    text1: "I focus on building practical, cloud-native solutions and automation tools. In my ritvik-pycloud-projects repository, you'll find various projects demonstrating my skills in Python and AWS.",
    text2: "These projects range from automated cloud workflows to infrastructure-as-code implementations, showcasing how I apply my cloud architecture knowledge to solve real-world problems.",
    stats: [],
    links: [
      { label: "GITHUB REPOSITORY", url: "https://github.com/Ritvik-exe", icon: "arrow_forward" },
      { label: "VIEW RESUME / CV", url: "https://docs.google.com/document/d/1y6Gx-gjJQjEPPuAqfb9_5gjKnI94LPcBDmoakvLtNS0/", icon: "description" }
    ]
  },
  ssd: {
    title: "Certifications",
    subtitle: "Long-term Storage",
    text1: "I enjoy continuously learning and expanding my skill set in cloud computing. I am certified as an AWS Solutions Architect Associate, an AWS Cloud Practitioner, and hold a Python PCEP certification.",
    text2: "Achieving my AWS Solutions Architect Associate (SAA-C03) certification has been a great milestone, and I look forward to using this knowledge to engineer scalable and secure cloud infrastructures.",
    stats: [
      { icon: GraduationCap, text: "AWS SAA" },
      { icon: GraduationCap, text: "AWS Practitioner" },
      { icon: GraduationCap, text: "Python PCEP" }
    ],
    links: [
      { label: "CREDLY // AWS SAA BADGE", url: "https://www.credly.com/badges/c58e7f91-1a1d-4632-bcc5-b2da1f37d866/public_url", icon: "workspace_premium" },
      { label: "CREDLY // AWS CP BADGE", url: "https://www.credly.com/badges/2ad08a7c-dafc-42c8-9519-21cd5297103b/public_url", icon: "workspace_premium" },
      { label: "CREDLY // PYTHON BADGE", url: "https://www.credly.com/badges/a241065d-0c48-4062-803c-39227e52f7ba/public_url", icon: "workspace_premium" }
    ]
  },
  ram: {
    title: "Hobbies",
    subtitle: "Active Memory",
    text1: "I value physical strength just as much as mental sharpness, actively working out and running while adhering to 4:30 AM starts and mandatory Saturday runs.",
    text2: "My hobbies revolve around everything tech—software, hardware, PCs, and phones. I also enjoy gaming and cars, with my absolute favorite being the Porsche 911 992 GT3 Touring.",
    stats: [],
    links: []
  },
  psu: {
    title: "Career Vision",
    subtitle: "Power Supply",
    text1: "The 7-Year Plan is in motion: From grinding out free local Cloud Audits today, to hiring a CEO by age 26 so I can transition from Operator to Chairman.",
    text2: "I plan to build a business that funds a diversified investment portfolio, replacing my salary with business profit to live a high-margin, automated life.",
    stats: [],
    links: []
  },
  case: {
    title: "Socials",
    subtitle: "The Chassis",
    text1: "Follow me on my socials!",
    text2: "Feel free to connect, follow my journey, and see what I'm currently working on.",
    stats: [],
    links: [
      { label: "LINKEDIN", url: "https://www.linkedin.com/in/ritvik-yalala/", icon: "link" },
      { label: "YOUTUBE", url: "https://www.youtube.com/@RitvikBuilds", icon: "play_arrow" },
      { label: "INSTAGRAM", url: "https://www.instagram.com/ritvikbuilds/?hl=en", icon: "photo_camera" },
      { label: "TIKTOK", url: "https://www.tiktok.com/@ritvikbuilds", icon: "music_note" }
    ]
  }
};

export default function UINodes({ activeNode, setActiveNode }) {
  const content = activeNode ? NODE_CONTENT[activeNode] : null;

  return (
    <div className="w-full h-full relative pointer-events-none z-50">
      <AnimatePresence>
        {activeNode && content && (
          <>
            {/* Desktop Panel Right */}
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="hidden md:flex flex-col absolute top-0 right-0 w-[400px] h-full glass-panel pointer-events-auto border-y-0 border-r-0 shadow-2xl p-10 bg-black/60 backdrop-blur-xl"
            >
              <PanelContent content={content} onClose={() => setActiveNode(null)} />
            </motion.div>

            {/* Mobile Panel Bottom */}
            <motion.div 
              initial={{ y: '100%' }} 
              animate={{ y: 0 }} 
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="md:hidden flex flex-col absolute bottom-0 left-0 w-full h-[60%] glass-panel pointer-events-auto border-x-0 border-b-0 p-6 bg-black/80 rounded-t-2xl backdrop-blur-xl"
            >
              <PanelContent content={content} onClose={() => setActiveNode(null)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function PanelContent({ content, onClose }) {
  if (!content) return null;
  return (
    <>
      <div className="flex justify-between items-start mb-12">
        <div>
          <span className="text-[9px] uppercase tracking-[0.3em] text-secondary font-bold mb-2 block">{content.subtitle}</span>
          <h3 className="text-3xl font-black text-white tracking-tighter uppercase">{content.title}</h3>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-white">
          <X size={16} />
        </button>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <p className="text-zinc-400 text-sm leading-relaxed text-justify">
          {content.text1}
        </p>
        <p className="text-zinc-400 text-sm leading-relaxed text-justify">
          {content.text2}
        </p>

        {content.stats && content.stats.length > 0 && (
          <div className="pt-8 space-y-3">
            {content.stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-4 text-zinc-500">
                <stat.icon size={16} />
                <span className="text-[10px] uppercase font-bold tracking-wider">{stat.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-8 border-t border-white/5 flex flex-col gap-3 mt-4">
        {content.links && content.links.map((link, i) => (
          <a key={i} href={link.url} target="_blank" rel="noreferrer" className="w-full flex items-center justify-between px-6 py-4 rounded-md border border-white/10 text-white font-bold hover:bg-white/5 transition-all group">
            <span className="text-[10px] uppercase tracking-widest">{link.label}</span>
            <span className={`material-symbols-outlined text-sm ${link.icon === 'arrow_forward' ? 'group-hover:translate-x-1 transition-transform' : ''}`}>
              {link.icon}
            </span>
          </a>
        ))}
      </div>

      <div className="mt-8 flex justify-between text-[7px] font-mono text-zinc-600 tracking-[0.2em] uppercase">
        <span>CORE_VER: 2.1.0</span>
        <span>Uptime: 99.99%</span>
        <span>OS: OBSIDIAN_V2</span>
      </div>
    </>
  );
}
