// __tests__/App.test.js
import { h } from 'preact';
import { render, fireEvent, act, screen } from '@testing-library/preact';
import '@testing-library/jest-dom';
import App from '../src/components/App';
import { bodyColor } from '../src/utils';
import ChooseColors from '../src/components/ui/ChooseColors';
import TeapotSean from '../src/components/canvas/TeapotSean';

// Mock configurations
jest.mock('../src/components/canvas/TeapotSean', () => ({
  __esModule: true,
  default: () => <div data-testid='mock-teapot'>TeapotSean</div>,
}));

jest.mock('../src/components/ui/ChooseColors', () => ({
  __esModule: true,
  default: () => <div data-testid='mock-colors'>ChooseColors</div>,
}));

// Mock Three.js and related modules
jest.mock('three', () => {
  return {
    Scene: jest.fn(() => ({
      add: jest.fn(),
      remove: jest.fn(),
    })),
    PerspectiveCamera: jest.fn(() => ({
      position: { set: jest.fn() },
      aspect: 1,
      updateProjectionMatrix: jest.fn(),
    })),
    WebGLRenderer: jest.fn(() => ({
      setPixelRatio: jest.fn(),
      setSize: jest.fn(),
      dispose: jest.fn(),
      render: jest.fn(),
      domElement: document.createElement('canvas'),
      shadowMap: {
        enabled: false,
      },
    })),
    AmbientLight: jest.fn(() => ({
      position: { set: jest.fn() },
    })),
    DirectionalLight: jest.fn(() => ({
      position: { set: jest.fn() },
      castShadow: false,
    })),
    Mesh: jest.fn(() => ({
      position: { set: jest.fn() },
      rotation: { set: jest.fn() },
      scale: { set: jest.fn() },
    })),
    MeshStandardMaterial: jest.fn(() => ({
      color: { set: jest.fn() },
      dispose: jest.fn(),
    })),
    Color: jest.fn(() => ({
      set: jest.fn(),
    })),
  };
});

jest.mock('three/examples/jsm/controls/OrbitControls.js', () => ({
  OrbitControls: jest.fn(() => ({
    update: jest.fn(),
    dispose: jest.fn(),
    enableDamping: true,
    enabled: true,
  })),
}));

jest.mock('three/examples/jsm/geometries/TeapotGeometry.js', () => ({
  TeapotGeometry: jest.fn(() => ({
    dispose: jest.fn(),
  })),
}));

// Test utilities
const originalInnerWidth = window.innerWidth;
const resizeWindow = (width) => {
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
};

// Mock window properties
Object.defineProperty(window, 'devicePixelRatio', {
  configurable: true,
  value: 1,
});

window.HTMLCanvasElement.prototype.getContext = () => ({
  getContextAttributes: () => ({
    alpha: true,
    antialias: true,
  }),
});
window.HTMLCanvasElement.prototype.addEventListener = jest.fn();

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('App Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('renders both TeapotSean and ChooseColors components', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('mock-teapot')).toBeInTheDocument();
    expect(getByTestId('mock-colors')).toBeInTheDocument();
  });

  it('maintains component hierarchy', () => {
    const { container } = render(<App />);
    const rootElement = container.firstChild;
    expect(rootElement.children).toHaveLength(2);
  });
});

describe('ChooseColors Component', () => {
  beforeEach(() => {
    window.innerWidth = originalInnerWidth;
  });

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    jest.clearAllMocks();
  });

  it('renders all color buttons and color picker', () => {
    const { container } = render(<ChooseColors />);
    const buttons = container.querySelectorAll('button');
    const colorPicker = container.querySelector('input[type="color"]');

    expect(buttons).toHaveLength(5);
    expect(colorPicker).toBeInTheDocument();
  });

  it('updates color when button is clicked', () => {
    const { container } = render(<ChooseColors />);
    const redButton = container.querySelector('button[style*="rgb(255, 0, 0)"]');

    fireEvent.click(redButton);
    expect(bodyColor.value).toBe('#ff0000');
  });

  it('updates color when color picker value changes', () => {
    const { container } = render(<ChooseColors />);
    const colorPicker = container.querySelector('input[type="color"]');

    fireEvent.change(colorPicker, { target: { value: '#123456' } });
    expect(bodyColor.value).toBe('#123456');
  });

  it('switches to column layout on mobile viewport', async () => {
    await act(async () => {
      resizeWindow(767);
    });

    const { container } = render(<ChooseColors />);
    expect(container.querySelector('.choose-colors.column')).toBeInTheDocument();
  });

  it('maintains row layout on desktop viewport', async () => {
    await act(async () => {
      resizeWindow(1024);
    });

    const { container } = render(<ChooseColors />);
    expect(container.querySelector('.choose-colors.row')).toBeInTheDocument();
  });

  it('handles multiple color changes', () => {
    const { container } = render(<ChooseColors />);
    const colorPicker = container.querySelector('input[type="color"]');

    fireEvent.change(colorPicker, { target: { value: '#123456' } });
    expect(bodyColor.value).toBe('#123456');

    fireEvent.change(colorPicker, { target: { value: '#654321' } });
    expect(bodyColor.value).toBe('#654321');
  });
});

describe('TeapotSean Component', () => {
  let mockScene, mockCamera, mockRenderer, mockControls;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    mockScene = new (require('three').Scene)();
    mockCamera = new (require('three').PerspectiveCamera)();
    mockRenderer = new (require('three').WebGLRenderer)();
    mockControls = new (require('three/examples/jsm/controls/OrbitControls').OrbitControls)();
  });

  afterEach(() => {
    // Cleanup
    jest.clearAllMocks();
  });

  it('renders canvas element', () => {
    const { container } = render(<TeapotSean />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('applies correct styles to container', () => {
    const { container } = render(<TeapotSean />);
    const div = container.firstChild;

    expect(div).toHaveStyle({
      margin: '0',
      padding: '0',
      overflow: 'hidden',
      width: '100vw',
      height: '100vh',
    });
  });

  it('handles window resize events', async () => {
    render(<TeapotSean />);

    await act(async () => {
      resizeWindow(1024);
    });

    expect(mockRenderer.setSize).toHaveBeenCalled();
    expect(mockCamera.updateProjectionMatrix).toHaveBeenCalled();
  });

  it('cleans up resources on unmount', () => {
    const { unmount } = render(<TeapotSean />);
    unmount();

    // Verify cleanup calls
    expect(mockRenderer.dispose).toHaveBeenCalled();
    expect(mockControls.dispose).toHaveBeenCalled();
  });
});
