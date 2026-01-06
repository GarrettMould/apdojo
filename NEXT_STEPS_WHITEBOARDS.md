# Next Steps: Populate Whiteboard Arrays

## ⚠️ Important Note
Your AWS command shows `AP_Macro_Unit_4`, but we need **Micro** units 4, 5, and 6. Make sure:
- Images are in: `AP_Micro_Unit_4/`, `AP_Micro_Unit_5/`, `AP_Micro_Unit_6/`
- If you uploaded to Macro folders, you may need to re-upload or move them

## Step-by-Step Instructions

### Step 1: Activate Your Virtual Environment
```bash
# Activate your venv (adjust path if needed)
source venv/bin/activate  # On Mac/Linux
# OR
venv\Scripts\activate  # On Windows
```

### Step 2: Navigate to Python Scripts Folder
```bash
cd "python scripts"  # or wherever your script is located
```

### Step 3: Run the Python Script for Each Unit

**For Unit 4:**
```bash
python3 generate_whiteboards.py 4
```

**For Unit 5:**
```bash
python3 generate_whiteboards.py 5
```

**For Unit 6:**
```bash
python3 generate_whiteboards.py 6
```

### Step 4: Copy the Output
The script should output TypeScript code that looks like:
```typescript
export const apMicroUnit4Whiteboards: Whiteboard[] = [
  { lessonID: "4.1", unit: 4, topic: "...", url: "..." },
  { lessonID: "4.2", unit: 4, topic: "...", url: "..." },
  // ... more entries
];
```

### Step 5: Paste into `src/data/whiteboards.ts`

1. Open `src/data/whiteboards.ts`
2. Find the empty arrays (around lines 263-276):
   - `apMicroUnit4Whiteboards` (line 263)
   - `apMicroUnit5Whiteboards` (line 268)
   - `apMicroUnit6Whiteboards` (line 273)

3. Replace each empty array with the output from the Python script

**Example - Before:**
```typescript
export const apMicroUnit4Whiteboards: Whiteboard[] = [
  // Add whiteboard entries here following the pattern:
  // { lessonID: "4.1", unit: 4, topic: "Topic Name", url: "https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/AP_Micro_Unit_4/4.1_Topic Name.jpg" },
];
```

**Example - After:**
```typescript
export const apMicroUnit4Whiteboards: Whiteboard[] = [
  { lessonID: "4.1", unit: 4, topic: "Introduction to Imperfectly Competitive Markets", url: "https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/AP_Micro_Unit_4/4.1_Introduction to Imperfectly Competitive Markets.jpg" },
  { lessonID: "4.2", unit: 4, topic: "Monopoly", url: "https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/AP_Micro_Unit_4/4.2_Monopoly.jpg" },
  // ... rest of entries
];
```

### Step 6: Verify the Format
Make sure each entry has:
- ✅ `lessonID` in format "X.Y" (e.g., "4.1", "5.2")
- ✅ `unit` number matches (4, 5, or 6)
- ✅ `topic` is a descriptive string
- ✅ `url` starts with `https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/AP_Micro_Unit_X/`

### Step 7: Save and Test
1. Save `src/data/whiteboards.ts`
2. Restart your dev server (if running)
3. Visit:
   - `/unit/4` for Unit 4 whiteboards
   - `/unit/5` for Unit 5 whiteboards
   - `/unit/6` for Unit 6 whiteboards
4. Check that whiteboards appear under each lesson

## Troubleshooting

**If the Python script doesn't output TypeScript:**
- Check what format it outputs (JSON, Python dict, etc.)
- You may need to manually convert the output

**If whiteboards don't appear:**
- Check browser console for 404 errors
- Verify URLs are accessible (open in new tab)
- Ensure arrays are not empty
- Check that lesson IDs match exactly

**If you get import errors:**
- Make sure the array names match exactly: `apMicroUnit4Whiteboards`, `apMicroUnit5Whiteboards`, `apMicroUnit6Whiteboards`
- Check for syntax errors (missing commas, quotes, etc.)

## Quick Checklist
- [ ] Activated venv
- [ ] Ran `python3 generate_whiteboards.py 4`
- [ ] Ran `python3 generate_whiteboards.py 5`
- [ ] Ran `python3 generate_whiteboards.py 6`
- [ ] Copied output for each unit
- [ ] Pasted into `src/data/whiteboards.ts`
- [ ] Saved file
- [ ] Tested on `/unit/4`, `/unit/5`, `/unit/6`

