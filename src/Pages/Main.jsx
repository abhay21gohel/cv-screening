import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { MdContentPaste, MdContentPasteGo } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { TypeAnimation } from "react-type-animation";
import { auth, provider } from "../../Firebase/firebase";
import { logInUser } from "../../APIS/apis";
import { fetchUser } from "../../State/User/userAction";
import { useNavigate } from "react-router-dom";
import JobDescriptionBox from "../Compontents/JobDescriptionBox";
import UploadCVsBox from "../Compontents/UploadCVsBox";

const Main = () => {
  const { data: user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [description, setDescription] = useState(null);
  const [CVs, setCVs] = useState([]);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleGoogleLogin = async () => {
    await signInWithPopup(auth, provider)
      .then(async (result) => {
        try {
          const data = {
            email: result.user.email,
            name: result.user.displayName,
            image: result.user.photoURL,
          };

          localStorage.setItem("userInfo", JSON.stringify(data));
          logInUser(data);
          await dispatch(fetchUser());

          toast({
            title: `Welcome ${data?.name}`,
            description: "Log in Successfully.",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "bottom-left",
          });
        } catch (error) {
          toast({
            title: "Failed to connect with Google.",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "bottom-left",
          });
        }
      })
      .catch(async (error) => {
        toast({
          title: "Failed to continue with Google.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "bottom-left",
        });
      });
  };
  const handleAnalyse = async () => {
    if (!user) {
      await handleGoogleLogin();
    }
    if (!description) {
      toast({
        title: "Please Enter Job Description.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
    if (!CVs.length > 1) {
      toast({
        title: "Please Upload Atleast 1 CV.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }

    // api call from backend
    navigate("/candidates-for-role/role", { state: { description, CVs } });
  };
  return (
    <div className="">
      <section className="text-white body-font">
        <div className="container mx-auto flex md:px-24 px-5 py-12  md:flex-row flex-col items-center  ">
          <div className="lg:max-w-lg relative lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              className="object-cover object-center rounded "
              alt="hero"
              src="/hero_vector.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-r  to-transparent"></div>
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center  ">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              <span className="text-2xl sm:text-3xl">
                Unlock the Perfect Match:
              </span>
              <br className="" />
              <span className="text-mainColor">AI-Powered</span> CV Screening
              for <br />
              <TypeAnimation
                sequence={[
                  "Effortless Hiring,",
                  1000,
                  "Smarter Recruitment,",
                  1000,
                  " Faster Hiring",
                  1000,
                ]}
                speed={20}
                repeat={Infinity}
                className="text-3xl sm:text-[40px]"
              />
            </h1>

            <div className="flex justify-center my-6 gap-5">
              <JobDescriptionBox setDescription={setDescription}>
                <Button
                  
                  leftIcon={<MdContentPaste />}
                  colorScheme="whiteAlpha"
                >
                  Paste Description
                </Button>{" "}
              </JobDescriptionBox>
              <Button
                leftIcon={<FaUpload />}
                colorScheme="whiteAlpha"
                onClick={onOpen}
              >
                Upload CVs
              </Button>
            </div>
            <div className="flex justify-center">
              <Button
                colorScheme="green"
                p={6}
                className="flex justify-center flex-col"
                onClick={handleAnalyse}
              >
                <span className="">Analyze</span>
                <span className=" text-xs  ">(10 Tokens)</span>
              </Button>
            </div>
          </div>
        </div>
        <UploadCVsBox
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          CVs={CVs}
          setCVs={setCVs}
        />
      </section>
    </div>
  );
};

export default Main;
