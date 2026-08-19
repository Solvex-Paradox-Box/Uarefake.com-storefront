// Escrow & Transaction Gateway (PayPal Merchant Integration & B2B Captures)

export interface CheckoutEscrowOrder {
  orderId: string;
  solutionId: string;
  itemTitle: string;
  amountUSD: number;
  currency: 'USD';
  status: 'ESCROW_LOCKED' | 'SETTLED' | 'REFUND_REVERSED';
  timestamp: number;
  merchantAccount: string;
  nodeSignature: string;
}

export class PayPalCheckoutGateway {
  private static settledOrders: CheckoutEscrowOrder[] = [
    {
      orderId: "PAYID-SOLVEX-001",
      solutionId: "sol-001",
      itemTitle: "solvex-paradox-box/storefront",
      amountUSD: 999.00,
      currency: "USD",
      status: "SETTLED",
      timestamp: Date.now() - 7200000,
      merchantAccount: "merchant-auth@solvex-paradox-box.com",
      nodeSignature: "380-SHA256-ESCROW-CONFIRMED-SOLVEX"
    }
  ];

  public static createInstantEscrow(solutionId: string, itemTitle: string, amountUSD: number): CheckoutEscrowOrder {
    const order: CheckoutEscrowOrder = {
      orderId: `PAYID-SOLVEX-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      solutionId,
      itemTitle,
      amountUSD,
      currency: "USD",
      status: "SETTLED",
      timestamp: Date.now(),
      merchantAccount: "paypal-settle@solvex-paradox-box.org",
      nodeSignature: `SOLVEX-ESCROW-SIG-380::${solutionId}::${amountUSD}`
    };

    this.settledOrders.unshift(order);
    return order;
  }

  public static getSettledOrders(): CheckoutEscrowOrder[] {
    return [...this.settledOrders];
  }
}
