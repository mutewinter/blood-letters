#pragma strict

class Goblin extends Character {
  function Start () {
    worthExperience = 30;
    health = 5;
  }

  function Update () {

  }

  function OnTriggerEnter2D(other: Collider2D) {
    var r = GetComponent.<Renderer>();

    other.GetComponentInParent(Player).SendMessage('hit', this);
    if (health <= 0 ) {
      // Died!
      r.material.color = Color.grey;
    } else {
      // Damaged
      var originalColor = r.material.color;
      r.material.color = Color.red;
      yield WaitForSeconds(.2);
      r.material.color = originalColor;
    }
  }
}
