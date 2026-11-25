'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NotebookPen, Users } from 'lucide-react';

const TABS = [
  { href: '/admin/lessons', label: 'Lessons', icon: NotebookPen },
  { href: '/admin/students', label: 'Students', icon: Users },
];

/** Switches between the tutor's lesson notes and student progress. */
export default function AdminTabs() {
  const pathname = usePathname();
  return (
    <nav aria-label="Tutor pages" className="inline-flex w-fit gap-1 rounded-xl border border-slate-200 bg-white p-1">
      {TABS.map(({ href, label, icon: Icon }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm font-bold transition ${
              active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Icon className="h-4 w-4" aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
