export default function Loading() {
  return (
    <div className="w-full bg-[#f1f3f6] min-h-screen">
      <div className="h-16 bg-[#2874f0] w-full animate-pulse" />
      <div className="max-w-[1400px] mx-auto mt-2">
        <div className="h-28 bg-gray-200 animate-pulse mb-2 mx-2 rounded-sm" />
        <div className="h-64 bg-gray-300 animate-pulse mb-2 mx-2 rounded-sm" />
        <div className="grid grid-cols-4 gap-4 p-2">
          {[...Array(8)].map((_, i) => (
             <div key={i} className="h-64 bg-white animate-pulse p-4 rounded-sm" />
          ))}
        </div>
      </div>
    </div>
  );
}
