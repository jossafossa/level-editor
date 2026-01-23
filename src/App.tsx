import { InventoryItem, LevelEditor, MapCell, Sidebar } from "./components";
import styles from "./App.module.scss";
import type { Inventory } from "./types";
import classNames from "classnames";

const inventory: Inventory = [
  {
    imageUrl: "/tiles/tile-1.png",
    label: "Tile 1",
    id: "1",
  },
  {
    imageUrl: "/tiles/tile-2.png",
    label: "Tile 2",
    id: "2",
  },
  {
    imageUrl: "/tiles/tile-3.png",
    label: "Tile 3",
    id: "3",
  },
];

function App() {
  return (
    <div id={styles.app}>
      <LevelEditor inventory={inventory}>
        {({ inventory, map, currentRotation, setCurrentRotation }) => (
          <div className={styles.levelEditor}>
            <Sidebar area="left" title="Inventory">
              {inventory.map((item) => (
                <InventoryItem item={item}>
                  {({ isSelected }) => (
                    <div className={styles[`rotation-${currentRotation}`]}>
                      <img
                        src={item.imageUrl}
                        alt={item.label}
                        className={isSelected ? styles.isSelected : ""}
                      />
                    </div>
                  )}
                </InventoryItem>
              ))}
              <input
                type="range"
                min={0}
                max={3}
                value={currentRotation}
                onChange={(e) => setCurrentRotation(Number(e.target.value))}
              />
              {currentRotation * 90}°
            </Sidebar>

            <div className={styles.mapContainer}>
              <div className={styles.map}>
                {map.map((row, y) => (
                  <div className={styles.mapRow}>
                    {row.map((mapCell, x) => (
                      <MapCell
                        mapCell={mapCell}
                        position={{ x, y }}
                        className={styles.mapCell}
                      >
                        {({ inventoryItem, rotation }) =>
                          inventoryItem && (
                            <img
                              className={classNames(
                                styles.mapCellImage,
                                styles[`rotation-${rotation}`],
                              )}
                              src={inventoryItem.imageUrl}
                              alt={inventoryItem.label}
                            />
                          )
                        }
                      </MapCell>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <Sidebar area="right" title="Properties"></Sidebar>
          </div>
        )}
      </LevelEditor>
    </div>
  );
}

export default App;
