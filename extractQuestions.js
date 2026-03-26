const fs = require("fs");

const QBank = [
  // RISK APPETITE (10)
  {w:3,s:"Risk Appetite",q:"You discover a sealed document labelled: 'Do not read. Irreversible consequences.'",sub:"What is your first impulse?",opts:[
    {t:"Read it immediately.",s:{mystery:3,seer:2,fool:1}},
    {t:"Study the seal and context first.",sub:"The document tells you something before you open it.",s:{reader:3,spectator:2,sheriff:1}},
    {t:"Secure it before anyone else can access it.",sub:"Control the variable.",s:{sheriff:3,marauder:2,spectator:1}},
    {t:"Leave it. Irreversible is irreversible.",s:{sheriff:2,reader:2,hunter:2}},
  ]},
  {w:2,s:"Risk Appetite",q:"An opportunity appears — window is 48 hours, information is incomplete.",sub:"How long do you actually wait before deciding?",opts:[
    {t:"Act within hours. Delay is its own decision.",s:{seer:3,marauder:2,fool:1}},
    {t:"Spend 40 of the 48 hours gathering data, then decide.",s:{reader:3,spectator:2,mystery:1}},
    {t:"Make a probabilistic decision at hour 24.",s:{seer:2,reader:2,hunter:2}},
    {t:"Enter at hour 47 with a full contingency plan.",s:{spectator:3,sheriff:2,reader:1}},
  ]},
  {w:3,s:"Risk Appetite",q:"Strange symbols appear in your peripheral vision — not hallucinations, but patterns in ordinary objects.",sub:"What do you do?",opts:[
    {t:"Document them obsessively. Patterns have meaning.",s:{mystery:3,reader:2,seer:1}},
    {t:"Investigate cautiously — gather 3 instances before theorizing.",s:{reader:3,seer:1,sheriff:1,spectator:1}},
    {t:"Stop. Cease all occult activity immediately.",s:{sheriff:3,reader:2,hunter:1}},
    {t:"Wait and observe. Do nothing that would influence the pattern.",s:{spectator:3,reader:2,fool:1}},
  ]},
  {w:1,s:"Risk Appetite",q:"You are offered Beyonder characteristics from an unverified source at a surprisingly low price.",sub:"Your response?",opts:[
    {t:"Take them immediately. Power is power.",s:{mystery:3,marauder:2,fool:1}},
    {t:"Research the source exhaustively before deciding.",s:{reader:3,sheriff:2,seer:1}},
    {t:"Negotiate for verification — accept only with witnesses.",s:{sheriff:3,spectator:2,reader:1}},
    {t:"Decline. Unverified characteristics are contamination vectors.",s:{sheriff:3,reader:2,hunter:1}},
  ]},
  {w:2,s:"Risk Appetite",q:"You have the opportunity to perform a ritual. Success is estimated at 70%. Failure is fatal.",sub:"Do you proceed?",opts:[
    {t:"Yes. 70% is a good number.",s:{seer:3,fool:2,marauder:1}},
    {t:"Only if I can improve the odds first.",s:{reader:3,mystery:2,spectator:1}},
    {t:"No. 30% fatality is unacceptable for one ritual.",s:{sheriff:3,reader:2,spectator:1}},
    {t:"Depends entirely on what success achieves.",s:{mystery:2,seer:2,spectator:2}},
  ]},
  {w:1,s:"Risk Appetite",q:"You witness a Beyonder phenomenon you've never encountered. It's not threatening you — yet.",sub:"First action?",opts:[
    {t:"Get closer. Observation requires proximity.",s:{mystery:3,seer:2,fool:1}},
    {t:"Observe from a safe distance and document everything.",s:{reader:3,spectator:2,mystery:1}},
    {t:"Maintain distance and prepare a defensive response.",s:{sheriff:3,hunter:2,reader:1}},
    {t:"Leave. Uninvited encounters with the unknown are traps.",s:{hunter:3,sheriff:2,marauder:1}},
  ]},
  {w:2,s:"Risk Appetite",q:"A colleague proposes a shortcut to Sequence ascension — risky, but significantly faster.",sub:"Your honest reaction?",opts:[
    {t:"Interested. Speed matters in this world.",s:{seer:3,mystery:2,fool:1}},
    {t:"I want to see the full methodology before forming an opinion.",s:{reader:3,spectator:2,sheriff:1}},
    {t:"No. Rushed ascension is the number one cause of contamination.",s:{sheriff:3,reader:2,hunter:1}},
    {t:"I'd take the shortcut if the risk could be partially hedged.",s:{spectator:2,fool:2,seer:2}},
  ]},
  {w:3,s:"Risk Appetite",q:"You discover that someone you trust has been lying to you about something significant — but the lie protected you.",sub:"How do you respond?",opts:[
    {t:"Anger. I needed the truth regardless of the cost.",s:{sheriff:3,mystery:2,seer:1}},
    {t:"Understand the reasoning before deciding how to feel.",s:{reader:3,spectator:2,fool:1}},
    {t:"Respect the decision but establish new boundaries going forward.",s:{spectator:3,reader:2,sheriff:1}},
    {t:"It doesn't matter. Outcomes are what count.",s:{mystery:2,marauder:2,hunter:2}},
  ]},
  {w:1,s:"Risk Appetite",q:"Facing certain defeat, a mysterious entity offers you a deal — power now, terms unclear.",sub:"Your answer?",opts:[
    {t:"Accept. Survival is a prerequisite for everything else.",s:{mystery:3,fool:2,marauder:1}},
    {t:"Request to see the full terms before agreeing to anything.",s:{reader:3,sheriff:2,spectator:1}},
    {t:"Refuse. Unclear terms from mysterious entities are never neutral.",s:{sheriff:3,reader:2,hunter:1}},
    {t:"Stall for time while looking for a third option.",s:{spectator:3,fool:2,mystery:1}},
  ]},
  {w:2,s:"Risk Appetite",q:"You can reveal your Beyonder status to stop an injustice — but this exposes you to significant danger.",sub:"What do you do?",opts:[
    {t:"Intervene. The risk to myself is irrelevant.",s:{sheriff:3,seer:2,fool:1}},
    {t:"Intervene anonymously if possible.",s:{spectator:3,mystery:2,fool:1}},
    {t:"Do not intervene. Self-preservation is not cowardice.",s:{reader:2,hunter:2,marauder:2}},
    {t:"Intervene, then carefully manage the exposure afterwards.",s:{sheriff:2,reader:2,spectator:2}},
  ]},
  // CONTROL VS INFLUENCE (8)
  {w:2,s:"Control vs. Influence",q:"You have two tools: one controls a system directly, one subtly shifts how others within it behave.",sub:"Which do you reach for first?",opts:[
    {t:"The direct control. Clean, certain, mine.",s:{sheriff:3,marauder:2,hunter:1}},
    {t:"The influence tool. Subtlety is the sharper instrument.",s:{spectator:3,fool:2,reader:1}},
    {t:"Both sequentially — control first, then influence to sustain.",s:{reader:3,sheriff:2,spectator:1}},
    {t:"Neither. Map the system fully before touching it.",s:{mystery:2,reader:2,spectator:2}},
  ]},
  {w:2,s:"Control vs. Influence",q:"Are you comfortable being the person whose name is never mentioned — even when you are responsible for the outcome?",sub:"Invisibility as a permanent operating condition.",opts:[
    {t:"Yes. Visibility is a liability.",s:{spectator:3,mystery:2,fool:1}},
    {t:"Mostly — but some record must exist somewhere.",s:{reader:2,spectator:2,sheriff:2}},
    {t:"No. Accountability requires identity.",s:{sheriff:3,reader:2,seer:1}},
    {t:"Indifferent. I care about the outcome, not the attribution.",s:{seer:2,hunter:2,marauder:2}},
  ]},
  {w:1,s:"Control vs. Influence",q:"You have information that would change how someone makes a major decision — but they didn't ask you.",sub:"What do you do?",opts:[
    {t:"Share it. They deserve accurate information.",s:{sheriff:3,seer:2,reader:1}},
    {t:"Consider whether giving it serves their interest or mine.",s:{spectator:3,mystery:2,fool:1}},
    {t:"Plant it where they'll discover it themselves.",s:{spectator:3,fool:2,mystery:1}},
    {t:"Archive it. Give it only if directly asked.",s:{reader:3,sheriff:2,spectator:1}},
  ]},
  {w:3,s:"Control vs. Influence",q:"In a dangerous situation: you can control the outcome through force, or manipulate events so the threat neutralizes itself.",sub:"Which do you prefer?",opts:[
    {t:"Force. Reliable. Clean.",s:{marauder:3,sheriff:2,hunter:1}},
    {t:"Manipulation. The threat doesn't even know it lost.",s:{spectator:3,fool:2,mystery:1}},
    {t:"Depends on the threat — I choose by efficiency.",s:{reader:2,hunter:2,seer:2}},
    {t:"Withdraw. Neither force nor manipulation if avoidance is viable.",s:{reader:3,spectator:2,sheriff:1}},
  ]},
  {w:2,s:"Control vs. Influence",q:"A group is making a decision you know is wrong. You are not the leader.",sub:"What do you do?",opts:[
    {t:"State my position clearly once, then let them decide.",s:{sheriff:3,reader:2,seer:1}},
    {t:"Gradually reframe the discussion until they reach the right conclusion themselves.",s:{spectator:3,fool:2,mystery:1}},
    {t:"Override the process if the stakes are high enough.",s:{marauder:3,sheriff:1,seer:2}},
    {t:"Do nothing. Groups learn from consequences.",s:{mystery:2,hunter:2,reader:2}},
  ]},
  {w:1,s:"Control vs. Influence",q:"You are most comfortable when:",opts:[
    {t:"I have direct authority over outcomes.",s:{sheriff:3,marauder:2,hunter:1}},
    {t:"I have invisible influence over outcomes.",s:{spectator:3,fool:2,mystery:1}},
    {t:"I have complete information about outcomes.",s:{reader:3,mystery:2,seer:1}},
    {t:"I can predict outcomes before they occur.",s:{seer:3,reader:2,spectator:1}},
  ]},
  {w:2,s:"Control vs. Influence",q:"An ally has committed a serious moral transgression in pursuit of a goal you share.",sub:"Your response?",opts:[
    {t:"Condemn and cut ties. The goal does not justify this.",s:{sheriff:3,reader:2,seer:1}},
    {t:"Condemn privately. Publicly maintain the alliance.",s:{spectator:3,mystery:2,fool:1}},
    {t:"Accept it. In this world, clean hands are a luxury.",s:{marauder:3,mystery:2,hunter:1}},
    {t:"Evaluate whether the goal still justifies the continued relationship.",s:{reader:3,spectator:2,sheriff:1}},
  ]},
  {w:3,s:"Control vs. Influence",q:"You discover you are being watched and evaluated by an unknown party.",sub:"Your response?",opts:[
    {t:"Perform. Let them see exactly what I want them to see.",s:{spectator:3,fool:3}},
    {t:"Identify who it is before responding to the surveillance.",s:{reader:2,mystery:2,hunter:2}},
    {t:"Continue as normal. I have nothing to curate.",s:{sheriff:3,hunter:2,reader:1}},
    {t:"Use it. Being observed means there's leverage.",s:{mystery:2,spectator:2,fool:2}},
  ]},
  // CURIOSITY VS STABILITY (8)
  {w:3,s:"Curiosity vs. Stability",q:"Would you rather know a dangerous truth — or remain in comfortable, functional uncertainty?",sub:"The truth will cost you something. The uncertainty costs you nothing — yet.",opts:[
    {t:"The truth, always. Comfortable ignorance is a slow poison.",s:{mystery:3,seer:2,fool:1}},
    {t:"The truth — but I want to control when and how I receive it.",s:{reader:3,spectator:2,mystery:1}},
    {t:"Uncertainty, if the truth serves no actionable purpose.",s:{sheriff:2,reader:2,hunter:2}},
    {t:"I'd construct a model that approaches truth asymptotically.",s:{spectator:2,reader:2,mystery:2}},
  ]},
  {w:2,s:"Curiosity vs. Stability",q:"You encounter an anomalous event. Investigation reveals another anomaly. Then another.",sub:"At what point do you stop?",opts:[
    {t:"I don't stop. The pattern is the point.",s:{mystery:3,seer:2,fool:1}},
    {t:"When the anomalies begin interfering with my baseline function.",s:{reader:3,spectator:2,sheriff:1}},
    {t:"After the third. Three is a pattern. A pattern is a threat.",s:{sheriff:3,reader:2,hunter:1}},
    {t:"When I can no longer distinguish coincidence from significance.",s:{spectator:3,reader:2,seer:1}},
  ]},
  {w:1,s:"Curiosity vs. Stability",q:"How long can you tolerate an unanswered question before it affects your behavior?",sub:"Be honest.",opts:[
    {t:"Cannot tolerate it at all — unanswered questions are a kind of pain.",s:{mystery:3,seer:2,fool:1}},
    {t:"Indefinitely — if I've exhausted available information.",s:{reader:3,spectator:2,sheriff:1}},
    {t:"Weeks to months. Eventually the itch wins.",s:{seer:2,mystery:2,hunter:2}},
    {t:"Depends entirely on the stakes involved.",s:{spectator:2,sheriff:2,marauder:2}},
  ]},
  {w:2,s:"Curiosity vs. Stability",q:"You find a book rumored to drive readers mad by Sequence 5.",sub:"What is your honest response?",opts:[
    {t:"Read it immediately. I'll manage the consequences.",s:{mystery:3,fool:2,seer:1}},
    {t:"Research the book thoroughly before touching it.",s:{reader:3,mystery:2,sheriff:1}},
    {t:"Secure it. No one should read this.",s:{sheriff:3,reader:2,hunter:1}},
    {t:"Test small fragments. Controlled exposure.",s:{spectator:2,reader:2,mystery:2}},
  ]},
  {w:3,s:"Curiosity vs. Stability",q:"You have discovered a truth about the nature of the Pathways that directly contradicts what you believed.",sub:"How do you integrate this?",opts:[
    {t:"Rebuild my entire model. If this is wrong, what else is?",s:{mystery:3,reader:2,seer:1}},
    {t:"Update cautiously — verify against multiple sources.",s:{reader:3,sheriff:2,spectator:1}},
    {t:"Hold both models simultaneously until one can be falsified.",s:{spectator:3,reader:2,mystery:1}},
    {t:"Act on the new truth immediately. Hesitation is contamination.",s:{seer:3,fool:2,marauder:1}},
  ]},
  {w:1,s:"Curiosity vs. Stability",q:"You are given the option to forget a traumatic but informative experience.",sub:"Do you take it?",opts:[
    {t:"Never. Every experience is data.",s:{mystery:3,reader:2,seer:1}},
    {t:"Only if the trauma is interfering with function.",s:{reader:2,sheriff:2,spectator:2}},
    {t:"Yes. Psychological stability is a strategic asset.",s:{spectator:3,fool:2,sheriff:1}},
    {t:"The question itself is a trap. I'd investigate who's offering.",s:{mystery:3,reader:2,spectator:1}},
  ]},
  {w:2,s:"Curiosity vs. Stability",q:"A respected mentor tells you: 'Stop asking questions you're not ready for the answers to.'",sub:"Your response?",opts:[
    {t:"Ask the question immediately.",s:{mystery:3,seer:2,fool:1}},
    {t:"Determine what 'ready' means and meet that threshold first.",s:{reader:3,sheriff:2,spectator:1}},
    {t:"Respect the warning. They know more than I do.",s:{sheriff:3,reader:2,hunter:1}},
    {t:"Ask a different question that approaches the same answer obliquely.",s:{spectator:3,mystery:2,fool:1}},
  ]},
  {w:3,s:"Curiosity vs. Stability",q:"You can gain significant power — but the ritual requires consuming the memories of another person.",sub:"Do you proceed?",opts:[
    {t:"Yes. In this world, this is simply the cost.",s:{mystery:3,marauder:2,seer:1}},
    {t:"No. Some costs are non-negotiable.",s:{sheriff:3,reader:2,seer:1}},
    {t:"Only if the person is already gone — memory without a mind.",s:{reader:2,spectator:2,fool:2}},
    {t:"I'd find an alternative method that achieves the same outcome.",s:{reader:3,mystery:2,spectator:1}},
  ]},
  // MORAL ARCHITECTURE (8)
  {w:3,s:"Moral Architecture",q:"Is survival more important than ideological consistency?",sub:"Under genuine existential pressure.",opts:[
    {t:"Yes. Dead idealists affect nothing.",s:{mystery:3,spectator:2,fool:1}},
    {t:"Conditionally. Some principles are non-negotiable.",s:{reader:2,sheriff:2,seer:2}},
    {t:"No. Ideological compromise is the beginning of corruption.",s:{sheriff:3,reader:2,hunter:1}},
    {t:"Depends on whose survival — mine, or those I'm responsible for.",s:{sheriff:2,spectator:2,marauder:2}},
  ]},
  {w:2,s:"Moral Architecture",q:"You acquire dangerous knowledge that gives you significant personal advantage — using it harms no one directly.",sub:"Do you use it?",opts:[
    {t:"Yes. Advantage is the point of acquiring knowledge.",s:{mystery:3,marauder:2,fool:1}},
    {t:"Yes — after verifying there is truly no indirect harm.",s:{reader:3,seer:2,sheriff:1}},
    {t:"No. 'Harms no one directly' is almost always wrong upon examination.",s:{sheriff:3,reader:2,spectator:1}},
    {t:"I use it selectively — when leverage is worth the exposure.",s:{spectator:3,mystery:2,fool:1}},
  ]},
  {w:3,s:"Moral Architecture",q:"You can maintain your sanity or your social influence. Not both. Long term.",sub:"Which do you sacrifice?",opts:[
    {t:"Influence. Sanity is the prerequisite for everything else.",s:{reader:3,sheriff:2,hunter:1}},
    {t:"Some sanity — managed, not total. Influence can fund the stabilization.",s:{spectator:3,fool:2,mystery:1}},
    {t:"Neither. This is a false dilemma — I find a third path.",s:{mystery:2,seer:2,fool:2}},
    {t:"Influence. Sanity is a social construct. Stability is what matters.",s:{mystery:3,marauder:2,seer:1}},
  ]},
  {w:2,s:"Moral Architecture",q:"A fellow Beyonder asks you to lie on their behalf. The lie is harmless but significant.",sub:"Do you do it?",opts:[
    {t:"Yes. Loyalty is above bureaucratic honesty.",s:{fool:3,spectator:2,mystery:1}},
    {t:"Yes — but I note the debt owed to me.",s:{spectator:3,mystery:2,marauder:1}},
    {t:"No. I don't lie for others.",s:{sheriff:3,reader:2,hunter:1}},
    {t:"It depends on who's asking and what it costs me.",s:{reader:2,spectator:2,fool:2}},
  ]},
  {w:1,s:"Moral Architecture",q:"Your personal code of ethics, if you're honest:",sub:"Not what you aspire to — what you actually operate on.",opts:[
    {t:"Principled. I have firm rules I rarely bend.",s:{sheriff:3,reader:2,hunter:1}},
    {t:"Contextual. The right action depends on the specific situation.",s:{reader:2,spectator:2,seer:2}},
    {t:"Pragmatic. What works is what's right.",s:{mystery:3,marauder:2,fool:1}},
    {t:"Relational. My ethics are defined by who I'm accountable to.",s:{spectator:3,fool:2,sheriff:1}},
  ]},
  {w:2,s:"Moral Architecture",q:"You can prevent a catastrophe — but only by doing something you consider deeply wrong.",sub:"Your actual decision (not your ideal decision).",opts:[
    {t:"Do it. The catastrophe is worse.",s:{seer:3,mystery:2,fool:1}},
    {t:"Find an alternative. There is always an alternative.",s:{reader:3,sheriff:2,spectator:1}},
    {t:"Do it — but carry the weight. No rationalizing.",s:{sheriff:2,reader:2,spectator:2}},
    {t:"Let the catastrophe happen. I don't compromise on this.",s:{sheriff:3,hunter:2,marauder:1}},
  ]},
  {w:3,s:"Moral Architecture",q:"What do you believe about power?",sub:"The honest answer.",opts:[
    {t:"Power is neutral — it's the wielder that determines its nature.",s:{reader:3,spectator:2,mystery:1}},
    {t:"Power corrupts. The question is how slowly.",s:{sheriff:3,reader:2,seer:1}},
    {t:"Power is the point. Purpose is a story we tell around it.",s:{mystery:3,marauder:2,fool:1}},
    {t:"Power is a tool. I want enough to protect what matters.",s:{sheriff:2,hunter:2,reader:2}},
  ]},
  {w:1,s:"Moral Architecture",q:"What is the most dangerous kind of person?",opts:[
    {t:"Someone with certainty and authority.",s:{mystery:3,spectator:2,seer:1}},
    {t:"Someone with intelligence and no conscience.",s:{sheriff:3,reader:2,hunter:1}},
    {t:"Someone who believes they're doing good.",s:{spectator:3,mystery:2,fool:1}},
    {t:"Someone with nothing left to lose.",s:{seer:2,mystery:2,marauder:2}},
  ]},
  // FATE & PATHWAYS (6)
  {w:3,s:"Fate & the Pathways",q:"What do you believe about extraordinary events — occult, anomalous, inexplicable?",sub:"Your actual epistemic position.",opts:[
    {t:"They exist, and most people are simply not paying attention.",s:{mystery:3,seer:2,fool:1}},
    {t:"They exist, and the question is how to interact without being consumed.",s:{reader:3,seer:2,sheriff:1}},
    {t:"Possible — but involvement without institutional framework is reckless.",s:{sheriff:3,reader:2,spectator:1}},
    {t:"They exist, and are more useful understood than feared.",s:{spectator:3,reader:2,mystery:1}},
  ]},
  {w:2,s:"Fate & the Pathways",q:"If you were told that pursuing power would reduce your humanity — gradually, irreversibly —",sub:"Would you continue?",opts:[
    {t:"Yes. Humanity is not the goal; capability is.",s:{mystery:3,marauder:2,seer:1}},
    {t:"Yes — but I'd find ways to slow the erosion.",s:{spectator:2,reader:2,fool:2}},
    {t:"No. Without humanity, power has no target worth aiming at.",s:{sheriff:3,reader:2,seer:1}},
    {t:"I'd first question whether the premise is accurate.",s:{mystery:2,seer:2,fool:2}},
  ]},
  {w:3,s:"Fate & the Pathways",q:"What is the most dangerous thing in the world?",sub:"Your genuine answer.",opts:[
    {t:"A mind with no limits on what it's willing to know.",s:{reader:3,mystery:2,sheriff:1}},
    {t:"A person who has decided their ideology justifies the cost.",s:{spectator:3,mystery:2,seer:1}},
    {t:"Power with no accountability and no structure.",s:{sheriff:3,reader:2,spectator:1}},
    {t:"An anomaly that has learned to disguise itself as ordinary.",s:{mystery:3,seer:2,hunter:1}},
  ]},
  {w:1,s:"Fate & the Pathways",q:"Which failure concerns you most?",sub:"The one that would haunt you.",opts:[
    {t:"Being wrong about something you were completely certain of.",s:{reader:3,mystery:2,seer:1}},
    {t:"Being used by someone who understood you better than you understood yourself.",s:{spectator:3,fool:2,mystery:1}},
    {t:"Causing harm to someone who trusted your judgment.",s:{sheriff:3,reader:2,seer:1}},
    {t:"Getting close to an answer — and stopping.",s:{mystery:3,seer:2,fool:1}},
  ]},
  {w:2,s:"Fate & the Pathways",q:"You are given a premonition — clear, specific, terrifying. It will happen to someone you care about.",sub:"Do you intervene?",opts:[
    {t:"Yes. Premonitions are warnings, not verdicts.",s:{seer:3,sheriff:2,fool:1}},
    {t:"Yes — but without telling them, to avoid altering the timeline unpredictably.",s:{spectator:3,mystery:2,reader:1}},
    {t:"I research the premonition first before acting.",s:{reader:3,seer:2,mystery:1}},
    {t:"No. Interference with fate is how you cause the very thing you fear.",s:{reader:2,spectator:2,mystery:2}},
  ]},
  {w:2,s:"Fate & the Pathways",q:"At the end of your life, what do you want to have been?",sub:"The honest answer.",opts:[
    {t:"Someone who understood things others never could.",s:{reader:3,mystery:2,seer:1}},
    {t:"Someone who shaped events without ever being seen doing so.",s:{spectator:3,fool:2,mystery:1}},
    {t:"Someone who protected people from what they couldn't protect themselves from.",s:{sheriff:3,hunter:2,reader:1}},
    {t:"Someone who went further than anyone else — and came back.",s:{seer:3,fool:2,marauder:1}},
  ]},
  // PATHWAY RESONANCE (8)
  {w:2,s:"Pathway Resonance",q:"In a dream, a figure in grey places an item before you. It is yours to take.",sub:"What do you see?",opts:[
    {t:"A book — sealed with wax bearing no crest.",s:{reader:3,mystery:2,seer:1}},
    {t:"A mask — carved from pale wood, utterly featureless.",s:{fool:3,spectator:2,mystery:1}},
    {t:"A compass — whose needle does not point north.",s:{seer:3,hunter:2,mystery:1}},
    {t:"A key — that opens no lock you have ever seen.",s:{mystery:3,sheriff:2,fool:1}},
  ]},
  {w:1,s:"Pathway Resonance",q:"Which of these descriptions of power resonates most deeply with you?",sub:"The one that feels true — not aspirational.",opts:[
    {t:"The power to know things others cannot.",s:{reader:3,mystery:2,seer:1}},
    {t:"The power to be anyone, anywhere, without being caught.",s:{fool:3,spectator:2,mystery:1}},
    {t:"The power to end a threat with absolute finality.",s:{marauder:3,sheriff:2,hunter:1}},
    {t:"The power to see what is coming before it arrives.",s:{seer:3,mystery:2,reader:1}},
  ]},
  {w:3,s:"Pathway Resonance",q:"The Tarot Club needs someone for a mission in enemy territory. No backup. No extraction plan.",sub:"What role do you take?",opts:[
    {t:"Intelligence gathering. I go in, learn everything, leave nothing.",s:{spectator:3,reader:2,mystery:1}},
    {t:"Divination support. I predict their movements from a distance.",s:{seer:3,reader:2,mystery:1}},
    {t:"Enforcement. I remove the threat directly.",s:{marauder:3,hunter:2,sheriff:1}},
    {t:"Disruption. I compromise their structure from within.",s:{fool:3,spectator:2,mystery:1}},
  ]},
  {w:2,s:"Pathway Resonance",q:"A Sequence 5 Beyonder offers to mentor you — but their methods are ethically questionable.",sub:"Do you accept?",opts:[
    {t:"Yes. Power requires proximity to power, whatever its source.",s:{mystery:3,marauder:2,seer:1}},
    {t:"Yes — but I plan my exit strategy from day one.",s:{spectator:3,fool:2,reader:1}},
    {t:"No. Ethically compromised teachers produce ethically compromised students.",s:{sheriff:3,reader:2,seer:1}},
    {t:"I negotiate terms first. Mentorship is an exchange, not a gift.",s:{reader:3,spectator:2,mystery:1}},
  ]},
  {w:1,s:"Pathway Resonance",q:"Which of these Beyonder traits sounds most like a natural extension of who you already are?",sub:"Not who you want to be. Who you are.",opts:[
    {t:"Extreme perceptiveness — reading rooms, people, and hidden meanings instinctively.",s:{spectator:3,reader:2,mystery:1}},
    {t:"Precognition — small flashes of what's about to happen.",s:{seer:3,mystery:2,fool:1}},
    {t:"Enhanced tracking and environmental awareness.",s:{hunter:3,sheriff:2,marauder:1}},
    {t:"The ability to become exactly who the situation requires.",s:{fool:3,spectator:2,mystery:1}},
  ]},
  {w:2,s:"Pathway Resonance",q:"You are being hunted by someone more powerful than you. You cannot outfight them.",sub:"Your strategy?",opts:[
    {t:"Disappear completely. Become someone they cannot find.",s:{fool:3,spectator:2,mystery:1}},
    {t:"Learn everything about them until their weakness is clear.",s:{reader:3,mystery:2,spectator:1}},
    {t:"Set a trap. Use the hunt itself as the weapon.",s:{hunter:3,seer:2,spectator:1}},
    {t:"Negotiate or find a third party to mediate.",s:{sheriff:3,reader:2,fool:1}},
  ]},
  {w:3,s:"Pathway Resonance",q:"Your Beyonder characteristic is showing signs of contamination. You are beginning to lose yourself.",sub:"What do you do?",opts:[
    {t:"Accelerate. If I'm losing myself anyway, I might as well gain something first.",s:{mystery:3,marauder:2,seer:1}},
    {t:"Stop all Sequence activity immediately and seek purification.",s:{sheriff:3,reader:2,hunter:1}},
    {t:"Continue cautiously, monitoring the drift and correcting where possible.",s:{spectator:3,reader:2,mystery:1}},
    {t:"Consult someone who has been through this. I don't handle this alone.",s:{fool:2,reader:2,sheriff:2}},
  ]},
  {w:1,s:"Pathway Resonance",q:"If you could whisper one sentence to yourself at the beginning of your Beyonder journey:",sub:"What would it be?",opts:[
    {t:"'Trust the evidence over the instinct.'",s:{reader:3,sheriff:2,mystery:1}},
    {t:"'You will become what you practice; choose carefully.'",s:{sheriff:3,spectator:2,reader:1}},
    {t:"'The answer you're looking for will cost more than you think.'",s:{mystery:3,seer:2,fool:1}},
    {t:"'The role you play long enough becomes the person you are.'",s:{fool:3,spectator:2,mystery:1}},
  ]},
];


const formatted = QBank.map((q, i) => ({
  id: i + 1,
  section: q.s,
  question: q.q,
  subtext: q.sub || "",
  options: q.opts.map(opt => opt.t)
}));

fs.writeFileSync(
  "questions.json",
  JSON.stringify(formatted, null, 2)
);

console.log("✅ questions.json created");