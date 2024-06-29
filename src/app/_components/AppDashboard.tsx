import { Input, Button, Link, Spacer, Card, CardBody, CardFooter, Image, Progress } from "@nextui-org/react";
import { useState } from "react";
import { Codepen } from "react-feather";
import { api } from "~/trpc/react";
import { Edit3 } from 'react-feather';




export function AppDashBoard() {

    const [searchText, setsearchText] = useState("");
    const { data: projectList, isLoading } = api.post.getProjects.useQuery({});
    const filteredData = projectList?.filter((el) => {
        return el.title.toLowerCase().includes(searchText.toLowerCase())
    });

    // Handle loading state or errors
    if (isLoading) {
        return <Progress
            size="lg"
            isIndeterminate
            aria-label="Loading..."
            className="max-w-md"
        />;
    }


    return (
        <div className="h-screen flex flex-col items-center">
            <h2 className="mt-10 mb-4 text-2xl font-bold tracking-tight leading-none md:text-3xl xl:text-3xl dark:text-white">
                No Journeys yet? Click Here to Get Started

            </h2>
            <div className="mb-4">
                <Button as={Link} size="lg" variant="ghost" color="primary" href="/dashboard/create" startContent={<Codepen size={25} />}>
                    Get started
                </Button>
            </div>

            <div className="mt-4 mb-8 w-full max-w-4xl">
                <Input
                    type="text"
                    placeholder="Search..."
                    variant="underlined"
                    value={searchText}
                    onValueChange={setsearchText}
                />
            </div>

            <section className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredData ? filteredData.map((project, index) => (
                    <Card shadow="sm" key={index}  >
                        <CardBody className="overflow-visible p-0">
                            <Image
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                alt={project.title}
                                className="w-full object-cover h-[140px]"
                                src={project.imageUrl}
                            />
                            <b className="flex justify-center">{project.title}</b>
                        </CardBody>
                        <CardFooter className="flex justify-center text-small">
                            <p className="text-default-500">{project.description}</p>
                            <Spacer x={2} y={2} />
                            <Button variant="ghost" color="primary" size="sm" as={Link} href={"/dashboard/edit/" + project.docid} startContent={<Edit3 />}>Edit</Button>
                        </CardFooter>
                    </Card>
                )) : <div className="justify-center items-center font-bold">No projects found</div>}
            </section>

        </div>

    );

}