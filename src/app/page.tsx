import { LoginForm } from "@/components/LoginForm"

export default function Home() {
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
