import { InventoryItem, LevelEditor, MapCell, Sidebar } from "./components";
import styles from "./App.module.scss";
import type { Inventory } from "./types";
import classNames from "classnames";

const inventory: Inventory = [
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
    imageUrl: "/tiles/tile-empty.png",
    label: "Empty",
    id: undefined,
  },
];

function App() {
  return (
    <div id={styles.app}>
      <LevelEditor inventory={inventory}>
        {({ inventory, map, currentRotation, setCurrentRotation }) => (
          <div className={styles.levelEditor}>
            <Sidebar area="left" title="Inventory">
              <div className={styles.inverntory}>
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
              </div>
            </Sidebar>

            <div className={styles.mapContainer}>
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
                        {({ inventoryItem, rotation }) =>
                          inventoryItem?.id && (
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
