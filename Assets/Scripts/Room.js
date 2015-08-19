#pragma strict

import System.Collections.Generic;

// Rename to room spawner
class Room extends MonoBehaviour {
  public var enemyPrefabs : GameObject[];
  public var doorPosition = Vector2.zero;
  public var enemyCount = 0;
  public var size = 0f;

  private var spawnedEnemies = new List.<GameObject>();

  function Start() {
    // wait for the end of the level text to spawn enemies
    // TODO Depend on level animation end, not timer
    yield WaitForSeconds(1);

    if (enemyCount == 1) {
      // First stage, only spawn a goblin.
      spawnGoblin();
    } else {
      for (var i = 0; i < enemyCount; i++) {
        spawnRandomEnemy();
      }
    }
  }

  function OnDestroy() {
    clearEnemies();
  }

  function spawnEnemyAtIndex(index: int) {
    var enemyPrefab = enemyPrefabs[index];

    // Room is added to a room object.
    var position = transform.parent.position;
    position.x += Random.Range(-2.0F, 2.0F);
    position.y += Random.Range(-2.0F, 2.0F);

    var enemyObject = Instantiate(enemyPrefab, position, Quaternion.identity);
    spawnedEnemies.Add(enemyObject);
  }

  function spawnGoblin() {
    spawnEnemyAtIndex(0);
  }

  function spawnRandomEnemy() {
    spawnEnemyAtIndex(Random.Range(0, enemyPrefabs.Length));
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
