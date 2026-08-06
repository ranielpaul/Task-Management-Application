import Home from './pages/home/Index';

// App is the top-level frontend shell.
// Keep global page layout here and place feature-specific UI inside page folders.
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 text-gray-900">
      <div className="mx-auto w-full max-w-6xl">
        <Home />
      </div>
    </div>
  );
}
