import { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
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
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
  }).format(new Date(`${value}T00:00:00`));
}

export default function WeeklyProductionDrilldown({
  weeklyProduction = {},
  currentWeek,
}) {
  const weekKeys = Object.keys(weeklyProduction);

  const [selectedWeek, setSelectedWeek] = useState(
    currentWeek || weekKeys[0] || null
  );
  const [selectedDay, setSelectedDay] = useState(null);

  const weekChartData = useMemo(() => {
    return weekKeys.map((key) => ({
      week: key,
      produced: weeklyProduction[key]?.produced ?? 0,
      target: weeklyProduction[key]?.target ?? 0,
    }));
  }, [weekKeys, weeklyProduction]);

  const dayChartData = useMemo(() => {
    if (!selectedWeek || !weeklyProduction[selectedWeek]) return [];

    return (weeklyProduction[selectedWeek].days || []).map((d) => ({
      day: d.id,
      produced: d.produced,
      target: d.target,
    }));
  }, [selectedWeek, weeklyProduction]);

  const lineChartData = useMemo(() => {
    if (!selectedWeek || !selectedDay || !weeklyProduction[selectedWeek]) {
      return [];
    }

    const day = (weeklyProduction[selectedWeek].days || []).find(
      (d) => d.id === selectedDay
    );

    return day?.lines || [];
  }, [selectedWeek, selectedDay, weeklyProduction]);

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">
            Vue hebdomadaire
          </h3>
          <p className="text-sm text-gray-500">
            Cliquez sur une semaine pour voir le détail jour par jour
          </p>
        </div>

        <div className="h-80 rounded-2xl border border-gray-200 p-3">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={weekChartData}
              onClick={(state) => {
                if (state?.activeLabel) {
                  setSelectedWeek(state.activeLabel);
                  setSelectedDay(null);
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="produced"
                fill="#790022"
                name="Quantité produite"
                radius={[8, 8, 0, 0]}
              >
                <LabelList dataKey="produced" position="top" />
              </Bar>
              <Line
                type="monotone"
                dataKey="target"
                stroke="#9ca3af"
                strokeWidth={3}
                name="Cible"
                dot={{ r: 4 }}
              >
                <LabelList dataKey="target" position="top" />
              </Line>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">
            Détail {selectedWeek}
          </h3>
          <p className="text-sm text-gray-500">
            Cliquez sur une date pour afficher le détail des lignes
          </p>
        </div>

        <div className="h-80 rounded-2xl border border-gray-200 p-3">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={dayChartData}
              onClick={(state) => {
                if (state?.activeLabel) {
                  setSelectedDay(state.activeLabel);
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tickFormatter={formatShortDate} />
              <YAxis />
              <Tooltip labelFormatter={formatLongDate} />
              <Legend />
              <Bar
                dataKey="produced"
                fill="#111827"
                name="Produit"
                radius={[8, 8, 0, 0]}
              >
                <LabelList dataKey="produced" position="top" />
              </Bar>
              <Line
                type="monotone"
                dataKey="target"
                stroke="#790022"
                strokeWidth={3}
                name="Cible"
                dot={{ r: 4 }}
              >
                <LabelList dataKey="target" position="top" />
              </Line>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {selectedDay && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">
              Détail lignes – {selectedWeek} / {formatLongDate(selectedDay)}
            </h3>
            <p className="text-sm text-gray-500">Vue lignes de production</p>
          </div>

          <div className="h-80 rounded-2xl border border-gray-200 p-3">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="line" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="produced"
                  fill="#790022"
                  name="Produit"
                  radius={[8, 8, 0, 0]}
                >
                  <LabelList dataKey="produced" position="top" />
                </Bar>
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#9ca3af"
                  strokeWidth={3}
                  name="Cible"
                  dot={{ r: 4 }}
                >
                  <LabelList dataKey="target" position="top" />
                </Line>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
