import { useTasks } from '../utils/tasks'

function Home() {
  const tasks = useTasks()

  console.log('[tasks]', tasks)

  return <h2>Home</h2>
}

export default Home
