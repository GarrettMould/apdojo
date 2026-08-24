'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import type { CourseSubject } from '@/lib/courseSubject';
import { AdminSubjectSelect } from '@/components/dashboard/AdminSubjectSelect';
import { useSubjectSwitchNavigation } from '@/hooks/useSubjectSwitchNavigation';

export function SubjectToggle() {
  const { selectedSubject } = useAuthContext();
  const [mounted, setMounted] = useState(false);
  const handleSubjectSwitch = useSubjectSwitchNavigation();

  useEffect(() => {
    setMounted(true);
  }, []);

  const displaySubject = mounted ? selectedSubject : 'macro';

  const handleSubjectChange = (newSubject: CourseSubject) => {
    void handleSubjectSwitch(newSubject, displaySubject);
  };

  return <AdminSubjectSelect value={displaySubject} onChange={handleSubjectChange} />;
}
