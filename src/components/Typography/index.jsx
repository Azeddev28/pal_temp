const TAGS = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    body: 'p',
    small: 'span',
};

const CLASSES = {
    h1: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold',
    h2: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold',
    h3: 'text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold',
    h4: 'text-base sm:text-lg md:text-xl lg:text-2xl font-bold',
    h5: 'text-sm sm:text-base md:text-lg lg:text-xl font-bold',
    body: 'text-sm md:text-base',
    small: 'text-xs md:text-sm',
};

const Typography = ({ variant, children, className, as }) => {
    const variantClasses = CLASSES[variant];
    const Tag = as ?? TAGS[variant];

    return <Tag className={`${variantClasses} ${className}`}>{children}</Tag>;
};

export { Typography };
