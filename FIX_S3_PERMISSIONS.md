# How to Fix S3 "Access Denied" Errors

## Problem
Your S3 bucket `apdojowhiteboards` is returning "Access Denied" errors when trying to access images. This means the bucket or objects don't have public read access configured.

## Solution: Make S3 Bucket Publicly Readable

### Option 1: Using AWS Console (Easiest)

#### Step 1: Open S3 Console
1. Go to [AWS S3 Console](https://s3.console.aws.amazon.com/)
2. Click on your bucket: `apdojowhiteboards`

#### Step 2: Block Public Access Settings
1. Click on the **"Permissions"** tab
2. Scroll to **"Block public access (bucket settings)"**
3. Click **"Edit"**
4. **Uncheck all 4 boxes** (or at least uncheck "Block public access to buckets and objects granted through new access control lists (ACLs)")
5. Click **"Save changes"**
6. Type `confirm` when prompted

#### Step 3: Bucket Policy
1. Still in the **"Permissions"** tab
2. Scroll to **"Bucket policy"**
3. Click **"Edit"**
4. Paste this policy (replace `apdojowhiteboards` if your bucket name is different):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::apdojowhiteboards/*"
        }
    ]
}
```

5. Click **"Save changes"**

#### Step 4: CORS Configuration (Optional but Recommended)
1. Still in the **"Permissions"** tab
2. Scroll to **"Cross-origin resource sharing (CORS)"**
3. Click **"Edit"**
4. Paste this configuration:

```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "HEAD"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
```

5. Click **"Save changes"**

### Option 2: Using AWS CLI

If you prefer command line:

```bash
# 1. Remove block public access
aws s3api put-public-access-block \
    --bucket apdojowhiteboards \
    --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# 2. Set bucket policy
aws s3api put-bucket-policy --bucket apdojowhiteboards --policy '{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::apdojowhiteboards/*"
        }
    ]
}'
```

### Option 3: Make Individual Objects Public (Not Recommended)

If you only want specific folders/objects public:

1. Go to the object in S3
2. Click on it
3. Go to **"Permissions"** tab
4. Under **"Access control list (ACL)"**, click **"Edit"**
5. Check **"Read"** under **"Public access"**
6. Click **"Save changes"**

**Note:** This is tedious if you have many files. Better to use bucket policy.

## Verify It Works

After making changes:

1. Try opening a URL directly in your browser:
   ```
   https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/AP_Micro_Unit_4/4.2_wb.jpg
   ```

2. You should see the image, not an "Access Denied" error

3. Check your browser's Network tab to see if images load successfully

## Security Note

⚠️ **Important:** Making a bucket public means anyone with the URL can access the files. This is fine for public educational content like whiteboards, but:
- Don't store sensitive data in this bucket
- Consider using CloudFront with signed URLs if you need more control later
- Monitor your S3 costs (public access can increase data transfer costs)

## Troubleshooting

**Still getting Access Denied?**
1. Wait a few minutes - S3 changes can take time to propagate
2. Clear your browser cache
3. Check that the object actually exists in S3
4. Verify the bucket name and region are correct
5. Check CloudTrail logs for permission errors

**Getting CORS errors?**
- Make sure you added the CORS configuration (Step 4 above)
- Check that your `next.config.js` has the correct domain in `remotePatterns`

**Some images work, others don't?**
- Check if those specific objects have different permissions
- Verify the file paths are correct (case-sensitive)
- Make sure files were uploaded successfully

## Quick Checklist

- [ ] Unchecked "Block public access" settings
- [ ] Added bucket policy for public read access
- [ ] Added CORS configuration (optional but recommended)
- [ ] Tested a URL directly in browser
- [ ] Verified images load on your site

