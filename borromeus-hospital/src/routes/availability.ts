import { Router } from 'express';

import {
  createAvailability,
  createManyAvailabilities,
  deleteAvailability, getAllAvailabilities,
} from '@controllers/availability';
import { validateRequest } from '@middleware/validateRequest';
import { availabilityValidationSchema, availabilityValidationSchemaMany } from '@validator/availability';

const router = Router();

// Route to create a single availability
router.post(
  '/',
  validateRequest(availabilityValidationSchema), // Validate for single availability
  createAvailability, // Controller to create a single availability
);

// Route to create multiple availabilities
router.post(
  '/bulk',
  validateRequest(availabilityValidationSchemaMany), // Validate for multiple availabilities
  createManyAvailabilities, // Controller to create many availabilities
);

// Route to delete an availability by ID
router.delete('/:id', deleteAvailability); // Controller to delete an availability by ID

// Route to get all availabilities
router.get('/', getAllAvailabilities); // Controller to fetch all availabilities

export default router;
