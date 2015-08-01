#pragma strict

class Goblin extends Character {
  public var possibleLoot: GameObject[];

  function Start () {
    worthExperience = 45;
    health = 5;
  }

  function Update () {

  }

  function OnTriggerEnter2D(other: Collider2D) {
    if (health <= 0) { return; }

    var bullet = other.GetComponent.<Bullet>();

    if (bullet) {
      bullet.SendMessage('hit', this);
    }

    if (health <= 0) {
      // Died!
      this.die();
    } else {
      animateHit();
      // Damaged
    }
  }

  function die() {
    animateDeath();

    // Then loot
    var randomLootIndex = Random.Range(0, possibleLoot.length);

    if (possibleLoot.length == 0) { return; }

    var loot = possibleLoot[randomLootIndex];
    var lootPosition = transform.position;
    lootPosition.y += 0.3;
    Instantiate(loot, lootPosition, Quaternion.identity);

    // TODO: Figure out how to wait for end of death animation
    yield WaitForSeconds(2);

    Destroy(gameObject);
  }

  function animateHit() {
    var animator = GetComponent.<Animator>();
    animator.SetTrigger('isHit');
  }

  function animateDeath() {
    var animator = GetComponent.<Animator>();
    animator.SetBool('isDying', true);
  }
}
