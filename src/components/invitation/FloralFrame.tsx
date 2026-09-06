interface Props {
  /** Champagne ink, for use over the photograph rather than on ivory. */
  pale?: boolean;
  /** Include it in the hero's staggered arrival. */
  reveal?: boolean;
}

/** The hairline rule with a floral sprig turned into each of its corners. */
export function FloralFrame({ pale = false, reveal = false }: Props) {
  return (
    <div
      className={pale ? 'frame frame--pale' : 'frame'}
      data-reveal={reveal ? true : undefined}
      aria-hidden="true"
    />
  );
}

export default FloralFrame;
