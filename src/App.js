
import './App.css';
import CategoryPage from './Categories/CategoryPage';
import Template from './Template';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewNews from './ViewFullNews/ViewNews';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/:id" element={<Template/>}/>
        <Route path="/:id/DetailedNews/:newsId" element={<ViewNews />} />
        <Route path="/:id/category/:category" element={<CategoryPage />} />
      </Routes> 
    </BrowserRouter>
    
    </>
  );
}

export default App;
