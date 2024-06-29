'use client'
import { Divider } from "@nextui-org/react";
import { AppNavBar } from "../_components/AppNavBar";
import { LogIn, Codepen, Edit, FileText, Search , Link as AppLink , Info} from 'react-feather';

export default function DocsBoard() {

    return (
        <div>
            <AppNavBar />
            <section className="bg-white ">
                <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                    <div className="max-w-screen-md mb-8 lg:mb-16">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 "> <AppLink size={25 }/>Designed for Founders like you</h2>
                        <p className="text-gray-700 sm:text-xl "> <Info size={25} /> Here are the Steps</p>
                    </div>
                    <div className="space-y-8 grild grid-cols-2 md:gap-12 md:space-y-0">
                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                <LogIn size={25} />
                            </div>
                            <h3 className="mb-2 text-xl font-bold ">Login with Google</h3>
                            <p className="text-gray-700 ">Login with Google to Get Started</p>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                <Codepen size={25} />
                            </div>
                            <h3 className="mb-2 text-xl font-bold ">Create a Project</h3>
                            <p className="text-gray-700 ">Click on GetStarted Button</p>
                        </div>

                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                <FileText size={25} />
                            </div>
                            <h3 className="mb-2 text-xl font-bold ">Fill in the details</h3>
                            <p className="text-gray-700 ">Just key in your details with the google forms url in the description. We use unsplash to generate Image so you don't need to fret </p>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                <Edit size={25} />
                            </div>
                            <h3 className="mb-2 text-xl font-bold ">Basic Create, Read , Write , Delete for your posts</h3>
                            <p className="text-gray-700 ">If you don't like the image, you can always edit or if you are satisfied or no longer require the project you can always delete</p>
                        </div>
                    </div>
                </div>
            </section>
            <Divider />
            <section className="bg-white">
                <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                    <div className="max-w-screen-md mb-8 lg:mb-16">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 "> <AppLink size={25 }/> Connect to Devs like you</h2>
                        <p className="text-gray-700 sm:text-xl "> <Info size={25} /> Here are the Steps</p>
                    </div>
                    <div className="space-y-8 grild grid-cols-2 md:gap-12 md:space-y-0">
                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                <LogIn size={25} />
                            </div>
                            <h3 className="mb-2 text-xl font-bold ">Login with Google</h3>
                            <p className="text-gray-700 ">Login with Google to Get Started</p>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                <Search size={25} />
                            </div>
                            <h3 className="mb-2 text-xl font-bold ">Find a Project</h3>
                            <p className="text-gray-700 ">Find an interesting Project and go to the google Form provided to collaborate with the founder</p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}