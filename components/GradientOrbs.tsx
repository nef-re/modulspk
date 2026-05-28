export default function GradientOrbs() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden [contain:strict]"
      aria-hidden="true"
    >
      <div className="absolute -left-40 top-0 h-[480px] w-[480px] rounded-full bg-brand/[0.04] blur-2xl" />
      <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-brand/[0.03] blur-2xl" />
    </div>
  )
}
