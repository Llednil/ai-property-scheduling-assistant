import { Request, Response } from "express";

export const getTenants = (req: Request, res: Response) => {
  const tenants = [
    {
      id: 1,
      tenant: "John Smith",
      address: "123 Main St",
      bookingDate: "2026-07-15",
      time: "9:00 AM",
    },
    {
      id: 2,
      tenant: "Jane Doe",
      address: "45 King Rd",
      bookingDate: "2026-07-16",
      time: "1:30 PM",
    },
  ];

  res.json(tenants);
};