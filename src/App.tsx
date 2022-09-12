import AppRoutes from './routes/AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DentistContextProvider } from './context/DentistContext';

function App() {
  return (
    <DentistContextProvider>
      <AppRoutes />
    </DentistContextProvider>
  );
}

export default App;