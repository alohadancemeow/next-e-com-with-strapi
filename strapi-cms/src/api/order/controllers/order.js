// @ts-nocheck
"use strict";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-04-10",
});

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    // async handleStripeWebhook(ctx) {
    //     const sig = ctx.request.headers['stripe-signature'];
    //     let event;

    //     try {
    //         event = stripe.webhooks.constructEvent(ctx.request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    //     } catch (err) {
    //         strapi.log.error(`Webhook Error: ${err.message}`);
    //         ctx.response.status = 400;
    //         return { error: `Webhook Error: ${err.message}` };
    //     }

    //     switch (event.type) {
    //         case 'checkout.session.completed':
    //             const session = event.data.object;

    //             try {
    //                 await strapi.service('api::order.order').create({
    //                     data: { products, stripeId: session.id }
    //                 });

    //                 strapi.log.info(`Order created for session ${session.id}`);
    //             } catch (orderError) {
    //                 strapi.log.error(`Order creation error: ${orderError.message}`);
    //                 ctx.response.status = 500;
    //                 return { error: `Order creation error: ${orderError.message}` };
    //             }

    //             break;
    //         default:
    //             strapi.log.info(`Unhandled event type ${event.type}`);
    //     }

    //     ctx.response.status = 200;
    //     return { received: true };
    // },

    async create(ctx) {
        const { products } = ctx.request.body;

        try {
            const lineItems = await Promise.all(
                products.map(async (product) => {
                    const item = await strapi
                        .service("api::product.product")
                        .findOne(product.id);

                    return {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: item.title,
                            },
                            unit_amount: Math.round(item.price * 100),
                        },
                        quantity: product.quantity,
                    };
                })
            );

            const session = await stripe.checkout.sessions.create({
                shipping_address_collection: { allowed_countries: ['TH', 'US'] },
                payment_method_types: ["card"],
                mode: "payment",
                success_url: process.env.CLIENT_URL + "?success=true",
                cancel_url: process.env.CLIENT_URL + "?success=false",
                line_items: lineItems,
            });

            await strapi.service('api::order.order').create({
                data: { products, stripeId: session.id }
            });

            return { stripeSession: session };
        } catch (error) {
            ctx.response.status = 500;
            return { error };
        }
    },
}));
