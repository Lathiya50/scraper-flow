import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GetAvailableCredits } from "@/actions/billing/getAvailableCredits";
import ReactCountUpWrapper from "@/components/ReactCountUpWrapper";
import { ArrowLeftRightIcon, CoinsIcon } from "lucide-react";
import CreditsPurchase from "./_components/CreditsPurchase";
import { Period } from "@/types/analytics";
import { GetCreditUsageInPeriod } from "@/actions/analytics/getCreditUsageInPeriod";
import CreditUsageChat from "./_components/CreditUsageChat";
import { GetUserPurchaseHistory } from "@/actions/billing/getUserPurchaseHistory";
import InvoiceBtn from "./_components/InvoiceBtn";

function BillingPage() {
  return (
    <div className="mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Billing</h1>
      <Suspense fallback={<Skeleton className="w-full h-[166px]" />}>
        <BalanceCard />
      </Suspense>
      <CreditsPurchase />
      <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
        <CreditUsageCard />
      </Suspense>
      <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
        <TransationHistoryCard />
      </Suspense>
    </div>
  );
}

export default BillingPage;

async function BalanceCard() {
  const userBalance = await GetAvailableCredits();
  return (
    <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 shadow-lg flex justify-between flex-col overflow-hidden">
      <CardContent className="p-6 relative items-center">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Available Credits
            </h3>
            <p className="text-4xl fonrt-bold text-primary">
              <ReactCountUpWrapper value={userBalance} />
            </p>
          </div>
          <CoinsIcon
            size={140}
            className="text-primary opacity-15 absolute bottom-0 right-0"
          />
        </div>
      </CardContent>
      <CardFooter className="text-muted-foreground text-sm">
        When your credit balance reaches zero,your workflow will stop working.
      </CardFooter>
    </Card>
  );
}

async function CreditUsageCard() {
  const period: Period = {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  };
  const data = await GetCreditUsageInPeriod(period);
  return (
    <CreditUsageChat
      data={data}
      title="Credits consumed"
      description="Daily credit consumed in the current month"
    />
  );
}

async function TransationHistoryCard() {
  const purchases = await GetUserPurchaseHistory();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <ArrowLeftRightIcon className="h-6 w-6 text-primary" />
          Transation History
        </CardTitle>
        <CardDescription>
          View your transaction history and download invoices
        </CardDescription>
        <CardContent className="space-y-4">
          {purchases.length === 0 && (
            <p className="text-muted-foreground"> No transaction yet</p>
          )}
          {purchases.map((purchase) => (
            <div
              key={purchase.id}
              className="flex justify-between items-center py-3 border-b last:border-b-0"
            >
              <div>
                <p className="font-medium"> {formatDate(purchase.date)}</p>
                <p className="text-sm text-muted-foreground">
                  {purchase.description}
                </p>
              </div>
              <div className="text-right">
                <p className="text-medium">
                  {formtAmount(purchase.amount, purchase.currency)}
                </p>
                <InvoiceBtn id={purchase.id} />
              </div>
            </div>
          ))}
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export function formtAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount / 100);
}

export function formatDate(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formatted = formatter.format(date);
  return formatted;
}
