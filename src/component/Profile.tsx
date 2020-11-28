import {
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import ReactMarkdown from "react-markdown";
import Profile, { Social } from "../model/profile";
import socialDefaultProps from "../service/social";
import { usePrintModeAs } from "../hook/usePrintMode";

function SocialComponent({
  name,
  social,
}: {
  name: string;
  social: string | Social | undefined;
}): JSX.Element {
  if (!social) {
    return <></>;
  }
  const defaultProps = socialDefaultProps(name, social);
  if (!defaultProps) {
    return <></>;
  }
  const { link, label, color } =
    typeof social === "string"
      ? defaultProps
      : {
          ...defaultProps,
          ...social,
        };
  return (
    <Button
      as="a"
      mt={2}
      mx={{ base: 2, md: 0 }}
      rightIcon={
        typeof defaultProps.icon === "string" ? (
          <Image src={defaultProps.icon} />
        ) : (
          <Icon as={defaultProps.icon} />
        )
      }
      colorScheme={color}
      href={link}
      target="_blank"
    >
      {label}
    </Button>
  );
}

export default function ProfileComponent({
  email,
  phone,
  coverLetter,
  location,
  name,
  picture,
  socials,
  darkModeToggle,
}: Profile & { darkModeToggle: React.ReactElement }): JSX.Element {
  const printFix = usePrintModeAs("md");
  return (
    <Grid
      templateColumns={printFix({
        base: "1fr",
        md: "max-content auto max-content",
      })}
      columnGap={8}
      alignItems="center"
      w="100%"
    >
      <Image
        justifySelf="center"
        w={printFix({ base: 100, sm: 150, md: 200 })}
        src={picture}
        borderRadius="full"
        alt={`${name}'s profile picture`}
      />
      <VStack px={2} maxWidth="100vw" align="left">
        <Heading
          as="h1"
          colorScheme="gray"
          textAlign={printFix({ base: "center", md: "left" })}
          isTruncated
        >
          {name} {darkModeToggle}
        </Heading>
        {location && (
          <Heading
            as="h4"
            fontSize="lg"
            fontWeight="regular"
            colorScheme="gray"
            textAlign={printFix({ base: "center", md: "left" })}
            isTruncated
          >
            {location}
          </Heading>
        )}
        {email && (
          <Heading
            textAlign={printFix({ base: "center", md: "left" })}
            as="h5"
            fontFamily="monospace"
            fontSize="sm"
            fontWeight="light"
            colorScheme="black"
            isTruncated
          >
            {email}
          </Heading>
        )}
        {phone && (
          <Heading
            textAlign={printFix({ base: "center", md: "left" })}
            as="h5"
            fontFamily="monospace"
            fontSize="sm"
            fontWeight="light"
            colorScheme="black"
            isTruncated
          >
            {phone}
          </Heading>
        )}
        <Text
          textAlign={printFix({ base: "center", md: "left" })}
          as="h6"
          isTruncated
        >
          <ReactMarkdown className="markdown">{coverLetter}</ReactMarkdown>
        </Text>
      </VStack>
      <Flex
        wrap="wrap"
        direction={printFix({ base: "row", md: "column" })}
        mt={6}
        justifyContent={printFix({
          base: "space-between",
          sm: "center",
          md: "flex-end",
        })}
      >
        {Object.entries(socials).map(([socialName, detail]) => (
          <SocialComponent key={socialName} name={socialName} social={detail} />
        ))}
      </Flex>
    </Grid>
  );
}
