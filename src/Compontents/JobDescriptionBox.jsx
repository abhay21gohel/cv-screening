import {
  Button,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Text,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { MdContentPaste, MdDelete } from "react-icons/md";
import { db } from "../../Firebase/firebase";
import axios from "axios";

const JobDescriptionBox = ({ description, setDescription, children }) => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="10%"
      backdropBlur="2px"
    />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalClose = () => {
    onClose();
  };

  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const [content, setContent] = useState(description);
  const toast = useToast();

  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    setContent(inputValue);
  };

  const handleConfirm = async () => {
    if (!content) {
      toast({
        title: "Please enter minimum 50 words.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
    const words = content?.split(/\s+/);
    if (words?.length < 50) {
      toast({
        title: "Minimum 50 words required.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
    } else {
      setDescription(content);
      await handleDescription();

      modalClose();
    }
  };

  const handleDescription = async () => {
    try {
      const {data} = await axios.post(
        "https://cvscreening-e5765-default-rtdb.firebaseio.com/jobDescription.json",
        { jobDescriptin: content }
      );
      toast({
        title: "Job Description uploaded Successfully.",
        description:data?.name,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Job Description not uploaded.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <div
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        {children}
      </div>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={() => {
          modalClose();
        }}
      >
        {overlay}
        <ModalContent bg={"gray.lightBackGround"} color={"white"}>
          <ModalHeader>Enter Job Description</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              rows="17"
              value={content}
              onChange={handleInputChange}
              placeholder="Please insert your job description here, outlining the essential aspects such as responsibilities, deliverables, qualifications, and required skills. Focus on capturing the core of the role without worrying about formatting or structure."
              size="sm"
            />
          </ModalBody>
          <ModalFooter>
            <Stack spacing={4} direction="row" align="center" justify="right">
              <Button
                colorScheme="green"
                className="flex justify-center flex-col"
                onClick={handleConfirm}
              >
                <span className="">Confirm</span>
              </Button>
              <Button
                onClick={() => {
                  setDescription(null);
                  setContent("");
                }}
                colorScheme="red"
              >
                <MdDelete />
              </Button>
              <Button onClick={modalClose} colorScheme="red">
                Cancel
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default JobDescriptionBox;
