export default function KpiCard({ icon: Icon, label, value, suffix = '', hint }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {value}
            <span className="ml-1 text-lg text-[#790022]">{suffix}</span>
          </p>
          {hint ? <p className="mt-2 text-xs text-gray-500">{hint}</p> : null}
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#790022]/10 text-[#790022]">
          <Icon className="text-xl" />
        </div>
      </div>
    </div>
  );
}