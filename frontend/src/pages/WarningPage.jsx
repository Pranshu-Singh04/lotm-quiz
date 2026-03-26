import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function WarningPage() {
  const navigate = useNavigate()
  const [accepted, setAccepted] = useState(false)

  return (
    <div className="screen">
      <p className="title-eyebrow">Mandatory Pre-Evaluation Disclosure</p>
      <h1 className="display" style={{ fontSize: 'clamp(18px, 4vw, 32px)' }}>
        Read Before You Proceed
      </h1>

      <div className="warning-screen-box">
        <p className="w-title">⚠ Official Bureau Notice</p>

        {[
          { icon: '☠', title: 'This is a fictional psychological exercise.', body: 'The Beyondgod Street Occult Evaluation Bureau does not exist. Klein Moretti is not available for consultation.' },
          { icon: '🕯', title: 'The author bears zero responsibility for your survival in Backlund.', body: 'If you are subsequently hunted by a Sequence 4 Beyonder or contaminated by a characteristic — this form is legally inadmissible.' },
          { icon: '📖', title: 'This is a fan-made project', body: 'based on Lord of the Mysteries by Cuttlefish That Loves Diving. All Pathway lore belongs to the original author.' },
          { icon: '🧠', title: 'Psychological questions may be uncomfortably accurate.', body: 'The Bureau does not apologize for this. Self-knowledge is the first prerequisite for Pathway ascension.' },
          { icon: '🌀', title: 'Corruption risk scores are fictional.', body: 'If your result shows 90% corruption risk, you answered like someone who absolutely would be contaminated.' },
          { icon: '⚖', title: 'Eight Pathways are evaluated.', body: 'Not all ends are good. The Bureau accepts no liability for distressing results.' },
        ].map((item, i) => (
          <div className="warning-item" key={i}>
            <span className="w-icon">{item.icon}</span>
            <p><strong>{item.title}</strong> {item.body}</p>
          </div>
        ))}

        <div className="ack-row">
          <input
            type="checkbox"
            id="ack"
            checked={accepted}
            onChange={e => setAccepted(e.target.checked)}
          />
          <label htmlFor="ack">
            I understand this is a fictional psychological exercise. I accept full responsibility
            for my results. I acknowledge the Tarot Club has not been notified of this evaluation.
          </label>
        </div>
      </div>

      <button
        className="btn-primary"
        disabled={!accepted}
        onClick={() => navigate('/quiz')}
      >
        I ACCEPT THE TERMS · PROCEED
      </button>

      <button className="btn-secondary" onClick={() => navigate('/')}>
        ← Return to Safety
      </button>
    </div>
  )
}