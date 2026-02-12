// src/app/page.tsx
import { getSession } from "@/lib/auth/session";
import { Agent  } from "@atproto/api";
import { Posts } from "@/components/Posts";
import { formatDate } from "@/lib/utils"
import { redirect } from 'next/navigation';

export default async function PostsPage() {
	const session = await getSession()
    if (!session) redirect('/')

	const agent = new Agent(session);
	
 	const { data } = await agent.getAuthorFeed({
		actor: agent.did,
		filter: 'posts_and_author_threads',
		limit: 4,
	});
	const { feed: feed, cursor: nextPage } = data
	const myfeed = []

	feed.map(post =>
	{
		const did = agent.did
		const item = post.post	
		const cid = item.cid
		const record = item.record
		const created = formatDate(record.createdAt)
		const text = record.text
		
		if('embed' in record){
		
			if('images' in record.embed ){	
				const alt = record.embed.images[0].alt
				const cid = record.embed.images[0].image.ref.toString()
				const url = `/api/proxy-blob?did=${did}&cid=${cid}`;		
				myfeed.push({
					'cid': cid,
					'created': created,
					'text': text,
					'title': alt,
					'url': url,
					'alt': alt,
				});
			}
		}
	})

	return (
		<main className="flex flex-col items-center justify-center min-h-screen p-4">
			{data  &&  (
				<Posts initialPosts={myfeed} initialCursor={nextPage} />
			)}
		</main>	
	)
}	






