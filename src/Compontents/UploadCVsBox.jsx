import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Center,
  useToast,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Progress,
  Tooltip,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const fileTypes = ["PDF"];

const UploadCVsBox = ({ isOpen, onClose, onOpen, CVs, setCVs }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { data: user } = useSelector((state) => state.user);
  const [tempCvs, setTempCvs] = useState([]);

  const [errors, setErrors] = useState({
    files: "",
  });

  const [flags, setFlags] = useState({
    files: false,
  });

  const [fileProcess, setFileProcess] = useState(0);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);

  const addFiles = async () => {
    setLoading(true);

    if (files.length === 0) {
      setFlags({ ...flags, files: true });
      setErrors({ ...errors, files: "Please upload at least one file." });
      setLoading(false);
      return;
    }

    try {
      const uploadPromises = files?.map(async (file) => {
        await handleUpload(file);
      });

      await Promise.all(uploadPromises);

      setLoading(false);
      setFiles([]);
      setFileNames([]);
      setFlags({ files: false });
      setErrors({ files: "" });

      onClose();
    } catch (error) {
      setLoading(false);
      console.error("Error uploading files:", error);
    }
  };

  const handleChange = (e) => {
    if (e.target.files.length > 10) {
      setFlags({ ...flags, files: true });
      setErrors({ ...errors, files: "Maximum 10 CVs are allowed." });
      setLoading(false);
      return;
    }
    const selectedFiles = Array.from(e.target.files);
    const selectedFileNames = Array.from(selectedFiles).map(
      (file) => file.name
    );

    setFiles(selectedFiles);
    setFileNames(selectedFileNames);
    setFlags({ files: false });
    setErrors({ files: "" });
  };

  const handleUpload = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const fileName = file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFileProcess(Number(progress.toFixed(2)));
        },
        (error) => {
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setCVs((cvs) => {
              return [...cvs, { downloadURL, name: fileName }];
            });

            resolve();
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  };

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="10%"
      backdropBlur="2px"
    />
  );
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);

  return (
    <div>
      <Modal
        isCentered
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={() => {
          setFiles([]);
          setFileNames([]);
          setFlags({ files: false });
          setErrors({ files: "" });
          setLoading(false);
          setTempCvs([]);

          onClose();
        }}
        size={{ base: "sm", md: "md" }}
      >
        {overlay}

        <ModalContent bg={"gray.lightBackGround"} color={"white"}>
          <ModalHeader>
            {CVs?.length > 0 ? "Already Uploaded CVs" : "Upload CVs"}
          </ModalHeader>

          {!loading && <ModalCloseButton />}
          <ModalBody pb={4}>
            <Box p={4} borderRadius="lg" borderWidth="1px">
              {!CVs?.length > 0 ? (
                <FormControl
                  mt={2}
                  id="files"
                  isRequired
                  isInvalid={flags.files}
                >
                  <Tooltip
                    hasArrow
                    label="Upload PDFs of CVs"
                    bg="gray.mainColor"
                  >
                    <div className="mt-2 w-full  text-center items-center flex-col justify-center">
                      <FormHelperText mb={2}>
                        {files.length > 0 && files.length < 11 ? (
                          <div className="flex flex-col text-left items-start justify-start">
                            {fileNames?.map((name, index) => {
                              return (
                                <Text w={"100%"} color={"gray.mainColor"} noOfLines={2}>
                                  {index + 1}. {name}
                                </Text>
                              );
                            })}
                          </div>
                        ) : (
                          <span className="text-red-500">{errors.files}</span>
                        )}
                      </FormHelperText>
                      <label htmlFor="fileInput">
                        <Button
                          as="span"
                          variant="outline"
                          colorScheme="green"
                          size="sm"
                          disabled={loading}
                        >
                          Browse
                        </Button>
                      </label>
                      <input
                        id="fileInput"
                        type="file"
                        accept=".pdf"
                        multiple
                        style={{ display: "none" }}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>
                  </Tooltip>
                </FormControl>
              ) : (
                <div>
                  {CVs?.map((cv, index) => {
                    return (
                      <Text color={"gray.mainColor"}>
                        {index + 1}. {cv?.name}
                      </Text>
                    );
                  })}
                </div>
              )}

              {files.length > 0 && loading && (
                <Progress mt={4} value={fileProcess} />
              )}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Center>
              {CVs?.length > 0 ? (
                <Button
                  colorScheme="red"
                  onClick={() => {
                    setCVs([]);
                    setTempCvs([]);
                  }}
                  isLoading={loading}
                  mr={3}
                >
                  <span className="">Clear All</span>
                </Button>
              ) : (
                <Button
                  colorScheme="green"
                  onClick={addFiles}
                  isLoading={loading}
                  mr={3}
                >
                  <span className="">Upload</span>
                </Button>
              )}
            </Center>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UploadCVsBox;
