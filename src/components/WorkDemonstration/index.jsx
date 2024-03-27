import Card from '@/components/Card';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import theme from '../theme';
const WorkDemonstration = ({ list }) => {
    var settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                },
            },

            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    dots: true,
                },
            },
        ],
    };

    return (
        <div>
            <Slider {...settings}>
                {list.map((item, index) => (
                    <div key={index} style={{ border: '1px solid red' }}>
                        <div className="flex flex-row items-center">
                            <Card
                                text1={item.text1}
                                text2={item.text2}
                                backgroundColor={theme.palette.white}
                            />
                            {index !== list.length - 1 && (
                                <div className="border-2 border-dashed border-brandBlue w-[21%]"></div>
                            )}
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default WorkDemonstration;
