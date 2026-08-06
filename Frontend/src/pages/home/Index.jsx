import Header from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskTable } from './components/TaskTable';

// Home page scaffold.
// Future contents:
// - Import useTasks.
// - Connect task data and CRUD handlers to the components below.
// - Keep page composition here while keeping individual UI sections in components.
export function Home() {
  return (
    <main className="space-y-6">
      <Header />

      <TaskForm />

      <TaskTable />
    </main>
  );
}

export default Home;
