import theme from '@/components/theme';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Card from '../Card';

const WorkDemonstration = ({ list }) => {
    var settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
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
                            {index !== 3 && (
                                <div className="border-2  border-dashed border-brandBlue w-[21%]"></div>
                            )}
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default WorkDemonstration;
