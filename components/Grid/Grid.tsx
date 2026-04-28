import { tinaField } from "tinacms/dist/react";
import type {
  PageBlocksGridEn,
  PageBlocksGridEnItems,
} from "../../tina/__generated__/types";
import { Grid as RadixGrid, Container } from "@radix-ui/themes";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import components from "../../tina/components";
import { TinaEditContext } from "../../utils/context/tina";

export default function Grid(props: PageBlocksGridEn) {
  if (!props.items || props.items.length === 0) {
    return null;
  }

  return (
    <TinaEditContext.Provider value={{ isEditable: false }}>
      <Container
        px={{ initial: "4" }}
        mt={props.margin?.top ?? "0"}
        mb={props.margin?.bottom ?? "0"}
        mr={props.margin?.right ?? "0"}
        ml={props.margin?.left ?? "0"}
      >
        <RadixGrid columns={props.fullWidth ? "1" : { initial: "1", md: "2" }} gap={"4"}>
          {(props.items as PageBlocksGridEnItems[]).map((item, i) => {
            return (
              <div key={i} data-tina-field={tinaField(item)}>
                <TinaMarkdown content={item.content} components={components} />
              </div>
            );
          })}
        </RadixGrid>
      </Container>
    </TinaEditContext.Provider>
  );
}
