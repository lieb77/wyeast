// components/Profile.tsx

export async function Profile({data}) {

  	return (
  		<div className="grid gap-4">
			  <div className="p-4 place-items-center max-w-6xl ">
			    <img className="banner" alt="Banner" src={data.banner} />
					<div className="w-full max-w-lg">
					<div className="flex flex-row items-center">
						<img
							src={data.avatar}
							alt={data.handle}
							className="h-12 w-12 rounded-full"
						/>
						<div className="ml-4 p-4 ">
							<p className="text-lg font-large">{data.displayName} @{data.handle}</p>
							<p>{data.description}</p>
						</div>
					</div>
				</div>
				<div className="profile-data">
					<span className="inline-block mr-4 ">Followers: {data.followersCount}</span>
					<span className="inline-block mr-4">Following: {data.followsCount}</span>
					<span className="inline-block mr-4">Posts: {data.postsCount}</span>
				</div>
			</div>
    </div>
  );
}
