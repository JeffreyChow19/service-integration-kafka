import { Router } from 'express';

import { postAvailability } from '@controllers/availability';
import { validateRequest } from '@middleware/validateRequest';
import { availabilityValidationSchema } from '@validator/availability';

const router = Router();

router.post(
  '/',
  validateRequest(availabilityValidationSchema),
  postAvailability,
);

export default router;
