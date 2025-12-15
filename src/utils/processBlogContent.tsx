import React from 'react';
import Image from 'next/image';

/**
 * Processes blog content and replaces [IMAGE:N] placeholders with actual Image components
 * @param content - The ReactNode content that may contain [IMAGE:N] placeholders
 * @param images - Array of image URLs to use for replacement
 * @returns Processed ReactNode with images inserted
 */
export function processBlogContent(
  content: React.ReactNode,
  images: string[] = []
): React.ReactNode {
  if (!content) return content;

  // If content is a string, process it directly
  if (typeof content === 'string') {
    return processStringContent(content, images);
  }

  // If content is a number, boolean, null, or undefined, return as-is
  if (typeof content !== 'object') {
    return content;
  }

  // If content is an array, process each element
  if (Array.isArray(content)) {
    const processed: React.ReactNode[] = [];
    content.forEach((child, index) => {
      const processedChild = processBlogContent(child, images);
      // If processing a string resulted in an array, spread it
      if (Array.isArray(processedChild)) {
        processed.push(...processedChild);
      } else {
        processed.push(processedChild);
      }
    });
    return processed;
  }

  // If content is a React element, process its children
  if (React.isValidElement(content)) {
    const props = content.props;
    
    // Process children if they exist
    if (props.children !== undefined && props.children !== null) {
      const processedChildren = processBlogContent(props.children, images);
      return React.cloneElement(content, { ...props, children: processedChildren } as any);
    }
    
    return content;
  }

  return content;
}

/**
 * Processes string content and replaces [IMAGE:N] placeholders
 */
function processStringContent(content: string, images: string[]): React.ReactNode {
  const imagePattern = /\[IMAGE:(\d+)\]/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let keyCounter = 0;

  while ((match = imagePattern.exec(content)) !== null) {
    // Add text before the placeholder
    if (match.index > lastIndex) {
      const textBefore = content.substring(lastIndex, match.index);
      if (textBefore) {
        parts.push(<React.Fragment key={`text-${keyCounter++}`}>{textBefore}</React.Fragment>);
      }
    }

    // Add the image component
    const imageIndex = parseInt(match[1], 10);
    if (imageIndex >= 0 && imageIndex < images.length) {
      parts.push(
        <div key={`image-${imageIndex}-${keyCounter++}`} className="my-16 flex justify-center">
          <Image 
            src={images[imageIndex]} 
            alt={`Blog image ${imageIndex + 1}`} 
            width={600} 
            height={400} 
            className="w-full max-w-2xl h-auto rounded-md shadow-sm" 
          />
        </div>
      );
    } else {
      // Invalid index, keep the placeholder text
      parts.push(<React.Fragment key={`placeholder-${keyCounter++}`}>{match[0]}</React.Fragment>);
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    const remainingText = content.substring(lastIndex);
    if (remainingText) {
      parts.push(<React.Fragment key={`text-${keyCounter++}`}>{remainingText}</React.Fragment>);
    }
  }

  // If no placeholders were found, return the original string
  if (parts.length === 0) {
    return content;
  }

  // If only one part and it's a string, return it directly
  if (parts.length === 1 && typeof parts[0] === 'string') {
    return parts[0];
  }

  return <>{parts}</>;
}

