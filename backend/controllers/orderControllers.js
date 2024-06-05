import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
import Order from "../models/order.js";
import ErrorHandler from "../utils/errorHandler.js";

// Create new Order => /api/v1/orders/new
export const newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentMethod,
        paymentInfo,
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentMethod,
        paymentInfo,
        user: req.user._id,
    });

    res.status(200).json({ order });
});

// Get current user orders => /api/v1/me/orders
export const myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({ orders });
});

// Get order details => /api/v1/orders/:id
export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("No Order found with this ID", 404));
    }

    res.status(200).json({ order });
});

// Get all orders - ADMIN => /api/v1/admin/orders
export const allOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

    res.status(200).json({ orders });
});

// Update Orders - ADMIN => /api/v1/admin/orders/:id
export const updateOrders = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("No Order found with this ID", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    for (const item of order.orderItems) {
        const product = await Product.findById(item.product.toString());

        if (!product) {
            return next(new ErrorHandler("No Product found with this ID", 404));
        }

        product.stock -= item.quantity;
        await product.save({ validateBeforeSave: false });
    }

    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();

    await order.save();

    res.status(200).json({ success: true });
});

// Delete order => /api/v1/admin/orders/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("No Order found with this ID", 404));
    }

    await order.deleteOne();

    res.status(200).json({ success: true });
});

async function getSalesData(startDate, endDate) {
    try {
        const salesData = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate),
                    },
                },
            },
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    },
                    totalSales: { $sum: "$totalAmount" },
                    numOrders: { $sum: 1 },
                },
            },
        ]);

        const salesMap = new Map();
        let totalSales = 0;
        let totalNumOrders = 0;

        salesData.forEach((entry) => {
            const date = entry._id.date;
            const sales = entry.totalSales;
            const numOrders = entry.numOrders;

            salesMap.set(date, { sales, numOrders });
            totalSales += sales;
            totalNumOrders += numOrders;
        });

        const datesBetween = getDatesBetween(startDate, endDate);

        const finalSalesData = datesBetween.map((date) => ({
            date,
            sales: (salesMap.get(date) || { sales: 0 }).sales,
            numOrders: (salesMap.get(date) || { numOrders: 0 }).numOrders,
        }));

        return { salesData: finalSalesData, totalSales, totalNumOrders };
    } catch (error) {
        throw new ErrorHandler("Failed to fetch sales data", 500);
    }
}

function getDatesBetween(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
        const formattedDate = currentDate.toISOString().split("T")[0];
        dates.push(formattedDate);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}

// Get Sales Data => /api/v1/admin/get_sales
export const getSales = catchAsyncErrors(async (req, res, next) => {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);

    startDate.setUTCHours(0, 0, 0, 0); // 12 AM
    endDate.setUTCHours(23, 59, 59, 999); // 12 PM

    const { salesData, totalSales, totalNumOrders } = await getSalesData(startDate, endDate);

    res.status(200).json({ salesData, totalNumOrders, sales: totalSales });
});