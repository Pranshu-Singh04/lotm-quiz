// frontend/src/data/pathways.js
// All 22 canonical Lord of Mysteries Beyonder Pathways

export const PATHWAYS = {

  // ─── GROUP 1: LORD OF MYSTERIES ────────────────────────────────────────

  fool: {
    name: 'Fool',
    color: '#c9973a',
    sequence: 'Sequence 9 · Seer',
    tarot: 'fool',
    semanticProfile: 'Perceptive paradoxical trickster who reads fate and operates between all systems. Adapts identities while preserving core self. Embraces ambiguity, misdirection, and the space between chaos and order. Comfortable with paradox. Observes more than acts, acts decisively when necessary.',
    description: 'The Fool Pathway selects the extraordinarily rare — those who hold chaos and order in equal tension, who can play any role without losing themselves. You are adaptable to a degree that frightens others, and your greatest strength is that no one can fully predict you — including yourself.',
    strengths: [
      { icon: '◎', name: 'Radical Adaptability',  desc: 'Shift personas without losing what lies beneath' },
      { icon: '◎', name: 'Meta-Awareness',         desc: 'Understand the game while playing it' },
      { icon: '◎', name: 'Fate Tolerance',         desc: 'Navigate probability without losing your footing' },
    ],
    risks: [
      { icon: '◈', name: 'Identity Diffusion',     desc: 'Too many roles erode the self underneath' },
      { icon: '◈', name: 'Overconfidence',         desc: 'Adaptability breeds recklessness at higher Sequences' },
      { icon: '◈', name: 'Divine Entanglement',    desc: 'The Fool watches back' },
    ],
    stability: 68, corruption: 42, survival: 80, advancement: 85,
    warning: 'Do not invoke the Fool\'s name carelessly. The connection between Clown and patron is bidirectional. Humor as a coping mechanism accelerates this Pathway\'s contamination rate.',
  },

  error: {
    name: 'Error',
    color: '#9a4aaa',
    sequence: 'Sequence 9 · Marauder',
    tarot: 'error',
    semanticProfile: 'Opportunistic thief and chameleon who exploits loopholes and steals abilities from others. Highly adaptive with no fixed identity. Sees all relationships transactionally. Lives in the cracks between rules. Charming and persuasive — uses words as weapons. A deliberate bug in the system of reality.',
    description: 'The Error Pathway selects those who live in the margins — between rules, between identities, between what is permitted and what is possible. You find the gap in every system and walk through it. Power you accumulate was never originally yours; the question is whether that distinction means anything to you.',
    strengths: [
      { icon: '◎', name: 'System Exploitation',   desc: 'Every rule has a loophole; you find it first' },
      { icon: '◎', name: 'Ability Theft',          desc: 'What they built, you can take' },
      { icon: '◎', name: 'Adaptive Identity',      desc: 'You are whatever the moment requires' },
    ],
    risks: [
      { icon: '◈', name: 'Parasitic Drift',        desc: 'Becoming purely derivative — losing authentic self' },
      { icon: '◈', name: 'Loyalty Erosion',        desc: 'Transactional relationships corrode everything' },
      { icon: '◈', name: 'Identity Collapse',      desc: 'Too many stolen faces, not enough of your own' },
    ],
    stability: 48, corruption: 68, survival: 72, advancement: 82,
    warning: 'Beyonders of this Pathway report increasing difficulty distinguishing their original preferences from those absorbed during theft operations. If you cannot identify a preference that pre-dates your first Sequence, seek immediate counseling.',
  },

  door: {
    name: 'Door',
    color: '#3aaa8a',
    sequence: 'Sequence 9 · Apprentice',
    tarot: 'door',
    semanticProfile: 'Restless spatial wanderer who collects knowledge and abilities of others while evading being known. Values freedom of movement above almost everything. Feels trapped by fixed identities, locations, and rules. Perpetual traveler who observes from the threshold. The idea of being trapped is deeply disturbing.',
    description: 'The Door Pathway selects those who cannot be contained — not by walls, not by identity, not by the limits of any single world. You collect knowledge of other Beyonders like a traveling merchant collects rare items: not necessarily to use it, but because you cannot bear not having access to it.',
    strengths: [
      { icon: '◎', name: 'Spatial Mastery',        desc: 'Distance is a concept, not a constraint' },
      { icon: '◎', name: 'Ability Recording',      desc: 'Witness it once; replicate it at will' },
      { icon: '◎', name: 'Detection Immunity',     desc: 'The best hunters cannot track what has no fixed position' },
    ],
    risks: [
      { icon: '◈', name: 'Detachment Spiral',      desc: 'Perpetual wandering severs all anchors' },
      { icon: '◈', name: 'Knowledge Without Roots',desc: 'Collected abilities without integration' },
      { icon: '◈', name: 'Liminal Corruption',     desc: 'Too much time between worlds warps perception' },
    ],
    stability: 60, corruption: 45, survival: 85, advancement: 75,
    warning: 'Avoid prolonged residence in dimensional interstitial spaces. Beyonders of this Pathway who spend more than 72 consecutive hours in non-standard spatial configurations have reported irreversible perceptual alterations.',
  },

  // ─── GROUP 2: GOD ALMIGHTY ────────────────────────────────────────────

  visionary: {
    name: 'Visionary',
    color: '#9a6ac9',
    sequence: 'Sequence 9 · Spectator',
    tarot: 'visionary',
    semanticProfile: 'Psychological analyst who reads emotions and hidden motivations with surgical precision. Fascinated by the subconscious and what people truly want versus what they say. Skilled at presenting exactly the right response. Values truth but understands it is always layered. May lose themselves in constructed realities.',
    description: 'The Visionary Pathway attracts those who understand people as systems — who observe social dynamics the way an engineer reads a schematic. You prefer influence over force, invisibility over presence. You are most dangerous when least visible, and most vulnerable when you forget that the mind you analyze most closely is your own.',
    strengths: [
      { icon: '◎', name: 'Psychological Precision', desc: 'You read rooms, alliances, and hidden motivations' },
      { icon: '◎', name: 'Emotional Regulation',   desc: 'You do not react; you respond with surgical precision' },
      { icon: '◎', name: 'Dream Architecture',     desc: 'You reshape what others believe is real' },
    ],
    risks: [
      { icon: '◈', name: 'Detachment Creep',       desc: 'Extended observation erodes genuine connection' },
      { icon: '◈', name: 'Manipulation Normalization', desc: 'The tools become instincts without notice' },
      { icon: '◈', name: 'Reality Dissolution',    desc: 'A mind powerful enough to build worlds can lose its own' },
    ],
    stability: 62, corruption: 52, survival: 77, advancement: 80,
    warning: 'Maintain at least one genuine relationship outside your strategic framework. If you cannot identify one, this indicates mid-stage contamination.',
  },

  sun: {
    name: 'Sun',
    color: '#e8c430',
    sequence: 'Sequence 9 · Priest of Light',
    tarot: 'sun',
    semanticProfile: 'Charismatic moral beacon radiating holy light and warmth. Clearly divides the world into light and darkness. Self-sacrificing leader who inspires others toward virtue. Seeks purification and cannot tolerate corruption or ambiguity for long. Strong sense of justice. Warm and principled — others naturally look to them.',
    description: 'The Sun Pathway selects those who carry their light without dimming it for anyone. You are most yourself when inspiring others — not through manipulation, but through the sheer force of what you stand for. The darkness does not frighten you; it clarifies you.',
    strengths: [
      { icon: '◎', name: 'Moral Clarity',          desc: 'You cut through ambiguity to the essential' },
      { icon: '◎', name: 'Inspirational Presence', desc: 'Others become better in your proximity' },
      { icon: '◎', name: 'Holy Purification',      desc: 'Corruption cannot survive sustained contact' },
    ],
    risks: [
      { icon: '◈', name: 'Zealotry',               desc: 'The mission of purification justifies any means' },
      { icon: '◈', name: 'Burnout',                desc: 'The light that shines for everyone goes out first' },
      { icon: '◈', name: 'Rigidity',               desc: 'Moral clarity curdles into moral blindness' },
    ],
    stability: 85, corruption: 18, survival: 82, advancement: 65,
    warning: 'Holy light is not immune to corruption — it is corrupted differently. A Sun Beyonder who begins justifying darkness as a temporary tool for ultimate purification is already compromised. This progression is almost always invisible to the Beyonder themselves.',
  },

  tyrant: {
    name: 'Tyrant',
    color: '#4a6ac9',
    sequence: 'Sequence 9 · Sailor',
    tarot: 'tyrant',
    semanticProfile: 'Commanding maritime leader with fierce protective loyalty to their crew and followers. Unpredictably explosive emotional expression — calm one moment, raging storm the next. Values tradition, hierarchy, and the bond between leader and followers. Respects strength and directness. Dislikes manipulation.',
    description: 'The Tyrant Pathway selects those who command not because they want to, but because nature has made them incapable of anything else. You are the eye of the storm — terrifyingly calm at the center, while everything rotates around your force of will. Those you claim are yours completely. They know it. So do you.',
    strengths: [
      { icon: '◎', name: 'Command Presence',       desc: 'Authority is not taken — it emanates' },
      { icon: '◎', name: 'Elemental Attunement',   desc: 'The storm answers what the storm understands' },
      { icon: '◎', name: 'Fierce Loyalty',         desc: 'You protect yours with the force of a hurricane' },
    ],
    risks: [
      { icon: '◈', name: 'Absolute Authority',     desc: 'Belief that your word is the highest law' },
      { icon: '◈', name: 'Emotional Volatility',   desc: 'The storm does not always spare the ship' },
      { icon: '◈', name: 'Hierarchy Calcification',desc: 'The structure exists to protect the leader, not the led' },
    ],
    stability: 70, corruption: 45, survival: 88, advancement: 72,
    warning: 'Tyrant Pathway contamination presents as an expanding definition of "mine." At advanced stages, Beyonders report visceral hostility toward any person, idea, or rule they cannot subordinate to their will.',
  },

  whitetower: {
    name: 'White Tower',
    color: '#7ab4d9',
    sequence: 'Sequence 9 · Savant',
    tarot: 'whitetower',
    semanticProfile: 'Intellectually voracious analyst who values knowledge as an end in itself. Calm, methodical, and precise — rarely acts without thorough analysis. Deeply uncomfortable with ignorance. May appear cold or detached. Processes all experience as data. Seeks comprehensive understanding of everything.',
    description: 'The White Tower Pathway selects those whose greatest pleasure is a question fully answered — not for what the answer enables, but because the answer exists and they now hold it. You do not just collect facts. You collect the architecture of reality, layer by layer, until the shape of what is hidden becomes visible.',
    strengths: [
      { icon: '◎', name: 'Comprehensive Analysis', desc: 'You see what others cannot, because you look everywhere' },
      { icon: '◎', name: 'Memory Precision',       desc: 'Nothing you have learned is lost or diluted' },
      { icon: '◎', name: 'Law Comprehension',      desc: 'Universal rules are not abstract — they are legible' },
    ],
    risks: [
      { icon: '◈', name: 'Empathy Erosion',        desc: 'People become data points in a comprehensive dataset' },
      { icon: '◈', name: 'Obsessive Completion',   desc: 'No gap in understanding is acceptable; none ever fully close' },
      { icon: '◈', name: 'Knowledge as Justification', desc: 'Understanding the cost doesn\'t always prevent paying it' },
    ],
    stability: 80, corruption: 30, survival: 78, advancement: 70,
    warning: 'If you find yourself increasingly unable to interact with people without simultaneously analyzing them — if relationship has become indistinguishable from observation — withdraw from social environments for peer review.',
  },

  hangedman: {
    name: 'Hanged Man',
    color: '#3a7ac9',
    sequence: 'Sequence 9 · Secrets Suppliant',
    tarot: 'hangedman',
    semanticProfile: 'Sacrifice-oriented mystic comfortable with darkness, shadow, and the hidden price of all things. Values what is surrendered more than what is gained. Accepts pain as a form of power. Introspective and aware of duty to forces beyond understanding. The one who endures — strength through acceptance.',
    description: 'The Hanged Man Pathway selects those who understand, at a level beyond philosophy, that everything has a price and that paying it consciously is the only form of freedom. You are not a masochist. You are a cost accountant for reality — and you have made your peace with what the ledger requires.',
    strengths: [
      { icon: '◎', name: 'Shadow Mastery',         desc: 'Darkness is your medium, not your obstacle' },
      { icon: '◎', name: 'Sacrifice Tolerance',    desc: 'You know what everything costs; few things surprise you' },
      { icon: '◎', name: 'Endurance Without Limit',desc: 'The one who can bear what others cannot outlasts everything' },
    ],
    risks: [
      { icon: '◈', name: 'Martyrdom Drift',        desc: 'Acceptance of suffering becomes embrace of it' },
      { icon: '◈', name: 'Moral Compass Erosion',  desc: 'So immersed in depravity, the original direction is lost' },
      { icon: '◈', name: 'Depraved Attunement',    desc: 'The whispers begin to sound like good advice' },
    ],
    stability: 50, corruption: 60, survival: 75, advancement: 78,
    warning: 'Hanged Man Beyonders are advised to maintain a written record of their original values and review it monthly. Contamination presents as a gradual conviction that those original values were naive.',
  },

  // ─── GROUP 3: ETERNAL DARKNESS ────────────────────────────────────────

  darkness: {
    name: 'Darkness',
    color: '#5a3a8a',
    sequence: 'Sequence 9 · Sleepless',
    tarot: 'darkness',
    semanticProfile: 'Protective guardian of the night who thrives in concealment and solitude. Patient, vigilant, and empathetic to those who suffer in secret. Prefers subtlety over spectacle. Most effective when unnoticed. The darkness hides many kinds of pain — this Beyonder watches over them all.',
    description: 'The Darkness Pathway selects those who understand that the unseen does not mean the unimportant. You are the guardian that no one knows they have. Your protection is most complete when it is most invisible. You are not the hero of this story. That is precisely your advantage.',
    strengths: [
      { icon: '◎', name: 'Concealment Mastery',    desc: 'You are not there until you choose to be' },
      { icon: '◎', name: 'Soul Protection',        desc: 'The night belongs to those you guard' },
      { icon: '◎', name: 'Vigilant Patience',      desc: 'You will outlast anyone who threatens what you keep' },
    ],
    risks: [
      { icon: '◈', name: 'Over-Isolation',         desc: 'The guardian who retreats too far loses what they guard' },
      { icon: '◈', name: 'Connection Atrophy',     desc: 'The unseen eventually forgets what the seen looks like' },
      { icon: '◈', name: 'Night Dependency',       desc: 'Power tied to darkness weakens in the light you were protecting' },
    ],
    stability: 78, corruption: 28, survival: 83, advancement: 62,
    warning: 'Darkness Pathway Beyonders are at elevated risk of prolonged isolation. If your last meaningful interaction with a non-Beyonder was more than three months ago, this is an urgent warning sign, not a success metric.',
  },

  death: {
    name: 'Death',
    color: '#5a8a6a',
    sequence: 'Sequence 9 · Gravedigger',
    tarot: 'death',
    semanticProfile: 'Philosophical necromancer calmly accepting transformation and the transition of death. Values what endures beyond death: legacy, duty, memory. Emotionally detached through long exposure to loss. Treats mortality as transition, not ending. The Death tarot emphasizes transformation and rebirth.',
    description: 'The Death Pathway selects those who have stared long enough at endings to understand what they actually are. You are not morbid — you are clear-eyed. Death is the most honest thing in the world. Everything else is a temporary arrangement. You have authority at the boundary where all temporary arrangements conclude.',
    strengths: [
      { icon: '◎', name: 'Soul Authority',         desc: 'The boundary between life and death is yours to manage' },
      { icon: '◎', name: 'Philosophical Clarity',  desc: 'Nothing that ends has the power to frighten you' },
      { icon: '◎', name: 'Undead Command',         desc: 'Death does not end your resources; it expands them' },
    ],
    risks: [
      { icon: '◈', name: 'Living Detachment',      desc: 'Becoming so comfortable with death you accelerate it' },
      { icon: '◈', name: 'Cycle Disruption',       desc: 'Authority over death is not authority over its consequences' },
      { icon: '◈', name: 'Necromantic Drift',      desc: 'The dead are easier to manage than the living — and more dangerous' },
    ],
    stability: 72, corruption: 40, survival: 74, advancement: 68,
    warning: 'Any Death Pathway Beyonder who reports finding the company of the dead preferable to the living must enter immediate review. This is the primary early indicator of advanced contamination in this Pathway.',
  },

  twilightgiant: {
    name: 'Twilight Giant',
    color: '#c96a3a',
    sequence: 'Sequence 9 · Warrior',
    tarot: 'twilightgiant',
    semanticProfile: 'Direct courageous warrior who finds meaning in honorable combat and genuine struggle. Action-oriented and fearless. Measures worth through honest competition with worthy opponents. Competitive and brave. Carries the weight of the day and the coming of the night — exists at the boundary between extremes.',
    description: 'The Twilight Giant Pathway selects those who are most fully themselves in the moment of genuine struggle. Not the moment of victory — the moment before it, when the outcome is uncertain and everything depends on you. You have the body of a giant and the soul of a warrior. The threshold between day and night is where you live.',
    strengths: [
      { icon: '◎', name: 'Combat Supremacy',       desc: 'At the limit of physical possibility — and beyond' },
      { icon: '◎', name: 'Battle Presence',        desc: 'Nearby fighters are elevated by your proximity' },
      { icon: '◎', name: 'Fearlessness',           desc: 'Fear is something to be met, not managed' },
    ],
    risks: [
      { icon: '◈', name: 'Conflict Addiction',     desc: 'Unable to find purpose outside of the fight' },
      { icon: '◈', name: 'Honor as Trap',          desc: 'Refusing to win dishonorably even when it matters' },
      { icon: '◈', name: 'Twilight Instability',   desc: 'The threshold between day and night is not a stable position' },
    ],
    stability: 65, corruption: 48, survival: 90, advancement: 70,
    warning: 'Twilight Giant Beyonders in extended peacetime show dramatically elevated contamination rates. The Pathway is designed for struggle. Without it, the giant form is not contained — it seeks release.',
  },

  // ─── GROUP 4: CALAMITY OF DESTRUCTION ────────────────────────────────

  demoness: {
    name: 'Demoness',
    color: '#c93a7a',
    sequence: 'Sequence 9 · Assassin',
    tarot: 'demoness',
    semanticProfile: 'Fiercely independent and intensely passionate. Ruthless when crossed, capable of genuine loyalty to the chosen few. Seductive not just physically but intellectually — draws others through fascination. Comfortable using chaos as a tool. Everything felt at full intensity. Answers to no one.',
    description: 'The Demoness Pathway selects those who cannot be owned — who choose their loyalties freely and completely, and who respond to any attempt at control with something approaching destruction. You are not chaos for its own sake. You are the creative force that cannot be constrained without ceasing to be itself.',
    strengths: [
      { icon: '◎', name: 'Lethal Grace',           desc: 'Power that moves like poison — beautiful and final' },
      { icon: '◎', name: 'Absolute Independence',  desc: 'No leash, no handler, no debt' },
      { icon: '◎', name: 'Catastrophe Authority',  desc: 'When you choose destruction, reality answers' },
    ],
    risks: [
      { icon: '◈', name: 'Destruction Without Purpose', desc: 'Losing the line between what to protect and what to ruin' },
      { icon: '◈', name: 'Isolation by Design',    desc: 'No leash cuts both ways' },
      { icon: '◈', name: 'Empress Inversion',      desc: 'Abundance turned entirely to destruction' },
    ],
    stability: 42, corruption: 65, survival: 80, advancement: 85,
    warning: 'Note: The Demoness Pathway has historical barriers to full advancement for male-identified Beyonders. Bureau records do not explain this; we advise awareness of pathway-specific constraints before commitment.',
  },

  redpriest: {
    name: 'Red Priest',
    color: '#c93a3a',
    sequence: 'Sequence 9 · Warrior Priest',
    tarot: 'redpriest',
    semanticProfile: 'Battle-drunk war priest who leads through shared struggle and fierce passion. Feels most alive at highest stakes. Values loyalty and brotherhood forged in conflict. Believes strength defines the right to lead. Can lose rationality to berserker rage. Intensely passionate, everything felt and expressed fully.',
    description: 'The Red Priest Pathway selects those who understand, viscerally, that conflict is not a problem to be solved but the medium in which meaning is made. You do not enjoy violence for its own sake. You enjoy the intensity, the clarity, the stripping away of everything except what matters. War is just the environment where that happens most efficiently.',
    strengths: [
      { icon: '◎', name: 'Battle Leadership',      desc: 'In the chaos of conflict, you become the center' },
      { icon: '◎', name: 'Berserker Release',      desc: 'When control ends, something ancient begins' },
      { icon: '◎', name: 'War Manifestation',      desc: 'You do not fight battles; you become them' },
    ],
    risks: [
      { icon: '◈', name: 'Peacetime Disintegration', desc: 'Without war, what is a war god?' },
      { icon: '◈', name: 'Rage Without Target',    desc: 'Berserker state does not distinguish ally from enemy' },
      { icon: '◈', name: 'Conflict Worship',       desc: 'Believing all problems have a violent solution' },
    ],
    stability: 52, corruption: 62, survival: 85, advancement: 75,
    warning: 'Red Priest Beyonders are categorically prohibited from entering civilian areas while in active Pathway states. Contamination in this Pathway presents as a progressive inability to perceive non-violent solutions to any problem.',
  },

  // ─── GROUP 5: DEMON OF KNOWLEDGE ─────────────────────────────────────

  hermit: {
    name: 'Hermit',
    color: '#8a7a4a',
    sequence: 'Sequence 9 · Apprentice Mage',
    tarot: 'hermit',
    semanticProfile: 'Withdrawn arcane sage who values knowledge as sacred. Self-sufficient and deeply patient. Speaks only when they have something meaningful to say. Introspective and wise from long solitary study. Carries their own light through the darkness. Prefers solitude where they can think and study undisturbed.',
    description: 'The Hermit Pathway selects those for whom knowledge is not a means to an end but the end itself — and who are willing to spend decades in the pursuit of a single answer. You are not antisocial. You are selective. The company of a true question is richer than the company of most people.',
    strengths: [
      { icon: '◎', name: 'Arcane Depth',           desc: 'What you have studied, you have studied completely' },
      { icon: '◎', name: 'Stellar Authority',      desc: 'The stars are one of several languages you speak' },
      { icon: '◎', name: 'Occult Independence',    desc: 'You carry everything you need within yourself' },
    ],
    risks: [
      { icon: '◈', name: 'Irrelevance Drift',      desc: 'Knowledge accumulated without application loses purpose' },
      { icon: '◈', name: 'Social Atrophy',         desc: 'Decades of solitude rewire what connection means' },
      { icon: '◈', name: 'The Hidden Sage\'s Shadow', desc: 'Following in footsteps that lead somewhere you haven\'t been told about' },
    ],
    stability: 82, corruption: 25, survival: 74, advancement: 68,
    warning: 'Hermit Pathway Beyonders are advised to maintain at least quarterly contact with non-academic acquaintances. The insidious contamination risk of this Pathway is not dramatic — it is incremental loss of any reason to emerge.',
  },

  paragon: {
    name: 'Paragon',
    color: '#4a8a7a',
    sequence: 'Sequence 9 · Craftsman',
    tarot: 'paragon',
    semanticProfile: 'Perfectionist craftsman-scientist who sees all problems as engineering puzzles. Creates things that outlast the creator. Combines mysticism with technical precision. Takes pride in craftsmanship — what they make reflects who they are. Process matters as much as result. Practical and methodical.',
    description: 'The Paragon Pathway selects those who find their truest expression in making things — not for recognition, not for power, but because the act of creation is the clearest form of understanding. A finished artifact is proof of comprehension. An imperfect one is an open question. Neither is acceptable.',
    strengths: [
      { icon: '◎', name: 'Artifact Creation',      desc: 'You make things that could not exist without you' },
      { icon: '◎', name: 'Scientific Mysticism',   desc: 'You hold both disciplines without contradiction' },
      { icon: '◎', name: 'Physics Alteration',     desc: 'The laws of nature are a draft, not a final document' },
    ],
    risks: [
      { icon: '◈', name: 'Perfectionism Paralysis',desc: 'The work is never finished because it can always be better' },
      { icon: '◈', name: 'Creation Obsession',     desc: 'The artifact matters more than the people near it' },
      { icon: '◈', name: 'Civilization Detachment',desc: 'You are building toward the light of progress — from very far ahead of everyone else' },
    ],
    stability: 80, corruption: 22, survival: 76, advancement: 75,
    warning: 'Paragon Beyonders showing signs of prioritizing the completion of a creation over the safety of themselves or others must be reviewed immediately. This is consistently the most common precursor to catastrophic contamination events in this Pathway.',
  },

  // ─── GROUP 6: KEY OF LIGHT ────────────────────────────────────────────

  wheeloffortune: {
    name: 'Wheel of Fortune',
    color: '#c9a33a',
    sequence: 'Sequence 9 · Monster',
    tarot: 'wheeloffortune',
    semanticProfile: 'Philosophically flexible rider of fortune\'s wheel. Adaptable and comfortable with unpredictability and chaos. May seem carefree but has deep awareness underneath. Fatalistic about setbacks — every reversal contains the seed of the next turn. Embodies change itself. Nothing stays the same.',
    description: 'The Wheel of Fortune Pathway selects those who have internalized a truth most people spend their lives resisting: that change is not an interruption — it is the mechanism. You do not control the wheel. You learn to move with it, to be at the center when it turns in your favor, and not to be crushed when it turns against you.',
    strengths: [
      { icon: '◎', name: 'Probability Mastery',    desc: 'You tilt the odds without announcing you have done so' },
      { icon: '◎', name: 'Fortune Attunement',     desc: 'Luck is not random for you — it is a resource' },
      { icon: '◎', name: 'Chaos Resilience',       desc: 'What disrupts others is your native environment' },
    ],
    risks: [
      { icon: '◈', name: 'Fatalism',               desc: 'Relying so completely on fortune that agency atrophies' },
      { icon: '◈', name: 'Collateral Fortune',     desc: 'Your luck affects everyone nearby — not always positively' },
      { icon: '◈', name: 'Wheel Imbalance',        desc: 'The one who controls fortune cannot avoid its turns' },
    ],
    stability: 50, corruption: 38, survival: 78, advancement: 80,
    warning: 'Wheel of Fortune Beyonders in extended periods of good fortune are statistically more likely to suffer catastrophic reversal. The Pathway appears to maintain balance without the Beyonder\'s input.',
  },

  // ─── GROUP 7: GODDESS OF ORIGIN ──────────────────────────────────────

  mother: {
    name: 'Mother',
    color: '#6a9a4a',
    sequence: 'Sequence 9 · Planter',
    tarot: 'mother',
    semanticProfile: 'Nurturing life-creator who thinks in seasons and cycles. Patient as the earth itself. Deeply connected to physical growth, healing, flesh, and renewal. Finds purpose in tending others. The World card represents completion — drawn toward creating whole self-sustaining systems. Might struggle with letting things be free.',
    description: 'The Mother Pathway selects those who understand that the act of nurturing is not passive — it is the most demanding and most dangerous form of power. You create life. You shape it. You decide what is healthy and what is not. The line between protection and control is drawn in your hands.',
    strengths: [
      { icon: '◎', name: 'Life Creation',          desc: 'What you tend grows; what you create lives' },
      { icon: '◎', name: 'Biological Authority',   desc: 'The processes of living things are yours to redirect' },
      { icon: '◎', name: 'Healing Depth',          desc: 'You repair what others cannot even diagnose' },
    ],
    risks: [
      { icon: '◈', name: 'Control Through Nurture',desc: 'The line between caring and ownership' },
      { icon: '◈', name: 'Desolate Matriarch',     desc: 'Unchecked maternal power becomes consuming' },
      { icon: '◈', name: 'Chimera Instability',    desc: 'Creating life without fully understanding what you\'ve made' },
    ],
    stability: 75, corruption: 35, survival: 78, advancement: 70,
    warning: 'Mother Pathway Beyonders are advised to regularly audit their relationships for signs of dependency cultivation. If you find that those in your care would struggle to function without you, this is the primary contamination vector for this Pathway.',
  },

  moon: {
    name: 'Moon',
    color: '#a0b8e8',
    sequence: 'Sequence 9 · Apothecary',
    tarot: 'moon',
    semanticProfile: 'Cyclically transforming shapeshifter attuned to primal instinct and the subconscious. Sensual and physically aware. Draws power from moonlight. Magnetic and unsettling. Constant tension between controlled self and primal nature. Introspective. Moods and energy shift like phases of the moon. The beast within is always present.',
    description: 'The Moon Pathway selects those who live in the tension between what they are and what they become. The moon does not apologize for its phases. Neither do you. Your power comes from the primal, and the primal does not ask for permission. The question is not whether you can contain it — it is whether you can direct it.',
    strengths: [
      { icon: '◎', name: 'Primal Attunement',      desc: 'Instinct is not chaos — it is a faster kind of analysis' },
      { icon: '◎', name: 'Lycanthropic Enhancement',desc: 'Physical ceiling is wherever you stop deciding it is' },
      { icon: '◎', name: 'Moonlight Authority',    desc: 'You draw power from what illuminates the darkness' },
    ],
    risks: [
      { icon: '◈', name: 'Full Moon Regression',   desc: 'The beast is not always waiting for permission' },
      { icon: '◈', name: 'Cyclical Instability',   desc: 'Power and control fluctuate with the phases' },
      { icon: '◈', name: 'Primal Override',        desc: 'In moments of extreme emotion, the body decides before the mind' },
    ],
    stability: 48, corruption: 58, survival: 80, advancement: 75,
    warning: 'Moon Pathway Beyonders must maintain a lunar activity log. Behavioral pattern deviation beyond 15% from baseline in the three days preceding and following the full moon constitutes a mandatory review event.',
  },

  // ─── GROUP 8: FATHER OF DEVILS ────────────────────────────────────────

  abyss: {
    name: 'Abyss',
    color: '#8a2a3a',
    sequence: 'Sequence 9 · Criminal',
    tarot: 'abyss',
    semanticProfile: 'Commanding corruptor deeply in touch with their own desires and the desires of others. May have had noble origins before descent. Views the world through power and desire — what you want, and how much you will give to get it. Commanding and intimidating. Takes pride in refusing to pretend to be something they are not.',
    description: 'The Abyss Pathway selects those who have stopped pretending. You know what you want. You know what others want. The pretense of not wanting it — the polite theater of restraint — is simply not interesting to you. You have looked into the abyss. It looked back. You were not afraid. That is, frankly, the concerning part.',
    strengths: [
      { icon: '◎', name: 'Desire Mastery',         desc: 'You understand what anyone wants before they say it' },
      { icon: '◎', name: 'Demonic Authority',      desc: 'The forces of the abyss answer you' },
      { icon: '◎', name: 'Corruption Immunity',    desc: 'You cannot be tempted by what you have already claimed' },
    ],
    risks: [
      { icon: '◈', name: 'Complete Descent',       desc: 'The original self becomes a distant memory' },
      { icon: '◈', name: 'Domination Addiction',   desc: 'The desire to consume and control erases all other desires' },
      { icon: '◈', name: 'Abyssal Singularity',    desc: 'What enters the abyss does not always come back as what it was' },
    ],
    stability: 38, corruption: 82, survival: 72, advancement: 88,
    warning: 'Bureau assessment: Abyss Pathway Beyonders at Sequence 7 or below with no documented maintenance regimen have a contamination rate of 94% over a ten-year period. We advise extreme caution in all initial classifications.',
  },

  chained: {
    name: 'Chained',
    color: '#5a4a7a',
    sequence: 'Sequence 9 · Prisoner',
    tarot: 'chained',
    semanticProfile: 'Resilient curse-bearer deeply aware of their own limitations. Endures because they must. Internally conflicted between cursed nature and who they want to be. Profound empathy for others who are trapped, constrained, or misunderstood. Both binds others and is themselves always bound. Resilient beyond what seems possible.',
    description: 'The Chained Pathway selects those who know what it means to carry something they did not choose. Every ability you gain comes with a constraint. Every power is paired with a curse. And yet you persist — not because the situation is fair, but because enduring is what you do. You carry the chain. Sometimes you use it.',
    strengths: [
      { icon: '◎', name: 'Constraint Mastery',     desc: 'You bind and imprison with cosmic-scale authority' },
      { icon: '◎', name: 'Curse Resilience',       desc: 'You survive what the Pathway demands, repeatedly' },
      { icon: '◎', name: 'Empathic Depth',         desc: 'No one understands the trapped better than the chained' },
    ],
    risks: [
      { icon: '◈', name: 'Curse Consumption',      desc: 'The constraint eventually consumes its bearer' },
      { icon: '◈', name: 'Control Rigidity',       desc: 'So focused on holding it together that nothing can move' },
      { icon: '◈', name: 'Lunar Collapse',         desc: 'Full moon events remain beyond management at lower Sequences' },
    ],
    stability: 45, corruption: 55, survival: 80, advancement: 65,
    warning: 'Chained Pathway Beyonders who report feeling "at peace" with their cursed state must be evaluated immediately. Acceptance is the primary contamination signal for this Pathway — not rage, not despair. Acceptance.',
  },

  // ─── GROUP 9: THE ANARCHY ─────────────────────────────────────────────

  blackemperor: {
    name: 'Black Emperor',
    color: '#9a7a2a',
    sequence: 'Sequence 9 · Pugilist',
    tarot: 'blackemperor',
    semanticProfile: 'Born ruler who assumes authority without asking for it. Highly strategic, thinks in systems, empires, and long-term control. May have genuine vision or pure ambition — often both. Demands loyalty and rewards it generously. Betrayal met with total ruthlessness. Does not need to request authority — simply assumes it.',
    description: 'The Black Emperor Pathway selects those who do not ask to lead — they simply begin. You organize. You command. You reward loyalty and eliminate everything else. Whether your empire serves a genuine vision or merely serves itself is a question that will be asked of you eventually. The answer will determine whether your Sequence 0 is a throne or a tomb.',
    strengths: [
      { icon: '◎', name: 'Imperial Authority',     desc: 'You establish order wherever you stand' },
      { icon: '◎', name: 'Strategic Vision',       desc: 'You think in systems, timelines, and legacies' },
      { icon: '◎', name: 'Command Presence',       desc: 'Others organize themselves around you before you ask' },
    ],
    risks: [
      { icon: '◈', name: 'Tyranny Threshold',      desc: 'The line between order and domination is thin and crossed early' },
      { icon: '◈', name: 'Loyalty Distortion',     desc: 'What began as earned becomes demanded becomes enforced' },
      { icon: '◈', name: 'Vision Corruption',      desc: 'Genuine purpose replaced by pure accumulation of control' },
    ],
    stability: 72, corruption: 50, survival: 82, advancement: 88,
    warning: 'Black Emperor Pathway Beyonders are advised to maintain external accountability structures. Bureau records show a 100% rate of contamination in Beyonders of this Pathway who eliminate their last genuine check on their authority.',
  },

  justiciar: {
    name: 'Justiciar',
    color: '#6a8a5a',
    sequence: 'Sequence 9 · Judge',
    tarot: 'justiciar',
    semanticProfile: 'Deeply principled judge who applies identical standards to self and others. Viscerally uncomfortable in the presence of injustice. Cannot easily look away from wrongdoing. More judicial than evangelical — the Justiciar judges, not purifies. Trusted even by those who fear them for their known impartiality.',
    description: 'The Justiciar Pathway selects those who cannot live with wrong going unaddressed — not the evangelical crusader who seeks to purify, but the cold, precise arbiter who seeks to account. You detect the lie in the room before the liar finishes speaking. You feel injustice as a physical discomfort. This is your superpower and your permanent affliction.',
    strengths: [
      { icon: '◎', name: 'Truth Detection',        desc: 'Lies have a texture; you read it fluently' },
      { icon: '◎', name: 'Cosmic Judgment',        desc: 'At higher Sequences, your rulings shape reality itself' },
      { icon: '◎', name: 'Impartial Authority',    desc: 'Trusted even by those who fear the verdict' },
    ],
    risks: [
      { icon: '◈', name: 'Self-Righteousness',     desc: 'The arbiter who mistakes their own will for truth' },
      { icon: '◈', name: 'Whose Justice?',         desc: 'Operating outside formal structures raises legitimacy questions' },
      { icon: '◈', name: 'Justice Rigidity',       desc: 'Equity and mercy are not the same as justice — and sometimes they conflict' },
    ],
    stability: 85, corruption: 20, survival: 80, advancement: 72,
    warning: 'The most dangerous Justiciar Pathway contamination event in Bureau records was a Beyonder who could no longer distinguish between their perception of injustice and actual injustice. The contamination had not altered their principles — only their ability to apply them accurately.',
  },

}
