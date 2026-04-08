export default function BindingRing() {
  const ringCount = 12;
  const rings = Array.from({ length: ringCount }, (_, i) => i);

  return (
    <div className="w-full h-9 flex items-center justify-evenly pointer-events-none px-4">
      {rings.map((i) => (
        <div key={i} className="relative w-8 h-5">
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#888] via-[#555] to-[#333] shadow-md" />
          <div className="absolute inset-[3px] rounded-full bg-gradient-to-b from-[#222] to-[#111] shadow-inner" />
          <div className="absolute top-[3px] left-[5px] w-[40%] h-[35%] rounded-full bg-white/20 blur-[1px]" />
        </div>
      ))}
    </div>
  );
}
