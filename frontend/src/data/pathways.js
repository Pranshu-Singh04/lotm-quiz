// frontend/src/data/pathways.js

export const PATHWAYS = {
  fool: {
    name: "Fool",
    color: "#c9973a",
    sequence: "Sequence 9 · The Clown",
    tarot: "fool",
    description: "The Fool Pathway selects the extraordinarily rare — those who hold chaos and order in equal tension, who can play any role without losing themselves. You are adaptable to a degree that frightens others, and your greatest strength is that no one can fully predict you — including yourself.",
    strengths: [
      { icon: "◎", name: "Radical Adaptability",  desc: "You shift personas without losing core identity" },
      { icon: "◎", name: "Chaos Tolerance",        desc: "Unpredictability is your natural habitat" },
      { icon: "◎", name: "Meta-Awareness",         desc: "You understand the game while playing it" },
    ],
    risks: [
      { icon: "◈", name: "Identity Diffusion",     desc: "Too many roles erode the self underneath" },
      { icon: "◈", name: "Overconfidence",         desc: "Adaptability breeds recklessness at higher Sequences" },
      { icon: "◈", name: "Divine Entanglement",    desc: "The Fool watches back" },
    ],
    stability: 68, corruption: 42, survival: 80, advancement: 85,
    warning: "Do not invoke the Fool's name carelessly. The connection between Clown and patron is bidirectional. Humor as a coping mechanism accelerates this Pathway's contamination rate."
  },

  reader: {
    name: "Reader",
    color: "#4a8ac9",
    sequence: "Sequence 9 · The Spectator",
    tarot: "reader",
    description: "The Reader Pathway accepts minds of quiet perception — those who accumulate knowledge patiently, process it deeply, and act only when certainty is achieved. Your contamination risk lies not in impulsivity, but in the slow gravity of forbidden texts.",
    strengths: [
      { icon: "◎", name: "Controlled Curiosity",   desc: "You pursue knowledge without being consumed" },
      { icon: "◎", name: "Strategic Patience",     desc: "You resist premature action — and are usually right to" },
      { icon: "◎", name: "Analytical Clarity",     desc: "You identify patterns others miss entirely" },
    ],
    risks: [
      { icon: "◈", name: "Analysis Paralysis",     desc: "Over-thinking costs you windows of opportunity" },
      { icon: "◈", name: "Forbidden Knowledge Drift", desc: "Slow accumulation without purging" },
      { icon: "◈", name: "Underestimating Contamination", desc: "You assume your mind is a fortress — it is not" },
    ],
    stability: 82, corruption: 28, survival: 81, advancement: 62,
    warning: "If subtle cognitive anomalies persist after cessation of Sequence usage — intrusive symbolic interpretations, compulsive pattern-seeking — withdraw from all occult contact for no fewer than 6 months."
  },

  seer: {
    name: "Seer",
    color: "#d4a030",
    sequence: "Sequence 9 · The Seer",
    tarot: "seer",
    description: "The Seer Pathway selects those who lean into fate rather than away from it. You trust instinct as much as evidence, and you are willing to touch uncertain truths. Your gift is foresight — your curse is that foresight invites interference from forces larger than yourself.",
    strengths: [
      { icon: "◎", name: "Fate Interaction Tolerance", desc: "You navigate probability without losing footing" },
      { icon: "◎", name: "Intuitive Foresight",    desc: "You read outcomes before they manifest" },
      { icon: "◎", name: "High Risk Threshold",    desc: "You act when others freeze — often correctly" },
    ],
    risks: [
      { icon: "◈", name: "Stability Erosion",      desc: "Frequent fate-touching degrades baseline reality" },
      { icon: "◈", name: "Vision Overconfidence",  desc: "Not every premonition is accurate" },
      { icon: "◈", name: "Fate Entanglement",      desc: "The more you see, the more the unseen sees you" },
    ],
    stability: 58, corruption: 52, survival: 74, advancement: 78,
    warning: "Avoid seeking confirmation of premonitions through consecutive divination. Feedback loops between Seer abilities and personal stakes accelerate contamination by a factor of 3–4x."
  },

  spectator: {
    name: "Spectator",
    color: "#9a6ac9",
    sequence: "Sequence 9 · The Spectator",
    tarot: "spectator",
    description: "The Spectator Pathway attracts those who understand people as systems — who observe social dynamics the way an engineer reads a schematic. You prefer influence over force, invisibility over presence. You are most dangerous when least visible.",
    strengths: [
      { icon: "◎", name: "Emotional Regulation",   desc: "You do not react; you respond with surgical precision" },
      { icon: "◎", name: "Social System Analysis", desc: "You read rooms, alliances, and hidden motivations" },
      { icon: "◎", name: "Strategic Invisibility", desc: "You understand the power of being underestimated" },
    ],
    risks: [
      { icon: "◈", name: "Detachment Creep",       desc: "Extended observation erodes genuine connection" },
      { icon: "◈", name: "Manipulation Normalization", desc: "The tools become instincts without notice" },
      { icon: "◈", name: "Isolation Feedback Loop",desc: "The unseen observer eventually loses their own reflection" },
    ],
    stability: 70, corruption: 44, survival: 77, advancement: 70,
    warning: "Maintain at least one genuine relationship outside your strategic framework. If you cannot identify one, this indicates mid-stage contamination."
  },

  sheriff: {
    name: "Sheriff",
    color: "#6a9a4a",
    sequence: "Sequence 9 · The Sheriff",
    tarot: "sheriff",
    description: "The Sheriff Pathway accepts those with deep structural cognition — minds that seek order not as comfort, but as architecture. You believe systems can be corrected, hierarchies can be just, and that authority wielded with discipline is a form of protection.",
    strengths: [
      { icon: "◎", name: "Structural Thinking",    desc: "You see the bones of institutions and how to fix them" },
      { icon: "◎", name: "Direct Action Bias",     desc: "You do not wait when the correct move is clear" },
      { icon: "◎", name: "Responsibility Tolerance", desc: "You carry burden without distributing it recklessly" },
    ],
    risks: [
      { icon: "◈", name: "Moral Rigidity",         desc: "Rules become absolutes; exceptions become threats" },
      { icon: "◈", name: "Authority Drift",        desc: "Protection of order becomes enforcement for its own sake" },
      { icon: "◈", name: "Isolation from Humanity",desc: "Judges are always above the judged — distance accumulates" },
    ],
    stability: 88, corruption: 22, survival: 85, advancement: 56,
    warning: "If you find yourself justifying collateral harm through systemic necessity more than twice in a single month, submit to peer review."
  },

  mystery: {
    name: "Mystery Pryer",
    color: "#c94a4a",
    sequence: "Sequence 9 · The Secrets Suppliant",
    tarot: "mystery",
    description: "The Mystery Pryer Pathway selects those who cannot leave a question unanswered — not out of curiosity, but compulsion. You suspect that everything has a hidden layer, and you are usually right. The Pathway feeds on this instinct. So does everything that hunts it.",
    strengths: [
      { icon: "◎", name: "Extreme Curiosity Drive",desc: "You will find the answer; the only variable is cost" },
      { icon: "◎", name: "Anomaly Detection",      desc: "You notice what should not exist and cannot ignore it" },
      { icon: "◎", name: "High Moral Flexibility", desc: "Survival and truth outrank ideological comfort" },
    ],
    risks: [
      { icon: "◈", name: "Compulsive Inquiry",     desc: "You cannot leave a mystery alone even when you should" },
      { icon: "◈", name: "Extreme Contamination Velocity", desc: "This pathway decays fastest" },
      { icon: "◈", name: "Truth as Justification", desc: "'Needing to know' rationalizes dangerous escalation" },
    ],
    stability: 40, corruption: 72, survival: 63, advancement: 88,
    warning: "Do not investigate phenomena you have not been contracted to investigate. Curiosity without mandate is the primary cause of Sequence collapse in Mystery Pryers below Sequence 6."
  },

  hunter: {
    name: "Hunter",
    color: "#8a6a3a",
    sequence: "Sequence 9 · The Provoker",
    tarot: "hunter",
    description: "The Hunter Pathway selects those who are most alive in the pursuit — minds that read terrain, predict behavior, and commit fully once the target is acquired. You do not lose people. You do not lose trails. What you sometimes lose is the line between hunter and prey.",
    strengths: [
      { icon: "◎", name: "Predatory Focus",        desc: "Single-target concentration is absolute" },
      { icon: "◎", name: "Environmental Awareness",desc: "You read spaces and people as terrain" },
      { icon: "◎", name: "Commitment Under Pressure", desc: "Fear sharpens rather than paralyzes you" },
    ],
    risks: [
      { icon: "◈", name: "Obsessive Lock-On",      desc: "The hunt becomes the meaning, not the outcome" },
      { icon: "◈", name: "Instinct Contamination", desc: "Animal Sequences accelerate behavioral drift" },
      { icon: "◈", name: "Isolation by Design",    desc: "The lone hunter eventually becomes the prey" },
    ],
    stability: 62, corruption: 58, survival: 78, advancement: 72,
    warning: "Do not pursue the same target for more than 72 consecutive hours without mandatory withdrawal. Tunnel vision is the first sign of instinct contamination."
  },

  marauder: {
    name: "Marauder",
    color: "#aa3a3a",
    sequence: "Sequence 9 · The Bystander",
    tarot: "marauder",
    description: "The Marauder Pathway selects those with profound spatial intelligence and territorial instinct — those who understand space as power and who convert environment into advantage. You do not just occupy rooms. You own them the moment you enter.",
    strengths: [
      { icon: "◎", name: "Spatial Dominance",      desc: "You convert environment into tactical advantage" },
      { icon: "◎", name: "Territorial Instinct",   desc: "You know when a space is yours and when it is not" },
      { icon: "◎", name: "Raw Power Tolerance",    desc: "You do not flinch at force — yours or others'" },
    ],
    risks: [
      { icon: "◈", name: "Escalation Reflex",      desc: "Every conflict tends toward maximum force" },
      { icon: "◈", name: "Subtlety Blindness",     desc: "Influence without power reads as weakness to you" },
      { icon: "◈", name: "Pride Contamination",    desc: "Dominance as identity is a Sequence trap with no floor" },
    ],
    stability: 55, corruption: 64, survival: 82, advancement: 68,
    warning: "Avoid confrontation with higher-Sequence beings when territorial instinct is activated. The Marauder Pathway's contamination accelerates dramatically when pride overrides threat assessment."
  }
}