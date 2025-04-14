import { NextResponse } from 'next/server';
import { NotionAPI } from 'notion-client';

export async function GET(request: Request) {
  console.log("API Route: /api/get-notion-page invoked"); // 1. Check if hit
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get('pageId');
  console.log("API Route: Received pageId:", pageId); // 2. Check pageId

  if (!pageId) {
    console.error("API Route: Missing pageId parameter");
    return NextResponse.json({ error: 'Missing pageId parameter' }, { status: 400 });
  }

  try {
    const notion = new NotionAPI({
      // authToken: process.env.NOTION_TOKEN_V2, 
      // activeUser: process.env.NOTION_ACTIVE_USER 
    });

    console.log(`API Route: Attempting to fetch page ${pageId} from Notion...`); // 3. Before fetch
    const recordMap = await notion.getPage(pageId);
    console.log(`API Route: Successfully fetched page ${pageId} from Notion.`); // 4. After fetch success
    
    // Log a small part of the data to confirm it looks okay
    // console.log("API Route: Sample RecordMap data:", JSON.stringify(recordMap).substring(0, 200)); 

    return NextResponse.json(recordMap);

  } catch (error: any) {
    console.error(`API Route: Error fetching Notion page ${pageId}:`, error); // 5. Log any errors
    return NextResponse.json(
      { error: `Failed to fetch Notion page: ${error.message || 'Unknown error'}` },
      { status: 500 } // Return 500 on error
    );
  }
} 