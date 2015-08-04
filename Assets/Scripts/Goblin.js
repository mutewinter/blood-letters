#pragma strict

class Goblin extends Character {
  public var possibleLoot: GameObject[];

  public var moveRate : float = 0.8;

  function Start () {
    worthExperience = 45;
    health = 5;
    moveSpeed = 10;

    // Movable
    var aiMovable = gameObject.AddComponent(AIMovable);
    aiMovable.moveRate = moveRate;
    aiMovable.moveSpeed = 10;
    aiMovable.target = this;
  }

  function Update () {
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
