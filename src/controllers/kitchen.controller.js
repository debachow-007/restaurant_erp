import prisma from "../config/prisma.js";

export const listKOT = async (req, res, next) => {
  try {
    const list = await prisma.kOT.findMany({
      where: { status: { in: ["PENDING","IN_PROGRESS"] } },
      orderBy: { createdAt: "asc" },
      include: { order: true }
    });
    res.json(list);
  } catch (err) {
    next(err);
  }
};

export const updateKOTStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const kot = await prisma.kOT.update({
      where: { id: req.params.id },
      data: { status }
    });

    // If all KOTs for this order are READY, you might optionally move order to READY
    res.json(kot);
  } catch (err) {
    next(err);
  }
};
