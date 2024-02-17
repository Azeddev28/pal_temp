import { Component, useState } from 'react';
import Select, { components, defaultTheme } from 'react-select';
import { Checkbox } from '../Input';

const options = [
    { value: '1', label: 'Item 1' },
    { value: '2', label: 'Item 2' },
    { value: '3', label: 'Item 3' },
    { value: '4', label: 'Item 4' },
    { value: '5', label: 'Item 5' },
    { value: '6', label: 'Item 6' },
    { value: '7', label: 'Item 7' },
];

const { colors } = defaultTheme;

const selectStyles = {
    control: (provided, state) => ({
        ...provided,
        minWidth: 240,
        margin: 8,
        border: state.isFocused && '1px solid #005382',
        '&:hover': {
            borderColor: state.isFocused && '#005382',
            backgroundColor: state.isFocused ? '#fff' : '#e5e7eb',
        },
    }),
    menu: () => ({ boxShadow: 'inset 0 0px 0 rgba(0, 0, 0, 0.1)' }),
    option: (provided, state) => {
        console.log('🚀 ~ state:', state);
        return {
            ...provided,
            fontSize: '14px',
            '&:hover': {
                // borderColor: state.isFocused && '#005382',
                background: '#fff !important',
            },
        };
    },
};
const Menu = (props) => {
    const shadow = 'hsla(218, 50%, 10%, 0.1)';
    return (
        <div
            style={{
                backgroundColor: 'white',
                borderRadius: 4,
                boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
                marginTop: 8,
                position: 'absolute',
                zIndex: 2,
                width: '100%',
            }}
            {...props}
        />
    );
};
export default class CustomDropdown extends Component {
    state = { isOpen: false, value: this.props.index };
    toggleOpen = () => {
        this.setState((state) => ({ isOpen: !state.isOpen }));
    };
    onSelectChange = (value) => {
        console.log(
            '🚀 ~ CustomDropdown ~ value:',
            this.props,
            value,
            this.props.onChange(value)
        );
        this.toggleOpen();
        // this.props.onChange({ key: value.label, value: value.value });
        this.setState({ value });
    };
    render() {
        const { isOpen, value } = this.state;

        return (
            <Dropdown
                isOpen={isOpen}
                onClose={this.toggleOpen}
                target={
                    <button
                        onClick={this.toggleOpen}
                        className="p-2 lg:p-4 border-2 border-solid rounded-lg border-theme-border w-full flex items-center justify-between text-xs md:text-sm 2xl:text-base "
                    >
                        {value
                            ? this.props.options[value]
                                ? this.props.options[value].key
                                : value.label
                            : this.props.placeholder}
                        <span className="bg-[#D2EFFF] rounded-full ">
                            <ChevronDown />
                        </span>
                    </button>
                    // <Button
                    //     iconAfter={<ChevronDown />}
                    //     onClick={this.toggleOpen}
                    //     isSelected={isOpen}
                    //     style={{
                    //         width: '100%',
                    //         textAlign: 'left',
                    //         backgroundColor: '#fff',
                    //         fontWeight: 400,
                    //         fontSize: '14px',
                    //         color: 'red',
                    //     }}
                    // >
                    //     {value
                    //         ? this.props.options[value]
                    //             ? this.props.options[value].key
                    //             : value.label
                    //         : this.props.placeholder}
                    // </Button>
                }
            >
                <Select
                    autoFocus={false}
                    backspaceRemovesValue={false}
                    components={{
                        DropdownIndicator: null,
                        IndicatorSeparator: null,
                        Option: InputOption,
                    }}
                    controlShouldRenderValue={false}
                    hideSelectedOptions={false}
                    isClearable={false}
                    menuIsOpen
                    onChange={this.onSelectChange}
                    options={this.props.options.map((option) => {
                        return { label: option.key, value: option.value };
                    })}
                    placeholder="Search for..."
                    styles={selectStyles}
                    tabSelectsValue={false}
                    value={value}
                />
            </Dropdown>
        );
    }
}

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
        >
            <Checkbox checked={isSelected} />
            {/* <input
                type="checkbox"
                checked={isSelected}
                style={{ marginRight: '15px' }}
                // className="h-5 w-5 text-blue-500 focus:ring-blue-400 border-gray-300 rounded cursor-pointer"
            /> */}
            <div className="pl-5">{children}</div>
        </components.Option>
    );
};

const Blanket = (props) => (
    <div
        style={{
            bottom: 0,
            left: 0,
            top: 0,
            right: 0,
            position: 'fixed',
            zIndex: 1,
            width: '100%',
        }}
        {...props}
    />
);
const Dropdown = ({ children, isOpen, target, onClose }) => (
    <div
        style={{
            position: 'relative',
            background: '#fff',
            // border: '2px solid #e5e7eb',
            // borderRadius: '0.5rem',
            // color: 'red',
        }}
    >
        {target}
        {isOpen ? <Menu>{children}</Menu> : null}
        {isOpen ? <Blanket onClick={onClose} /> : null}
    </div>
);
const Svg = (p) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        focusable="false"
        role="presentation"
        {...p}
    />
);
const DropdownIndicator = () => (
    <div style={{ color: colors.neutral20, height: 24, width: 32 }}>
        <Svg>
            <path
                d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </Svg>
    </div>
);
const ChevronDown = () => (
    <Svg>
        <path
            d="M8.292 10.293a1.009 1.009 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0z"
            stroke="#005382"
            strokeWidth={1}
            fill="currentColor"
            fillRule="evenodd"
        />
    </Svg>
);
