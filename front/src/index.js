import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Main from './Main';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="차" element={<App cate="차"/>} />
        <Route path="음료/탄산수" element={<App cate="음료/탄산수"/>} />
        <Route path="음료베이스" element={<App cate="음료베이스"/>} />
        <Route path="시럽/소스" element={<App cate="시럽/소스"/>} />
        <Route path="파우더" element={<App cate="파우더"/>} />
        <Route path="베이커리" element={<App cate="베이커리"/>} />
        <Route path="푸드" element={<App cate="푸드"/>} />
        <Route path="테이크아웃" element={<App cate="테이크아웃"/>} />
      </Routes>
    </BrowserRouter>
);
