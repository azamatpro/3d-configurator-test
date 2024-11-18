import { selectedColor } from './../configurator';

const Ui = () => {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <h2>Choose a Color:</h2>
      <input
        style={{ width: '70px', height: '30px', margin: '2px' }}
        type='color'
        value={selectedColor.value}
        onChange={(e) => (selectedColor.value = e.target.value)}
      />
    </div>
  );
};

export default Ui;
