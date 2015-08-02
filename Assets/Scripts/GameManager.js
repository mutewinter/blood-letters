#pragma strict

public var enemyPrefabs : GameObject[];
public var player : GameObject;

function Start () {
  spawnPlayer();
  for (var i = 0; i < 8; i++) {
    spawnRandomEnemy();
  }
}

function spawnRandomEnemy() {
  var enemyPrefab = enemyPrefabs[Random.Range(0, enemyPrefabs.Length)];

  var position = new Vector3(
    Random.Range(-2.0F, 2.0F),
    Random.Range(-2.0F, 2.0F),
    0
  );
  Instantiate(enemyPrefab, position, Quaternion.identity);
}

function spawnPlayer() {
  Instantiate(player, Vector3.zero, Quaternion.identity);
}

function Update () {

}

function characterDied(character: Character) {
  if (character instanceof Player) {
    spawnPlayer();
  } else {
    // TODO ensure this is an enemy prefab
    spawnRandomEnemy();
  }
}
