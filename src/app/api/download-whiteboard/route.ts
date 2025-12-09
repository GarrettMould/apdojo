import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');
    const filename = searchParams.get('filename') || 'whiteboard.jpg';

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    // Fetch the image from S3
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch image' }, { status: 404 });
    }

    // Get the image data
    const imageBuffer = await response.arrayBuffer();
    
    // Create response with proper headers for download
    const downloadResponse = new NextResponse(imageBuffer);
    
    // Set headers to force download
    downloadResponse.headers.set('Content-Type', 'image/jpeg');
    downloadResponse.headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    downloadResponse.headers.set('Cache-Control', 'no-cache');
    
    return downloadResponse;
    
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'Download failed' }, { status: 500 });
  }
} 