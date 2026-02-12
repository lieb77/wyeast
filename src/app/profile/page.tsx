import { getSession } from "@/lib/auth/session";
import { Agent  } from "@atproto/api";
import { Profile } from "@/components/Profile";

export default async function ProfilePage() {
	const session = await getSession()
    if (!session) return (<div><h2>It's not working</h2></div>)

	const agent = new Agent(session);
 	const { data } = await agent.getProfile({ actor: agent.did })

	return (
		<main className="flex flex-col items-center justify-center min-h-screen p-4">
			{data  &&  (
				<Profile data={data} />
			)}
		</main>	
	)
}
