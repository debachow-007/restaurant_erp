import prisma from "../config/prisma.js";

export const consumeStock = async (menuItemId, qtyMultiplier, referenceId) => {
  const recipe = await prisma.recipe.findFirst({
    where: { menuItemId }
  });

  if (!recipe) return;

  for (const ing of recipe.ingredients) {
    const neededQty = Number(ing.quantity) * qtyMultiplier;
    let remaining = neededQty;

    // FIFO batches
    const batches = await prisma.inventoryBatch.findMany({
      where: { inventoryItemId: ing.inventoryItemId, quantity: { gt: 0 } },
      orderBy: { createdAt: "asc" }
    });

    for (const batch of batches) {
      if (remaining <= 0) break;

      const deduct = Math.min(Number(batch.quantity), remaining);

      await prisma.inventoryBatch.update({
        where: { id: batch.id },
        data: { quantity: Number(batch.quantity) - deduct }
      });

      remaining -= deduct;

      const stock = await prisma.stockItem.findUnique({
        where: { inventoryItemId: ing.inventoryItemId }
      });

      await prisma.stockItem.update({
        where: { id: stock.id },
        data: { quantity: stock.quantity - deduct }
      });

      await prisma.stockMovement.create({
        data: {
          stockItemId: stock.id,
          type: "CONSUMPTION",
          quantity: -deduct,
          reference: referenceId,
          extra: { menuItemId, recipeQtyUsed: deduct }
        }
      });
    }
  }
};
