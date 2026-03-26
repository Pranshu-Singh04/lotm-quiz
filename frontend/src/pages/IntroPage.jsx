import { useNavigate } from 'react-router-dom'

export default function IntroPage() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      <p className="title-eyebrow">Beyondgod Street · Occult Evaluation Bureau</p>
      <h1 className="display">Sequence Alignment Engine</h1>
      <h2 className="subtitle">Which Pathway Would Accept You?</h2>

      <div className="lore-box">
        "To ascend is to risk. Every Sequence is a cage — and the door only opens inward.
        The true question is not what power you desire, but what darkness you can contain."
      </div>

      <div className="divider">✦ ✦ ✦</div>

      <p style={{ textAlign: 'center', color: 'var(--ash)', fontStyle: 'italic', fontSize: '16px', maxWidth: '480px' }}>
        A psychologically weighted Pathway alignment engine. 20 questions drawn from a pool of 40,
        scored across 8 Pathways.
      </p>

      <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button className="btn-primary" onClick={() => navigate('/warning')}>
          BEGIN EVALUATION
        </button>
        <p style={{ fontSize: '13px', color: 'var(--ash)', fontStyle: 'italic', marginTop: '12px' }}>
          20 questions · randomized from 40 · results are irreversible
        </p>
      </div>
    </div>
  )
}