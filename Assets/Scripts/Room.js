#pragma strict

import System.Collections.Generic;

// Rename to room spawner
class Room extends MonoBehaviour {
  public var enemyCount: int;
  public var enemyPrefabsToSpawn: GameObject[];

  private var spawnedEnemies = new List.<GameObject>();

  function OnDestroy() {
    clearEnemies();
  }

  function spawnEnemies() {
    for (var i = 0; i < enemyCount; i++) {
      spawnRandomEnemy();
    }
  }

  function spawnEnemyAtIndex(index: int) {
    var enemyPrefab = enemyPrefabsToSpawn[index];

    // Room is added to a room object.
    var position = transform.position;
    position.x += Random.Range(-2.0F, 2.0F);
    position.y += Random.Range(-2.0F, 2.0F);

    var enemyObject = Instantiate(enemyPrefab, position, Quaternion.identity);
    spawnedEnemies.Add(enemyObject);
  }

  function spawnRandomEnemy() {
    spawnEnemyAtIndex(Random.Range(0, enemyPrefabsToSpawn.Length));
  }

  function removeEnemy(enemy: GameObject) {
    spawnedEnemies.Remove(enemy);
  }

  function spawnedEnemyCount() : int {
    return spawnedEnemies.Count;
  }

  function clearEnemies() {
    for (var enemy in spawnedEnemies) {
      Destroy(enemy);
    }
    spawnedEnemies.Clear();
  }

  function onAnimatedIn() {
    spawnEnemies();
  }
}
