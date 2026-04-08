export default function BindingRing() {
  const ringCount = 12;
  const rings = Array.from({ length: ringCount }, (_, i) => i);

  return (
    <div className="w-full h-10 flex items-center justify-evenly pointer-events-none px-6">
      {rings.map((i) => (
        <div key={i} className="relative w-7 h-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#d4d4d4] via-[#a0a0a0] to-[#787878] shadow-md" />
          <div className="absolute inset-[3px] rounded-full bg-gradient-to-b from-[#555] to-[#333]" />
          <div className="absolute top-[2px] left-[4px] w-[45%] h-[40%] rounded-full bg-white/40 blur-[0.5px]" />
        </div>
      ))}
    </div>
  );
}
