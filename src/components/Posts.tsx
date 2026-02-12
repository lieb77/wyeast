"use client"

import { useState, useEffect, useRef, useCallback } from "react";

interface Post {
	cid: string;
	created: string;
	text: string;
	url: string;
	alt: string;
}

interface Props {
	initialPosts?: Post[];
	initialCursor?: string;
}

export function Posts({ initialPosts = [], initialCursor = "" }: Props) {
	const [posts, setPosts] = useState<Post[]>(initialPosts);
	const [cursor, setCursor] = useState(initialCursor);
	const [loading, setLoading] = useState(false);

	const observerTarget = useRef<HTMLDivElement>(null);

	const loadMore = useCallback(async () => {
		if (loading || !cursor) return;
		setLoading(true);

		try {
			const res = await fetch(`/api/feed?cursor=${encodeURIComponent(cursor)}`);
			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}
			const data = await res.json();

			if (!data || !data.posts) {
				throw new Error("Invalid data format received from API");
			}

			setPosts((prev) => [...prev, ...data.posts]);
			setCursor(data.cursor);
		} catch (err) {
			console.error("Failed to load more posts", err);
		} finally {
			setLoading(false);
		}
	}, [cursor, loading]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !loading) {
					loadMore();
				}
			},
			{ threshold: 0.1 }
		);

		const currentTarget = observerTarget.current;

		if (currentTarget) {
			observer.observe(currentTarget);
		}

		return () => {
			if (currentTarget) {
				observer.unobserve(currentTarget);
			}
			observer.disconnect();
		};
	}, [loadMore, loading]);

	return (
		<div className="flex flex-col items-center w-full">
			<div className="grid gap-4 max-w-6xl w-full">
				{posts?.map((post) => (
					<div key={post.cid} className="pb-4 mb-4">
						<p className="text-sm text-gray-400">{post.created}</p>
						<p className="my-2">{post.text}</p>
						<img src={post.url} alt={post.alt} className="rounded-lg w-full" />
					</div>
				))}
			</div>

			<div ref={observerTarget} className="h-20 w-full flex items-center justify-center">
				{loading && (
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
				)}
				{!cursor && posts.length > 0 && (
					<p className="text-gray-500 italic">You've reached the end of your gallery!</p>
				)}
			</div>
		</div>
	);
}

/* AI CHANGELOG:
*   **Added Typescript Interfaces**: Added `Post` and `Props` interfaces for better type safety and code readability.
*   **Typed useState**: Added types to the `useState` hooks.
*   **Typed useRef**: Added type to the `observerTarget` useRef hook.
*   **Error Handling**: Improved error handling in `loadMore` by checking the HTTP status code and the structure of the API response.
*   **Observer Cleanup**: Modified the useEffect cleanup function to unobserve the target element before disconnecting the observer and added a check to see if the `currentTarget` exists before unobserving. This prevents potential errors if the component unmounts before the observer is fully set up.
*   **Removed Comments**: Removed numbered comments.
*/
