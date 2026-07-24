import { Suspense } from "react";

import type { ComponentType, LazyExoticComponent } from "react";

type Props = {
  fallback?: React.ReactNode;
};

export function lazyWrapper(
  Component: LazyExoticComponent<ComponentType>,
  props?: Props
) {
  return (
    <Suspense fallback={props?.fallback ?? <div>Loading...</div>}>
      <Component />
    </Suspense>
  );
}