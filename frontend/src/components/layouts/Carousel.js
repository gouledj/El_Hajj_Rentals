import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Typography } from '@mui/material';

const DemoCarousel=() => {
    
        return (
            <>
            <Typography variant="h5" sx={{textAlign:'center', pt:5, mb:-5}}>
                We've got the means for your journey
            </Typography>
            <Carousel sx={{pb:10}}>
                <div>
                    <img src="https://www.enterprise.ca/en/home/_jcr_content/root/container/container/container_1250852314/sliding_carousel/teaser_1685349612.coreimg.82.1920.png/1663084717954/mtf-nissan-altima.png" />
                </div>
                <div>
                    <img src="https://www.enterprise.ca/en/home/_jcr_content/root/container/container/container_1250852314/sliding_carousel/teaser_1983068224.coreimg.82.1920.png/1663084730284/mtf-jeep-grand-cherokee.png" />
                </div>
                <div>
                    <img src="https://www.enterprise.ca/en/home/_jcr_content/root/container/container/container_1250852314/sliding_carousel/teaser.coreimg.82.1920.png/1663084742040/mtf-rideshare-chrysler-townandcountry-2.png" />
                </div>
                <div>
                    <img src="https://www.enterprise.ca/en/home/_jcr_content/root/container/container/container_1250852314/sliding_carousel/teaser_671932157.coreimg.82.1920.png/1663084754670/mtf-ford-cargo-van.png" />
                </div>
                <div>
                    <img src="https://www.enterprise.ca/en/home/_jcr_content/root/container/container/container_1250852314/sliding_carousel/teaser_1243252545.coreimg.82.1920.png/1663084681620/mtf-trucks-chevy-silverado.png" />
                </div>
            </Carousel>
            </>
            
        );
    
};
export default DemoCarousel;