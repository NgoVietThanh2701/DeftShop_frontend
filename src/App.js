import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/admin/login/Login';
import Home from './pages/admin/home/Home'
import ListCategory from './pages/admin/category/listCategory/ListCategory'
import ListUser from './pages/admin/users/ListUser';
import ListProduct from './pages/admin/product/ListProduct';
import SingleCategory from './pages/admin/category/SingleCategory';
import ListProductBySubCa from './pages/admin/category/ListProductBySubCa';
import ListSeller from './pages/admin/seller/ListSeller';
import ListRequest from './pages/admin/request/ListRequest';
import Profile from './pages/admin/profile/Profile';
import NewProduct from './pages/admin/product/newProduct/NewProduct';
import UpdateProduct from './pages/admin/product/UpdateProduct';
import UpdateProfile from './pages/admin/profile/UpdateProfile'
import SingleUser from './pages/admin/users/singleUser';

function App() {
   return (
      <div className="App">
         <BrowserRouter>
            <Routes>
               {/* admin panel */}
               <Route path='/admin'>
                  <Route index element={<Home />} />
                  <Route path='login' element={<Login />} />
                  <Route path='profile'>
                     <Route index element={<Profile />} />
                     <Route path='update/:id' element={<UpdateProfile />} />
                  </Route>
                  <Route path='category'>
                     <Route index element={<ListCategory />} />
                     <Route path=':id' element={<SingleCategory />} />
                     <Route path=':id/:subId' element={<ListProductBySubCa />} />
                     <Route path=':id/:subId/new-product' element={<NewProduct />} />
                     <Route path=':id/:subId/:proId/update' element={<UpdateProduct />} />
                  </Route>
                  <Route path='users'  >
                     <Route index element={<ListUser />} />
                     <Route path=':id' element={<SingleUser />} />
                  </Route>
                  <Route path='sellers'  >
                     <Route index element={<ListSeller />} />
                  </Route>
                  <Route path='notify' element={<ListRequest />} />
                  <Route path='products'>
                     <Route index element={<ListProduct />} />
                  </Route>
               </Route>
               {/* user */}
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
