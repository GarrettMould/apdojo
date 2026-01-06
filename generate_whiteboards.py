import boto3
import sys

# Check for unit number argument
if len(sys.argv) < 2:
    print("❌ Please provide a unit number, e.g. python3 generate_whiteboards.py 4")
    sys.exit(1)

unit_number = sys.argv[1]  # e.g. "4"

bucket_name = "apdojowhiteboards"
prefix = f"AP_Micro_Unit_{unit_number}/"  # Changed from AP_Macro_Unit_ to AP_Micro_Unit_
region = "ap-southeast-2"

s3 = boto3.client("s3", region_name=region)

# Fetch objects
response = s3.list_objects_v2(Bucket=bucket_name, Prefix=prefix)

items = []

for obj in response.get("Contents", []):
    key = obj["Key"]
    
    # Skip if not an image file
    if not (key.endswith(".jpg") or key.endswith(".png") or key.endswith(".jpeg")):
        continue
    
    # Get filename (last part after /)
    filename = key.split("/")[-1]
    
    # Skip if filename doesn't contain underscore (format: X.Y_Topic Name.jpg)
    if "_" not in filename:
        print(f"⚠️  Skipping {filename} - doesn't match format X.Y_Topic Name.jpg")
        continue
    
    # Split by first underscore: "3.1_Marginal Product and Marginal Cost.jpg"
    parts = filename.split("_", 1)
    if len(parts) != 2:
        print(f"⚠️  Skipping {filename} - can't parse lesson ID")
        continue
    
    lesson_id = parts[0]  # e.g., "3.1"
    topic_with_ext = parts[1]  # e.g., "Marginal Product and Marginal Cost.jpg"
    
    # Remove file extension
    topic = topic_with_ext.rsplit(".", 1)[0]  # e.g., "Marginal Product and Marginal Cost"
    
    # Get unit number from lesson ID (first part before dot)
    unit = lesson_id.split(".")[0]
    
    # Build URL
    url = f"https://{bucket_name}.s3.{region}.amazonaws.com/{key}"
    
    items.append({
        "lessonID": lesson_id,
        "unit": int(unit),
        "topic": topic,
        "url": url
    })

# Sort by lesson ID
items.sort(key=lambda x: (x['unit'], float(x['lessonID'].split('.')[1]) if '.' in x['lessonID'] else 0))

# Build the TypeScript file content
ts_content = f"export const apMicroUnit{unit_number}Whiteboards: Whiteboard[] = [\n"

for item in items:
    ts_content += f"  {{ lessonID: \"{item['lessonID']}\", unit: {item['unit']}, topic: \"{item['topic']}\", url: \"{item['url']}\" }},\n"

ts_content += "];\n"

# Print to console (so you can copy-paste)
print("\n" + "="*80)
print(f"📋 Generated {len(items)} whiteboard entries for Unit {unit_number}")
print("="*80)
print("\nCopy this into src/data/whiteboards.ts:\n")
print(ts_content)
print("\n" + "="*80)

# Optionally save to file
ts_filename = f"unit{unit_number}_whiteboards_output.txt"
with open(ts_filename, "w") as f:
    f.write(ts_content)
print(f"✅ Also saved to {ts_filename}")

