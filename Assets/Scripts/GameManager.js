#pragma strict

public var enemyPrefabs : GameObject[];
public var player : GameObject;

function Start () {
  Instantiate(player, Vector3.zero, Quaternion.identity);

  var goblin = enemyPrefabs[0];
  for (var i = 0; i < 8; i++) {
    var position = new Vector3(
      Random.Range(-2.0F, 2.0F),
      Random.Range(-2.0F, 2.0F),
      0
    );
    Instantiate(goblin, position, Quaternion.identity);
  }
}

function Update () {

}
