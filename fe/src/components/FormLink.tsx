import { memo } from "react";
import type { FormLink as LinkTypes } from "../../types";
import { Link } from "react-router-dom";
import styles from "../styles/formLink.module.css";

interface Props {
  link: LinkTypes;
}

const FormLink = ({ link }: Props) => {
  return (
    <li className={styles.item}>
      <span>{link.label}</span>

      <Link to={link.route} className={styles.link}>
        {link.labelWithLink}
      </Link>
    </li>
  );
};

const MemoizedFormLink = memo(FormLink);

export default MemoizedFormLink;