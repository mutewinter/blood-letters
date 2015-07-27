#pragma strict

public var enemyPrefabs : GameObject[];

function Start () {
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
