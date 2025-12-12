# Console Log Cleanup Guide

## Summary
We've created a logger utility (`src/utils/logger.ts`) that only logs in development mode. This keeps production console clean while preserving debugging capabilities during development.

## What's Been Done

### ✅ Created Logger Utility
- **File**: `src/utils/logger.ts`
- **Features**: 
  - Only logs in development mode (`NODE_ENV === 'development'`)
  - Provides `log`, `error`, `warn`, `info`, `debug` methods
  - Errors still log in production (for critical issues)

### ✅ Cleaned Up Client-Side Components
The following files have been updated to use the logger utility:
- `src/components/BlogImagePlacer.tsx` - Development tool logs
- `src/components/unitMCQS.tsx` - All debug logs replaced
- `src/app/unitMCQPracticePage/page.tsx` - Calculation and debug logs replaced
- `src/app/unitFRQpracticePage/page.tsx` - Debug logs wrapped in dev checks

## Remaining Console Statements

### Client-Side Files (User-Visible)
These files still have console statements that users can see:

1. **src/components/header.tsx** - Error logging (should keep for errors)
2. **src/app/unit/[unitId]/page.tsx** - Various logs
3. **src/app/video-comprehension-checks/[videoSlug]/page.tsx** - Debug logs
4. **src/app/quizMeTester/page.tsx** - Notion API logs
5. **src/components/DrawingPad/index.tsx** - Drawing pad logs
6. **src/components/board/BoardDisplay.tsx** - Board display logs
7. **src/components/unitMCQDashboard.tsx** - Dashboard logs
8. **src/components/questionsGrid.tsx** - Question grid logs
9. **src/components/FullExam.tsx** - Exam logs
10. **src/components/diagnosticQuizMacro.tsx** - Quiz logs

### Server-Side Files (API Routes)
These are less critical as users don't see them directly, but should be cleaned up:
- `src/app/api/**/*.ts` - API route logs (many files)

## How to Continue Cleanup

### For Client Components:
1. Import the logger: `import { logger } from '@/utils/logger';`
2. Replace `console.log` → `logger.log` or `logger.debug`
3. Replace `console.warn` → `logger.warn`
4. Replace `console.error` → `logger.error` (errors should still log)
5. Replace `console.info` → `logger.info`

### For Server Components/API Routes:
- Consider using the same logger utility
- Or wrap in `if (process.env.NODE_ENV === 'development')` checks
- Keep error logging for production debugging

### Quick Find & Replace Pattern:
```bash
# Find all console.log in client components
grep -r "console\.log" src/components/ src/app/ --include="*.tsx" --include="*.ts"

# Find all console.warn
grep -r "console\.warn" src/components/ src/app/ --include="*.tsx" --include="*.ts"

# Find all console.error (be careful - some should remain)
grep -r "console\.error" src/components/ src/app/ --include="*.tsx" --include="*.ts"
```

## Best Practices

1. **Use logger.debug()** for detailed debugging info
2. **Use logger.log()** for general information
3. **Use logger.warn()** for warnings
4. **Use logger.error()** for errors (these still show in production)
5. **Remove console.log** from production code paths
6. **Keep error logging** for critical issues

## Testing

After cleanup, test that:
- ✅ Development mode still shows all logs
- ✅ Production builds have clean console
- ✅ Error messages still appear when needed
- ✅ No functionality is broken
