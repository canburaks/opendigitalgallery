import { useState, useMemo, SyntheticEvent } from 'react';
// import { UseInstaprintStore } from "@/data/stores";
import { motion } from 'framer-motion';
// import Image from "next/image";
import {
    InstaprintFrameOptionsEnum,
    FRAME_THICKNESS,
    PRINT_WIDTH_CM,
    // PRINT_HEIGHT_CM,
    MAT_THICKNESS,
    // PRINT_HEIGHT_CM2,
    // UNIT_WIDTH_CM,

} from '@/constants';
// import type { FrameOptionsSelectUnionType } from "@/types";
import useDimensions from 'react-cool-dimensions';

const BLACK = '/images/instaprint/frame-texture/black-wood-texture.avif';
const DARK_BROWN = '/images/instaprint/frame-texture/dark-brown-texture.avif';
const NATURAL = '/images/instaprint/frame-texture/natural-wood-texture.avif';

function getFrameBackgroundImage(frame: InstaprintFrameOptionsEnum): string | null {
    switch (frame) {
        case InstaprintFrameOptionsEnum.BLACK: return BLACK;
        case InstaprintFrameOptionsEnum.DARK_BROWN: return DARK_BROWN;
        case InstaprintFrameOptionsEnum.NATURAL: return NATURAL;
        default: return null;
    }
}

type Props = {
    imageSrc: string,
    mat: boolean | string,
    frame: InstaprintFrameOptionsEnum
}

export const MediaWrapper = (props: Props) => {
    const { observe, width } = useDimensions({ useBorderBoxSize: true });
    // console.log("mediawrapper props", props)
    // console.log("isDefault", props.mat, props.frame)
    const hasFrame = useMemo(() => props.frame !== InstaprintFrameOptionsEnum.NO_FRAME, [props.frame]);
    const hasMat = useMemo(() => Boolean(props.mat), [props.mat]);

    return (
        <motion.div
            style={{ width, height: 400 }}
            className="flex flex-col justify-center items-center"
            ref={observe}
        >
            <FrameLayer frame={props.frame}>
                <MatLayer mat={props.mat} hasFrame={hasFrame}>
                    <ImageComponent
                        hasFrame={hasFrame}
                        hasMat={hasMat}
                        imageSrc={props.imageSrc}
                        isDefault={Boolean(props.mat) === false && props.frame === InstaprintFrameOptionsEnum.NO_FRAME}
                    />
                </MatLayer>
            </FrameLayer>
        </motion.div>
    );
};

const frameVariants = {
    hasFrame: (src: string) => ({
        padding: `${FRAME_THICKNESS}px`,
        border: '1px solid transparent',
        ...(src && ({ backgroundImage: `url(${src})` }))

    }),
    noFrame: {
        padding: `${0}px`,
        border: '1px solid rgba(0,0,0, 0.01)',
    }
};
const FrameLayer = ({ frame, children }: { frame: InstaprintFrameOptionsEnum, children: JSX.Element }) => {
    const isNoFrame = useMemo(() => frame === InstaprintFrameOptionsEnum.NO_FRAME, [frame]);

    const style = useMemo(() => ({
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
        height: 'auto',
        boxShadow: '6px 8px 16px -1px rgba(0, 0, 0, 0.3)',
        // padding: `${isNoFrame ? 0 : FRAME_THICKNESS}px`,
        // ...(!isNoFrame && ({ backgroundImage: `url(${getFrameBackgroundImage(frame)})` })),
    }) as React.CSSProperties, [frame]);
    // console.log("frame style", style)
    return (
        <motion.div
            custom={getFrameBackgroundImage(frame)}
            style={style}
            variants={frameVariants}
            initial="noFrame"
            animate={isNoFrame ? 'noFrame' : 'hasFrame'}>
            {children}
        </motion.div>
    );
};

const matVariants = {
    hasMat: {
        width: PRINT_WIDTH_CM + 2 * MAT_THICKNESS,
        // height: PRINT_HEIGHT_CM2 + 2 * MAT_THICKNESS,
        boxShadow: 'inset 0px 0px 0px 0px',
        padding: `${MAT_THICKNESS}px`
    },
    hasMatWithFrame: {
        width: PRINT_WIDTH_CM + 2 * MAT_THICKNESS,
        boxShadow: 'inset 0px 2px 16px 1px rgba(0, 0, 0, 0.3), inset 0px -2px 16px 1px rgba(0, 0, 0, 0.3)',
        // height: PRINT_HEIGHT_CM2 + 2 * MAT_THICKNESS,
        padding: `${MAT_THICKNESS}px`
    },
    noMat: {
        width: PRINT_WIDTH_CM,
        // height: PRINT_HEIGHT_CM,
        padding: `${0}px`
    }
};
const MatLayer = ({ mat, hasFrame, children }: { mat: boolean | string, hasFrame: boolean, children: JSX.Element }) => {
    const hasMat = useMemo(() => Boolean(mat) === true, [mat]);
    const style = useMemo(() => ({
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '0px solid transparent',
        height: 'auto',
        background: '#fff',
        zIndex: 1,
        // width: `${hasMat ? PRINT_WIDTH_CM + 2 * MAT_THICKNESS : PRINT_WIDTH_CM}px`,
        // height: `${hasMat ? PRINT_HEIGHT_CM + 2 * MAT_THICKNESS : PRINT_HEIGHT_CM}px`,
        // padding: `${hasMat ? MAT_THICKNESS : 0}px`,
    }) as React.CSSProperties, [mat]);

    return (
        <motion.div
            style={style}
            initial={'noMat'}
            animate={!hasMat ? 'noMat' : hasFrame ? 'hasMatWithFrame' : 'hasMat'}
            variants={matVariants}>
            {children}
        </motion.div>
    );
};

const imageVariants = {
    default: {
        boxShadow: '6px 8px 16px -1px rgba(0, 0, 0, 0.3)',
        //boxShadow: "inset 0px 2px 16px 1px rgba(0, 0, 0, 0.3), inset 0px -2px 16px 1px rgba(0, 0, 0, 0.3)"
    },
    modified: {
        boxShadow: 'none',
        //boxShadow: "inset 0px 2px 16px 1px rgba(0, 0, 0, 0.3), inset 0px -2px 16px 1px rgba(0, 0, 0, 0.3)"
    }
};

const imageShadowVariants = {
    default:{
        boxShadow: 'none',
    },
    hasFrameNoMat:{
        boxShadow: 'inset 0px 2px 16px 1px rgba(0, 0, 0, 0.3), inset 0px -2px 16px 1px rgba(0, 0, 0, 0.3)'
    }
};
const ImageComponent = ({ imageSrc, isDefault, hasFrame, hasMat }: { imageSrc: string, isDefault: boolean, hasFrame: boolean, hasMat: boolean }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0, ratio:1 });
    // console.log("ratio", ratio)
    const style = useMemo(() => ({
        position: 'relative',
        zIndex: 2,
        width: `${PRINT_WIDTH_CM}px`,
        height: 'auto',// `${ratio < 1 ? PRINT_HEIGHT_CM2 : PRINT_HEIGHT_CM}px`,
        padding: `${0}px`

    }) as React.CSSProperties, [imageSrc]);

    const handleImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
        const { naturalWidth, naturalHeight } = (event.target as HTMLImageElement);
        console.log('imageDimensions', naturalWidth, naturalHeight );
        setImageDimensions({ width: naturalWidth, height: naturalHeight, ratio: naturalWidth / naturalHeight });
    };
    // console.log("isDefault", isDefault)
    // console.log("hasFrameHasMat", (hasFrame && !hasMat) ? "hasFrameNoMat" : "default")

    return (
        <>
            <motion.img
                style={style}
                src={imageSrc}
                onLoad={handleImageLoad}
                variants={imageVariants}
                initial={'default'}
                animate={isDefault ? 'default' : 'modified'}
                alt="Instaprint"
            />
            <motion.div
                variants={imageShadowVariants}
                initial={'default'}
                style={{...style, zIndex:3}}
                animate={(hasFrame && !hasMat) ? 'hasFrameNoMat' : 'default'}
            />
        </>
    );
};