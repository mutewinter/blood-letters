#pragma strict

import System.Collections.Generic;

// Rename to room spawner
class Room extends MonoBehaviour {
  private var spawnedEnemies = new List.<GameObject>();

  function OnDestroy() {
    clearEnemies();
  }

  function spawnEnemies(enemyCount: int, enemyPrefabs: GameObject[]) {
    for (var i = 0; i < enemyCount; i++) {
      spawnRandomEnemy(enemyPrefabs);
    }
  }

  function spawnEnemyAtIndex(index: int, enemyPrefabs: GameObject[]) {
    var enemyPrefab = enemyPrefabs[index];

    // Room is added to a room object.
    var position = transform.position;
    position.x += Random.Range(-2.0F, 2.0F);
    position.y += Random.Range(-2.0F, 2.0F);

    var enemyObject = Instantiate(enemyPrefab, position, Quaternion.identity);
    spawnedEnemies.Add(enemyObject);
  }

  function spawnRandomEnemy(enemyPrefabs: GameObject[]) {
    spawnEnemyAtIndex(Random.Range(0, enemyPrefabs.Length), enemyPrefabs);
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
}
