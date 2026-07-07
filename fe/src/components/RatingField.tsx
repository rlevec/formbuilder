import { memo, useState } from "react";

import type { FormField, FieldUpdateParams } from "../../types";
interface Props {
  field: FormField;
  value: string;
  error?: string;
  onSelect: (params: FieldUpdateParams) => void;
}

import { Star, Smile, Heart } from "lucide-react";

import styles from "../styles/ratingField.module.css";

export const RatingField = ({ field, onSelect, value, error }: Props) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const IconMap = {
    stars: Star,
    hearts: Heart,
    emoji: Smile,
  };
  const Icon = IconMap[field.ratingStyle || "stars"] || Star;

  const fieldMaxRating = Number(field.maxRating)
    ? Number(field.maxRating) > 10
      ? 10
      : Number(field.maxRating)
    : 5;

  return (
    <div className={styles.wrapper}>
      {field.label && <div>{field.label}</div>}
      <div className={styles.ratingContainer}>
        {Array.from({ length: fieldMaxRating }, (_, i) => {
          return (
            <div
              onMouseEnter={() => setHoveredRating(i + 1)}
              onMouseLeave={() => setHoveredRating(null)}
              className={`${styles.ratingIcon} ${
                (hoveredRating !== null ? i < hoveredRating : i < Number(value))
                  ? `${styles[`active_${field.ratingStyle !== "emoji" ?  field.ratingStyle : `${field.ratingStyle}_${i + 1}`}`]}`
                  : ""
              }`}
              key={i}
              onClick={() =>
                onSelect({
                  field,
                  fieldName: "rating",
                  value: (i + 1).toString(),
                })
              }
            >
              <Icon />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MemoizedRatingField = memo(RatingField);

export default MemoizedRatingField;
