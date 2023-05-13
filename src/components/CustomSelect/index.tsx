import React, { useState, SelectHTMLAttributes, useEffect, useRef } from "react";
import cn from "classnames";

import styles from "./CustomSelect.module.scss";
import { SelectOption } from "../Transaction";

interface Props extends SelectHTMLAttributes<HTMLDivElement> {
  options: any[];
  selectedOption: SelectOption;
  setSelectedOption: React.Dispatch<React.SetStateAction<any>>;
  className?: string;
  disabled?: boolean;
}

const CustomSelect = ({
  options,
  selectedOption,
  setSelectedOption,
  disabled,
  className,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectElemRef = useRef<HTMLDivElement>(null);

  const toggleSelect = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (option: SelectOption) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleCloseModal = (e: MouseEvent) => {
    if (e.target !== selectElemRef.current) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleCloseModal);

    return () => window.removeEventListener("click", handleCloseModal);
  }, []);

  return (
    <div
      className={cn(styles.SelectWrapper, className)}
      tabIndex={0}
      onClick={toggleSelect}
      onKeyDown={(e) => e.key === "Enter" && toggleSelect()}
    >
      <div ref={selectElemRef} className={cn(styles.Select)}>
        <div className={styles.SelectedOption}>
          {options.length ? (
            <>
              {selectedOption.name}
              {"balance" in selectedOption && (
                <span className={styles.OptionBalance}>{selectedOption.balance}</span>
              )}
            </>
          ) : (
            <>{selectedOption.name} </>
          )}
        </div>
        <div className={cn(styles.Arrow, { [styles.Open]: isOpen })}></div>
      </div>
      {isOpen && (
        <ul className={styles.OptionList}>
          {options.map((option) => (
            <li
              key={option._id}
              className={cn(styles.OptionItem, {
                [styles.Selected]: option._id === selectedOption._id,
              })}
              tabIndex={0}
              onClick={() => handleOptionClick(option)}
              onKeyDown={(e) => e.key === "Enter" && handleOptionClick(option)}
            >
              {option.name}
              {"balance" in option && (
                <span className={styles.OptionBalance}>{option.balance}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
