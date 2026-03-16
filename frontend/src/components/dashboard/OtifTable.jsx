export default function OtifTable({ rows }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-[#790022] text-white">
          <tr>
            <th className="px-4 py-3 text-left">Client</th>
            <th className="px-4 py-3 text-left">PF</th>
            <th className="px-4 py-3 text-left">Désignation</th>
            <th className="px-4 py-3 text-left">Due date</th>
            <th className="px-4 py-3 text-left">Max</th>
            <th className="px-4 py-3 text-left">Commentaire non OTIF</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.client}-${row.pf}-${index}`} className={index % 2 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-4 py-3">{row.client}</td>
              <td className="px-4 py-3">{row.pf}</td>
              <td className="px-4 py-3">{row.designation}</td>
              <td className="px-4 py-3">{row.dueDate}</td>
              <td className="px-4 py-3">{row.max}</td>
              <td className="px-4 py-3">{row.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}