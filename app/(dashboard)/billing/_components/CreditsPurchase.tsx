"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CoinsIcon, CreditCard } from "lucide-react";
import { CreditsPack, PackId } from "@/types/billing";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { PurchaseCredits } from "@/actions/billing/purchaseCredits";

function CreditsPurchase() {
  const [selectedPack, setSelectedPack] = React.useState(PackId.MEDIUM);

  const mutation = useMutation({
    mutationFn: PurchaseCredits,
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <CoinsIcon className="w-6 h-6 text-primary" />
          Purchase Credits
        </CardTitle>
        <CardDescription>
          Select the number of credits you want to purchase.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <RadioGroup
          onValueChange={(value) => setSelectedPack(value as PackId)}
          value={selectedPack}
        >
          {CreditsPack.map((pack) => (
            <div
              key={pack.id}
              className="flex items-center space-x-3 bg-secondary/50 rounded-lg p-3 hover:bg-secondary"
              onClick={() => setSelectedPack(pack.id)}
            >
              <div className="flex items-center space-x-2 flex-1">
                <RadioGroupItem value={pack.id} id={pack.id} />
                <Label
                  htmlFor={pack.id}
                  className="flex justify-between w-full cursor-pointer"
                >
                  <span className="text-medium">
                    {pack.name} - {pack.label}
                  </span>
                  <span className="font-bold text-primary">
                    $ {(pack.price / 100).toFixed(2)}
                  </span>
                </Label>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full flex items-center gap-2"
          disabled={mutation.isPending}
          onClick={() => mutation.mutate(selectedPack)}
        >
          <CreditCard className="w-5 h-5" />
          Purchase credits
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CreditsPurchase;
