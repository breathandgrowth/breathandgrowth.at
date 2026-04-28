import type { Template } from "tinacms";
import { wrapWithLanguages } from "../helpers";
import HeadingTemplate from "../Heading/HeadingTemplate";
import ImageTemplate from "../Image/ImageTemplate";
import SlideshowTemplate from "../Slideshow/SlideshowTemplate";
import FormTemplate from "../Form/FormTemplate";
import { MarginField } from "../fields";

const fields: Template["fields"] = [
  {
    name: "items",
    label: "Grid Type",
    type: "object",
    list: true,
    fields: [
      {
        name: "content",
        label: "Content",
        type: "rich-text",
        templates: [
          HeadingTemplate("forRichTextRendering"),
          ImageTemplate("forRichTextRendering"),
          SlideshowTemplate("forRichTextRendering"),
          FormTemplate("forRichTextRendering"),
        ],
        toolbarOverride: ["embed"],
      },
    ],
    ui: {
      itemProps: (item: any) => {
        const label =
          item?.content?.children?.[0]?.children?.[0]?.text ||
          item?.content?.children?.[0]?.text ||
          (typeof item?.gridItem === "string" ? item.content : undefined) ||
          "Grid item";

        return { label };
      },
    },
  },
  MarginField,
  {name: "fullWidth", label: "Full Width Grid", type: "boolean"},
];

export default {
  name: "Grid",
  label: "Grid",
  fields: wrapWithLanguages(fields),
};
