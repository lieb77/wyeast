"use client"

import { useState, useEffect, useRef, useCallback } from "react";

export function Posts({ initialPosts = [], initialCursor = "" }) {
	const [posts, setPosts] = useState(initialPosts);
	const [cursor, setCursor] = useState(initialCursor);
	const [loading, setLoading] = useState(false);
	
	// 1. Create a reference to the "bottom" element
	const observerTarget = useRef(null);
	
	const loadMore = useCallback(async () => {
		if (loading || !cursor) return;
		setLoading(true);
		
		try {
			const res = await fetch(`/api/feed?cursor=${encodeURIComponent(cursor)}`);
			const data = await res.json();
			setPosts((prev) => [...prev, ...data.posts]);
			setCursor(data.cursor);
		} catch (err) {
			console.error("Failed to load more posts", err);
		} finally {
			setLoading(false);
		}
	}, [cursor, loading]);
	
	// 2. Set up the Intersection Observer
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				// If the sentinel div is visible AND we aren't already loading...
				if (entries[0].isIntersecting && !loading) {
					loadMore();
				}
			},
			{ threshold: 0.1 } // Trigger when 10% of the sentinel is visible
		)
		
		if (observerTarget.current) {
			observer.observe(observerTarget.current);
		}
		
		return () => observer.disconnect();
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
					
			{/* 3. The Sentinel Element */}
			<div ref={observerTarget} className="h-20 w-full flex items-center justify-center">
				{loading && (
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
				)}
				{!cursor && posts.length > 0 && (
					<p className="text-gray-500 italic">You've reached the end of your gallery!</p>
				)}
			</div>
		</div>
	)
}

