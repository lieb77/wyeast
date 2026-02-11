export default async function Page() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4">
			<div className="w-full max-w-md p-8 bg-white text-gray-800 rounded-2xl shadow-xl">
				<p>This site uses OAuth to login to my ATProto Personal Data Server&nbsp;
				 and displays photos which I have uploaded via the Flases app.
				 </p>
				<p>The OAuth code was borrowed from the <a 
					className="underline text-blue-600" 
					href="https://github.com/bluesky-social/nextjs-oauth-tutorial">
					nextjs-oauth-tutorial
					</a> project.
				</p>
			</div>
		</div>
		)
}


