import { LoginForm } from "@/components/LoginForm"
import { getSession } from "@/lib/auth/session";
import { redirect } from 'next/navigation';

const PUBLIC_URL = process.env.PUBLIC_URL || "http://127.0.0.1:3000";

export default async function Home() {
	const session = await getSession()
	if (session) redirect('/gallery')

	return (
		<main className="flex flex-col items-center justify-center min-h-screen p-4">
		  <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
			<h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
			  PDS Photo Gallery
			</h1>
			<LoginForm />
		  </div>
		</main>
	);
}
