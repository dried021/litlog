import React from "react"
import Select from 'react-select';

export default function SelectMenu({placeholder, options, action}) {
    const customStyles = {
        control: (base, state) => ({
            ...base,
            width: '160px',
            backgroundColor: '#fff',
            borderColor: state.isFocused ? '#BAC095' : '#BAC095',
            boxShadow: state.isFocused ? '#BAC095' : 'none',
            border: '2px solid #3D4127',
            '&:hover': {
                borderColor: '#BAC095',
            },
            borderRadius: '6px',
            fontSize: '1rem',
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? '#636B2F'
                : state.isFocused
                ? '#636B2F'
                : 'white',
            color: state.isSelected ? 'white' : 'black',
            padding: '5px 15px',
            fontSize: '15px',
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
            width: '160px',
            borderRadius: '6px',
            marginTop: '4px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        }),
        groupHeading: (base) => ({
            ...base,
            color: '#888',
            fontWeight: 'bold',
            fontSize: '0.85rem',
            padding: '6px 12px',
        }),
        indicatorSeparator: () => ({ display: 'none' }), // removes vertical divider
        placeholder: (base) => ({
            ...base,
            color: '#999',        // 🖋️ placeholder text color
            fontStyle: 'italic',  // optional
            fontSize: '0.95rem',
        })
    };
      
    return (
        <Select isSearchable={false} placeholder={placeholder} options={options} onChange={action} styles={customStyles}/>
    );
}