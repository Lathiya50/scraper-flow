"use client";

import React from "react";
import { GetWorkflowExecutionsStats } from "@/actions/analytics/getWorkflowExecutionsStats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Layers2 } from "lucide-react";

type ChartData = Awaited<ReturnType<typeof GetWorkflowExecutionsStats>>;

const chartConfig = {
  success: {
    label: "Success",
    color: "hsl(var(--chart-2))",
  },
  failed: {
    label: "Failed",
    color: "hsl(var(--chart-1))",
  },
};
function ExecutionStatusChat({ data }: { data: ChartData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Layers2 className="w-6 h-6 text-primary" />
          Workflow executions status
        </CardTitle>
        <CardDescription>
          Daily number of successful and failed workflow executions
        </CardDescription>
        <CardContent>
          <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
            <AreaChart
              data={data}
              height={200}
              accessibilityLayer
              margin={{ top: 20 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={"date"}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <ChartTooltip
                content={<ChartTooltipContent className="w-[250px]" />}
              />
              <Area
                min={0}
                type={"bump"}
                fillOpacity={0.6}
                fill="var(--color-success)"
                stroke="var(--color-success)"
                dataKey="success"
                stackId={"a"}
              />
              <Area
                min={0}
                type={"bump"}
                fillOpacity={0.6}
                fill="var(--color-failed)"
                stroke="var(--color-failed)"
                dataKey="failed"
                stackId={"a"}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export default ExecutionStatusChat;
