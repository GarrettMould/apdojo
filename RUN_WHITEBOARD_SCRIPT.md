# How to Run the Whiteboard Generation Script

## ✅ What I Fixed in Your Script

1. **Changed folder**: `AP_Macro_Unit_` → `AP_Micro_Unit_` (for Micro units)
2. **Fixed separator**: Changed from `*` to `_` (underscore) to match your filename format
3. **Fixed output format**: Now generates `apMicroUnit4Whiteboards` instead of `unit4Whiteboards`
4. **Added sorting**: Entries are sorted by lesson ID
5. **Better error handling**: Skips files that don't match the format

## 📋 Step-by-Step Instructions

### Step 1: Make Sure You're in the Right Directory
```bash
# Navigate to where your Python script is (or where you want to run it)
cd "python scripts"  # or wherever your script folder is
```

### Step 2: Activate Your Virtual Environment
```bash
# On Mac/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

### Step 3: Make Sure boto3 is Installed
```bash
pip install boto3
```

### Step 4: Configure AWS Credentials (if not already done)
The script needs AWS credentials to access S3. Make sure you have:
- AWS Access Key ID
- AWS Secret Access Key

You can set them via:
```bash
aws configure
```

Or set environment variables:
```bash
export AWS_ACCESS_KEY_ID=your_key
export AWS_SECRET_ACCESS_KEY=your_secret
```

### Step 5: Run the Script for Each Unit

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

### Step 6: Copy the Output

The script will print TypeScript code to the console. It will look like:
```typescript
export const apMicroUnit4Whiteboards: Whiteboard[] = [
  { lessonID: "4.1", unit: 4, topic: "Introduction to Imperfectly Competitive Markets", url: "https://..." },
  { lessonID: "4.2", unit: 4, topic: "Monopoly", url: "https://..." },
  ...
];
```

### Step 7: Paste into `src/data/whiteboards.ts`

1. Open `src/data/whiteboards.ts`
2. Find the empty arrays:
   - Line 263: `apMicroUnit4Whiteboards`
   - Line 268: `apMicroUnit5Whiteboards`
   - Line 273: `apMicroUnit6Whiteboards`
3. Replace each empty array with the output from the script

**Example - Before:**
```typescript
export const apMicroUnit4Whiteboards: Whiteboard[] = [
  // Add whiteboard entries here following the pattern:
  // { lessonID: "4.1", unit: 4, topic: "Topic Name", url: "https://..." },
];
```

**Example - After:**
```typescript
export const apMicroUnit4Whiteboards: Whiteboard[] = [
  { lessonID: "4.1", unit: 4, topic: "Introduction to Imperfectly Competitive Markets", url: "https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/AP_Micro_Unit_4/4.1_Introduction to Imperfectly Competitive Markets.jpg" },
  { lessonID: "4.2", unit: 4, topic: "Monopoly", url: "https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/AP_Micro_Unit_4/4.2_Monopoly.jpg" },
  // ... more entries
];
```

### Step 8: Save and Test

1. Save `src/data/whiteboards.ts`
2. Restart your dev server (if running)
3. Visit:
   - `/unit/4` to see Unit 4 whiteboards
   - `/unit/5` to see Unit 5 whiteboards
   - `/unit/6` to see Unit 6 whiteboards

## ⚠️ Important Notes

### Filename Format Required
Your images in S3 must follow this format:
```
AP_Micro_Unit_X/X.Y_Topic Name.jpg
```

Examples:
- ✅ `AP_Micro_Unit_4/4.1_Introduction to Imperfectly Competitive Markets.jpg`
- ✅ `AP_Micro_Unit_4/4.2_Monopoly.jpg`
- ❌ `AP_Micro_Unit_4/4.1*Monopoly.jpg` (wrong separator)
- ❌ `AP_Micro_Unit_4/monopoly.jpg` (missing lesson ID)

### If Script Shows Errors

**"No objects found" or empty output:**
- Check that images are in `AP_Micro_Unit_X/` folder (not `AP_Macro_Unit_X/`)
- Verify AWS credentials are set correctly
- Check that bucket name is `apdojowhiteboards`

**"Skipping filename" warnings:**
- Your filenames don't match the format `X.Y_Topic Name.jpg`
- You may need to rename files in S3 or adjust the script

**AWS Access Denied:**
- Check your AWS credentials
- Verify you have read permissions on the S3 bucket

## 🔍 Quick Troubleshooting

**Check if images exist in S3:**
```bash
aws s3 ls s3://apdojowhiteboards/AP_Micro_Unit_4/ --recursive
```

**Test AWS connection:**
```python
import boto3
s3 = boto3.client("s3", region_name="ap-southeast-2")
response = s3.list_objects_v2(Bucket="apdojowhiteboards", Prefix="AP_Micro_Unit_4/")
print(response.get("Contents", []))
```

