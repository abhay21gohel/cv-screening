import { Button, Center, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import JobDescriptionBox from "../Compontents/JobDescriptionBox";
import { initFlowbite } from "flowbite";
import UploadCVsBox from "../Compontents/UploadCVsBox";
import { FaUpload } from "react-icons/fa";
import { MdOutlineSavedSearch } from "react-icons/md";

const UploadCvs = () => {
  const [description, setDescription] = useState(null);
  const [CVs, setCVs] = useState([]);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <div>
      <section className="text-white body-font">
        <div className="container px-5 md:px-32 py-20 mx-auto">
          <div className="flex flex-col text-center w-full mb-8">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-mainColor">
              Add New Candidates
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Choose a role for CV evaluation from current Jobs
            </p>
          </div>
          <div className="flex lg:w-2/3 w-full flex-col mx-auto gap-5 px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-center relative">
            <button
              id="dropdownHoverButton"
              data-dropdown-toggle="dropdownHover"
              data-dropdown-trigger="hover"
              className="text-white bg-mainColor hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
              type="button"
            >
              Frontend Devloper
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdownHover"
              className="z-10 hidden bg-backGround text-mainColor divide-y divide-lightBackGround rounded-lg shadow w-44 dark:bg-gray-700 absolute top-full mt-2"
            >
              <ul
                className="py-2 text-sm "
                aria-labelledby="dropdownHoverButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-lightBackGround dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Backend Devloper
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-lightBackGround dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Cloud Engineer
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-lightBackGround dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Ml Engineer
                  </a>
                </li>
              </ul>
            </div>

            <JobDescriptionBox setDescription={setDescription}>
              <Button colorScheme="green" variant="link">
                .. or paste new Job Description
              </Button>
            </JobDescriptionBox>
            <Center gap={3} flexDir="column">
              <Button
                leftIcon={<FaUpload />}
                colorScheme="whiteAlpha"
                onClick={onOpen}
              >
                Upload new CVs
              </Button>
              <Button
                colorScheme="green"
                p={6}
                className="flex justify-center flex-col"
                // onClick={handleAnalyse}
              >
                <span>Analyze</span>
                <span className="text-xs">(10 Tokens)</span>
              </Button>
            </Center>
          </div>
        </div>
      </section>

      <UploadCVsBox
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        CVs={CVs}
        setCVs={setCVs}
      />
    </div>
  );
};

export default UploadCvs;
