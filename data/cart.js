export let cart= JSON.parse(localStorage.getItem('cart')) || [] 

export function savetostorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addtocart(productId){
    let matchingItem;

     cart.forEach((item)=>{
        if(productId===item.productId){
            matchingItem=item
        }
    });

    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
      const quantity = Number(quantitySelector.value);

        if(matchingItem){
           matchingItem.quantity+=quantity
        }
        else{
            cart.push({ 
            productId,    //productId:productId,
            quantity    //quantity:quantity
             });
        }
        savetostorage();
}

export function removefromcart(productId){
    let newcart=[]
    cart.forEach((item)=>{
        if(item.productId !== productId){
            newcart.push(item);
        }
    });
    
    cart=newcart;
    savetostorage();

}

export function calculatecartquantity(){
    let cartquantity=0;

    cart.forEach((item)=>{
    cartquantity+=item.quantity;
    })
    return cartquantity;
}