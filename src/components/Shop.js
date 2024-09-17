// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ShopList = () => {
//   const [shops, setShops] = useState([]);

//   useEffect(() => {
//     const fetchShops = async () => {
//       try {
//         const response = await axios.get('http://www.nandha.fun/mechandspares/shops');
//         setShops(response.data.data);
//       } catch (error) {
//         console.error('Error fetching shop details:', error);
//       }
//     };

//     fetchShops();
//   }, [shops]);

//   return (
//     <div>
//       {shops.map(shop => (
//         <div key={shop._id}>
//           <h2>{shop.shopname}</h2>
//           <p>Years in Business: {shop.feildin}</p>
//           <p>Location: {shop.shoplocation}</p>
//           <p>Details: {shop.shopdetails}</p>
//           <p>Mobile No: {shop.shopmobile}</p>
//           <p>Rating: {shop.shoprating}</p>
//           {shop.shopimage && (
//             <img
//               src={`http://www.nandha.fun/uploads/${shop.shopimage.split('\\').pop()}`}
//               alt={shop.shopname}
//               style={{ width: '500px', height: 'auto' }}
//             />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ShopList; 