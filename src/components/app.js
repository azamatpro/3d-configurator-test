import TeapotSean from './components/configurator';
import Configurator from './components/configurator';
import Ui from './components/ui';

const App = () => (
  <div id='app'>
    <div
      style={{
        position: 'fixed',
        top: '0',
        backgroundColor: '#fff',
        width: '100%',
        display: 'flex',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1>3D Product Configurator</h1>
      <Ui />
    </div>
    <TeapotSean />
  </div>
);

export default App;
