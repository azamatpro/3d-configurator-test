import TeapotSean from './canvas/TeapotSean';
import ChooseColors from './ui/ChooseColors';

const App = () => {
  return (
    <div id='app'>
      <ChooseColors />
      <TeapotSean />
    </div>
  );
};

export default App;
