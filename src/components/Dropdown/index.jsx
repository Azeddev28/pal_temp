import { ArrowDisabledIcon, ArrowDownIcon, ArrowUpIcon } from '@/Icons';
import {
    Content as SelectContent,
    Item as SelectItem,
    Trigger as SelectTrigger,
    Viewport as SelectViewport,
} from '@radix-ui/react-select';
import { forwardRef, useMemo, useRef, useState } from 'react';
import Select, { components } from 'react-select';
import { Typography } from '../Typography';

const { Option, Menu } = components;

const Trigger = forwardRef(({ isOpen, children, width }, forwardedRef) => (
    <SelectTrigger
        className={`p-2 lg:p-4 border-2 border-solid rounded-lg ${
            isOpen ? 'border-brandBlue' : 'border-theme-border'
        }`}
        style={{ width }}
        ref={forwardedRef}
    >
        <Typography variant={'body'} as="div">
            {children}
        </Typography>
    </SelectTrigger>
));

const Item = ({ children, value }) => (
    <SelectItem
        value={value}
        className="flex flex-row gap-3 p-4 bg-white cursor-pointer items-center hover:bg-brandSecondaryBlue"
    >
        {children}
    </SelectItem>
);

const Content = ({ children, width }) => (
    <SelectContent
        position={'popper'}
        className="my-2 rounded-xl"
        style={{ boxShadow: '0px 4px 20px -10px rgba(0, 0, 0, 0.25)', width }}
    >
        {children}
    </SelectContent>
);

const Viewport = ({ children, width }) => (
    <SelectViewport className="max-h-72 rounded-xl bg-white" style={{ width }}>
        {children}
    </SelectViewport>
);

const renderArrowIcon = (isOpen, isDisabled) => {
    if (isDisabled) return <ArrowDisabledIcon className="w-5 h-5" />;
    return isOpen ? (
        <ArrowUpIcon className="w-5 h-5" />
    ) : (
        <ArrowDownIcon className="w-5 h-5" />
    );
};

const Dropdown = forwardRef(
    (
        {
            index,
            width,
            options = [],
            selectedKey,
            onChange,
            isOpen,
            onOpenChange,
            disabled,
            placeholder,
        },
        forwardedRef
    ) => {
        console.log('🚀 ~ options:', options);
        const [page, setPage] = useState(1);
        const [search, setSearch] = useState('');
        const containerRef = useRef();
        const [open, setOpen] = useState(!!isOpen);

        const searchedOptions = useMemo(
            () =>
                search !== ''
                    ? options.filter((option) =>
                          option.key
                              .toLowerCase()
                              .includes(search.toLowerCase())
                      )
                    : options,
            [search, options]
        );

        const handleOpenChange = (open) => {
            setOpen(open);
            onOpenChange?.(open);
            setPage(1);
        };

        const handleShowMore = () => {
            setPage((prev) => prev + 1);
        };

        const handleSelection = (key) => {
            if (!onChange) return;
            const selectedOption = options.find(
                (option) => option.key === key.label
            );
            if (!selectedOption) return;
            onChange(selectedOption);
        };

        const handleSearch = (e) => setSearch(e.target.value);

        const contentWidth =
            containerRef.current?.getBoundingClientRect().width;

        return (
            <>
                {/* <div ref={containerRef}>
                    <SelectRoot
                        disabled={disabled}
                        value={selectedKey}
                        open={open}
                        onOpenChange={handleOpenChange}
                        onValueChange={handleSelection}
                    >
                        <Trigger isOpen={open} width={width} ref={forwardedRef}>
                            <div className="flex flex-row justify-between items-center">
                                <Value placeholder={placeholder}>
                                    {selectedKey}
                                </Value>
                                {renderArrowIcon(open, disabled)}
                            </div>
                        </Trigger>
                        <Portal>
                            <Content width={contentWidth}>
                                <Viewport>
                                    <div className="mx-auto p-4">
                                        <Input
                                            type="text"
                                            placeholder="Search for..."
                                            value={search}
                                            onChange={handleSearch}
                                        />
                                    </div>
                                    {searchedOptions
                                        ?.slice(0, page * 200)
                                        .map((option, index) => (
                                            <Item
                                                key={index}
                                                value={option.key}
                                            >
                                                <Checkbox
                                                    defaultChecked={
                                                        selectedKey ===
                                                        option.key
                                                    }
                                                />
                                                <Typography variant={'body'}>
                                                    {option.key}
                                                </Typography>
                                            </Item>
                                        ))}
                                    {searchedOptions?.length !== 0 && (
                                        <div
                                            onClick={handleShowMore}
                                            className="flex justify-center items-center text-brandBlue p-4 cursor-pointer bg-white hover:bg-brandSecondaryBlue"
                                        >
                                            <Typography variant={'body'}>
                                                Show More
                                            </Typography>
                                        </div>
                                    )}
                                </Viewport>
                            </Content>
                        </Portal>
                    </SelectRoot>
                </div> */}
                {/* <Select
                    components={{
                        Menu: CustomMenu,
                        DropdownIndicator,
                        IndicatorSeparator: null,
                    }}
                    defaultValue={{
                        label: options[index].key,
                        value: options[index].value,
                    }}
                    isSearchable
                    options={options.map((option) => {
                        return { label: option.key, value: option.value };
                    })}
                    styles={{
                        container: (base) => ({
                            ...base,
                            // backgroundColor: colourOptions[2].color,
                        }),
                        control: (styles, props) => {
                            console.log('🚀 ~ props:', props);

                            return {
                                ...styles,
                                borderColor: props.menuIsOpen
                                    ? 'red'
                                    : props.isFocused
                                    ? 'yellow'
                                    : 'rgb(223, 223, 223)', // Change border color based on menuIsOpen and isFocused

                                '&:hover': {
                                    borderColor: 'yellow', // Change border color on hover
                                },
                            };
                        },
                    }}
                /> */}
                <Select
                    defaultValue={
                        index && {
                            label: options[index].key,
                            value: options[index].value,
                        }
                    }
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    onChange={handleSelection}
                    options={options.map((option) => {
                        return { label: option.key, value: option.value };
                    })}
                    components={{
                        Menu: CustomMenu,
                        DropdownIndicator,
                        IndicatorSeparator: null,
                        Option: InputOption,
                    }}
                />
            </>
        );
    }
);

const InputOption = ({
    getStyles,
    Icon,
    isDisabled,
    isFocused,
    isSelected,
    children,
    innerProps,
    ...rest
}) => {
    const [isActive, setIsActive] = useState(false);
    const onMouseDown = () => setIsActive(true);
    const onMouseUp = () => setIsActive(false);
    const onMouseLeave = () => setIsActive(false);

    // styles
    let bg = 'transparent';
    if (isFocused) bg = '#eee';
    if (isActive) bg = '#B2D4FF';

    const style = {
        alignItems: 'center',
        backgroundColor: bg,
        color: 'inherit',
        display: 'flex ',
    };

    // prop assignment
    const props = {
        ...innerProps,
        onMouseDown,
        onMouseUp,
        onMouseLeave,
        style,
    };

    return (
        <components.Option
            {...rest}
            isDisabled={isDisabled}
            isFocused={isFocused}
            isSelected={isSelected}
            getStyles={getStyles}
            innerProps={props}
            className="flex items-center gap-3"
        >
            <input type="checkbox" checked={isSelected} />
            {children}
        </components.Option>
    );
};

const CustomOption = (props) => {
    return (
        <Option {...props}>
            <input
                type="text"
                placeholder="Search for..."
                style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                }}
            />
        </Option>
    );
};

const DropdownIndicator = () => (
    <div className="pr-2">
        <svg
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
        >
            <circle cx="8" cy="8" r="8" fill="#D2EFFF"></circle>
            <path
                d="M5.19995 7.2L7.79995 9.8L10.4 7.2"
                stroke="#005382"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
        </svg>
    </div>
);

const CustomMenu = (props) => (
    <Menu {...props}>
        <CustomOption {...props} />
        {props.children}
    </Menu>
);

export { Dropdown };
