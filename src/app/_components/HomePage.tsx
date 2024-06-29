"use client"
import { Button, Link, Spacer, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import { Check, X, Shield, Link as AppLink, BookOpen ,Codepen} from 'react-feather';


export function HomePage() {
    return (<div>
        <section className="bg-white dark:bg-gray-900">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight md:text-5xl xl:text-6xl dark:text-white"> <AppLink size={40} /> DevStartLink</h1>
                    <h2 className="max-w-2xl mb-4 text-2xl font-bold tracking-tight leading-none md:text-3xl xl:text-3xl dark:text-white">Collaboration tool for Startup Founders and Developers</h2>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-500">Platform to stay connected and build dreams</p>
                    <div className="inline-flex rounded-md shadow-sm">
                        <Button as={Link} size="lg" variant="ghost" color="primary" href="/auth" startContent={<Codepen size={25} />}>
                            Get started
                        </Button>
                        <Spacer x={2} y={0} />
                        <Button as={Link} size="lg" variant="ghost" color="secondary" href="/docs" startContent={< BookOpen size={25} />}>
                            User Guide
                        </Button>
                    </div>
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <Image width={500}
                        alt="StartDevLink hero Image"
                        src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop" ></Image>
                </div>
            </div>
        </section>
        <section className="bg-white dark:bg-gray-900">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <Image width={500}
                        alt="StartDevLink Security Image"
                        src="https://images.unsplash.com/photo-1495714096525-285e85481946?q=80&w=2070&auto=format&fit=crop" ></Image>
                </div>
                <div className="ml-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight md:text-5xl xl:text-6xl dark:text-white"> <Shield size={40} /> Security and Privacy</h1>
                    <h2 className="max-w-2xl mb-4 text-2xl font-bold tracking-tight leading-none md:text-3xl xl:text-3xl dark:text-white">Security and Privacy by Design</h2>
                    <div className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-500"><Table aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn>Data Collected</TableColumn>
                            <TableColumn>Purpose</TableColumn>
                            <TableColumn>Required</TableColumn>
                        </TableHeader>
                        <TableBody>
                            <TableRow key="1">
                                <TableCell>Developer Interest</TableCell>
                                <TableCell>We capture developer interests to help your project to have some statistics to make decision </TableCell>
                                <TableCell><Check size={20} /></TableCell>
                            </TableRow>
                            <TableRow key="2">
                                <TableCell>Project High level Details</TableCell>
                                <TableCell>We Require High level Details like

                                    <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                        <li>
                                            Budget
                                        </li>
                                        <li>
                                            Timeline
                                        </li>
                                        <li>
                                            High Level description of Project or Product
                                        </li>
                                        <li>
                                            A Google Form Url created by you for interested developers to Contact You.
                                        </li>
                                    </ul>
                                </TableCell>
                                <TableCell><Check size={20} /></TableCell>
                            </TableRow>
                            <TableRow key="4">
                                <TableCell>Project specific Details</TableCell>
                                <TableCell>we do not require Project specific Details as it can be sensitive and only developers selected by you should know</TableCell>
                                <TableCell>< X size={20} /></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    </div>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-500">For more details please refer to the user guide 
                    <Spacer x={2} y={2} />
                        <Button as={Link} size="sm" variant="ghost" color="secondary" href="/docs" startContent={< BookOpen size={15} />}>
                            User Guide
                        </Button> </p>
                </div>
            </div>
        </section>
    </div>


    )
}