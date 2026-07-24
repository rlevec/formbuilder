import styles from "../../styles/modal.module.css";

import useModalStore from "../../store/useModalStore";
import useOutsideClick from "../../hooks/useOutsideClick";

import Button from "../shared/Button";

import { routes } from "../../router/routes";
import { useCustomQuery } from "../../api";

import type {
  GetTemplatesResponse,
  TemplateResponseData,
} from "../../../types";

import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  PanelsTopLeft,
  Pencil,
  Trash2,
} from "lucide-react";

import { useRef, useState } from "react";

type TemplateView = "slider" | "grid";

const TITLE_MAP: Record<string, string> = {
  templates: "Form Templates",
  profile: "Profile Settings",
};

const DESCRIPTION_MAP: Record<string, string> = {
  templates:
    "Choose from your saved form templates or start with a pre-built layout to create your next form faster.",

  profile:
    "Manage your profile information and update your account preferences.",
};

export default function Modal() {
  const { toggle, type } = useModalStore();

  const modalRef = useRef<HTMLDivElement>(null);

  const [templateView, setTemplateView] = useState<TemplateView>("slider");

  const [slideIdx, setSlideIdx] = useState(0);

  const { data, isLoading, isError } = useCustomQuery<GetTemplatesResponse>({
    key: "modal_templates",

    fetchParams: {
      url: routes.server.getTemplates,
    },

    options: {
      enabled: type === "templates",
    },
  });

  useOutsideClick(modalRef, toggle);

  const handleSlideChange = (direction: "prev" | "next") => {
    const templates = data?.data;

    if (!templates || !Array.isArray(templates) || !templates.length) return;

    if (direction === "prev") {
      setSlideIdx((prev) => (prev === 0 ? templates.length - 1 : prev - 1));
    }

    if (direction === "next") {
      setSlideIdx((prev) => (prev === templates.length - 1 ? 0 : prev + 1));
    }
  };

  const renderTemplateCard = (
    template: TemplateResponseData,
    idx?: number
  ) => {
    return (
      <div
        key={idx}
        className={styles.templateCard}
      >
        <span className={styles.badge}>{template.form.formId}</span>
        <h3>{template.form.formName}</h3>
        <p>Form template</p>
        <div className={styles.cardActions}>
          <Button
            type="button"
            visual="success"
            additionalClassName={styles.iconButton}
            onClick={() => {
              console.log("edit", template);
            }}
          >
            <Pencil size={16} />
          </Button>
          <Button
            type="button"
            visual="danger"
            additionalClassName={styles.iconButton}
            onClick={() => {
              console.log("delete", template);
            }}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    );
  };

  const renderTemplates = () => {
    if (isLoading) {
      return <div className={styles.message}>Loading templates...</div>;
    }

    if (isError) {
      return <div className={styles.message}>Failed loading templates</div>;
    }

    const templates = data?.data;

    if (!templates || !Array.isArray(templates) || !templates.length)
      return null;

    return (
      <>
        <div className={styles.viewSwitcher}>
          <Button
            onClick={() => setTemplateView("slider")}
            additionalClassName={
              templateView === "slider" ? styles.activeView : styles.viewBtn
            }
          >
            <PanelsTopLeft size={20} />
          </Button>
          <Button
            additionalClassName={
              templateView === "grid" ? styles.activeView : styles.viewBtn
            }
            onClick={() => setTemplateView("grid")}
          >
            <LayoutGrid size={20} />
          </Button>
        </div>
        {templateView === "slider" && (
          <div className={styles.slider}>
            <Button
              additionalClassName={styles.arrow}
              visual="secondary"
              onClick={() => handleSlideChange("prev")}
            >
              <ChevronLeft />
            </Button>
            {renderTemplateCard(templates[slideIdx])}
            <Button
              additionalClassName={styles.arrow}
              visual="secondary"
              onClick={() => handleSlideChange("next")}
            >
              <ChevronRight />
            </Button>
            <div className={styles.counter}>
              {slideIdx + 1}/{templates.length}
            </div>
          </div>
        )}
        {templateView === "grid" && (
          <div className={styles.grid}>
            {templates.map((template, index) =>
              renderTemplateCard(template, index),
            )}
          </div>
        )}
      </>
    );
  };

  return (
    <div className={styles.overlay}>
      <div ref={modalRef} className={styles.modal}>
        <h2 className={styles.title}>{type ? TITLE_MAP[type] : ""}</h2>
        <p className={styles.description}>
          {type ? DESCRIPTION_MAP[type] : ""}
        </p>
        {type === "templates" && renderTemplates()}
        <Button
          additionalClassName={styles.button}
          title="Close"
          type="button"
          onClick={toggle}
        />
      </div>
    </div>
  );
}
