import menuRoutes from "./menu.routes.js";
import tablesRoutes from "./tables.routes.js";
import ordersRoutes from "./orders.routes.js";
import kitchenRoutes from "./kitchen.routes.js";
import billingRoutes from "./billing.routes.js";
import inventoryItemsRoutes from "./inventoryItems.routes.js";
import suppliersRoutes from "./suppliers.routes.js";
import purchaseOrdersRoutes from "./purchaseOrders.routes.js";
import grnRoutes from "./grn.routes.js";
import supplierPaymentsRoutes from "./supplierPayments.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/suppliers", suppliersRoutes);
router.use("/inventory/items", inventoryItemsRoutes);
router.use("/purchase-orders", purchaseOrdersRoutes);
router.use("/grn", grnRoutes);
router.use("/supplier-payments", supplierPaymentsRoutes);
router.use("/menu", menuRoutes);
router.use("/tables", tablesRoutes);
router.use("/orders", ordersRoutes);
router.use("/kitchen", kitchenRoutes);
router.use("/billing", billingRoutes);

export default router;
