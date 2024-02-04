"use client";

import { navOptions } from "@/utils/links";
import {
    useState,
    useContext,
    useEffect,
} from "react";
import Link from "next/link";
import {
    useRouter,
    usePathname,
} from "next/navigation";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context";
import { logger } from "@/utils/logger";
import Cookies from "js-cookie";
import LoginModal from "../Modal/LoginModal";
import { Button } from "react-bootstrap";

function NavItems(props: any) {
    const { isModalView, router } =
        props;

    useEffect(() => {
        logger.info(
            `Common Modal {isModalView}: ${isModalView}`
        );
    }, []);

    return (
        <div
            className={`items-center justify-between w-full md:flex md:w-auto ${
                isModalView
                    ? ""
                    : "hidden"
            }`}
            id="nav-items"
        >
            <ul
                className={`flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 ${
                    isModalView
                        ? "border-none"
                        : "border-white"
                }`}
            >
                {navOptions.map(
                    (item) => (
                        <li
                            className="cursor-pointer block py-2 pl-3 pr-4 text-white rounded md:p-0"
                            key={
                                item.id
                            }
                            onClick={() =>
                                router.push(
                                    item.path
                                )
                            }
                        >
                            {item.label}
                        </li>
                    )
                )}
            </ul>
        </div>
    );
}

export default function Navbar() {
    const [showModal, setShowModal] =
        useState(false);
    const context = useContext(
        GlobalContext
    );

    if (context === null) {
        logger.error("No context");
        return null;
    }

    const {
        showNavModal,
        setShowNavModal,
        isAuth,
        setIsAuth,
    } = context;

    const pathName = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("user");
        Cookies.remove("token");
        setIsAuth(false);
    };

    return (
        <nav className="bg-gray-700 fixed w-full z-20 top-0 border-b border-white">
            <div className="flex flex-wrap items-center justify-between p-2 lg:p-6 w-full">
                <div
                    className="flex items-center cursor-pointer"
                    onClick={() =>
                        router.push("/")
                    }
                >
                    <span className="self-center text-xl lg:text-2xl font-semibold whitespace-nowrap">
                        Ruin Manga
                    </span>
                </div>
                <Button
                    onClick={() =>
                        setShowModal(
                            true
                        )
                    }
                    variant="success"
                >
                    Login 
                </Button>
                <LoginModal
                    showModal={
                        showModal
                    }
                    handleCloseModal={() =>
                        setShowModal(
                            false
                        )
                    }
                />
                <div className="flex flex-row md:order-2 gap-4">
                    {isAuth ? (
                        <Link
                            href="/"
                            onClick={
                                handleLogout
                            }
                        >
                            LogOut
                        </Link>
                    ) : (
                        <Link href="/login">
                            Login
                        </Link>
                    )}
                </div>
                <button
                    data-collapse-toggle="navbar-sticky"
                    type="button"
                    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100
                    focus:outline-none focus:cursor-pointer"
                    aria-controls="navbar-sticky"
                    aria-expanded="false"
                    onClick={() =>
                        setShowNavModal(
                            (prv) =>
                                !prv
                        )
                    }
                >
                    <span className="sr-only">
                        Open Main Menu
                    </span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
                <NavItems
                    router={router}
                />
            </div>
            <CommonModal
                showModalTitle={false}
                mainContent={
                    <NavItems
                        isModalView={
                            true
                        }
                        router={router}
                    />
                }
                show={showNavModal}
                setShow={
                    setShowNavModal
                }
            />
        </nav>
    );
}
