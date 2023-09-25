import { ArrowDisabledIcon, ArrowDownIcon, ArrowUpIcon } from '@/Icons';
import {
    Portal,
    Content as SelectContent,
    Item as SelectItem,
    Root as SelectRoot,
    Trigger as SelectTrigger,
    Viewport as SelectViewport,
    Value,
} from '@radix-ui/react-select';
import { forwardRef, useRef, useState } from 'react';
import { Checkbox } from '../Input';
import { Typography } from '../Typography';

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
    <SelectViewport className="max-h-72 rounded-xl" style={{ width }}>
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
        const [page, setPage] = useState(1);
        const containerRef = useRef();
        const [open, setOpen] = useState(!!isOpen);

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
            const selectedOption = options.find((option) => option.key === key);
            if (!selectedOption) return;
            onChange(selectedOption);
        };
        const contentWidth =
            containerRef.current?.getBoundingClientRect().width;

        return (
            <div ref={containerRef}>
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
                                {options
                                    .slice(0, page * 200)
                                    .map((option, index) => (
                                        <Item key={index} value={option.key}>
                                            <Checkbox
                                                defaultChecked={
                                                    selectedKey === option.key
                                                }
                                            />
                                            <Typography variant={'body'}>
                                                {option.key}
                                            </Typography>
                                        </Item>
                                    ))}
                                {options?.length !== 0 && (
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
            </div>
        );
    }
);

export { Dropdown };
