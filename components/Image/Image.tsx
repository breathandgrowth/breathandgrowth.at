import type { PageBlocksImageEn } from "../../tina/__generated__/types";
import NextImage from "next/image";
import { Box, AspectRatio, Flex, Container } from "@radix-ui/themes";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import components from "../../tina/components";
import placeholders from "../placeholders";
import { TinaEditContext } from "../../utils/context/tina";
import { useContext, useRef } from "react";
import type { TextPosition } from "./ImageTemplate";
import { allowedAspectRatios } from "../../constants/aspectRatios";
import Link from "next/link";

const aspectRatioMap: Record<(typeof allowedAspectRatios)[number], number> = {
  "16/9": 16 / 9,
  "4/3": 4 / 3,
  "1/1": 1,
  "3/4": 3 / 4,
  "5/1": 5 / 1,
};

export default function Image(
  props: PageBlocksImageEn & {
    hideImage?: boolean;
    fallbackHref?: string;
  }
) {
  const aspectRatioRef = useRef<HTMLDivElement>(null);
  const { isEditable } = useContext(TinaEditContext);

  // Disable link rendering in TinaMarkdown when fallbackHref exists to avoid nested <a> tags
  const markdownComponents = props.fallbackHref
    ? {
        ...components,
        a: (props: any) => {
          // Just render the text without a link
          return <>{props?.children}</>;
        },
      }
    : components;

  const imageContent = (
    <Box
      position="relative"
      mt={props.margin?.top ?? "0"}
      mb={props.margin?.bottom ?? "0"}
      mr={props.margin?.right ?? "0"}
      ml={props.margin?.left ?? "0"}
    >
      <AspectRatio
        ref={aspectRatioRef}
        ratio={aspectRatioMap[(props as any).aspectRatio] ?? 16 / 9}
        data-tina-field={isEditable ? tinaField(props, "image") : undefined}
        style={{ overflow: "hidden" }}
      >
        {!props.hideImage && (
          <NextImage
            src={
              props.image && props.image !== ""
                ? props.image
                : placeholders.image
            }
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1280px) 92vw, 1200px'
            alt={props.alt || "Image content"}
            role={!props.alt ? "presentation" : undefined}
            style={{
              maxWidth: "100%",
              objectFit: "cover",
            }}
          />
        )}

        {(props.textPosition as TextPosition) !== "underneath" && (
          <Flex
            position="absolute"
            inset="0"
            p={
              props.textPosition === "hero-inset"
                ? { initial: "2", md: "9" }
                : "0"
            }
            style={{ zIndex: 1 }}
            align={
              (props.textPosition as TextPosition) !== "center"
                ? (props.textPosition as TextPosition) === "half-way"
                  ? "center"
                  : undefined
                : "center"
            }
            justify={
              (props.textPosition as TextPosition) !== "center"
                ? (props.textPosition as TextPosition) === "half-way"
                  ? "start"
                  : undefined
                : "center"
            }
          >
            <Box mx="4">
              <div
                data-tina-field={
                  isEditable ? tinaField(props, "text") : undefined
                }
                style={{
                  color: props.whiteTextOverlay
                    ? "var(--color-background)"
                    : "var(--gray-12)",
                  textAlign: (props.align as any) || "left",
                }}
              >
                <TinaMarkdown
                  content={props.text}
                  components={markdownComponents}
                />
              </div>
            </Box>
          </Flex>
        )}
      </AspectRatio>
      {(props.textPosition as TextPosition) === "underneath" && (
        <Box
          pt="4"
          style={{
            height: "fit-content",
            maxWidth: aspectRatioRef.current?.offsetWidth,
            textAlign: (props.align as any) || "left",
          }}
        >
          <div
            data-tina-field={isEditable ? tinaField(props, "text") : undefined}
            style={{
              color: props.whiteTextOverlay ? "white" : "var(--text-12)",
            }}
          >
            <TinaMarkdown
              content={props.text}
              components={markdownComponents}
            />
          </div>
        </Box>
      )}
    </Box>
  );

  return props.fallbackHref ? (
    <Link href={props.fallbackHref}>{imageContent}</Link>
  ) : (
    imageContent
  );
}