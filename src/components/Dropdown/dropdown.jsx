import ChevronDown from '@/Icons/ChevronDown';
import { Component, forwardRef, useState } from 'react';
import Select, { components } from 'react-select';
import { Radio } from '../Input';

const selectStyles = {
    control: (provided, state) => ({
        ...provided,
        margin: 8,
        border: state.isFocused && '1px solid #005382',
        '&:hover': {
            borderColor: state.isFocused && '#005382',
            backgroundColor: state.isFocused ? '#fff' : '#e5e7eb',
        },
    }),
    menu: () => ({
        boxShadow: 'inset 0 0px 0 rgba(0, 0, 0, 0.1)',
    }),
    menuList: (base) => ({
        ...base,
        maxHeight: '100px',
    }),
    option: (provided, state) => {
        return {
            ...provided,
            fontSize: '14px',
            '&:hover': {
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
class CustomDropdown extends Component {
    state = { isOpen: false, value: this.props.index };
    toggleOpen = () => {
        this.setState((state) => ({ isOpen: !state.isOpen }));
    };
    onSelectChange = (value) => {
        this.toggleOpen();
        this.props.onChange(value.value);
        this.setState({ value });
    };
    render() {
        const { isOpen, value } = this.state;

        return (
            <Dropdown
                isOpen={isOpen}
                onClose={this.toggleOpen}
                target={
                    <div
                        ref={(ref) => (this.targetRef = ref)}
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
                    </div>
                }
            >
                <Select
                    ref={this.props.innerRef}
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
export default forwardRef((props, ref) => (
    <CustomDropdown innerRef={ref} {...props} />
));
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
            <Radio checked={isSelected} />
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
