import type { Route } from './+types/home';

// Lint error here
export function meta({}: Route.MetaArgs) {
  // export function meta() {
  return [
    { title: 'New Webapp' },
    { name: 'description', content: 'Welcome to New Webapp!' },
  ];
}

export async function loader() {
  try {
    const packageJson = await import('../../package.json?raw');
    const parsedPackage = JSON.parse(packageJson.default);
    return { packageData: parsedPackage };
  } catch (error) {
    console.error('Failed to load package.json data:', error);
    throw error;
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { packageData } = loaderData;

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex min-h-0 flex-col items-center gap-6">
        <h1 className="text-4xl font-bold">Welcome</h1>
        <p className="max-w-md px-4 text-center leading-6 text-gray-700 dark:text-gray-200">
          This is a sample Webapp.
        </p>
        <pre className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          {JSON.stringify(packageData, null, 2)}
        </pre>
      </div>
    </main>
  );
}
