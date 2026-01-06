# Debug Missing Images - Unit 3 Micro

## Quick Check Script

Run this to see actual filenames in S3:

```bash
python3 check_s3_filenames.py
```

This will show you all the actual filenames in `AP_Micro_Unit_3/` so you can compare with your URLs.

## Common Issues

### Issue 1: Spaces vs Underscores
- **If S3 has spaces**: Use `%20` encoding or `+` 
- **If S3 has underscores**: Use `_` (no encoding needed)

I just changed lines 261-263 and 264-265 to use underscores. If your S3 files actually have spaces, we need to change them back.

### Issue 2: Case Sensitivity
S3 is case-sensitive! Check:
- `3.1_Marginal_Product.jpg` vs `3.1_marginal_product.jpg`
- `3.1_WB 3.jpg` vs `3.1_wb 3.jpg`

### Issue 3: Exact Filename Match
The URL must match the S3 object key EXACTLY, including:
- Spaces/underscores
- Capitalization
- File extension (.jpg vs .JPG)

## Which Images Aren't Working?

Please tell me which specific topics/images aren't displaying:
- Is it the first 3 entries (lines 261-263)?
- Or specific ones like "Diminishing Marginal Product"?
- Or the "wb" numbered ones?

## Quick Test

Try opening these URLs directly in your browser:

1. `https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/AP_Micro_Unit_3/3.1_Marginal_Product_and_Marginal_Cost.jpg`
2. `https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/AP_Micro_Unit_3/3.1_Marginal%20Product%20and%20Marginal%20Cost.jpg`
3. `https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/AP_Micro_Unit_3/3.1_Marginal Product and Marginal Cost.jpg`

Whichever one works is the correct format!

## Alternative: Check Browser Console

1. Open your site
2. Open browser DevTools (F12)
3. Go to Network tab
4. Filter by "img" or "jpg"
5. Look for 404 errors
6. Check the "Request URL" - that's what the browser is trying to load
7. Compare with what's actually in S3

