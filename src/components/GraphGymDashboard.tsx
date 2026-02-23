'use client';

import React, { useCallback, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { graphGymScenarios, GraphGymScenario } from '@/data/graphGymScenarios';
import { useCourseContext } from '@/contexts/CourseContext';

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
}

function mapDifficulty(d: 'easy' | 'medium' | 'hard'): ScenarioDifficulty {
  return d === 'easy' ? 'Beginner' : d === 'medium' ? 'Intermediate' : 'Advanced';
}

function scenariosToCards(scenarios: GraphGymScenario[]): GraphGymScenarioCard[] {
  return scenarios.map((s) => ({
    id: String(s.id),
    unit: parseInt(s.lessonId.split('.')[0], 10) || 1,
    lessonId: s.lessonId,
    title: s.title,
    difficulty: mapDifficulty(s.difficulty),
  }));
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function DifficultyBadge({ difficulty }: { difficulty: ScenarioDifficulty }) {
  const styles: Record<ScenarioDifficulty, string> = {
    Beginner:
      'bg-emerald-500/20 text-emerald-700 dark:bg-emerald-500/25 dark:text-emerald-400 border-emerald-500/40',
    Intermediate:
      'bg-amber-500/20 text-amber-700 dark:bg-amber-500/25 dark:text-amber-400 border-amber-500/40',
    Advanced:
      'bg-red-500/20 text-red-700 dark:bg-red-500/25 dark:text-red-400 border-red-500/40',
  };

  return (
    <span
      className={`inline-flex w-fit items-center rounded border px-1.5 py-0.5 text-[10px] font-semibold leading-tight ${styles[difficulty]}`}
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
  onSelect,
}: {
  scenario: GraphGymScenarioCard;
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
      className="group flex cursor-pointer items-center justify-between gap-5 rounded-xl border border-border bg-card p-6 text-left transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background min-h-[88px]"
      aria-label={`Start scenario: ${scenario.title}`}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h3 className="font-bold text-foreground group-hover:text-primary text-lg">
          {scenario.title}
        </h3>
        <div className="flex flex-wrap items-center gap-1.5">
          <LessonIdBadge lessonId={scenario.lessonId} />
          <DifficultyBadge difficulty={scenario.difficulty} />
        </div>
      </div>
      <ArrowRight
        className="h-6 w-6 flex-shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all"
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

  const units = useMemo(
    () => Array.from(scenariosByUnit.keys()).sort((a, b) => a - b),
    [scenariosByUnit]
  );

  const handleSelectScenario = useCallback(
    (id: string) => {
      onSelectScenario?.(id);
    },
    [onSelectScenario]
  );

  return (
    <div className="min-h-0 w-full overflow-auto">
      <main className="p-4 lg:p-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-8 text-xl font-black text-foreground lg:text-2xl">
            Graph Gym
          </h1>

          <div className="space-y-8">
            {units.map((unit) => (
              <section key={unit}>
                <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Unit {unit}
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {(scenariosByUnit.get(unit) ?? []).map((scenario) => (
                    <ScenarioCard
                      key={scenario.id}
                      scenario={scenario}
                      onSelect={handleSelectScenario}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {units.length === 0 && (
            <p className="py-12 text-center text-muted-foreground">
              No scenarios found for this subject.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
