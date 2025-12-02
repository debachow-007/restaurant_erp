// src/utils/billing.js
export function calculateOrderTotals(items, { taxPercent = 0, serviceChargePercent = 0, discountAmount = 0 } = {}) {
  const subTotal = items.reduce((sum, item) => sum + Number(item.totalPrice || item.qty * item.unitPrice), 0);
  const taxAmount = (subTotal * taxPercent) / 100;
  const serviceCharge = (subTotal * serviceChargePercent) / 100;
  const grandTotal = subTotal + taxAmount + serviceCharge - discountAmount;

  return {
    subTotal: subTotal.toFixed(2),
    taxAmount: taxAmount.toFixed(2),
    serviceCharge: serviceCharge.toFixed(2),
    discountAmount: Number(discountAmount).toFixed(2),
    grandTotal: grandTotal.toFixed(2)
  };
}
