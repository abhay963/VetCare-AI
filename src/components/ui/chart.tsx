"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

/* ================= CONFIG ================= */

const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<"light" | "dark", string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within ChartContainer");
  }
  return context;
}

/* ================= CONTAINER ================= */

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        className={cn("flex aspect-video text-xs", className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />

        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

/* ================= STYLE ================= */

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const entries = Object.entries(config);

  if (!entries.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: entries
          .map(
            ([key, value]) =>
              `[data-chart=${id}] { --color-${key}: ${
                value.color || "#8884d8"
              }; }`
          )
          .join("\n"),
      }}
    />
  );
};

/* ================= TOOLTIP ================= */

const ChartTooltip = RechartsPrimitive.Tooltip;

/* ✅ FINAL FIX (NO TYPESCRIPT ERROR) */
function ChartTooltipContent(props: any) {
  const {
    active,
    payload,
    label,
    className,
  } = props;

  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "bg-background border rounded-md px-3 py-2 text-xs shadow",
        className
      )}
    >
      {label && <p className="font-medium mb-1">{label}</p>}

      {payload.map((item: any, index: number) => (
        <div key={index} className="flex justify-between gap-2">
          <span>{item.name}</span>
          <span className="font-medium">
            {item.value?.toLocaleString?.() ?? item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ================= LEGEND ================= */

const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent(props: any) {
  const { payload } = props;

  if (!payload || payload.length === 0) return null;

  return (
    <div className="flex gap-4 justify-center mt-2 text-xs">
      {payload.map((item: any, index: number) => (
        <div key={index} className="flex items-center gap-1">
          <div
            className="w-2 h-2 rounded"
            style={{ backgroundColor: item.color }}
          />
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ================= EXPORT ================= */

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
};