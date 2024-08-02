import { createRoot } from 'react-dom/client';
import Demo from './example';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<Demo />);
