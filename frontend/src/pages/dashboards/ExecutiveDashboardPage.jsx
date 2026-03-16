import { useEffect, useMemo, useState } from 'react';
import {
  FiShield,
  FiAward,
  FiClock,
  FiDollarSign,
  FiUsers,
  FiActivity,
  FiAlertTriangle,
  FiCheckCircle,
  FiTrendingUp,
  FiTruck,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiMonitor,
} from 'react-icons/fi';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import DashboardToolbar from '../../components/dashboard/DashboardToolbar';
import DashboardCard from '../../components/dashboard/DashboardCard';
import KpiCard from '../../components/dashboard/KpiCard';
import VcsAgendaTable from '../../components/dashboard/VcsAgendaTable';
import OtifTable from '../../components/dashboard/OtifTable';
import DailyComplaintsBarChart from '../../components/dashboard/charts/DailyComplaintsBarChart';
import RevenueLineChart from '../../components/dashboard/charts/RevenueLineChart';
import OeeTrendChart from '../../components/dashboard/charts/OeeTrendChart';
import AbsenceBarChart from '../../components/dashboard/charts/AbsenceBarChart';
import WeeklyProductionDrilldown from '../../components/dashboard/WeeklyProductionDrilldown';
import EditableCardWrapper from '../../components/dashboard/EditableCardWrapper';
import EditDataModal from '../../components/dashboard/EditDataModal';
import SortableDashboardCard from '../../components/dashboard/SortableDashboardCard';
import { dashboardsByLevel } from '../../data/dashboardData';
import { useDashboardLayout } from '../../hooks/useDashboardLayout';

const sectionMeta = {
  safety: { title: 'Sécurité', icon: FiShield },
  quality: { title: 'Qualité', icon: FiAward },
  delivery: { title: 'Délai', icon: FiClock },
  cost: { title: 'Coût', icon: FiDollarSign },
  people: { title: 'Personnel', icon: FiUsers },
};

export default function ExecutiveDashboardPage({
  level = 'codir',
  title = 'Comité de direction',
}) {
  const [editMode, setEditMode] = useState(false);
  const [dashboardData, setDashboardData] = useState(dashboardsByLevel[level]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalFields, setModalFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [saveHandler, setSaveHandler] = useState(() => () => {});
  const [slideshowIndex, setSlideshowIndex] = useState(null);
  const { layout, handleDragEnd } = useDashboardLayout();

  const openEditModal = ({ title, fields, initialData, onSave }) => {
    setModalTitle(title);
    setModalFields(fields);
    setFormData(initialData);
    setSaveHandler(() => onSave);
    setIsModalOpen(true);
  };

  const editSafetyLostTime = () => {
    openEditModal({
      title: 'Modifier - Jours sans accident avec arrêt de travail',
      fields: [
        {
          key: 'daysWithoutLostTimeAccident',
          label: 'Valeur',
          type: 'number',
        },
      ],
      initialData: {
        daysWithoutLostTimeAccident:
          dashboardData.safety.kpis.daysWithoutLostTimeAccident,
      },
      onSave: () => {
        setDashboardData((prev) => ({
          ...prev,
          safety: {
            ...prev.safety,
            kpis: {
              ...prev.safety.kpis,
              daysWithoutLostTimeAccident: Number(
                formData.daysWithoutLostTimeAccident
              ),
            },
          },
        }));
        setIsModalOpen(false);
      },
    });
  };

  const editComplaintsChart = () => {
    openEditModal({
      title: 'Modifier - Réclamations ouvertes',
      fields: [
        { key: 'day1', label: 'Jour 1', type: 'number' },
        { key: 'day2', label: 'Jour 2', type: 'number' },
        { key: 'day3', label: 'Jour 3', type: 'number' },
        { key: 'day4', label: 'Jour 4', type: 'number' },
        { key: 'day5', label: 'Jour 5', type: 'number' },
      ],
      initialData: {
        day1: dashboardData.quality.complaintsByDay[0]?.value ?? 0,
        day2: dashboardData.quality.complaintsByDay[1]?.value ?? 0,
        day3: dashboardData.quality.complaintsByDay[2]?.value ?? 0,
        day4: dashboardData.quality.complaintsByDay[3]?.value ?? 0,
        day5: dashboardData.quality.complaintsByDay[4]?.value ?? 0,
      },
      onSave: () => {
        setDashboardData((prev) => {
          const updated = [...prev.quality.complaintsByDay];
          updated[0] = { ...updated[0], value: Number(formData.day1) };
          updated[1] = { ...updated[1], value: Number(formData.day2) };
          updated[2] = { ...updated[2], value: Number(formData.day3) };
          updated[3] = { ...updated[3], value: Number(formData.day4) };
          updated[4] = { ...updated[4], value: Number(formData.day5) };

          return {
            ...prev,
            quality: {
              ...prev.quality,
              complaintsByDay: updated,
            },
          };
        });

        setIsModalOpen(false);
      },
    });
  };

  const sections = useMemo(
    () => ({
      safety: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <EditableCardWrapper
              editMode={editMode}
              onEdit={editSafetyLostTime}
            >
              <KpiCard
                icon={FiActivity}
                label="Jours sans accident avec arrêt de travail"
                value={dashboardData.safety.kpis.daysWithoutLostTimeAccident}
              />
            </EditableCardWrapper>

            <KpiCard
              icon={FiAlertTriangle}
              label="Jours sans accident déclaré"
              value={dashboardData.safety.kpis.daysWithoutDeclaredAccident}
            />

            <KpiCard
              icon={FiCheckCircle}
              label="Jours sans incident environnemental"
              value={dashboardData.safety.kpis.daysWithoutEnvironmentalIncident}
            />
          </div>

          <div>
            <h3 className="mb-3 text-base font-semibold text-gray-900">
              Agenda des VCS
            </h3>
            <VcsAgendaTable rows={dashboardData.safety.vcsAgenda} />
          </div>
        </div>
      ),

      quality: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <KpiCard
              icon={FiAward}
              label="Nb déviations ouvertes / clôturées"
              value={dashboardData.quality.kpis.deviationsOpenClosed}
            />
            <KpiCard
              icon={FiActivity}
              label="Nombre de déviations en cours"
              value={dashboardData.quality.kpis.deviationsInProgress}
            />
            <KpiCard
              icon={FiAlertTriangle}
              label="Réclamations en cours / PF en attente"
              value={dashboardData.quality.kpis.complaintsAndPfPending}
            />
          </div>

          <EditableCardWrapper editMode={editMode} onEdit={editComplaintsChart}>
            <div>
              <h3 className="mb-3 text-base font-semibold text-gray-900">
                Nombre de réclamations ouvertes – mois en cours
              </h3>
              <DailyComplaintsBarChart
                data={dashboardData.quality.complaintsByDay}
              />
            </div>
          </EditableCardWrapper>
        </div>
      ),

      delivery: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <KpiCard
              icon={FiTruck}
              label="Chiffre d'affaires OTIF hebdo"
              value={dashboardData.delivery.kpis.otifWeeklyTurnover}
              suffix="%"
            />
            <KpiCard
              icon={FiTrendingUp}
              label="MGH"
              value={dashboardData.delivery.kpis.mgh}
              suffix="%"
            />
          </div>

          <div>
            <h3 className="mb-3 text-base font-semibold text-gray-900">
              Chiffre d’affaires journalier
            </h3>
            <RevenueLineChart data={dashboardData.delivery.revenueByDay} />
          </div>

          <div>
            <h3 className="mb-3 text-base font-semibold text-gray-900">
              Suivi des quantités à produire
            </h3>
            <WeeklyProductionDrilldown
              weeklyProduction={dashboardData.delivery.weeklyProduction}
              currentWeek={dashboardData.meta.currentWeek}
            />
          </div>

          <div>
            <h3 className="mb-3 text-base font-semibold text-gray-900">
              Liste des OTIFs
            </h3>
            <OtifTable rows={dashboardData.delivery.otifList} />
          </div>
        </div>
      ),

      cost: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <KpiCard
              icon={FiTrendingUp}
              label="Daily OEE"
              value={dashboardData.cost.kpis.dailyOee}
              suffix="%"
            />
            <KpiCard
              icon={FiDollarSign}
              label="Coût déchet"
              value={dashboardData.cost.kpis.wasteCost}
              suffix="€"
            />
          </div>

          <div>
            <h3 className="mb-3 text-base font-semibold text-gray-900">
              Évolution de l’OEE – mois en cours
            </h3>
            <OeeTrendChart data={dashboardData.cost.oeeTrend} />
          </div>
        </div>
      ),

      people: (
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-base font-semibold text-gray-900">
              Nombre d’absences par jour – mois en cours
            </h3>
            <AbsenceBarChart data={dashboardData.people.absencesByDay} />
          </div>
        </div>
      ),
    }),
    [dashboardData, editMode]
  );

  const slideshowSectionKey =
    slideshowIndex === null ? null : layout[slideshowIndex] ?? layout[0];
  const slideshowMeta = slideshowSectionKey ? sectionMeta[slideshowSectionKey] : null;
  const SlideshowIcon = slideshowMeta?.icon;

  const startSlideshow = () => {
    setEditMode(false);
    setSlideshowIndex(0);

    if (typeof document !== 'undefined' && document.documentElement?.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  const stopSlideshow = () => {
    setSlideshowIndex(null);

    if (typeof document !== 'undefined' && document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  };

  const goToPreviousSection = () => {
    setSlideshowIndex((prev) => {
      if (prev === null) return 0;
      return prev === 0 ? layout.length - 1 : prev - 1;
    });
  };

  const goToNextSection = () => {
    setSlideshowIndex((prev) => {
      if (prev === null) return 0;
      return prev === layout.length - 1 ? 0 : prev + 1;
    });
  };

  useEffect(() => {
    const isSlideshowActive = slideshowIndex !== null;

    window.dispatchEvent(
      new CustomEvent('dashboard-slideshow-change', {
        detail: { active: isSlideshowActive },
      })
    );

    if (!isSlideshowActive) {
      return () => {
        window.dispatchEvent(
          new CustomEvent('dashboard-slideshow-change', {
            detail: { active: false },
          })
        );
      };
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        goToNextSection();
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        goToPreviousSection();
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        stopSlideshow();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      window.dispatchEvent(
        new CustomEvent('dashboard-slideshow-change', {
          detail: { active: false },
        })
      );
    };
  }, [slideshowIndex, layout.length]);

  return (
    <>
      <div className="min-h-screen space-y-6 bg-gradient-to-b from-gray-50 to-gray-100 p-6 lg:p-8">
        <div className="rounded-3xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#790022]">
                Dashboard
              </p>
              <h1 className="mt-1 text-3xl font-extrabold text-gray-900">
                {title}
              </h1>
            </div>

            <div className="rounded-2xl bg-[#790022] px-4 py-3 text-white shadow-md">
              <p className="text-xs uppercase tracking-wide opacity-80">Période</p>
              <p className="text-lg font-bold">{dashboardData.meta.month}</p>
            </div>
          </div>
        </div>

        <DashboardToolbar
          editMode={editMode}
          setEditMode={setEditMode}
          onStartSlideshow={startSlideshow}
        />

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={layout} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              {layout.map((sectionKey) => {
                const meta = sectionMeta[sectionKey];

                return (
                  <SortableDashboardCard
                    key={sectionKey}
                    id={sectionKey}
                    title={meta.title}
                    icon={meta.icon}
                    editMode={editMode}
                  >
                    {sections[sectionKey]}
                  </SortableDashboardCard>
                );
              })}
            </div>
          </SortableContext>
        </DndContext>

        <EditDataModal
          isOpen={isModalOpen}
          title={modalTitle}
          fields={modalFields}
          formData={formData}
          setFormData={setFormData}
          onClose={() => setIsModalOpen(false)}
          onSave={saveHandler}
        />
      </div>

      {slideshowMeta && slideshowSectionKey ? (
        <div className="fixed inset-0 z-[2100] flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-[#790022] text-white">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-5 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur">
                {SlideshowIcon ? <SlideshowIcon className="text-2xl" /> : null}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/60">
                  Mode diaporama
                </p>
                <h2 className="mt-1 text-3xl font-extrabold">
                  {slideshowMeta.title}
                </h2>
                <p className="mt-1 text-sm text-white/70">
                  Section {slideshowIndex + 1} / {layout.length} • {dashboardData.meta.month}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={stopSlideshow}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
            >
              <FiX />
              Quitter
            </button>
          </div>

          <div className="flex-1 overflow-auto px-4 py-6 lg:px-8 lg:py-8">
            <div className="mx-auto w-full max-w-7xl">
              <DashboardCard
                title={slideshowMeta.title}
                icon={slideshowMeta.icon}
                editMode={false}
              >
                {sections[slideshowSectionKey]}
              </DashboardCard>
            </div>
          </div>

          <div className="border-t border-white/10 bg-black/20 px-4 py-4 backdrop-blur lg:px-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                {layout.map((sectionKey, index) => {
                  const meta = sectionMeta[sectionKey];
                  const isActive = index === slideshowIndex;

                  return (
                    <button
                      key={sectionKey}
                      type="button"
                      onClick={() => setSlideshowIndex(index)}
                      className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                        isActive
                          ? 'bg-white text-[#790022]'
                          : 'bg-white/10 text-white hover:bg-white/15'
                      }`}
                    >
                      {meta.title}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={goToPreviousSection}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  <FiChevronLeft />
                  Précédent
                </button>

                <button
                  type="button"
                  onClick={goToNextSection}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#790022] transition hover:bg-white/90"
                >
                  Suivant
                  <FiChevronRight />
                </button>
              </div>
            </div>

            <div className="mx-auto mt-3 w-full max-w-7xl text-xs text-white/60">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                <FiMonitor />
                Flèches du clavier pour naviguer • Échap pour quitter
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
