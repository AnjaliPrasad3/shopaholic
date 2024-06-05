export const getPriceQueryParams = (searchParams, key, value) => {
    const hasValueInParam = searchParams.has(key);

    if(value && hasValueInParam) {
        searchParams.set(key, value);
    } else if(value) {
        searchParams.append(key, value);
    } else if(hasValueInParam) {
        searchParams.delete(key);
    } 

    return searchParams;
};

export const calculateOrderCost = (cartItems) => {
    if (!cartItems || cartItems.length === 0) {
        return {
            itemsPrice: 0,
            shippingPrice: 0,
            taxPrice: 0,
            totalPrice: 0,
        };
    }

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingPrice = itemsPrice > 200 ? 0 : 25;
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
    const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

    return {
        itemsPrice: Number(itemsPrice.toFixed(2)),
        shippingPrice,
        taxPrice,
        totalPrice,
    };
};