import { useEffect } from 'react';
import { songs } from './component/Data';
import EmblaCarousel from './component/EmblaCarousel';
import Sidebar from './component/Sidebar';
 
export default function App() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.cdnfonts.com/css/monument-extended";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div>
      <Sidebar />
      <EmblaCarousel images = {songs}/>
    </div>
  );
}