const STATUS_STYLES = {
  'Fait': 'bg-green-100 text-green-700 border-green-200',
  'En cours': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'À faire': 'bg-gray-100 text-gray-600 border-gray-200',
  'Oui': 'bg-green-100 text-green-700 border-green-200',
  'Non': 'bg-red-100 text-red-700 border-red-200',
};

export default function StatusBadge({ value }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border ${STATUS_STYLES[value] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
      {value}
    </span>
  );
}