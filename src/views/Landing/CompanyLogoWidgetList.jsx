import { LogoWidget } from '@/components/Misc';
import useIsMobile from '@/hooks/use-is-mobile';
import airbnbLogo from '../../../public/images/company-logos/Airbnb.png';
import discordLogo from '../../../public/images/company-logos/Discord.png';
import figmaLogo from '../../../public/images/company-logos/Figma.png';
import googleLogo from '../../../public/images/company-logos/Google.png';
import slackLogo from '../../../public/images/company-logos/Slack.png';
import spotifyLogo from '../../../public/images/company-logos/Spotify.png';
import teslaLogo from '../../../public/images/company-logos/Tesla.png';
import tiktokLogo from '../../../public/images/company-logos/TikTok.png';

const CompanyLogoWidgetList = () => {
    const isMobile = useIsMobile();
    const COMPANY_LOGOS = [
        {
            src: figmaLogo,
            width: 35,
            height: 52,
        },
        {
            src: slackLogo,
            width: 46,
            height: 46,
        },
        {
            src: teslaLogo,
            width: 45,
            height: 44,
        },
        {
            src: googleLogo,
            width: 41,
            height: 42,
        },
        {
            src: tiktokLogo,
            width: 43,
            height: 48,
        },
        {
            src: spotifyLogo,
            width: 48,
            height: 48,
        },
        {
            src: discordLogo,
            width: 56,
            height: 42,
        },
        {
            src: airbnbLogo,
            width: 42,
            height: 46,
        },
    ];

    return (
        <div className="flex flex-row flex-wrap gap-5 items-center justify-center lg:gap-10">
            {COMPANY_LOGOS.map((logoInfo, index) => (
                <LogoWidget
                    key={index}
                    logoInfo={{
                        ...logoInfo,
                        width: isMobile
                            ? Math.floor(logoInfo.width * 0.8)
                            : logoInfo.width,
                        height: isMobile
                            ? Math.floor(logoInfo.height * 0.8)
                            : logoInfo.height,
                    }}
                />
            ))}
        </div>
    );
};

export { CompanyLogoWidgetList };
