import { Request, Response } from 'express';

import { AvailabilityDB } from '@db/availability';
import { Availability } from '@type/Availability';
import { publishAvailability } from '../services/publishAvailability';

export const postAvailability = async (req: Request, res: Response): Promise<void> => {
  try {
    const newAvailability: Availability[] = req.body;

    const db = AvailabilityDB.getInstance();
    db.set(newAvailability);

    // TODO: push new availability to the message queue
    publishAvailability();

    res.status(200).json({
      message: 'Availability updated successfully',
      data: db.get(),
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while updating availability',
      error,
    });
  }
};
