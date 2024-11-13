"use client";

import React, {useEffect} from "react";
import useEmblaCarousel, {UseEmblaCarouselType} from "embla-carousel-react";
import Image, {StaticImageData} from "next/image";
import {IPhoneMockup} from "react-device-mockup";
import AutoScroll from 'embla-carousel-auto-scroll'


type CarouselProps = {
    images: { src: StaticImageData; alt: string }[];
};

export const IPhoneMockCarousel: React.FC<CarouselProps> = ({images}) => {
    // const [selectedIndex, setSelectedIndex] = useState(0);

    const [emblaRef, emblaApi]:
        UseEmblaCarouselType = useEmblaCarousel(
        {
            loop: true,
            align: "center",
            containScroll: "trimSnaps"
        },
        [AutoScroll({playOnInit: true, speed: 1})]
    );

    useEffect(() => {
        if (!emblaApi) return;
        // setSelectedIndex(emblaApi.scrollProgress());
    }, [emblaApi]);

    // Pause autoplay on hover
    const handleMouseEnter = () => {
        const autoScroll = emblaApi?.plugins()?.autoScroll
        if (!autoScroll) return
        autoScroll.stop();
    };
    const handleMouseLeave = () => {
        const autoScroll = emblaApi?.plugins()?.autoScroll
        if (!autoScroll) return
        autoScroll.play();
    };

    return (
        <div className="flex flex-row">
            <div className="h-full flex items-center justify-center">
                <button
                    onClick={() => {
                        emblaApi?.scrollPrev();
                        handleMouseEnter();
                    }}
                    className="bg-gray-100 p-3 rounded-full shadow-lg hover:bg-gray-200 transition"
                >
                    {"<"}
                </button>
            </div>
            <div className="relative w-3/4 max-w-5xl mx-auto overflow-hidden">
                {/* Embla Carousel */}
                <div
                    className="embla"
                    ref={emblaRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="relative w-full max-w-5xl mx-auto flex space-x-4 overflow-visible">
                        {images.map((image, index) => {
                            return (
                                <div key={index}>
                                    <IPhoneMockup
                                        screenWidth={120}
                                        hideStatusBar
                                        hideNavBar
                                        frameColor="#000000"
                                        className="px-2"
                                    >
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            className="rounded-lg shadow-lg object-cover"
                                            priority={true}
                                            quality={100}
                                        />
                                    </IPhoneMockup>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="h-full flex items-center justify-center">
                <button
                    onClick={() => {
                        emblaApi?.scrollNext();
                        handleMouseEnter();
                    }}
                    className="bg-gray-100 p-3 rounded-full shadow-lg hover:bg-gray-200 transition"
                >
                    {">"}
                </button>
            </div>
        </div>
    );
};

export default IPhoneMockCarousel;
