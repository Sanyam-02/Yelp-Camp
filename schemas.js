const Joi = require('joi');
// const sanitizeHTML = require('sanitize-html');

// const extension = (joi)=>({
//     type: 'string',
//     base: joi.string(),
//     messages: {
//         'string.excapeHTML': '{{#label)) must mot include HTML!!'
//     },
//     rules: {
//         escapeHTML: {
//             validate(value, helpers) {
//                 const clean = sanitizeHTML(value, {
//                     allowedTags: [],
//                     allowedAttributes: {},
//                 });
//                 if(clean !== value) return helpers.error('string.escapeHTML', {value})
//             }
//         }
//     }
// });

// const Joi = BaseJoi.extend(extension);

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        // image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required()
    }).required(),
    deleteImages: Joi.array()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})