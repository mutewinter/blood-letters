#pragma strict

public var health = 5;
public var worthExperience = 101;

function Start () {

}

function Update () {

}

function OnTriggerEnter2D(other: Collider2D) {
  var r = GetComponent.<Renderer>();
  var otherGameObject = other.GetComponentInParent(Player);
  if (otherGameObject) {
    health -= otherGameObject.damage;
    if (health <= 0 ) {
      // Died!
      r.material.color = Color.grey;
      otherGameObject.gainExperience(worthExperience);
    } else {
      // Damaged
      var originalColor = r.material.color;
      r.material.color = Color.red;
      yield WaitForSeconds(.2);
      r.material.color = originalColor;
    }
  }
}
