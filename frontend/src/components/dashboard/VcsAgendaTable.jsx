import StatusBadge from './StatusBadge';

export default function VcsAgendaTable({ rows }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-[#790022] text-white">
          <tr>
            <th className="px-4 py-3 text-left">Pilote</th>
            <th className="px-4 py-3 text-left">Co-pilote</th>
            <th className="px-4 py-3 text-left">Date prévue</th>
            <th className="px-4 py-3 text-left">Statut</th>
            <th className="px-4 py-3 text-left">Compte-rendu validé</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.pilote}-${index}`} className={index % 2 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-4 py-3">{row.pilote}</td>
              <td className="px-4 py-3">{row.copilote}</td>
              <td className="px-4 py-3">{row.datePrevue}</td>
              <td className="px-4 py-3"><StatusBadge value={row.statut} /></td>
              <td className="px-4 py-3"><StatusBadge value={row.compteRendu} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}