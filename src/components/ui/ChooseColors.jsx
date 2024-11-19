import { useEffect, useState } from 'preact/hooks';
import { bodyColor } from '../../utils';

const ChooseColors = () => {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', 'orange'];
  const [currentColor, setCurrentColor] = useState(bodyColor.value);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleColorChange = (color) => {
    setCurrentColor(color);
    bodyColor.value = color;
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`choose-colors ${isMobile ? 'column' : 'row'}`}>
      <h2>Choose a Color:</h2>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {colors.map((color) => (
          <button
            key={color}
            style={{
              backgroundColor: color,
              width: '40px',
              height: '30px',
              margin: '5px',
            }}
            onClick={() => handleColorChange(color)}
          />
        ))}
        <input
          style={{
            width: '50px',
            height: '30px',
            margin: '2px',
          }}
          type='color'
          value={currentColor}
          onChange={(e) => handleColorChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ChooseColors;
