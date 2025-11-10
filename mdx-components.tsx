import type { MDXComponents } from "mdx/types";
import type { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: (
      props: DetailedHTMLProps<
        AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
      >
    ) => {
      const href = props.href || "";
      const isExternal =
        href.startsWith("http://") || href.startsWith("https://");

      if (isExternal) {
        return <a {...props} target="_blank" rel="noopener" />;
      }

      return <a {...props} />;
    },
  };
}
