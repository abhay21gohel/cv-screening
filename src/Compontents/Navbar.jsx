import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logInUser, logoutUser } from "../../APIS/apis";
import { fetchUser, logoutUserRequest } from "../../State/User/userAction";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../Firebase/firebase";
import { useToast } from "@chakra-ui/react";

const Navbar = () => {
  const { data: user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    logoutUser();
    dispatch(logoutUserRequest());
    navigate("/");
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
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
          setLoading(false);
        } catch (error) {
          setLoading(false);

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
        setLoading(false);

        toast({
          title: "Failed to continue with Google.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "bottom-left",
        });
      });
  };

  return (
    <div className="">
      <nav className="bg-gray-900 border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            {/* <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="CV Screener Logo"
            /> */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              CV Screener
            </span>
          </Link>
          <div className="flex  items-center  md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {user ? (
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={user?.image}
                  alt="user photo"
                />
              </button>
            ) : (
              <button
                disabled={loading}
                onClick={() => {
                  handleGoogleLogin();
                }}
                type="button"
                className="text-white bg-mainColor hover:bg-mainColor/90 focus:ring-4 focus:outline-none focus:ring-mainColor/55 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  me-2 mb-2"
              >
                <svg
                  className="w-4 h-4 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 19"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                    clip-rule="evenodd"
                  />
                </svg>
                Sign in with Google
              </button>
            )}

            {user && (
              <div
                className={`z-50 hidden
                }  my-4 text-base list-none bg-gray-700 divide-y divide-gray-600 rounded-lg shadow`}
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-mainColor">
                    {user?.name}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 hover:text-white"
                    >
                      Support Request
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/billing"}
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 hover:text-white"
                    >
                      Billing
                    </Link>
                  </li>

                  <li>
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                      }}
                      className="block px-4 py-2 text-sm text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      Log out
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            {/* hamburger */}
            {user && (
              <button
                data-collapse-toggle="navbar-user"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                aria-controls="navbar-user"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* links */}
          {user && (
            <div
              className="items-center  justify-between hidden w-full md:flex md:w-auto md:order-1 md:ml-auto md:mr-4"
              id="navbar-user"
            >
              <ul className="flex flex-col  md:items-center  font-medium p-2 md:p-0 gap-2 mt-4 border border-gray-700 rounded-lg bg-gray-800 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-900">
                <li>
                  <Link
                    to={"/jobs"}
                    className="block py-2  px-3 text-white bg-mainColor rounded md:bg-transparent md:text-mainColor md:p-0"
                    aria-current="page"
                  >
                    Jobs
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/upload-new-cvs"}
                    className=" py-2  px-3  text-white bg-mainColor rounded md:bg-transparent md:text-mainColor md:p-0 hidden md:block"
                    aria-current="page"
                  >
                    <button
                      type="button"
                      className="text-mainColor relative flex flex-col items-center justify-center hover:text-white border border-mainColor hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 pt-2.5 pb-5  text-center  "
                    >
                      Upload New CVs
                      <span className=" absolute text-xs bottom-1  text-white">
                        10 Tokens
                      </span>
                    </button>
                  </Link>
                  <Link
                    to={"/upload-new-cvs"}
                    className="block relative py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500 md:p-0 md:hidden"
                    aria-current="page"
                  >
                    Upload New CVs
                    <span className="absolute right-2 text-sm text-mainColor">
                      10 Tokens
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
