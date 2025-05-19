import React, { useState } from 'react';
import styles from './RankPeriod.module.css';


const RankPeriod = ({period, onChange}) => {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(period);
    const years = [];

    for (let i = 0; i < 5; i++){
        years.push(currentYear - i);
    }

    const handleChange = (year) => {
        setSelectedYear(year);
        onChange(year);
    };

   
    return (
        <div>
            <div className={styles.optionsContainer}>
                <div className={styles.leftContainer}>
                    {years.map((year) => (
                        <p key={year}
                        className={`${styles.option} ${selectedYear === year ? styles.optionActive : ''}`}
                        onClick={() => handleChange(year)}
                    >
                        {year}
                    </p>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default RankPeriod;
