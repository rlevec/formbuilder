import type { CanvasFieldsValues } from "../../../types";

import type { CSSProperties } from "react";

import { Star, Smile, Heart } from "lucide-react";

import { useState } from "react";

import type { LucideIcon } from "lucide-react";

type Props = {
  id: string;
  params: CanvasFieldsValues;
  value: string;
  onChange: ({ value }: { value: string }) => void;
};

const buildWrapperStyles = (): CSSProperties => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

const buildContainerStyles = (params: CanvasFieldsValues): CSSProperties => ({
  flex: 1,
  display: "flex",
  backgroundColor:
    typeof params?.fieldBackgroundColor === "string"
      ? params.fieldBackgroundColor
      : "var(--surface)",
  border:
    typeof params?.fieldBorder === "string"
      ? params.fieldBorder
      : "1px solid var(--border)",
  borderRadius:
    typeof params?.fieldBorderRadius === "string"
      ? params.fieldBorderRadius
      : "var(--radius-md)",
  height:
    typeof params?.fieldHeight === "string"
      ? params.fieldHeight
      : "var(--field-height)",
  padding:
    typeof params?.fieldPadding === "string"
      ? params.fieldPadding
      : "var(--space-3)",
  justifyContent:
    typeof params?.ratingIconsAlignment === "string"
      ? params.ratingIconsAlignment
      : "start",
  alignItems: "center",
  gap:
    typeof params?.ratingIconsGap === "string"
      ? params.ratingIconsGap
      : "var(--space-4)",
});

const buildLabelStyles = (params: CanvasFieldsValues): CSSProperties => ({
  fontSize: (params?.labelFontSize as string) ?? "var(--text-sm)",
  fontWeight:
    (params?.labelFontWeight as string) ?? "var(--font-weight-normal)",
  margin: (params?.labelMargin as string) ?? "0 0 var(--space-2) 0",
  color: (params?.labelTextColor as string) ?? "var(--text-secondary)",
});

const buildIconSize = (params: CanvasFieldsValues): { width: string; height: string } => {
  const value = typeof params?.ratingIconHeight === "string" ? params.ratingIconHeight : "25px";
  return {
    width: value,
    height: value,
  };
};

const getRatingIcon = (params: CanvasFieldsValues): LucideIcon => {
  const IconMap: Record<string, LucideIcon> = {
    stars: Star,
    hearts: Heart,
    emoji: Smile,
  };

  return params.ratingStyle && typeof params.ratingStyle === "string"
    ? IconMap[params.ratingStyle] ?? Star
    : Star;
};

export default function CanvasRatingField({ params, onChange, value }: Props) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const wrapperStyles = buildWrapperStyles();
  const containerStyles = buildContainerStyles(params);
  const labelStyles = buildLabelStyles(params);
  const iconSize = buildIconSize(params);
  const Icon = getRatingIcon(params);

  const fieldMaxRating = Number(params.maxRating)
    ? Number(params.maxRating) > 10
      ? 10
      : Number(params.maxRating)
    : 5;

  const handleIconColor = (i: number) => {
    const ratingStyle =
      params.ratingStyle === "hearts" ||
      params.ratingStyle === "stars" ||
      params.ratingStyle === "emoji"
        ? params.ratingStyle
        : "stars";

    const defaultColors = {
      fill: "none",
      stroke: "currentColor",
    };

    const isSelected = i < Number(value);
    const isHovered = hoveredRating ? i < hoveredRating : false;

    const regularColorMap: Record<string, { fill: string; stroke: string }> = {
      stars: {
        fill: "var(--star-bg)",
        stroke: "var(--star)",
      },
      hearts: {
        fill: "var(--heart-bg)",
        stroke: "var(--heart)",
      },
      emoji: {
        fill: `var(--rating-${i + 1})`,
        stroke: "#000",
      },
    };

    const colors = regularColorMap[ratingStyle] ?? defaultColors;

    return {
      fill: isSelected || isHovered ? colors.fill : defaultColors.fill,
      stroke: isSelected || isHovered ? colors.stroke : defaultColors.stroke,
    };
  };

  return (
    <div style={wrapperStyles}>
      {params.label && <label style={labelStyles}>{params.label}</label>}
      <div style={containerStyles}>
        {Array.from({ length: fieldMaxRating }).map((_, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredRating(i + 1)}
            onMouseLeave={() => setHoveredRating(null)}
            onClick={() => onChange({ value: (i + 1).toString() })}
          >
            <Icon
              height={iconSize.height}
              width={iconSize.width}
              {...handleIconColor(i)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
