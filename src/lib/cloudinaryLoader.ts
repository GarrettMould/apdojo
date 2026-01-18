
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
  
  // CHECK: If image is from any S3 bucket or excluded domains, return with width query param
  // These images should NOT go through Cloudinary - return them as-is with width param to satisfy Next.js
  if (src.startsWith('http')) {
    // For all S3 buckets (thumbnailslarge, apdojowhiteboards, apdojovideos) and cdn.sanity.io, 
    // return URL as-is with width as query param (bypass Cloudinary)
    if (src.includes('thumbnailslarge.s3') || 
        src.includes('apdojowhiteboards.s3') || 
        src.includes('apdojovideos.s3') || 
        src.includes('cdn.sanity.io')) {
      const separator = src.includes('?') ? '&' : '?';
      const actualWidth = width && width > 0 ? width : 1920;
      return `${src}${separator}w=${actualWidth}`;
    }
    // For other remote domains (not our S3 buckets), return as-is but with width param
    const separator = src.includes('?') ? '&' : '?';
    const actualWidth = width && width > 0 ? width : 1920;
    return `${src}${separator}w=${actualWidth}`;
  }

  // CLEANUP: Remove the AWS domain if it exists in the src
  // This turns "https://apdojowhiteboards.../users/avatar.jpg" into just "users/avatar.jpg"
  let cleanSrc = src;
  
  // Handle apdojowhiteboards.s3 URLs - need to extract path after domain
  if (cleanSrc.includes('apdojowhiteboards.s3')) {
    // Match: https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/path/to/file.jpg
    // Extract just the path part
    const match = cleanSrc.match(/https?:\/\/[^\/]+\.s3[^\/]*\/(.+)/);
    if (match && match[1]) {
      cleanSrc = match[1];
    } else {
      // Fallback: try to replace known patterns
      cleanSrc = cleanSrc.replace(/^https?:\/\/[^\/]+\.s3[^\/]*\//, '');
    }
  } else if (cleanSrc.startsWith(awsDomain)) {
    cleanSrc = cleanSrc.replace(awsDomain, '');
  } else if (cleanSrc.startsWith('/')) {
    // Remove leading slash if present (e.g. "/users/avatar.jpg" -> "users/avatar.jpg")
    cleanSrc = cleanSrc.slice(1);
  }
  
  // URL encode the path to handle spaces and special characters
  // Split by '/' to encode each segment separately, then rejoin
  // This ensures "1.1_scarcity 10.jpg" becomes "1.1_scarcity%2010.jpg"
  const pathSegments = cleanSrc.split('/').map(segment => encodeURIComponent(segment));
  cleanSrc = pathSegments.join('/');

  // OPTIMIZATION PARAMS
  // When using 'fill' prop, width might be 0 or undefined, so use a reasonable default
  const actualWidth = width && width > 0 ? width : 1920; // Default to 1920px for fill images
  
  const params = [
    'f_auto',       // Auto format (WebP/AVIF)
    'c_limit',      // Resize but don't stretch
    `w_${actualWidth}`,   // Width based on user screen
    `q_${quality || 'auto'}` // Quality (default to auto)
  ];

  // CONSTRUCT FINAL URL
  return `https://res.cloudinary.com/${cloudName}/image/upload/${params.join(',')}/${mappingFolder}/${cleanSrc}`;
}


