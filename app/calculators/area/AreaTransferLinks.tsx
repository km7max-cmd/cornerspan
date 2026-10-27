import { areaTransferHref, isTransferableArea } from "../shared/areaTransfer";

export default function AreaTransferLinks({ area }: { area: number | null }) {
  if (!isTransferableArea(area)) return null;
  return <div className="mt-5 border-t border-slate-700 pt-4">
    <h2 className="text-sm font-bold text-white">Use this area</h2>
    <div className="mt-3 grid gap-2 sm:grid-cols-2">
      <a href={areaTransferHref("tile", area)!} className="rounded-lg bg-white px-3 py-3 text-center text-sm font-semibold text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300">Estimate tiles →</a>
      <a href={areaTransferHref("paint", area)!} className="rounded-lg bg-blue-600 px-3 py-3 text-center text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300">Estimate paint →</a>
    </div>
    <p className="mt-3 text-xs leading-5 text-slate-300">Tile waste and paint coats are applied in the next calculator. For paint, use the actual wall or ceiling surface you will paint; floor area alone does not give wall area.</p>
  </div>;
}
