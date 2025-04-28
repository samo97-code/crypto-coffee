import {useTheme} from "next-themes";

const useSelectCss = () => {
    const {theme} = useTheme();
    const customStyles = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        control: (base) => ({
            ...base,
            backgroundColor: theme === 'dark' ? 'rgba(162,125,109,0.6)' : 'white',
            color: theme === 'dark' ? '#f3f4f6' : '#111827',
            minWidth: 150,
            fontSize: 12,
            borderColor: theme === 'dark' ? '#A27D6D' : '#c7a17a', // coffee border
            boxShadow: 'none',
            '&:hover': {
                borderColor: theme === 'dark' ? '#A27D6D' : '#c7a17a',
            },
        }),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        singleValue: (provided) => ({
            ...provided,
            color: theme === 'dark' ? '#f3f4f6' : '#111827',
        }),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? '#a47148' // coffee brown
                : state.isFocused
                    ? '#FDF1E7' // green hover
                    : 'white',
            color: state.isSelected ? 'white' : '#4b2e2e',
            fontSize: 13,
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: state.isSelected ? '#a47148' : '#FDF1E7', // green hover soft
            },
        }),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        menu: (base) => ({
            ...base,
            borderRadius: 6,
            padding: 2,
        }),
    };

    return {customStyles}
};

export default useSelectCss;
