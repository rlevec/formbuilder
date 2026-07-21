import type { CanvasFieldsValues } from "../../../types";

import type { CSSProperties } from "react";

import { Star, Smile, Heart } from "lucide-react";

import type { LucideIcon } from "lucide-react";

import { useState } from "react";

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

const buildContainerStyles = (
  params: CanvasFieldsValues,
  hovered: boolean
): CSSProperties => ({
  display: "flex",

  backgroundColor:
    typeof params?.fieldBackgroundColor === "string"
      ? params.fieldBackgroundColor
      : "var(--surface)",

  border: hovered
    ? typeof params?.fieldFocusedBorder === "string"
      ? params.fieldFocusedBorder
      : "1px solid var(--primary)"
    : typeof params?.fieldBorder === "string"
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
      : "flex-start",

  alignItems: "center",

  gap:
    typeof params?.ratingIconsGap === "string"
      ? params.ratingIconsGap
      : "var(--space-4)",
});

const buildLabelStyles = (
  params: CanvasFieldsValues,
  hovered: boolean
): CSSProperties => ({
  fontSize:
    (params?.labelFontSize as string) ??
    "var(--text-sm)",

  fontWeight:
    (params?.labelFontWeight as string) ??
    "var(--font-weight-normal)",

  margin:
    (params?.labelMargin as string) ??
    "0 0 var(--space-2) 0",

  color: hovered
    ? ((params?.focusedLabelColor as string) ??
      "var(--primary)")
    : ((params?.labelTextColor as string) ??
      "var(--text-secondary)"),
});

const buildIconSize = (
  params: CanvasFieldsValues
): {
  width: string;
  height: string;
} => {
  const size =
    typeof params?.ratingIconHeight === "string"
      ? params.ratingIconHeight
      : "25px";

  return {
    width: size,
    height: size,
  };
};

const getRatingIcon = (
  params: CanvasFieldsValues
): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    stars: Star,
    hearts: Heart,
    emoji: Smile,
  };

  return typeof params?.ratingStyle === "string"
    ? iconMap[params.ratingStyle] ?? Star
    : Star;
};

export default function CanvasRatingField({
  params,
  onChange,
  value,
}: Props) {
  const [hoveredRating, setHoveredRating] =
    useState<number | null>(null);

  const [hovered, setHovered] =
    useState<boolean>(false);

  const wrapperStyles = buildWrapperStyles();

  const containerStyles = buildContainerStyles(
    params,
    hovered
  );

  const labelStyles = buildLabelStyles(
    params,
    hovered
  );

  const iconSize = buildIconSize(params);

  const Icon = getRatingIcon(params);

  const maxRating = Number(params?.maxRating)
    ? Math.min(Number(params.maxRating), 10)
    : 5;


  const getIconColor = (index: number) => {
    const ratingStyle =
      typeof params?.ratingStyle === "string"
        ? params.ratingStyle
        : "stars";


    const colorMap = {
      stars: {
        fill: "var(--star-bg)",
        stroke: "var(--star)",
      },

      hearts: {
        fill: "var(--heart-bg)",
        stroke: "var(--heart)",
      },

      emoji: {
        fill: `var(--rating-${index + 1})`,
        stroke: "#000",
      },
    };


    const colors =
      colorMap[
        ratingStyle as keyof typeof colorMap
      ] ?? colorMap.stars;


    const selected =
      index < Number(value);


    const preview =
      hoveredRating !== null &&
      index < hoveredRating;


    const active =
      selected || preview;


    return {
      fill: active
        ? colors.fill
        : "none",

      stroke: active
        ? colors.stroke
        : "currentColor",
    };
  };


  return (
    <div style={wrapperStyles}>
      {params?.label && (
        <label style={labelStyles}>
          {params.label}
        </label>
      )}

      <div
        style={containerStyles}
        onMouseEnter={() =>
          setHovered(true)
        }
        onMouseLeave={() =>
          setHovered(false)
        }
      >
        {Array.from({
          length: maxRating,
        }).map((_, index) => (
          <div
            key={index}
            style={{
              cursor: "pointer",
            }}

            onMouseEnter={() =>
              setHoveredRating(index + 1)
            }

            onMouseLeave={() =>
              setHoveredRating(null)
            }

            onClick={() =>
              onChange({
                value: (index + 1).toString(),
              })
            }
          >
            <Icon
              width={iconSize.width}
              height={iconSize.height}
              {...getIconColor(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}