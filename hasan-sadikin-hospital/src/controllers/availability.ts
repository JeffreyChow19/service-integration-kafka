import { Request, Response } from 'express';
import { Availability } from '@type/Availability';
import { AvailabilityService } from '../services/availability';

const availabilityService = new AvailabilityService();

export const createAvailability = async (req: Request, res: Response): Promise<void> => {
  try {
    const availability: Availability = req.body;

    // Call the service to create a single availability
    await availabilityService.createAvailability(availability);

    res.status(201).json({
      message: 'Availability created successfully',
    });
  } catch (error) {
    console.error('Error creating availability:', error);
    res.status(500).json({
      message: 'An error occurred while creating availability',
    });
  }
};

export const createManyAvailabilities = async (req: Request, res: Response): Promise<void> => {
  try {
    const availabilities: Availability[] = req.body;

    // Call the service to create multiple availabilities
    await availabilityService.createManyAvailabilities(availabilities);

    res.status(201).json({
      message: 'Availabilities created successfully',
    });
  } catch (error) {
    console.error('Error creating availabilities:', error);
    res.status(500).json({
      message: 'An error occurred while creating availabilities',
    });
  }
};

export const deleteAvailability = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id, 10);

    // Call the service to delete an availability by ID
    await availabilityService.deleteAvailability(id);

    res.status(200).json({
      message: 'Availability deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting availability:', error);
    res.status(500).json({
      message: 'An error occurred while deleting availability',
    });
  }
};

export const getAllAvailabilities = async (req: Request, res: Response): Promise<void> => {
  try {
    // Call the service to get all availabilities
    const availabilities: Availability[] = await availabilityService.getAllAvailabilities();

    res.status(200).json({
      message: 'Availabilities fetched successfully',
      data: availabilities,
    });
  } catch (error) {
    console.error('Error fetching availabilities:', error);
    res.status(500).json({
      message: 'An error occurred while fetching availabilities',
    });
  }
};
