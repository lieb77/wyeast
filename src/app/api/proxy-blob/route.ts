import { NextRequest } from 'next/server';
import { Agent } from "@atproto/api";
import { getSession } from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const did = searchParams.get('did');
  const cid = searchParams.get('cid');

  if (!did || !cid) return new Response('Missing params', { status: 400 });

		
  try {
   	const session = await getSession()
	const agent = new Agent(session);
    
    // Try to fetch the blob
   	// const blobResponse = await agent.api.com.atproto.repo.getBlob({ 
   	const blobResponse = await agent.com.atproto.sync.getBlob({
  		did: did, 
	    cid: cid 
	});

    if (!blobResponse.success) {
      // LOG THE ACTUAL ERROR from the PDS
      console.error("PDS error response:", blobResponse);
      return new Response(`PDS rejected request: ${blobResponse.success}`, { status: 500 });
    }

    return new Response(blobResponse.data, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    // LOG THE FULL ERROR to your terminal
    console.error("Full Proxy Error:", error);
    return new Response(error.message || 'Internal Server Error', { status: 500 });
  }
}
