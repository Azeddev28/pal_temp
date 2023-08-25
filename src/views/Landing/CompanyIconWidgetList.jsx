const { IconWidget } = require('@/components/Misc');

const COMPANY_ICONS = [
    'NextJSIcon',
    'NextJSIcon',
    'NextJSIcon',
    'NextJSIcon',
    'NextJSIcon',
    'NextJSIcon',
    'NextJSIcon',
    'NextJSIcon',
];

const CompanyIconWidgetList = () => (
    <div className="flex flex-row flex-wrap gap-5 items-center justify-center lg:gap-10">
        {COMPANY_ICONS.map((icon, index) => (
            <IconWidget key={index} icon={icon} />
        ))}
    </div>
);

export { CompanyIconWidgetList };
