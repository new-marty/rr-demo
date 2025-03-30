import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Webapp" },
    { name: "description", content: "Welcome to New Webapp!" },
  ];
}

export async function loader() {
  try {
    const packageJson = await import("../../package.json?raw");
    const parsedPackage = JSON.parse(packageJson.default);
    return { packageData: parsedPackage };
  } catch (error) {
    console.error("Failed to load package.json data:", error);
    throw error;
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { packageData } = loaderData;

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex flex-col items-center gap-6 min-h-0">
        <h1 className="text-4xl font-bold">Welcome</h1>
        <p className="leading-6 text-gray-700 dark:text-gray-200 text-center max-w-md px-4">
          This is a sample Webapp.
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          {JSON.stringify(packageData, null, 2)}
        </pre>
      </div>
    </main>
  );
}
