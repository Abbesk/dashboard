import { FiPlus, FiSave, FiTrash2, FiX } from 'react-icons/fi';

const labelMap = {
  kpis: 'KPIs',
  meta: 'Métadonnées',
  daysWithoutLostTimeAccident:
    'Jours sans accident avec arrêt de travail',
  daysWithoutDeclaredAccident: 'Jours sans accident déclaré',
  daysWithoutEnvironmentalIncident:
    'Jours sans incident environnemental',
  vcsAgenda: 'Agenda des VCS',
  pilote: 'Pilote',
  copilote: 'Co-pilote',
  datePrevue: 'Date prévue',
  statut: 'Statut',
  compteRendu: 'Compte-rendu validé',
  deviationsOpenClosed: 'Nb déviations ouvertes / clôturées',
  deviationsInProgress: 'Nombre de déviations en cours',
  complaintsAndPfPending: 'Réclamations en cours / PF en attente',
  complaintsByDay: 'Réclamations ouvertes',
  value: 'Valeur',
  day: 'Date',
  delivery: 'Délai',
  otifWeeklyTurnover: 'Chiffre d’affaires OTIF hebdo',
  mgh: 'MGH',
  revenueByDay: 'Chiffre d’affaires journalier',
  revenue: 'Chiffre d’affaires',
  target: 'Cible',
  weeklyProduction: 'Suivi des quantités à produire',
  produced: 'Produit',
  days: 'Jours',
  lines: 'Lignes',
  line: 'Ligne',
  weekLabel: 'Libellé semaine',
  otifList: 'Liste des OTIFs',
  client: 'Client',
  pf: 'PF',
  designation: 'Désignation',
  dueDate: 'Date prévue',
  max: 'Max',
  comment: 'Commentaire non OTIF',
  dailyOee: 'Daily OEE',
  wasteCost: 'Coût déchet',
  oeeTrend: 'Évolution de l’OEE',
  absencesByDay: 'Absences par jour',
  currentWeek: 'Semaine courante',
  month: 'Mois',
  plant: 'Site',
  id: 'Date',
};

function prettifyKey(key) {
  if (labelMap[key]) return labelMap[key];

  return String(key)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/^./, (char) => char.toUpperCase());
}

function isIsoDate(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function formatDate(value, options = { day: '2-digit', month: '2-digit', year: 'numeric' }) {
  if (!isIsoDate(value)) return value;

  return new Intl.DateTimeFormat('fr-FR', options).format(
    new Date(`${value}T00:00:00`)
  );
}

function isPrimitive(value) {
  return value == null || ['string', 'number', 'boolean'].includes(typeof value);
}

function getAtPath(source, path) {
  return path.reduce((current, segment) => current?.[segment], source);
}

function buildDefaultValue(example, path = []) {
  if (Array.isArray(example)) {
    return [];
  }

  if (example && typeof example === 'object') {
    return Object.fromEntries(
      Object.entries(example).map(([key, value]) => [
        key,
        buildDefaultValue(value, [...path, key]),
      ])
    );
  }

  const fieldKey = path[path.length - 1];
  const parentKey = path[path.length - 2];

  if (
    ['day', 'datePrevue', 'dueDate'].includes(fieldKey) ||
    (fieldKey === 'id' && parentKey === 'days')
  ) {
    return '';
  }

  if (typeof example === 'number') return 0;
  if (typeof example === 'boolean') return false;
  return '';
}

function createArrayItemTemplate(arrayKey) {
  switch (arrayKey) {
    case 'vcsAgenda':
      return {
        pilote: '',
        copilote: '',
        datePrevue: '',
        statut: '',
        compteRendu: '',
      };
    case 'complaintsByDay':
    case 'oeeTrend':
    case 'absencesByDay':
      return { day: '', value: 0 };
    case 'revenueByDay':
      return { day: '', revenue: 0, target: 0 };
    case 'otifList':
      return {
        client: '',
        pf: '',
        designation: '',
        dueDate: '',
        max: 0,
        comment: '',
      };
    case 'days':
      return { id: '', produced: 0, target: 0, lines: [] };
    case 'lines':
      return { line: '', produced: 0, target: 0 };
    default:
      return '';
  }
}

function getNewArrayItem(currentValue, path) {
  if (currentValue.length > 0) {
    return buildDefaultValue(currentValue[0], path);
  }

  return createArrayItemTemplate(path[path.length - 1]);
}

function getArrayItemTitle(item, index, path) {
  if (item && typeof item === 'object') {
    if (item.day) return formatDate(item.day);
    if (item.datePrevue) return formatDate(item.datePrevue);
    if (item.dueDate) return formatDate(item.dueDate);
    if (item.id) {
      return path[path.length - 1] === 'days'
        ? formatDate(item.id)
        : String(item.id);
    }
    if (item.line) return item.line;
    if (item.client) return item.client;
    if (item.pilote) return item.pilote;
    if (item.weekLabel) return item.weekLabel;
  }

  return `${prettifyKey(path[path.length - 1] || 'ligne')} ${index + 1}`;
}

export default function EditDataModal({
  isOpen,
  title,
  formData,
  setFormData,
  onClose,
  onSave,
}) {
  if (!isOpen) return null;

  const updateAtPath = (path, value) => {
    setFormData((prev) => {
      const next = structuredClone(prev);

      if (path.length === 0) return value;

      const lastSegment = path[path.length - 1];
      const parent = getAtPath(next, path.slice(0, -1));
      parent[lastSegment] = value;
      return next;
    });
  };

  const addArrayItem = (path) => {
    setFormData((prev) => {
      const next = structuredClone(prev);
      const targetArray = getAtPath(next, path);
      targetArray.push(getNewArrayItem(targetArray, path));
      return next;
    });
  };

  const removeArrayItem = (path, index) => {
    setFormData((prev) => {
      const next = structuredClone(prev);
      const targetArray = getAtPath(next, path);
      targetArray.splice(index, 1);
      return next;
    });
  };

  const renderPrimitiveField = (value, path, fieldKey) => {
    const fieldType =
      ['day', 'datePrevue', 'dueDate'].includes(fieldKey) ||
      (fieldKey === 'id' && path[path.length - 2] === 'days')
        ? 'date'
        : typeof value === 'number'
          ? 'number'
          : typeof value === 'string' && String(value).length > 80
            ? 'textarea'
            : 'text';

    return (
      <div key={path.join('.')}>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {prettifyKey(fieldKey)}
        </label>

        {fieldType === 'textarea' ? (
          <textarea
            value={value ?? ''}
            onChange={(e) => updateAtPath(path, e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-[#790022] focus:ring-2 focus:ring-[#790022]/20"
          />
        ) : (
          <input
            type={fieldType}
            step={fieldType === 'number' ? 'any' : undefined}
            value={value ?? ''}
            onChange={(e) =>
              updateAtPath(
                path,
                fieldType === 'number' ? Number(e.target.value || 0) : e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-[#790022] focus:ring-2 focus:ring-[#790022]/20"
          />
        )}
      </div>
    );
  };

  const renderNode = (value, path = [], keyName = '') => {
    if (isPrimitive(value)) {
      return renderPrimitiveField(value, path, keyName);
    }

    if (Array.isArray(value)) {
      const blockTitle = prettifyKey(keyName);

      return (
        <div key={path.join('.')} className="space-y-3 rounded-2xl border border-gray-200 bg-gray-50/70 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-gray-900">{blockTitle}</h3>
              <p className="text-sm text-gray-500">
                Ajoutez, supprimez et modifiez les lignes de cette section.
              </p>
            </div>

            <button
              type="button"
              onClick={() => addArrayItem(path)}
              className="inline-flex items-center gap-2 rounded-xl border border-[#790022]/20 bg-white px-3 py-2 text-sm font-semibold text-[#790022] hover:bg-[#790022]/5"
            >
              <FiPlus />
              Ajouter une ligne
            </button>
          </div>

          {value.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-6 text-sm text-gray-500">
              Aucune ligne. Utilisez “Ajouter une ligne”.
            </div>
          ) : (
            <div className="space-y-3">
              {value.map((item, index) => (
                <div key={`${path.join('.')}.${index}`} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">
                        {getArrayItemTitle(item, index, path)}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {prettifyKey(keyName)} • Ligne {index + 1}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeArrayItem(path, index)}
                      className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      <FiTrash2 />
                      Supprimer
                    </button>
                  </div>

                  {isPrimitive(item) ? (
                    renderPrimitiveField(item, [...path, index], keyName)
                  ) : (
                    renderNode(item, [...path, index], keyName)
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    const entries = Object.entries(value);
    const primitiveEntries = entries.filter(([, childValue]) => isPrimitive(childValue));
    const complexEntries = entries.filter(([, childValue]) => !isPrimitive(childValue));
    const hasWrapper = path.length > 0 && typeof path[path.length - 1] === 'string';

    const content = (
      <div className="space-y-4">
        {primitiveEntries.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {primitiveEntries.map(([childKey, childValue]) =>
              renderPrimitiveField(childValue, [...path, childKey], childKey)
            )}
          </div>
        ) : null}

        {complexEntries.map(([childKey, childValue]) => (
          <div key={[...path, childKey].join('.')}>
            {renderNode(childValue, [...path, childKey], childKey)}
          </div>
        ))}
      </div>
    );

    if (!hasWrapper) {
      return content;
    }

    return (
      <div key={path.join('.')} className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            {prettifyKey(keyName)}
          </h3>
          {['day', 'datePrevue', 'dueDate', 'id'].includes(keyName) && isIsoDate(value) ? (
            <p className="text-sm text-gray-500">{formatDate(value)}</p>
          ) : null}
        </div>
        {content}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 p-4">
      <div className="flex max-h-[90vh] w-full max-w-6xl flex-col rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <p className="mt-1 text-sm text-gray-500">
              Les jours sont éditables via un calendrier, et vous pouvez ajouter ou supprimer des lignes.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-300 p-2 text-gray-600 hover:bg-gray-50"
          >
            <FiX />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-1">
          <div className="space-y-4">{renderNode(formData)}</div>
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <FiX />
            Annuler
          </button>

          <button
            type="button"
            onClick={onSave}
            className="inline-flex items-center gap-2 rounded-xl bg-[#790022] px-4 py-2 text-sm font-semibold text-white hover:bg-[#93002a]"
          >
            <FiSave />
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
