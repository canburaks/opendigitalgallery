import { useEffect, useCallback } from 'react';
import { UseInstaprintStore } from '@/data/stores';
import { motion } from 'framer-motion';
import useDimensions from 'react-cool-dimensions';
import type { IGMedia } from '@/types';
import { IG_USER_USER_MEDIA_LOCAL_STORAGE_KEY, TRX } from '@/constants';
import { useTranslation } from 'next-i18next';

export const InstaFeed = () => {
  const page = UseInstaprintStore((state) => state.page);
  if (page !== 1) return <div></div>;
  return (
    <motion.div
      className="flex flex-col items-center "
      exit={{ opacity: 0, left: '-100%' }}
      initial={{ opacity: 0, left: '100%' }}
      animate={{ opacity: 1, left: 0 }}
      transition={{ duration: 0.3, ease: 'linear' }}
    >
      <MediaGrid />
    </motion.div>
  );
};

const MediaGrid = () => {
  const { observe, width } = useDimensions({
    // onResize: ({ observe, width}) => {
    // 	// Triggered whenever the size of the target is changed...
    // 	unobserve(); // To stop observing the current target element
    // 	observe(); // To re-start observing the current target element
    // },
  });
  // console.log("width", width)
  const media = UseInstaprintStore((state) => state.media);
  const setMedia = UseInstaprintStore((state) => state.setMedia);

  // const toggleSelection = UseInstaprintStore(state => state.toggleSelection);
  // console.log("media", media)

  useEffect(() => {
    if (media.length === 0) {
      const localMedia = localStorage.getItem(IG_USER_USER_MEDIA_LOCAL_STORAGE_KEY);
      if (localMedia) {
        const mediaData = JSON.parse(localMedia);
        setMedia(mediaData);
      }
    }
  }, []);
  return (
    <motion.div
      className="relative w-full max-w-6xl items-center flex flex-col h-auto"
      ref={observe}
    >
      <motion.section className="relative grid grid-cols-2 sm:grid-cols-3 gap-1 md:gap-1 h-auto">
        {media?.map((m: IGMedia) => (
          <div
            className="relative w-full h-auto cursor-pointer p-0"
            // onClick={() => toggleSelection(m.id)}
            key={`${m.id}-media`}
          >
            <motion.div
              style={{
                width: width < 300 ? width / 2 : width / 3,
                height: width < 300 ? width / 2 : width / 3,
                overflow: 'hidden',
                position: 'relative',
                // border: selections.includes(m.id) ? "3px solid #721CFF" : "3px solid transparent"
              }}
            >
              <SelectedLabel id={m.id}></SelectedLabel>
              <motion.img
                src={m.media_url}
                alt={m.caption}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-auto"
                style={{
                  width: width < 300 ? width / 2 : width / 3,
                  height: width < 300 ? width / 2 : width / 3,
                  // border: selections.includes(m.id) ? "3px solid #721CFF" : "3px solid transparent"
                }}
              />
            </motion.div>
            {/* <TickIcon active={selections.includes(m.id)} /> */}
          </div>
        ))}
      </motion.section>
    </motion.div>
  );
};
const variants = {
  selected: {
    opacity: 1,
  },
  unselected: {
    opacity: 0,
  },
};
const SelectedLabel = ({ id }: { id: string }) => {
  const { t } = useTranslation('common');
  const selections = UseInstaprintStore((state) => state.selections);
  const toggleSelection = UseInstaprintStore((state) => state.toggleSelection);
  const toggle = useCallback(() => toggleSelection(id), [id]);
  return (
    <motion.div
      className="z-10 absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center"
      initial="unselected"
      animate={selections.includes(id) ? 'selected' : 'unselected'}
      variants={variants}
      style={{ backgroundColor: '#0CC5B355' }}
      onClick={toggle}
    >
      <motion.div className="relative w-40 h-auto px-8 py-6 rounded-xl overflow-hidden flex justify-center bg-transparent">
        <span className="font-bold uppercase text-white">
          {t(TRX.INSTAPRINT.APP_MODAL_SELECTED)}
        </span>
        {/* <AnimatePresence>
					{!hover && <motion.button className="w-full h-full cursor-pointer font-extrabold uppercase text-white"
						exit={{ opacity: 0, y: -40 }}
						style={{ backgroundColor: "transparent", boxShadow: "none" }}
						initial={{ opacity: 1, y: 40 }}>
					</motion.button>}
					{hover &&
						<motion.button className="w-full h-full cursor-pointer font-extrabold uppercase text-white"
							exit={{ opacity: 0, y: -40 }}
							style={{ backgroundColor: "transparent", boxShadow: "none" }}
							initial={{ opacity: 1, y: 0 }}>
							{t(TRX.INSTAPRINT.APP_MODAL_CANCEL)}
						</motion.button>
				</AnimatePresence>
					} */}
      </motion.div>
    </motion.div>
  );
};

// const SelectionLabelButton = () => (
// 	<motion.div>

// 		<motion.button>

// 		</motion.button>
// 	</motion.div>
// )

export const TickIcon = ({ size = 28, active = false }: { size?: number; active: boolean }) => (
  <svg
    className="transition-all duration-300 ease-linear z-10"
    viewBox="0 0 24 24"
    fill={'#000'}
    style={{
      opacity: active ? 1 : 0,
      position: 'absolute',
      top: '80%',
      left: '80%',
      width: size,
      height: size,
    }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2Zm4.78 7.7-5.67 5.67a.75.75 0 0 1-1.06 0l-2.83-2.83a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l2.3 2.3 5.14-5.14c.29-.29.77-.29 1.06 0 .29.29.29.76 0 1.06Z"
      fill="#292D32"
      stroke="#fff"
    />
  </svg>
);
