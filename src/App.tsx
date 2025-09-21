import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { BrowserRouter, Route } from 'react-router-dom'

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Route path="/home" element={<>
        </>} />
        <Route path="/about" element={<>
        </>} />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
