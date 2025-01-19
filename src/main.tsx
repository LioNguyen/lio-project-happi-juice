import { QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'

import App from '@/App.tsx'
import { GlobalProvider } from '@/domains/global'
import '@/index.css'
import '@/shared/locale'
import { queryClient } from '@/shared/services'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </QueryClientProvider>,
)
