import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
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

export default function OeeTrendChart({ data }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" tickFormatter={formatShortDate} />
          <YAxis domain={[60, 100]} />
          <Tooltip
            labelFormatter={formatLongDate}
            formatter={(value) => [`${value}%`, 'OEE']}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#790022"
            strokeWidth={3}
            dot={{ r: 4 }}
          >
            <LabelList dataKey="value" position="top" formatter={(value) => `${value}%`} />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
