'use client';

import React from 'react';
import type { CourseSubject } from '@/lib/courseSubject';
import { AdminSubjectSelect } from '@/components/dashboard/AdminSubjectSelect';

interface CourseToggleProps {
  activeTab: CourseSubject;
  onToggle: (tab: CourseSubject) => void;
}

export function CourseToggle({ activeTab, onToggle }: CourseToggleProps) {
  return <AdminSubjectSelect value={activeTab} onChange={onToggle} />;
}
