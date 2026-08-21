"use client";

import type {
  BrickCalculatorState,
  Currency,
  LengthUnit,
  MortarJoint,
  MortarRatio,
  WallType,
} from "../types";

import WallDetails from "./WallDetails";
import OpeningDetails from "./OpeningDetails";
import BrickDetails from "./BrickDetails";
import MortarDetails from "./MortarDetails";
import CostDetails from "./CostDetails";

type CalculatorSectionsProps = {
  state: BrickCalculatorState;

  setState: React.Dispatch<
    React.SetStateAction<BrickCalculatorState>
  >;

  openSection: string | null;

  setOpenSection: (
    value: string | null
  ) => void;
};

export default function CalculatorSections({
  state,
  setState,
  openSection,
  setOpenSection,
}: CalculatorSectionsProps) {
  const toggleSection = (
    section: string
  ) => {
    setOpenSection(
      openSection === section
        ? null
        : section
    );
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* =====================================================
          WALL DETAILS
      ===================================================== */}

      <WallDetails
        open={openSection === "wall"}
        onToggle={() =>
          toggleSection("wall")
        }

        wallType={state.wallType}
        setWallType={(value: WallType) =>
          setState((current) => ({
            ...current,
            wallType: value,
          }))
        }

        wallLength={state.wallLength}
        setWallLength={(value) =>
          setState((current) => ({
            ...current,
            wallLength: value,
          }))
        }

        wallHeight={state.wallHeight}
        setWallHeight={(value) =>
          setState((current) => ({
            ...current,
            wallHeight: value,
          }))
        }

        wallLengthUnit={
          state.wallLengthUnit
        }
        setWallLengthUnit={(
          value: LengthUnit
        ) =>
          setState((current) => ({
            ...current,
            wallLengthUnit: value,
          }))
        }

        wallHeightUnit={
          state.wallHeightUnit
        }
        setWallHeightUnit={(
          value: LengthUnit
        ) =>
          setState((current) => ({
            ...current,
            wallHeightUnit: value,
          }))
        }

        quantity={state.quantity}
        setQuantity={(value) =>
          setState((current) => ({
            ...current,
            quantity: value,
          }))
        }
      />

      {/* =====================================================
          DOOR & WINDOWS
      ===================================================== */}

      <OpeningDetails
        open={
          openSection === "openings"
        }
        onToggle={() =>
          toggleSection("openings")
        }

        doorQuantity={
          state.doorQuantity
        }
        setDoorQuantity={(value) =>
          setState((current) => ({
            ...current,
            doorQuantity: value,
          }))
        }

        doorWidth={state.doorWidth}
        setDoorWidth={(value) =>
          setState((current) => ({
            ...current,
            doorWidth: value,
          }))
        }

        doorHeight={state.doorHeight}
        setDoorHeight={(value) =>
          setState((current) => ({
            ...current,
            doorHeight: value,
          }))
        }

        doorWidthUnit={
          state.doorWidthUnit
        }
        setDoorWidthUnit={(
          value: LengthUnit
        ) =>
          setState((current) => ({
            ...current,
            doorWidthUnit: value,
          }))
        }

        doorHeightUnit={
          state.doorHeightUnit
        }
        setDoorHeightUnit={(
          value: LengthUnit
        ) =>
          setState((current) => ({
            ...current,
            doorHeightUnit: value,
          }))
        }

        windowQuantity={
          state.windowQuantity
        }
        setWindowQuantity={(value) =>
          setState((current) => ({
            ...current,
            windowQuantity: value,
          }))
        }

        windowWidth={
          state.windowWidth
        }
        setWindowWidth={(value) =>
          setState((current) => ({
            ...current,
            windowWidth: value,
          }))
        }

        windowHeight={
          state.windowHeight
        }
        setWindowHeight={(value) =>
          setState((current) => ({
            ...current,
            windowHeight: value,
          }))
        }

        windowWidthUnit={
          state.windowWidthUnit
        }
        setWindowWidthUnit={(
          value: LengthUnit
        ) =>
          setState((current) => ({
            ...current,
            windowWidthUnit: value,
          }))
        }

        windowHeightUnit={
          state.windowHeightUnit
        }
        setWindowHeightUnit={(
          value: LengthUnit
        ) =>
          setState((current) => ({
            ...current,
            windowHeightUnit: value,
          }))
        }
      />

      {/* =====================================================
          BRICK DETAILS
      ===================================================== */}

      <BrickDetails
        open={
          openSection === "brick"
        }
        onToggle={() =>
          toggleSection("brick")
        }

        brickLength={
          state.brickLength
        }
        setBrickLength={(value) =>
          setState((current) => ({
            ...current,
            brickLength: value,
          }))
        }

        brickHeight={
          state.brickHeight
        }
        setBrickHeight={(value) =>
          setState((current) => ({
            ...current,
            brickHeight: value,
          }))
        }

        brickWidth={
          state.brickWidth
        }
        setBrickWidth={(value) =>
          setState((current) => ({
            ...current,
            brickWidth: value,
          }))
        }

        brickUnit={
          state.brickUnit
        }
        setBrickUnit={(
          value: LengthUnit
        ) =>
          setState((current) => ({
            ...current,
            brickUnit: value,
          }))
        }

        mortarJoint={
          state.mortarJoint
        }
        setMortarJoint={(
          value: MortarJoint
        ) =>
          setState((current) => ({
            ...current,
            mortarJoint: value,
          }))
        }

        waste={state.waste}
        setWaste={(value) =>
          setState((current) => ({
            ...current,
            waste: value,
          }))
        }
      />

      {/* =====================================================
          MORTAR
      ===================================================== */}

      <MortarDetails
        open={
          openSection === "mortar"
        }
        onToggle={() =>
          toggleSection("mortar")
        }

        includeMortar={
          state.includeMortar
        }
        setIncludeMortar={(value) =>
          setState((current) => ({
            ...current,
            includeMortar: value,
          }))
        }

        mortarWetToDryRatio={
          state.mortarWetToDryRatio
        }
        setMortarWetToDryRatio={(
          value
        ) =>
          setState((current) => ({
            ...current,
            mortarWetToDryRatio:
              value,
          }))
        }

        mortarWaste={
          state.mortarWaste
        }
        setMortarWaste={(value) =>
          setState((current) => ({
            ...current,
            mortarWaste: value,
          }))
        }

        mortarRatio={
          state.mortarRatio
        }
        setMortarRatio={(
          value: MortarRatio
        ) =>
          setState((current) => ({
            ...current,
            mortarRatio: value,
          }))
        }

        cementDensity={
          state.cementDensity
        }
        setCementDensity={(value) =>
          setState((current) => ({
            ...current,
            cementDensity: value,
          }))
        }

        cementBagSize={
          state.cementBagSize
        }
        setCementBagSize={(value) =>
          setState((current) => ({
            ...current,
            cementBagSize: value,
          }))
        }
      />

      {/* =====================================================
          COST
      ===================================================== */}

      <CostDetails
        open={
          openSection === "cost"
        }
        onToggle={() =>
          toggleSection("cost")
        }

        currency={state.currency}
        setCurrency={(
          value: Currency
        ) =>
          setState((current) => ({
            ...current,
            currency: value,
          }))
        }

        pricePerBrick={
          state.pricePerBrick
        }
        setPricePerBrick={(value) =>
          setState((current) => ({
            ...current,
            pricePerBrick: value,
          }))
        }

        cementPrice={
          state.cementPrice
        }
        setCementPrice={(value) =>
          setState((current) => ({
            ...current,
            cementPrice: value,
          }))
        }

        sandPrice={
          state.sandPrice
        }
        setSandPrice={(value) =>
          setState((current) => ({
            ...current,
            sandPrice: value,
          }))
        }
      />

    </div>
  );
}
