import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/admin/login/Login';
import Home from './pages/admin/home/Home'
import ListCategory from './pages/admin/category/listCategory/ListCategory'
import ListUser from './pages/admin/users/listUser/ListUser';
import ListProduct from './pages/admin/product/listProduct/ListProduct';
import SingleCategory from './pages/admin/category/singleCategory/SingleCategory';

function App() {
   return (
      <div className="App">
         <BrowserRouter>
            <Routes>
               {/* admin panel */}
               <Route path='/admin'>
                  <Route index element={<Home />} />
                  <Route path='login' element={<Login />} />
                  <Route path='category'>
                     <Route index element={<ListCategory />} />
                     <Route path=':id' element={<SingleCategory />} />
                     <Route path=':id/:subId' element={<ListProduct />} />
                  </Route>
                  <Route path='users' element={<ListUser />} />
                  <Route path='products' element={<ListProduct />} />
               </Route>
               {/* user */}
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
