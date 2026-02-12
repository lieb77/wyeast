import { NextRequest, NextResponse } from 'next/server';
import { Agent } from "@atproto/api";
import { getSession } from "@/lib/auth/session";
import { formatDate } from "@/lib/utils"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get('cursor') || undefined;

  try {
    const session = await getSession();
    if (!session) return new Response('Unauthorized', { status: 401 });

    const agent = new Agent(session);
    const { data } = await agent.getAuthorFeed({
      actor: agent.did,
      filter: 'posts_with_media', // Optimization: only get posts with images
      limit: 4,
      cursor: cursor,
    });

    // Sanitize the data just like we did in the Server Component
    const posts = data.feed.map(({ post }) => {
      const record = post.record as any;
      if (record.embed?.images) {
        const cidString = record.embed.images[0].image.ref.toString();
        return {
          cid: cidString,
          text: record.text,
          created: formatDate(record.createdAt),
          alt: record.embed.images[0].alt,
          url: `/api/proxy-blob?did=${agent.did}&cid=${cidString}`,
        };
      }
      return null;
    }).filter(Boolean);

    return NextResponse.json({ posts, cursor: data.cursor });
  } catch (error) {
    return new Response('Error fetching feed', { status: 500 });
  }
}
