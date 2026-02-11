
export function Posts({posts}) {
    return (
      <div className="grid gap-4 max-w-6xl ">
       <div className="p-4 place-items-center">
        <h1 className="text-4xl">Gallery</h1>
          {posts.map(post =>
            <div key={post.cid} className='mb-6'>
              <p>{post.created}</p>
              <p>{post.text}</p>
              <img className='rounded'
				src={post.url}
				alt={post.alt}
			/>              
            </div>
          )}
      </div>
    </div>
  );
}
