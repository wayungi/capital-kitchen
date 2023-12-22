const data = {
    orders : [
        {
            orderId: "1",
            userId: "10",
            items: [
                {
                    itemId: "1",
                    name: "pork",
                    quantity: 2,
                    unitPrice: 15000,
                    restaurantId: "10"
                },
                {
                    itemId: "10",
                    name: "Boiled rice",
                    quantity: 1,
                    unitPrice: 6000,
                    restaurantId: "5"
                }
            ]
        },

        {
            orderId: "2",
            userId: "12",
            items: [
                {
                    itemId: "2",
                    name: "chicken",
                    quantity: 1,
                    unitPrice: 10000,
                    restaurantId: "1"
                }
            ]
        }
    ]
}

module.exports = data