import Home from './pages/home/Index';

// App is the top-level frontend shell.
// Keep global page layout here and place feature-specific UI inside page folders.
export default function App() {
  return (
    <div className = "w-6xl mx-auto my-6 space-y-6">
      <Home />
    </div>
  );
}
