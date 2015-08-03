#pragma strict

class Goblin extends Character {
  public var possibleLoot: GameObject[];

  private var nextMove : float = 0;
  public var moveRate : float = 0.8;

  function Start () {
    worthExperience = 45;
    health = 5;
    moveSpeed = 10;
  }

  function Update () {
    if (Time.time > nextMove) {
      nextMove = Time.time + moveRate;
      var moveDirection = new Vector2(
        Random.Range(-1F, 1F),
        Random.Range(-1F, 1F)
      );
      GetComponent.<Rigidbody2D>().AddForce(moveDirection * moveSpeed);
    }
  }

  function onDied() {
    // Then loot
    var randomLootIndex = Random.Range(0, possibleLoot.length);

    if (possibleLoot.length == 0) { return; }

    var loot = possibleLoot[randomLootIndex];
    var lootPosition = transform.position;
    lootPosition.y += 0.3;
    Instantiate(loot, lootPosition, Quaternion.identity);
  }
}
