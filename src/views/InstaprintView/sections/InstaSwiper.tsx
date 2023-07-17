import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
/// @ts-ignore
import { A11y, FreeMode, Navigation, Virtual } from "swiper";
import EffectCarousel from "@/public/assets/js/effect-carousel.esm.js";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/virtual";
import { UseInstaprintStore } from "@/data/stores";
import type { IGMedia } from "@/types";
import { IG_USER_USER_MEDIA_LOCAL_STORAGE_KEY, TRX } from "@/constants";
import { motion, AnimatePresence } from "framer-motion"

export function InstaSwiper() {
	const media = UseInstaprintStore(state => state.media);
	const setMedia = UseInstaprintStore(state => state.setMedia);
	const page = UseInstaprintStore(state => state.page);


	const swiperParameters = useMemo(() => ({
		modules: [A11y, FreeMode, Navigation, Virtual, EffectCarousel],
		slidesPerView: 3,
		centeredSlides: true,
		spaceBetween: 94,
		grabCursor: true,
		effect: "carousel",
		navigation: true,
		freeMode: { momentumBounceRatio: 0.4 },
		virtual: true,
		watchSlidesProgress: true,
		slidesPerGroupAuto: false,
	}), []);
	console.log("page", page, media)


	if (page !== 1) return <div></div>

	return (
		<>
			{/* @ts-ignore */}
			<Swiper {...swiperParameters}>
				{media?.map((m: IGMedia) => (
					<SwiperSlide>
						<motion.img
							src={m.media_url}
							alt={m.caption}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}
							className="swiper-slide-image swiper-carousel-animate-opacity"
						/>

						<div className="swiper-slide-content swiper-carousel-animate-opacity">
							<div className="swiper-slide-title"></div>
						</div>
					</SwiperSlide>

				))}
			</Swiper>
		</>
	);
}