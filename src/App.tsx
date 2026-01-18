import { Inventoryitem, LevelEditor, MapCell, Sidebar } from "./components";
import styles from "./App.module.scss";

function App() {
  return (
    <div id={styles.app}>
      <LevelEditor>
        {({ inventory, map }) => (
          <div className={styles.levelEditor}>
            <Sidebar area="left" title="Inventory">
              {inventory.map((item) => (
                <Inventoryitem item={item}>
                  {({ isSelected }) => (
                    <div>
                      {item.label} {isSelected && "(x)"}
                    </div>
                  )}
                </Inventoryitem>
              ))}
            </Sidebar>

            <div className={styles.map}>
              {map.map((row, y) => (
                <div className={styles.mapRow}>
                  {row.map((item, x) => (
                    <MapCell
                      item={item}
                      position={{ x, y }}
                      className={styles.mapCell}
                    >
                      {({ item }) => <div>{item?.label}</div>}
                    </MapCell>
                  ))}
                </div>
              ))}
            </div>

            <Sidebar area="right" title="Properties"></Sidebar>
          </div>
        )}
      </LevelEditor>
    </div>
  );
}

export default App;
