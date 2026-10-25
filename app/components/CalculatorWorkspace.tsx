import type { ReactNode } from "react";
import styles from "./CalculatorWorkspace.module.css";

type Props = {
  children: ReactNode;
  result: ReactNode;
  label: string;
  value: ReactNode;
  unit?: string;
};

/** Shared input/result workspace. Calculation and validation stay with each tool. */
export default function CalculatorWorkspace({ children, result, label, value, unit }: Props) {
  return (
    <div className={styles.workspace}>
      <div className={styles.inputs}>
        <div className={styles.step}><span>01</span> Project measurements</div>
        {children}
      </div>
      <aside className={styles.results} aria-label="Calculation results">
        <div className={styles.summary}>
          <div className={styles.step}><span>02</span> Your estimate</div>
          <p className={styles.label}>{label}</p>
          <div className={styles.value} aria-live="polite" aria-atomic="true">{value ?? "—"} <span>{unit}</span></div>
          <p className={styles.hint}>Adjust your measurements and use the calculator controls to update your estimate.</p>
        </div>
        <div className={styles.details}>{result}</div>
      </aside>
    </div>
  );
}
