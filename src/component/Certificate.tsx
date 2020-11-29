import { Box, Image, Link, Skeleton } from "@chakra-ui/react";
import React, { Ref, useCallback, useEffect, useRef, useState } from "react";
import { useAsync } from "react-async-hook";
import {
  fetchCourseraImage,
  resolveCertificateIdAndIssuer,
} from "../service/certificate";
import { usePrintModeAs } from "../hook/usePrintMode";

// fix for white image margins
function useCourseraImageMarginFix(): [Ref<HTMLImageElement>, string, string] {
  const [actualWidth, setActualWidth] = useState<string>("0px");
  const [marginLeft, setMarginLeft] = useState("0px");
  const ref = useRef<HTMLImageElement>(null);
  const updateObjectPosition = useCallback(() => {
    const { current } = ref;
    if (current && !current.onload) {
      current.onload = updateObjectPosition;
    }
    const width = current?.offsetWidth;
    if (!width) {
      setTimeout(updateObjectPosition, 100);
      return;
    }
    const margin = Math.round(width * 0.16);
    setActualWidth(`${width - margin * 2}px`);
    setMarginLeft(`-${margin}px`);
  }, [ref]);
  useEffect(updateObjectPosition, [updateObjectPosition]);
  return [ref, actualWidth, marginLeft];
}

function CourseraCertificate({
  id,
  fallback,
}: {
  id: string;
  fallback: React.ReactElement;
}): JSX.Element | null {
  const { loading, result: image } = useAsync(fetchCourseraImage, [id]);
  const [ref, actualWidth, marginLeft] = useCourseraImageMarginFix();
  if (loading) {
    return fallback;
  }
  if (!image) {
    return null;
  }
  return (
    <Box overflow="hidden" w={actualWidth}>
      <Image
        ref={ref}
        maxWidth="400px"
        ml={marginLeft}
        maxHeight="200px"
        fallback={fallback}
        src={image}
        alt={`Certificate image for Coursera:${id}`}
      />
    </Box>
  );
}

export default function DigitalCertificateComponent({
  link,
}: {
  link: string;
}): JSX.Element | null {
  const printFix = usePrintModeAs("md");
  const certificate = resolveCertificateIdAndIssuer(link);
  if (!certificate) {
    return null;
  }
  const [id, issuer] = certificate;

  const props = {
    id,
    fallback: <Skeleton height="200px" maxWidth="300px" width="100%" />,
  };

  return (
    <Link
      mt={printFix({ base: 4, md: 0 })}
      justifySelf={printFix({ base: "center", md: "flex-end" })}
      href={link}
      target="_blank"
    >
      {issuer === "coursera" ? <CourseraCertificate {...props} /> : undefined}
    </Link>
  );
}
