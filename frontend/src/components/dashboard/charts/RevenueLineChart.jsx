import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
} from 'recharts';

function formatShortDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
  }).format(new Date(`${value}T00:00:00`));
}

function formatLongDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  }).format(new Date(`${value}T00:00:00`));
}

export default function RevenueLineChart({ data }) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" tickFormatter={formatShortDate} />
          <YAxis />
          <Tooltip labelFormatter={formatLongDate} />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#790022"
            strokeWidth={3}
            dot={{ r: 3 }}
            name="CA journalier"
          >
            <LabelList dataKey="revenue" position="top" />
          </Line>
          <Line
            type="monotone"
            dataKey="target"
            stroke="#9ca3af"
            strokeWidth={2}
            dot={{ r: 3 }}
            strokeDasharray="6 4"
            name="Cible"
          >
            <LabelList dataKey="target" position="top" />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
