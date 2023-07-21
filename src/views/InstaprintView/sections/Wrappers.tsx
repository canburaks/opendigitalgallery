import { useEffect, useState, useMemo, useCallback, useRef, SyntheticEvent } from "react";
import { UseInstaprintStore } from "@/data/stores";
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image";
import {
    InstaprintFrameOptionsEnum,
    UNIT_WIDTH_CM,
    FRAME_THICKNESS,
    PRINT_WIDTH_CM,
    PRINT_HEIGHT_CM,
    PRINT_HEIGHT_CM2,
    MAT_THICKNESS

} from "@/constants";
import type { FrameOptionsSelectUnionType } from "@/types";
import useDimensions from "react-cool-dimensions";

const BLACK = "/images/instaprint/frame-texture/black-wood-texture.avif"
const DARK_BROWN = "/images/instaprint/frame-texture/dark-brown-texture.avif"
const NATURAL = "/images/instaprint/frame-texture/natural-wood-texture.avif"

function getFrameBackgroundImage(frame: InstaprintFrameOptionsEnum) {
    switch (frame) {
        case InstaprintFrameOptionsEnum.BLACK: return BLACK
        case InstaprintFrameOptionsEnum.DARK_BROWN: return DARK_BROWN
        case InstaprintFrameOptionsEnum.NATURAL: return NATURAL
        default: return null
    }
}

type Props = {
    imageSrc: string,
    mat: boolean | string,
    frame: InstaprintFrameOptionsEnum
}

export const MediaWrapper = (props: Props) => {
    const { observe, width } = useDimensions({ useBorderBoxSize: true });
    console.log("mediawrapper props", props)
    console.log("isDefault", props.mat, props.frame)
    return (
        <motion.div
            style={{ width, height:400 }}
            className="flex flex-col justify-center items-center"
            ref={observe}
        >
            <FrameLayer frame={props.frame}>
                <MatLayer mat={props.mat}>
                    <ImageComponent 
                        imageSrc={props.imageSrc} 
                        isDefault={Boolean(props.mat) === false && props.frame === InstaprintFrameOptionsEnum.NO_FRAME} 
                    />
                </MatLayer>
            </FrameLayer>
        </motion.div>
    )
}

const frameVariants = {
    hasFrame: {
        padding: `${FRAME_THICKNESS}px`,
        border: "1px solid transparent",
        
    },
    noFrame: {
        padding: `${0}px`,
        border: "1px solid rgba(0,0,0, 0.01)",
    }
}
const FrameLayer = ({ frame, children }: { frame: InstaprintFrameOptionsEnum, children: JSX.Element }) => {
    const isNoFrame = useMemo(() => frame === InstaprintFrameOptionsEnum.NO_FRAME, [frame])

    const style = useMemo(() => ({
        position: "relative",
        zIndex: 0,
        height: "auto",
        boxShadow: "6px 8px 16px -1px rgba(0, 0, 0, 0.3)",
        // padding: `${isNoFrame ? 0 : FRAME_THICKNESS}px`,
        ...(!isNoFrame && ({ backgroundImage: `url(${getFrameBackgroundImage(frame)})` })),
    }) as React.CSSProperties, [frame])
    console.log("frame style", style)
    return (
        <motion.div 
            style={style} 
            variants={frameVariants} 
            initial="noFrame" 
            animate={isNoFrame ? "noFrame" : "hasFrame"}>
            {children}
        </motion.div>
    )
}

const matVariants = {
    hasMat: {
        width: PRINT_WIDTH_CM + 2 * MAT_THICKNESS,
        height: PRINT_HEIGHT_CM + 2 * MAT_THICKNESS,
        padding: `${MAT_THICKNESS}px`
    },
    noMat: {
        width: PRINT_WIDTH_CM,
        height: PRINT_HEIGHT_CM,
        padding: `${0}px`
    }
}
const MatLayer = ({ mat, children }: { mat: boolean | string, children: JSX.Element }) => {
    const hasMat = useMemo(() => Boolean(mat) === true, [mat])
    const style = useMemo(() => ({
        position: "relative",
        border: "0px solid transparent",
        background: "#fff",
        zIndex: 1,
        // width: `${hasMat ? PRINT_WIDTH_CM + 2 * MAT_THICKNESS : PRINT_WIDTH_CM}px`,
        // height: `${hasMat ? PRINT_HEIGHT_CM + 2 * MAT_THICKNESS : PRINT_HEIGHT_CM}px`,
        // padding: `${hasMat ? MAT_THICKNESS : 0}px`,
    }) as React.CSSProperties, [mat])

    return (
        <motion.div 
            style={style} 
            initial={"noMat"} 
            animate={hasMat ? "hasMat" : "noMat"} 
            variants={matVariants}>
            {children}
        </motion.div>
    )
}

const imageVariants = {
    default:{
        boxShadow: "6px 8px 16px -1px rgba(0, 0, 0, 0.3)",
    },
    modified:{
        boxShadow: "none"
    }
}
const ImageComponent = ({ imageSrc, isDefault }: { imageSrc: string, isDefault:boolean }) => {
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const ratio = imageDimensions.width / imageDimensions.height;
    console.log("ratio", ratio)
    const style = useMemo(() => ({
        position: "relative",
        zIndex: 2,
        width: `${PRINT_WIDTH_CM}px`,
        height: "auto",// `${ratio < 1 ? PRINT_HEIGHT_CM2 : PRINT_HEIGHT_CM}px`,
        padding: `${0}px`

    }) as React.CSSProperties, [imageSrc])

    const handleImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
        const { naturalWidth, naturalHeight } = (event.target as HTMLImageElement);
        setImageDimensions({ width: naturalWidth, height: naturalHeight });
    };
    console.log("isDefault", isDefault)

    return (
        <motion.img
            style={style}
            src={imageSrc}
            onLoad={handleImageLoad}
            variants={imageVariants}
            initial={"default"}
            animate={isDefault ? "default" : "modified"}
            alt="Instaprint"
        />
    );
};