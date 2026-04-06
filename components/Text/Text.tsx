import { tinaField } from "tinacms/dist/react";
import type { PageBlocksTextEn } from "../../tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import components from "../../tina/components";

export default function Text(props: PageBlocksTextEn) {
  return (
    <div
      data-tina-field={tinaField(props, "text")}
      style={{ whiteSpace: "pre-line" }}
    >
      <TinaMarkdown content={props.text} components={components} />
    </div>
  );
}
