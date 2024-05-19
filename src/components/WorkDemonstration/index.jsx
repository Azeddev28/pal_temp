import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Card from '../Card';
import theme from '../theme';
const WorkDemonstration = ({ list }) => {
    var settings = {
        dots: false,
        arrows: false,
        speed: 500,
        slidesToShow: 4,
        initialSlide: 0,
        infinite: false,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                },
            },

            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                },
            },
        ],
    };

    return (
        <div>
            <Slider {...settings}>
                {list.map((item, index) => (
                    <div>
                        <div className="flex flex-row items-center">
                            <Card
                                text1={item.text1}
                                text2={item.text2}
                                id={item.id}
                                backgroundColor={theme.palette.white}
                            />
                            {index !== list.length - 1 ? (
                                <div className="border-2 hidden sm:block border-dashed border-brandBlue w-[21%] !h-0.5"></div>
                            ) : (
                                // ''
                                <div className="border-2 hidden sm:block border-solid border-transparent w-[21%] !h-0.5"></div>
                            )}
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default WorkDemonstration;
