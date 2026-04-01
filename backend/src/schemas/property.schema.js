const { z } = require('zod');


const AddPropertySchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().optional(),
  price: z.preprocess((val) => Number(val), z.number().positive()),
  location: z.string().min(1),
  imageUrl: z.string().url().optional().or(z.literal('')),
});

// update 
const UpdatePropertySchema = AddPropertySchema.partial();

// delete 
const PropertyIdSchema = z.object({
  id: z.string().uuid("Invalid Property ID format"),
});

module.exports = { AddPropertySchema, UpdatePropertySchema, PropertyIdSchema };