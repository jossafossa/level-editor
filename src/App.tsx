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
    imageUrl: "/tiles/tile-1.png",
    label: "Tile 1",
    id: 1,
  },
  {
    imageUrl: "/tiles/tile-2.png",
    label: "Tile 2",
    id: 2,
  },
  {
    imageUrl: "/tiles/tile-3.png",
    label: "Tile 3",
    id: 3,
  },
  {
    imageUrl: "/tiles/tile-4.png",
    label: "Tile 4",
    id: 4,
  },
  {
    imageUrl: "/tiles/tile-5.png",
    label: "Tile 5",
    id: 5,
  },
  {
    imageUrl: "/tiles/tile-6.png",
    label: "Tile 6",
    id: 6,
  },
  {
    imageUrl: "/tiles/tile-7.png",
    label: "Tile 7",
    id: 7,
  },
  {
    imageUrl: "/tiles/tile-8.png",
    label: "Tile 8",
    id: 8,
  },
  {
    imageUrl: "/tiles/tile-9.png",
    label: "Tile 9",
    id: 9,
  },
  {
    imageUrl: "/tiles/tile-10.png",
    label: "Tile 10",
    id: 10,
  },
  {
    imageUrl: "/tiles/tile-11.png",
    label: "Tile 11",
    id: 11,
  },
  {
    imageUrl: "/tiles/tile-12.png",
    label: "Tile 12",
    id: 12,
  },
  {
    imageUrl: "/tiles/tile-13.png",
    label: "Tile 13",
    id: 13,
  },
  {
    imageUrl: "/tiles/tile-empty.png",
    label: "Empty",
    id: undefined,
  },
];

function App() {
  return (
    <div id={styles.app}>
      <LevelEditor inventory={inventory} initialMap={level}>
        {({ currentRotation, setCurrentRotation }) => (
          <div className={styles.levelEditor}>
            <Sidebar area="left" title="Inventory">
              <Inventory>
                {({ inventory }) => (
                  <div className={styles.inventory}>
                    <div className={styles.inventoryItems}>
                      {inventory.map((item, index) => (
                        <InventoryItem key={index} item={item}>
                          {({ isSelected }) => (
                            <div
                              className={classNames(
                                styles.inventoryItem,
                                styles[`rotation-${currentRotation}`],
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
                            {({ inventoryItem, rotation, ghost }) => (
                              <>
                                {inventoryItem?.id && (
                                  <img
                                    className={classNames(
                                      styles.mapCellImage,
                                      styles[`rotation-${rotation}`],
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
