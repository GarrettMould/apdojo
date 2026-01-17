
export default function cloudinaryLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  // CONFIGURATION
  // --------------------------------------------------
  // 1. Your Cloudinary Cloud Name
  const cloudName = 'drseu2gq1'; 

  // 2. The "Nickname" you set in the "Target folder" box in Cloudinary 
  const mappingFolder = 's3';

  // 3. Your AWS Bucket Domain (to be removed from the src)
  const awsDomain = 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/';
  // --------------------------------------------------

  // CHECK: If image is already on Cloudinary, don't touch it
  if (src.includes('res.cloudinary.com')) return src;
  
  // CHECK: If image is a local path (starts with /images/ or any local path), return as-is
  // Next.js will handle local images natively when custom loader returns them unchanged
  if (src.startsWith('/images/') || (src.startsWith('/') && !src.startsWith('//'))) {
    return src;
  }
  
  // CHECK: If image is from other remote domains (not S3), return as-is
  // Only process S3 URLs through Cloudinary
  if (src.startsWith('http') && !src.includes('apdojowhiteboards.s3') && !src.includes('apdojovideos.s3')) {
    return src;
  }

  // CLEANUP: Remove the AWS domain if it exists in the src
  // This turns "https://apdojowhiteboards.../users/avatar.jpg" into just "users/avatar.jpg"
  let cleanSrc = src;
  if (cleanSrc.startsWith(awsDomain)) {
    cleanSrc = cleanSrc.replace(awsDomain, '');
  } else if (cleanSrc.startsWith('/')) {
    // Remove leading slash if present (e.g. "/users/avatar.jpg" -> "users/avatar.jpg")
    cleanSrc = cleanSrc.slice(1);
  }

  // OPTIMIZATION PARAMS
  const params = [
    'f_auto',       // Auto format (WebP/AVIF)
    'c_limit',      // Resize but don't stretch
    `w_${width}`,   // Width based on user screen
    `q_${quality || 'auto'}` // Quality (default to auto)
  ];

  // CONSTRUCT FINAL URL
  return `https://res.cloudinary.com/${cloudName}/image/upload/${params.join(',')}/${mappingFolder}/${cleanSrc}`;
}


