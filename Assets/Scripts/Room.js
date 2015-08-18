#pragma strict

import System.Collections.Generic;

class Room extends MonoBehaviour {
  public var wallPrefab : GameObject;
  public var enemyPrefabs : GameObject[];
  public var doorPosition = Vector2.zero;
  public var enemyCount = 0;
  public var size = 0f;

  private var spawnedEnemies = new List.<GameObject>();

  function Start() {
    createWalls();

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

  function createWalls() {
    var left = transform.position;
    left.x -= size;
    var right = transform.position;
    right.x += size;
    var top = transform.position;
    top.y += size;
    var bottom = transform.position;
    bottom.y -= size;

    var doorRatio = 1f / 3f;

    if (doorPosition == Vector2.left) {
      var leftTop = left;
      leftTop.y += doorRatio * (size * 2);
      instantiateWall(leftTop, Quaternion.identity, doorRatio);
      var leftBottom = left;
      leftBottom.y -= doorRatio * (size * 2);
      instantiateWall(leftBottom, Quaternion.identity, doorRatio);
    } else {
      instantiateWall(left, Quaternion.identity);
    }

    if (doorPosition == Vector2.right) {
      var rightTop = right;
      rightTop.y += doorRatio * (size * 2);
      instantiateWall(rightTop, Quaternion.identity, doorRatio);
      var rightBottom = right;
      rightBottom.y -= doorRatio * (size * 2);
      instantiateWall(rightBottom, Quaternion.identity, doorRatio);
    } else {
      instantiateWall(right, Quaternion.identity);
    }

    var horizontalRotation = Quaternion.identity;
    horizontalRotation.eulerAngles = Vector3(0, 0, 90);

    instantiateWall(top, horizontalRotation);
    instantiateWall(bottom, horizontalRotation);
  }

  function instantiateWall(position: Vector2, rotation: Quaternion)
    : GameObject {
    return instantiateWall(position, rotation, 0f);
  }

  function instantiateWall(
    position: Vector2,
    rotation: Quaternion,
    scale: float
  ) : GameObject {
    var wallObject = Instantiate(wallPrefab, position, rotation);
    if (scale >= Mathf.Epsilon) {
      wallObject.transform.localScale.y *= scale;
    }

    return wallObject;
  }

  function spawnEnemyAtIndex(index: int) {
    var enemyPrefab = enemyPrefabs[index];

    var position = transform.position;
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
