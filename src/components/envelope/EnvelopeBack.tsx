/**
 * The panel the envelope is folded from, plus the printed lining that becomes
 * visible once the flaps are away. Purely presentational.
 */
export function EnvelopeBack() {
  return (
    <>
      <div className="envelope__back" aria-hidden="true" />
      <div className="envelope__lining" aria-hidden="true" />
      <div className="envelope__rule" aria-hidden="true" />
    </>
  );
}

export default EnvelopeBack;
