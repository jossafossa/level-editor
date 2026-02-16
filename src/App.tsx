import {
  Inventory,
  InventoryItem,
  LevelEditor,
  Map,
  MapCell,
  Sidebar,
} from "./components";
import styles from "./App.module.scss";
import type { Inventory as InventoryType } from "./types";
import classNames from "classnames";
import { level } from "./level";

const inventory: InventoryType = [
  {
    imageUrl: "/tiles/road-straight.png",
    label: "Road Straight",
    id: 1,
    canRotate: true,
    canFlipX: true,
    canFlipY: true,
  },
  {
    imageUrl: "/tiles/road-turn.png",
    label: "Road Turn",
    id: 2,
    canRotate: true,
    canFlipX: true,
    canFlipY: true,
  },
  {
    imageUrl: "/tiles/stone1.png",
    label: "Stone 1",
    id: 3,
    canRotate: false,
    canFlipX: true,
    canFlipY: true,
  },
  {
    imageUrl: "/tiles/stone2.png",
    label: "Stone 2",
    id: 4,
    canRotate: false,
    canFlipX: true,
    canFlipY: true,
  },
  {
    imageUrl: "/tiles/stone-horizontal.png",
    label: "Stone Horizontal",
    id: 5,
    canRotate: false,
    canFlipX: true,
    canFlipY: true,
  },
  {
    imageUrl: "/tiles/stone-vertical.png",
    label: "Stone Vertical",
    id: 6,
    canRotate: false,
    canFlipX: true,
    canFlipY: true,
  },
  {
    imageUrl: "/tiles/hedge-horizontal.png",
    label: "Hedge Horizontal",
    id: 7,
    canRotate: false,
    canFlipX: true,
    canFlipY: true,
  },
  {
    imageUrl: "/tiles/hedge-vertical.png",
    label: "Hedge Vertical",
    id: 8,
    canRotate: false,
    canFlipX: true,
    canFlipY: true,
  },
  {
    imageUrl: "/tiles/logs-horizontal.png",
    label: "Logs Horizontal",
    id: 9,
    canRotate: false,
    canFlipX: true,
    canFlipY: false,
  },
  {
    imageUrl: "/tiles/logs-vertical.png",
    label: "Logs Vertical",
    id: 10,
    canRotate: false,
    canFlipX: true,
    canFlipY: false,
  },
  {
    imageUrl: "/tiles/trees1.png",
    label: "Trees 1",
    id: 11,
    canRotate: false,
    canFlipX: true,
    canFlipY: false,
  },
  {
    imageUrl: "/tiles/trees2.png",
    label: "Trees 2",
    id: 12,
    canRotate: false,
    canFlipX: true,
    canFlipY: false,
  },
  {
    imageUrl: "/tiles/tile-empty.png",
    label: "Empty",
    id: undefined,
    canRotate: false,
    canFlipX: false,
    canFlipY: false,
  },
];

function App() {
  return (
    <div id={styles.app}>
      <LevelEditor inventory={inventory} initialMap={level}>
        {({
          setCurrentRotation,
          currentRotation,
          setCurrentFlippedX,
          currentFlippedX,
          setCurrentFlippedY,
          currentFlippedY,
        }) => (
          <div className={styles.levelEditor}>
            <Sidebar area="left" title="Inventory">
              <Inventory>
                {({ inventory }) => (
                  <div className={styles.inventory}>
                    <div className={styles.inventoryItems}>
                      {inventory.map((item, index) => (
                        <InventoryItem key={index} item={item}>
                          {({ isSelected, rotation, flippedX, flippedY }) => (
                            <div
                              className={classNames(
                                styles.inventoryItem,
                                styles[`rotation-${rotation}`],
                                styles[`flipped-x-${flippedX}`],
                                styles[`flipped-y-${flippedY}`],
                              )}
                            >
                              <img
                                src={item.imageUrl}
                                alt={item.label}
                                className={isSelected ? styles.isSelected : ""}
                              />
                            </div>
                          )}
                        </InventoryItem>
                      ))}
                    </div>
                  </div>
                )}
              </Inventory>
              <label>
                <input
                  type="range"
                  min={0}
                  max={3}
                  value={currentRotation}
                  onChange={(e) => setCurrentRotation(Number(e.target.value))}
                />
                rotation
                {currentRotation * 90}°
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={currentFlippedX}
                  onChange={(e) => setCurrentFlippedX(e.target.checked)}
                />
                flip X
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={currentFlippedY}
                  onChange={(e) => setCurrentFlippedY(e.target.checked)}
                />
                flip Y
              </label>
            </Sidebar>

            <div className={styles.mapContainer}>
              <Map>
                {({ map }) => (
                  <div className={styles.map}>
                    {map.map((row, y) => (
                      <div key={y} className={styles.mapRow}>
                        {row.map((mapCell, x) => (
                          <MapCell
                            key={x}
                            mapCell={mapCell}
                            position={{ x, y }}
                            className={styles.mapCell}
                          >
                            {({
                              inventoryItem,
                              rotation,
                              ghost,
                              flippedX,
                              flippedY,
                            }) => (
                              <>
                                {inventoryItem?.id && (
                                  <img
                                    className={classNames(
                                      styles.mapCellImage,
                                      styles[`rotation-${rotation}`],
                                      styles[`flipped-x-${flippedX}`],
                                      styles[`flipped-y-${flippedY}`],
                                    )}
                                    src={inventoryItem.imageUrl}
                                    alt={inventoryItem.label}
                                  />
                                )}
                                {ghost?.inventoryItem && (
                                  <img
                                    className={classNames(
                                      styles.mapCellImage,
                                      styles.ghostCellImage,
                                      styles[`rotation-${ghost.rotation}`],
                                      styles[`flipped-x-${ghost.flippedX}`],
                                      styles[`flipped-y-${ghost.flippedY}`],
                                    )}
                                    src={ghost.inventoryItem?.imageUrl}
                                    alt={ghost.inventoryItem?.label}
                                  />
                                )}
                              </>
                            )}
                          </MapCell>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </Map>
            </div>

            <Sidebar area="right" title="Properties"></Sidebar>
          </div>
        )}
      </LevelEditor>
    </div>
  );
}

export default App;
