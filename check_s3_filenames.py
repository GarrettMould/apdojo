"""
Quick script to check actual filenames in S3 for Unit 3 Micro whiteboards
Run: python3 check_s3_filenames.py
"""

import boto3
import sys

bucket_name = "apdojowhiteboards"
prefix = "AP_Micro_Unit_3/"
region = "ap-southeast-2"

s3 = boto3.client("s3", region_name=region)

# Fetch objects
response = s3.list_objects_v2(Bucket=bucket_name, Prefix=prefix)

print(f"\n📋 Files in S3 for {prefix}\n")
print("=" * 80)

items = []
for obj in response.get("Contents", []):
    key = obj["Key"]
    if key.endswith((".jpg", ".png", ".jpeg")):
        filename = key.split("/")[-1]
        items.append(filename)
        print(f"  {filename}")

print("=" * 80)
print(f"\n✅ Found {len(items)} image files\n")

# Check for 3.1, 3.2, 3.3 files specifically
print("🔍 Files matching 3.1, 3.2, 3.3:\n")
for item in sorted(items):
    if item.startswith(("3.1", "3.2", "3.3")):
        print(f"  {item}")

print("\n💡 Compare these filenames with your URLs in whiteboards.ts")
print("   Make sure the URLs match exactly (including spaces/underscores)\n")

