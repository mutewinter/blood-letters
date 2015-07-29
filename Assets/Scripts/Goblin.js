#pragma strict

class Goblin extends Character {
  public var possibleLoot: GameObject[];

  function Start () {
    worthExperience = 30;
    health = 5;
  }

  function Update () {

  }

  function OnTriggerEnter2D(other: Collider2D) {
    if (health <= 0) { return; }
    var r = GetComponent.<Renderer>();

    other.GetComponentInParent(Player).SendMessage('hit', this);
    if (health <= 0) {
      // Died!
      this.die();
    } else {
      // Damaged
      var originalColor = r.material.color;
      r.material.color = Color.red;
      yield WaitForSeconds(.2);
      r.material.color = originalColor;
    }
  }

  function die() {
    var r = GetComponent.<Renderer>();

    // Gray for a sec
    r.material.color = Color.grey;
    yield WaitForSeconds(0.5);

    // Then loot
    var randomLootIndex = Random.Range(0, possibleLoot.length);

    if (possibleLoot.length == 0) { return; }

    var loot = possibleLoot[randomLootIndex];
    var lootPosition = transform.position;
    lootPosition.y += 0.3;
    Instantiate(loot, lootPosition, Quaternion.identity);

    // Time to die
    Destroy(gameObject);
  }
}
