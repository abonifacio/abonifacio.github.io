import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { InputDataModal } from "../hook/useInputData";

export default function InputMissingData(): JSX.Element {
  const { hide: onClose, data, onChange, showing } = useContext(InputDataModal);
  const [email, setEmail] = useState(data.email || "");
  const [phone, setPhone] = useState(data.phone || "");
  const initialRef = React.useRef<HTMLInputElement>(null);
  return (
    <Modal initialFocusRef={initialRef} isOpen={showing} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onChange({ email, phone });
            onClose();
          }}
        >
          <ModalHeader>Complete your contact info</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ref={initialRef}
                placeholder="johndoe@gmail.com"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Phone</FormLabel>
              <Input
                type="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+99999999"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button type="submit" colorScheme="blue" mr={3}>
              Complete
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
