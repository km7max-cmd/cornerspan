"use client";

import React, { useState } from "react";

export default function TileCalculator() {
  const [roomLength, setRoomLength] = useState<number | "">("");
  const [roomWidth, setRoomWidth] = useState<number | "">("");
  const [tileLength, setTileLength] = useState<number>(24);
  const [tileWidth, setTileWidth] = useState<number>(24);
  const [tilesPerBox, setTilesPerBox] = useState<number>(4);
  const [wastage, setWastage] = useState<number>(0.1);
  const [boxPrice, setBoxPrice] = useState<number | "">("");

  const [results, setResults] = useState<{
    roomArea: number;
    totalArea: number;
    totalTiles: number;
    totalBoxes: number;
    totalCost?: number;
  } | null>(null);

  const handleCalculate = () => {
    const rL = Number(roomLength);
    const rW = Number(roomWidth);

    if (!rL || !rW || !tileLength || !tileWidth) {
      alert("Please enter valid room and tile dimensions.");
      return;
    }

    const roomArea = rL * rW;
    const totalArea = roomArea * (1 + wastage);
    const singleTileAreaSqFt = (tileLength * tileWidth) / 144;
    const totalTiles = Math.ceil(totalArea / singleTileAreaSqFt);
    const totalBoxes = Math.ceil(totalTiles / (tilesPerBox || 1));

    const totalCost = boxPrice ? totalBoxes * Number(boxPrice) : undefined;

    setResults({
      roomArea,
      totalArea,
      totalTiles,
      totalBoxes,
      totalCost,
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Tile & Flooring Calculator
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Room Dimensions (Feet)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Length (ft)"
              value={roomLength}
              onChange={(e) => setRoomLength(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <input
              type="number"
              placeholder="Width (ft)"
              value={roomWidth}
              onChange={(e) => setRoomWidth(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tile Size (Inches)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Length (in)"
              value={tileLength}
              onChange={(e) => setTileLength(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <input
              type="number"
              placeholder="Width (in)"
              value={tileWidth}
              onChange={(e) => setTileWidth(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tiles Per Box
            </label>
            <input
              type="number"
              value={tilesPerBox}
              onChange={(e) => setTilesPerBox(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Wastage Allowance
            </label>
            <select
              value={wastage}
              onChange={(e) => setWastage(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value={0.1}>10% (Recommended)</option>
              <option value={0.15}>15% (Diagonal pattern)</option>
              <option value={0.05}>5% (Simple room)</option>
              <option value={0}>0% (Exact)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Price Per Box (Optional)
          </label>
          <input
            type="number"
            placeholder="Cost per box"
            value={boxPrice}
            onChange={(e) => setBoxPrice(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition"
        >
          Calculate
        </button>

        {results && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-800 border-l-4 border-blue-600 rounded-md space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Room Area:</span>
              <span className="font-medium text-gray-900 dark:text-white">{results.roomArea.toFixed(2)} sq ft</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Total Area (with waste):</span>
              <span className="font-medium text-gray-900 dark:text-white">{results.totalArea.toFixed(2)} sq ft</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Total Tiles Needed:</span>
              <span className="font-medium text-gray-900 dark:text-white">{results.totalTiles} pcs</span>
            </div>
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-gray-800 dark:text-gray-200">Total Boxes Needed:</span>
              <span className="text-blue-600 dark:text-blue-400">{results.totalBoxes} boxes</span>
            </div>
            {results.totalCost !== undefined && (
              <div className="flex justify-between text-base font-bold border-t pt-2 mt-2 border-blue-200 dark:border-gray-700">
                <span className="text-gray-800 dark:text-gray-200">Estimated Cost:</span>
                <span className="text-blue-600 dark:text-blue-400">₹{results.totalCost.toLocaleString()}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
