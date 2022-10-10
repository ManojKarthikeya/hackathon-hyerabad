import axios from "axios";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import { auth, db } from "../firebaseinitial";
import { XRapidAPIHost, XRapidAPIKey } from "./Key";

export const getProductsCall = async (id) => {
	let data = {};
	const options = {
		method: "GET",
		url: `https://apidojo-forever21-v1.p.rapidapi.com/products/v2/list?categoryName=${id}`,
		headers: {
			"X-RapidAPI-Key":
				"8f53d9fae0msh4de888d8490c60ap1fcc93jsn547fef1c5e4c",
			"X-RapidAPI-Host": "apidojo-forever21-v1.p.rapidapi.com",
		},
	};
	await axios
		.request(options)
		.then(function (response) {
			data = response.data;
		})
		.catch(function (error) {
			console.error(error);
		});
	return data;
};

export const getProductCall = async (id) => {
	let data = {};
	const options = {
		method: "GET",
		url: "https://apidojo-forever21-v1.p.rapidapi.com/products/v2/detail",
		params: { productId: id },
		headers: {
			"X-RapidAPI-Key": XRapidAPIKey,
			"X-RapidAPI-Host": XRapidAPIHost,
		},
	};
	await axios
		.request(options)
		.then(function (response) {
			data = response.data;
		})
		.catch(function (error) {
			console.error(error);
		});
	return data;
};

export const getShoppingBagData = async () => {
	const docRef = doc(db, "spandu&manu", auth.currentUser.email);
	const docSnap = await getDoc(docRef);
	return docSnap.data().ShoppingBag;
};

// const ShoppingBagHandler = (productData, pSize, shoppingBag) => {
// 	const presentDoc = doc(db, "spandu&manu", "someUser@gmail.com");
// 	setDoc(
// 		presentDoc,
// 		{
// 			ShoppingBag: [
// 				...shoppingBag,
// 				{
// 					DefaultProductImage:
// 						productData.product.DefaultProductImage,
// 					DisplayName: productData.product.DisplayName,
// 					ListPrice: productData.product.ListPrice,
// 					productId: productData.product.ProductId,
// 					productSize: pSize,
// 				},
// 			],
// 		},
// 		{ merge: true }
// 	);
// };

// const removeFromShoppinBag = (shoppingBag) => {
//     const presentDoc = doc(db, "spandu&manu", "someUser@gmail.com");
//     setDoc(
//       presentDoc,
//       {
//         ShoppingBag: shoppingBag.filter((prod)=>prod.productId !== productData.product.ProductId),
//       },
//       { merge: true }
//     )
//   };

export const updateShoppingBagData = (shoppingBag) => {
	const presentDoc = doc(db, "spandu&manu", auth.currentUser.email);
	setDoc(
		presentDoc,
		{
			ShoppingBag: shoppingBag,
		},
		{ merge: true }
	);
	return shoppingBag
};
