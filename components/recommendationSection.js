"use client"

import { Box, SimpleGrid } from '@chakra-ui/react'
import RecommendationCard from '../components/recommendationCard'
import { SwiperSlide, Swiper } from 'swiper/react'
import { EffectCards, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

const RecommendationSection = ({ delay = 0 }) => {
    const recommendationsID = ['aiSandbox']

    return (
        <Box>
            <SimpleGrid
                columns={1}
                justifySelf="center"
                gap={3}
                display={{ lg: 'grid', base: 'none' }}
            >
                {recommendationsID.map(id => {
                    return (
                        <RecommendationCard
                            key={id + '_grid'}
                            projectID={id}
                            delay={delay}
                        />
                    )
                })}
            </SimpleGrid>

            <Box display={{ lg: 'none' }}>
                <Swiper
                    effect="cards"
                    grabCursor={true}
                    centeredSlides={true}
                    modules={[Navigation, EffectCards]}
                    navigation={true}
                    slidesPerView="auto"
                    fadeEffect={{ crossFade: true }}
                    spaceBetween={30}
                    cardsEffect={{
                        slideShadows: false
                    }}
                >
                    {recommendationsID.map(id => {
                        return (
                            <SwiperSlide
                                style={{ width: '420px' }}
                                key={id + '_card'}
                            >
                                <RecommendationCard
                                    projectID={id}
                                    delay={delay}
                                />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </Box>
        </Box>
    )
}

export default RecommendationSection
