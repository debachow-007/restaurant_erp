import prisma from "../config/prisma.js";

export const getSuppliers = async (req, res, next) => {
  try {
    const suppliers = await prisma.supplier.findMany({
      orderBy: { id: "asc" },
      where: { isActive: true },
    });

    res.json(suppliers);
  } catch (err) {
    next(err);
  }
};

export const getSupplierById = async (req, res, next) => {
  try {
    const supplier = await prisma.supplier.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!supplier || supplier.isActive === false) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.json(supplier);
  } catch (err) {
    next(err);
  }
};

export const createSupplier = async (req, res, next) => {
  try {
    const { name, email, phone, address, gstNumber, metadata } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Supplier name is required" });
    }

    const supplier = await prisma.supplier.create({
      data: {
        name,
        email,
        phone,
        address,
        gstNumber,
        metadata: metadata || {},
      },
    });

    res.status(201).json(supplier);
  } catch (err) {
    next(err);
  }
};

export const updateSupplier = async (req, res, next) => {
  try {
    const { name, email, phone, address, gstNumber, metadata, isActive } =
      req.body;

    const supplier = await prisma.supplier.update({
      where: { id: Number(req.params.id) },
      data: {
        name,
        email,
        phone,
        address,
        gstNumber,
        metadata,
        isActive,
      },
    });

    res.json(supplier);
  } catch (err) {
    next(err);
  }
};

export const deleteSupplier = async (req, res, next) => {
  try {
    await prisma.supplier.update({
      where: { id: Number(req.params.id) },
      data: { isActive: false },
    });

    res.json({ message: "Supplier deleted" });
  } catch (err) {
    next(err);
  }
};
