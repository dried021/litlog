import React from "react"
import Select from 'react-select';

export default function SelectMenu({placeholder, options, action}) {
    const customStyles = {
        control: (base, state) => ({
            ...base,
            width: '140px',
            backgroundColor: '#fff',
            boxShadow: state.isFocused ? '#BAC095' : 'none',
            border: 'transparent',
            '&:hover': {
                borderBottom: '2px solid #636B2F'
            },
            borderRadius: '0',
            fontSize: '14px',
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? '#636B2F'
                : state.isFocused
                ? '#636B2F'
                : '#f8f8f8',
            color: state.isSelected ? 'white' : 'black',
            padding: '4px 8px',
            marginLeft: '8px',
            width: '115px',
            borderRadius: '4px',
            fontSize: '13px',
            transition: 'backgroundColor 0.2s ease',
            cursor: 'pointer',
            ':hover': {
                color: 'white',
            },
            ':active': {
                color: '#636B2F'
            }
        }),
        menu: (base) => ({
            ...base,
            width: '143px',
            borderRadius: '4px',
            backgroundColor: '#f8f8f8',
            border: '1px solid #ddd',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)',
        }),
        groupHeading: (base) => ({
            ...base,
            color: '#333',
            fontSize: '12px',
            fontWeight: '600',
            marginLeft: '2px',
            whiteSpace: `nowrap`
        }),
        indicatorSeparator: () => ({ display: 'none' }),
        placeholder: (base) => ({
            ...base,
            fontSize: '14px',
        })
    };
      
    return (
        <Select isSearchable={false} placeholder={placeholder} options={options} onChange={action} styles={customStyles}/>
    );
}