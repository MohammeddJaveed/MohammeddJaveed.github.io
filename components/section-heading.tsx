type SectionHeadingProps = {
  title: string;
  subtitle: string;
};

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="section-head">
      <p className="eyebrow">Portfolio</p>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}
