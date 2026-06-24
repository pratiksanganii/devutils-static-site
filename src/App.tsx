import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { router } from './routes/router';

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
