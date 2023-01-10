import Image from "next/image"

export default function Post() {
    return (
        <div className="w-full min-h-[200px]">
            <div className="flex">
                <div className="mr-[12px]">
                    <div className="rounded-full min-w-max outline-2 cs-outline">
                        <Image
                            className="rounded-full"
                            width={48}
                            height={48}
                            src="/images/avatar.png"
                            alt={"author medmaha"}
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex gap-1">
                        <h3 className="tracking-wide font-semibold">
                            Mahamed Toure
                        </h3>
                        <div className="inline-flex cs-text-muted gap-2">
                            <span className="">@medmaha</span>
                            <span className="">Jun 17</span>
                        </div>
                    </div>
                    <div className="text_light dark:text_dark">
                        <span className="">Title Lorem, ipsum.</span>
                        <p className="prose tracking-wider text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                        </p>
                    </div>
                    <div className="mt-1">
                        <Image
                            width={600}
                            height={500}
                            placeholder="blur"
                            blurDataURL="/images/logo.png"
                            src="/images/cs-logo.png"
                            alt="post photo"
                            className="rounded-[1.2rem] border-2 border-gray-400"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
