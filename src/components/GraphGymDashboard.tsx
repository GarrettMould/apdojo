'use client';

import React, { useCallback, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { graphGymScenarios, GraphGymScenario } from '@/data/graphGymScenarios';
import { useCourseContext } from '@/contexts/CourseContext';
import { macroUnits, microUnits } from '@/data/cheatSheets';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ScenarioDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface GraphGymScenarioCard {
  id: string;
  unit: number;
  lessonId: string;
  title: string;
  difficulty: ScenarioDifficulty;
  topics: string[];
}

function mapDifficulty(d: 'easy' | 'medium' | 'hard'): ScenarioDifficulty {
  return d === 'easy' ? 'Beginner' : d === 'medium' ? 'Intermediate' : 'Advanced';
}

const TOPIC_SHORT_NAMES: Record<string, string> = {
  'Production Possibilities Curve': 'PPC',
  'Foreign Exchange': 'Forex',
  'AD-AS Model': 'AD-AS',
  'International Trade': 'Trade',
  'Price Controls': 'Price Controls',
  'Market Equilibrium': 'Supply & Demand',
  'Negative Externality': 'Externalities',
  'Positive Externality': 'Externalities',
  'Externalities': 'Externalities',
  'Deficit Spending': 'Fiscal Policy',
  'Crowding Out': 'Fiscal Policy',
  'Monetary Policy': 'Money Market',
  'Recessionary Gap': 'AD-AS',
  'Inflationary Gap': 'AD-AS',
  'Short Run Equilibrium': 'AD-AS',
};

function topicToShortName(topic: string): string {
  return TOPIC_SHORT_NAMES[topic] ?? topic;
}

function scenariosToCards(scenarios: GraphGymScenario[]): GraphGymScenarioCard[] {
  return scenarios.map((s) => ({
    id: String(s.id),
    unit: parseInt(s.lessonId.split('.')[0], 10) || 1,
    lessonId: s.lessonId,
    title: s.title,
    difficulty: mapDifficulty(s.difficulty),
    topics: s.topics ?? [],
  }));
}

function buildDisplayNames(cards: GraphGymScenarioCard[]): Map<string, string> {
  const byTopic = new Map<string, GraphGymScenarioCard[]>();
  for (const card of cards) {
    const topic = card.topics[0] ?? 'Graph';
    const short = topicToShortName(topic);
    const list = byTopic.get(short) ?? [];
    list.push(card);
    byTopic.set(short, list);
  }
  const out = new Map<string, string>();
  for (const [shortName, list] of byTopic) {
    list.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
    list.forEach((card, i) => out.set(card.id, `${shortName} #${i + 1}`));
  }
  return out;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function DifficultyBadge({ difficulty }: { difficulty: ScenarioDifficulty }) {
  const styles: Record<ScenarioDifficulty, string> = {
    Beginner:
      'bg-green-500 text-white border-green-600',
    Intermediate:
      'bg-blue-500 text-white border-blue-600',
    Advanced:
      'bg-red-500 text-white border-red-600',
  };

  return (
    <span
      className={`inline-flex w-fit items-center rounded border-2 px-1.5 py-0.5 text-[10px] font-semibold leading-tight ${styles[difficulty]}`}
      aria-label={`Difficulty: ${difficulty}`}
    >
      {difficulty}
    </span>
  );
}

function LessonIdBadge({ lessonId }: { lessonId: string }) {
  return (
    <span
      className="inline-flex w-fit items-center rounded border border-muted-foreground/30 bg-muted/50 px-1.5 py-0.5 text-[10px] font-semibold leading-tight text-muted-foreground"
      aria-label={`Lesson: ${lessonId}`}
    >
      {lessonId}
    </span>
  );
}

function ScenarioCard({
  scenario,
  displayName,
  onSelect,
}: {
  scenario: GraphGymScenarioCard;
  displayName: string;
  onSelect: (id: string) => void;
}) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const id = (e.currentTarget as HTMLElement).dataset.scenarioId;
      if (id) onSelect(id);
    },
    [onSelect]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect(scenario.id);
      }
    },
    [scenario.id, onSelect]
  );

  return (
    <article
      role="button"
      tabIndex={0}
      data-scenario-id={scenario.id}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="group flex cursor-pointer items-center justify-between gap-5 rounded-xl border-4 border-black bg-white p-6 text-left shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[88px]"
      aria-label={`Start scenario: ${scenario.title}`}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h3 className="font-black text-gray-900 group-hover:text-blue-600 text-lg transition-colors">
          {displayName}
        </h3>
        <div className="flex flex-wrap items-center gap-1.5">
          <LessonIdBadge lessonId={scenario.lessonId} />
          <DifficultyBadge difficulty={scenario.difficulty} />
        </div>
      </div>
      <ArrowRight
        className="h-6 w-6 flex-shrink-0 text-gray-500 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all"
        aria-label="Start"
      />
    </article>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

interface GraphGymDashboardProps {
  onSelectScenario?: (id: string) => void;
}

function groupByUnit(cards: GraphGymScenarioCard[]): Map<number, GraphGymScenarioCard[]> {
  const map = new Map<number, GraphGymScenarioCard[]>();
  for (const card of cards) {
    const list = map.get(card.unit) ?? [];
    list.push(card);
    map.set(card.unit, list);
  }
  return map;
}

export function GraphGymDashboard({ onSelectScenario }: GraphGymDashboardProps) {
  const { currentCourse } = useCourseContext();

  const allScenarioCards = useMemo(() => {
    const bySubject = graphGymScenarios.filter((s) => {
      const subjects = Array.isArray(s.subject) ? s.subject : [s.subject];
      return subjects.includes(currentCourse);
    });
    return scenariosToCards(bySubject);
  }, [currentCourse]);

  const scenariosByUnit = useMemo(
    () => groupByUnit(allScenarioCards),
    [allScenarioCards]
  );

  const displayNames = useMemo(
    () => buildDisplayNames(allScenarioCards),
    [allScenarioCards]
  );

  const unitNumbers = useMemo(
    () => Array.from(scenariosByUnit.keys()).sort((a, b) => a - b),
    [scenariosByUnit]
  );

  const unitsWithTitles = useMemo(() => {
    const units = currentCourse === 'macro' ? macroUnits : microUnits;
    return unitNumbers.map((num) => units.find((u) => u.number === num)).filter(Boolean) as Array<{ number: number; title: string }>;
  }, [currentCourse, unitNumbers]);

  const handleSelectScenario = useCallback(
    (id: string) => {
      onSelectScenario?.(id);
    },
    [onSelectScenario]
  );

  return (
    <div className="min-h-0 w-full overflow-auto bg-gray-50">
      <main className="px-4 py-12">
        <div className="mx-auto max-w-[720px]">
          <header className="mb-12 text-center">
            <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tight">
              Graph Gym
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Draw the graphs. Master the exam.
            </p>
          </header>

          <div className="space-y-12">
            {unitsWithTitles.map((unit) => {
              const cards = scenariosByUnit.get(unit.number) ?? [];
              if (cards.length === 0) return null;
              return (
                <section key={unit.number}>
                  <h2 className="text-2xl font-black text-gray-900 mb-6 pt-4 border-t border-gray-200 first:border-t-0 first:pt-0">
                    Unit {unit.number}: {unit.title}
                  </h2>
                  <ul className="list-none p-0 m-0 flex flex-col gap-4">
                    {cards.map((scenario) => (
                      <li key={scenario.id}>
                        <ScenarioCard
                          scenario={scenario}
                          displayName={displayNames.get(scenario.id) ?? scenario.title}
                          onSelect={handleSelectScenario}
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>

          {unitNumbers.length === 0 && (
            <p className="py-12 text-center text-gray-500 text-lg">
              No scenarios found for this subject.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
