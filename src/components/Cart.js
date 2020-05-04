import React from 'react';
import Navbar from "./Navbar";
import Fire from "../Fire";

function Cart() {
    const [cart, updateCart] = React.useState([]);
    const [submitted, changeSubmitted] = React.useState(true);
    const [price, changePrice] = React.useState(0);

    let db = Fire.firestore();

    React.useEffect(() => {
        let newProducts = [];
        let price = 0;

        function handleStatusChange(status) {
            updateCart(status);
        }

        const unsubscribe = db.collection("cart").get().then(
            function (snapshot) {
                snapshot.forEach(
                    function (doc) {
                        let item = {
                            name: doc.data().name,
                            stock: doc.data().stock,
                            price: doc.data().price,
                            img: doc.data().img,
                            itemId: doc.data().id,
                            id: doc.id
                        };
                        newProducts.push(item);

                        price = price + doc.data().price;
                    });

                handleStatusChange(newProducts);
                changePrice(price);
            });
        return () => unsubscribe;
    }, [submitted]);

    const deleteFromCart = (id) => {
        db.collection("cart").doc(id).delete().then(function () {
            alert("Item deleted.");
            changeSubmitted(!submitted);
        });
    };

    const purchase = (products) => {
        products.forEach( function(product) {

            db.collection("products").doc(product.itemId).set({
                name: product.name,
                price: product.price,
                stock: product.stock - 1,
                img: product.img
            });
            db.collection("cart").doc(product.id).delete();
        });
        alert("Items purchased");
        changeSubmitted(!submitted);
    };

    let productList = cart.map((product, idx) => {
        let lowStock;
        if (product.stock < 10) {
            lowStock = " Almost sold out!";
        }

        let storeImage;
        if (product.img !== "" && product.img.match(/\//)) {
            storeImage= <img className="storeImg" src={product.img} alt=""/>;
        } else {
            storeImage =
                <div className="noimage">No image available
                    product.</div>;
        }


        return (
            <div  id={product.itemId} key={idx}>
                <div className="storeImg">
                    {storeImage}
                </div>
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <p>{product.stock} available {lowStock}</p>
                <div className="button2"
                     onClick={() => deleteFromCart(product.id)}>Delete Item from Cart
                </div>
            </div>
        )
    });

    return (
        <div>
            <Navbar/>
            <div className="store padding">
                {productList}
            </div>
            <div>
                <h2 className="cartItem">Cart Total: ${price}</h2>
                <div className="button2"
                     onClick={() => purchase(cart)}>Purchase Items in Cart
                </div>
            </div>
        </div>
    )
}

export default Cart;