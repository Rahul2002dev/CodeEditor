import {BrowserRouter,Route,Routes} from 'react-router-dom';
import { HomeScreen } from './screens/HomeScreen';
import { PlaygroundScreen } from './screens/PlaygroundScreen';
import { PlaygroundProvider } from './Providers/PlaygroundProvider';
import { ModelProvider } from './Providers/ModelProvider';
function App() {
  return (
    <PlaygroundProvider>
      <ModelProvider>
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeScreen/>} />
      <Route path="/playground/:fileId/:folderId" element={<PlaygroundScreen/>} />
    </Routes>
    </BrowserRouter>
    </ModelProvider>
    </PlaygroundProvider>
    
  );
}

export default App;
